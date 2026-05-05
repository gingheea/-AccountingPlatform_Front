import { HomeHero } from "../../components/relume/home/HomeHero.jsx";
import { HomeAboutIntro } from "../../components/relume/home/HomeAboutIntro.jsx";
import { HomeServicesShowcase } from "../../components/relume/home/HomeServicesShowcase.jsx";
import { HomeWhyChooseMe } from "../../components/relume/home/HomeWhyChooseMe.jsx";
import { HomeTestimonials } from "../../components/relume/home/HomeTestimonials.jsx";
import { HomeConsultationCta } from "../../components/relume/home/HomeConsultationCta.jsx";
import { HomeNewsletterCta } from "../../components/relume/home/HomeNewsletterCta.jsx";
import { ContactSection } from "../../components/shared/ContactSection.jsx";
import { HomeServicePackages } from "../../components/relume/home/HomeServicePackages.jsx";

export default function HomePage() {
    return (
        <div>
            <HomeHero />
            <HomeAboutIntro />
            <HomeServicesShowcase />
            <HomeWhyChooseMe />
            <HomeTestimonials />
            <HomeConsultationCta />
            <HomeNewsletterCta />
            <ContactSection
                sectionId="contact"
                title="Звʼяжіться зі мною"
                description="Маєте питання або готові почати роботу разом? Напишіть, зателефонуйте або залиште запит — я підкажу найкращий формат бухгалтерського супроводу."
                accentLabel="Зручний формат звʼязку"
                accentTitle="Оберіть канал, який вам зручний"
                accentDescription="Можна написати на пошту, зателефонувати або звʼязатися через месенджер. Для короткого запиту достатньо email у формі зверху."
                actionText="Форма консультації — у верхньому блоці"
                actionHref="/#quick-consultation"
            />
            <HomeServicePackages />
        </div>
    );
}