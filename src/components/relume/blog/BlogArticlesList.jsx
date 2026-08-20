"use client";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { RxChevronRight, RxReload } from "react-icons/rx";
import { getLatestNews } from "../../../services/newsService";

const ALL_CATEGORIES = "all";

function formatDate(value) {
  if (!value) return "";

  return new Date(value).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const BlogVisual = ({ number, category, tone = "light" }) => {
  const isDark = tone === "dark";

  return (
      <div
          className={`flex aspect-square w-full items-center justify-center rounded-card border p-6 shadow-soft ${
              isDark
                  ? "border-white/15 bg-brand-madison text-white"
                  : "border-brand-border bg-brand-pampas text-brand-ink"
          }`}
      >
        <div className="w-full">
          <div className="mb-8 flex items-center justify-between">
          <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                  isDark
                      ? "bg-white/10 text-brand-tan"
                      : "bg-white text-brand-madison"
              }`}
          >
            {category}
          </span>

            <span
                className={`font-heading text-3xl font-bold ${
                    isDark ? "text-white/25" : "text-brand-madison/20"
                }`}
            >
            {number}
          </span>
          </div>

          <div
              className={`space-y-3 rounded-2xl p-4 ${
                  isDark ? "bg-white/10" : "bg-white"
              }`}
          >
            <div
                className={`h-2 w-3/4 rounded-full ${
                    isDark ? "bg-brand-tan" : "bg-brand-madison"
                }`}
            />
            <div
                className={`h-2 w-full rounded-full ${
                    isDark ? "bg-white/25" : "bg-brand-soft"
                }`}
            />
            <div
                className={`h-2 w-2/3 rounded-full ${
                    isDark ? "bg-white/25" : "bg-brand-soft"
                }`}
            />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <div
                className={`h-16 rounded-2xl ${
                    isDark ? "bg-white/10" : "bg-white"
                }`}
            />
            <div
                className={`h-16 rounded-2xl ${
                    isDark ? "bg-white/10" : "bg-white"
                }`}
            />
            <div
                className={`h-16 rounded-2xl ${
                    isDark ? "bg-brand-tan/30" : "bg-brand-tan/30"
                }`}
            />
          </div>
        </div>
      </div>
  );
};

/** Сірі заглушки на час завантаження — сторінка не «стрибає», коли прийдуть дані. */
const ArticleSkeleton = () => (
    <div className="grid animate-pulse gap-x-8 gap-y-6 rounded-card border border-brand-border bg-white p-5 shadow-soft md:grid-cols-[0.42fr_1fr] md:gap-x-10 md:p-6">
      <div className="aspect-square w-full rounded-card bg-brand-pampas" />

      <div className="flex h-full flex-col justify-center gap-4">
        <div className="h-6 w-32 rounded-full bg-brand-pampas" />
        <div className="h-8 w-full rounded-full bg-brand-pampas" />
        <div className="h-8 w-3/4 rounded-full bg-brand-pampas" />
        <div className="h-4 w-full rounded-full bg-brand-pampas" />
        <div className="h-4 w-2/3 rounded-full bg-brand-pampas" />
      </div>
    </div>
);

const ArticleCard = ({ article, index }) => {
  // Перша картка темна, далі чергуємо фон — щоб список не був монотонним.
  const isFirst = index === 0;
  const isOdd = index % 2 === 1;

  return (
      <div
          className={`grid gap-x-8 gap-y-6 rounded-card border border-brand-border p-5 shadow-soft transition-shadow hover:shadow-card md:grid-cols-[0.42fr_1fr] md:gap-x-10 md:p-6 ${
              isOdd ? "bg-brand-pampas" : "bg-white"
          }`}
      >
        {/*
          rel="noopener noreferrer" обовʼязковий для target="_blank": без нього
          відкрита сторінка отримує доступ до нашої через window.opener.
        */}
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
        >
          <BlogVisual
              number={String(index + 1).padStart(2, "0")}
              category={article.category}
              tone={isFirst ? "dark" : "light"}
          />
        </a>

        <div className="flex h-full flex-col items-start justify-center">
          <div className="rb-4 mb-4 flex w-full flex-wrap items-center justify-start gap-3">
            <p
                className={`rounded-full px-3 py-1 text-sm font-semibold text-brand-madison ${
                    isOdd ? "bg-white" : "bg-brand-pampas"
                }`}
            >
              {article.category}
            </p>

            <p className="inline text-sm font-semibold text-brand-gothic">
              {formatDate(article.publishedAtUtc)}
            </p>
          </div>

          <a
              className="mb-3"
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
          >
            <h3 className="font-heading text-2xl font-bold leading-tight text-brand-ink transition-colors hover:text-brand-madison md:text-3xl">
              {article.title}
            </h3>
          </a>

          <p className="max-w-2xl leading-7 text-brand-muted">
            {article.summary}
          </p>

          <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-x-2 font-semibold text-brand-madison transition-colors hover:text-brand-madisonDark"
          >
            Читати на {article.source}
            <RxChevronRight />
          </a>
        </div>
      </div>
  );
};

export function BlogArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  // reloadKey змінюється по кнопці «Спробувати ще раз» і перезапускає ефект.
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // Прапорець проти оновлення стану вже прибраного компонента: якщо користувач
    // піде зі сторінки, поки запит у дорозі, відповідь ми просто ігноруємо.
    let isActive = true;

    getLatestNews(9)
        .then((data) => {
          if (!isActive) return;

          setArticles(Array.isArray(data) ? data : []);
        })
        .catch((error) => {
          if (!isActive) return;

          console.error("Failed to load news:", error);
          setHasError(true);
        })
        .finally(() => {
          if (isActive) setIsLoading(false);
        });

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  // Категорії будуємо з того, що реально прийшло, а не зі списку «на око»:
  // інакше у фільтрі були б рубрики, під якими нема жодної новини.
  const categories = useMemo(() => {
    const unique = [...new Set(articles.map((a) => a.category).filter(Boolean))];

    return unique.sort((a, b) => a.localeCompare(b, "uk"));
  }, [articles]);

  // Якщо обрана категорія зникла після оновлення стрічки — вважаємо обраними «всі».
  // Це рахується прямо під час рендера, а не окремим useEffect: інакше був би
  // зайвий прохід рендера, у якому список уже порожній, а фільтр ще старий.
  const effectiveCategory =
      activeCategory !== ALL_CATEGORIES && !categories.includes(activeCategory)
          ? ALL_CATEGORIES
          : activeCategory;

  // Скидаємо стан тут, у обробнику кліку, а не в useEffect:
  // всередині ефекту setState спричиняє зайвий каскад рендерів.
  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setReloadKey((key) => key + 1);
  };

  const visibleArticles = useMemo(() => {
    if (effectiveCategory === ALL_CATEGORIES) return articles;

    return articles.filter((a) => a.category === effectiveCategory);
  }, [articles, effectiveCategory]);

  return (
      <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
        <div className="container flex flex-col">
          <div className="mx-auto mb-12 max-w-4xl text-center md:mb-18 lg:mb-20">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-madison md:mb-4">
              Блог
            </p>

            <h1 className="mb-5 font-heading text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-brand-ink md:mb-6 md:text-7xl lg:text-8xl">
              Актуальні новини та поради
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-7 text-brand-muted md:text-md">
              Свіжі новини про облік, податки та звітність — добірка оновлюється
              автоматично кілька разів на день.
            </p>
          </div>

          <div className="flex flex-col justify-start">
            {categories.length > 0 && (
                <div className="mb-10 flex justify-center">
                  <Select value={effectiveCategory} onValueChange={setActiveCategory}>
                    <SelectTrigger className="min-h-12 min-w-[14rem] rounded-button border border-brand-border bg-brand-pampas px-4 py-2 font-medium text-brand-ink shadow-sm md:w-auto">
                      {effectiveCategory === ALL_CATEGORIES
                          ? "Всі публікації"
                          : effectiveCategory}
                    </SelectTrigger>

                    <SelectContent className="rounded-card border-brand-border bg-white shadow-card">
                      <SelectItem value={ALL_CATEGORIES}>Всі публікації</SelectItem>

                      {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
            )}

            {isLoading && (
                <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-x-12 gap-y-8 md:gap-y-10">
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                  <ArticleSkeleton />
                </div>
            )}

            {/*
              Порожній список і помилка запиту — для відвідувача те саме:
              новин не видно. Коли лежить саме джерело, наш бек віддає 200 і
              порожній масив, тож без цієї гілки кнопки повтору не було б
              якраз у найчастішому випадку збою.
            */}
            {!isLoading && (hasError || visibleArticles.length === 0) && (
                <div className="mx-auto max-w-xl rounded-card border border-brand-border bg-brand-pampas p-8 text-center shadow-soft">
                  <h3 className="font-heading text-2xl font-bold text-brand-ink">
                    Новини тимчасово недоступні
                  </h3>

                  <p className="mt-3 leading-7 text-brand-muted">
                    Не вдалося отримати стрічку новин. Спробуйте оновити за хвилину.
                  </p>

                  <Button
                      className="mt-6 inline-flex items-center gap-x-2 rounded-button bg-brand-madison px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-madisonDark"
                      onClick={handleRetry}
                  >
                    <RxReload />
                    Спробувати ще раз
                  </Button>
                </div>
            )}

            {!isLoading && !hasError && visibleArticles.length > 0 && (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={effectiveCategory}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-12 gap-y-8 md:gap-y-10">
                        {visibleArticles.map((article, index) => (
                            <ArticleCard
                                key={article.url}
                                article={article}
                                index={index}
                            />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Джерело має бути назване явно — ми показуємо лише анонси. */}
                  <p className="mt-12 text-center text-sm text-brand-gothic">
                    Джерело новин:{" "}
                    <a
                        href="https://news.dtkt.ua"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-madison underline underline-offset-4"
                    >
                      {articles[0]?.source ?? "Дебет-Кредит"}
                    </a>
                    . Повні тексти читайте на сайті видання.
                  </p>
                </>
            )}
          </div>
        </div>
      </section>
  );
}
