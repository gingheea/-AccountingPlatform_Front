import { BlogArticlesList } from "../../components/relume/blog/BlogArticlesList.jsx";
import { BlogNewsletterCta } from "../../components/relume/blog/BlogNewsletterCta.jsx";
import { BlogFaq } from "../../components/relume/blog/BlogFaq.jsx";

export default function BlogPage() {
    return (
        <div>
            <BlogArticlesList />
            <BlogNewsletterCta />
            <BlogFaq />
        </div>
    );
}
