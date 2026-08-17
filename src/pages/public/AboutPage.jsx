import {AboutHeader} from "../../components/relume/about/AboutHeader.jsx";
import {AboutExperience} from "../../components/relume/about/AboutExperience.jsx";
import {AboutPersonalApproach} from "../../components/relume/about/AboutPersonalApproach.jsx";
import {AboutCredentials} from "../../components/relume/about/AboutCredentials.jsx";
import {AboutTestimonials} from "../../components/relume/about/AboutTestimonials.jsx";
import { ContactSection } from "../../components/shared/ContactSection.jsx";

export default function AboutPage() {
    return (
        <div>
            <AboutHeader />
            <AboutExperience />
            <AboutPersonalApproach />
            <AboutCredentials />
            <AboutTestimonials />
            <ContactSection
                sectionId="about-contact"
                title="Звʼяжіться зі мною"
                description="Я відповідаю швидко й завжди готовий обговорити вашу ситуацію: облік, податки, звітність, документи або формат регулярного супроводу."
                thirdCardTitle="Онлайн-зустріч"
                thirdCardDescription="Консультацію можна провести дистанційно: через дзвінок, месенджер або відеозустріч."
                thirdCardButtonText="Записатися"
                thirdCardHref="/#contact"
                accentLabel="Персональна консультація"
                accentTitle="Розберемо вашу ситуацію і визначимо найкращий формат роботи"
                accentDescription="Під час першого контакту можна коротко обговорити вашу форму діяльності, обсяг документів, звітність, податкові питання та потребу в регулярному супроводі."
                statOneLabel="Формат"
                statOneValue="Online"
                statTwoLabel="Підхід"
                statTwoValue="Персонально"
                statThreeLabel="Результат"
                statThreeValue="План дій"
                actionText="Обговорити співпрацю"
                actionHref="/#contact"
            />
        </div>
    );
}
