import {ServicesHero} from "../../components/relume/services/ServicesHero.jsx";
import {ServicesList} from "../../components/relume/services/ServicesList.jsx";
import {ServicesPricing} from "../../components/relume/services/ServicesPricing.jsx";
import {ServicesBenefits} from "../../components/relume/services/ServicesBenefits.jsx";
import { ContactSection } from "../../components/shared/ContactSection.jsx";
import {ServicesCta} from "../../components/relume/services/ServicesCta.jsx";
import {ServicesPackagesComparison} from "../../components/relume/services/ServicesPackagesComparison.jsx";

export default function ServicesPage() {
    return (
        <div>
            <ServicesHero />
            <ServicesList />
            <ServicesPricing />
            <ServicesBenefits />
            {/* <ServicesCta /> */}
            <ContactSection
                sectionId="services-contact"
                title="Обговоримо ваш формат супроводу"
                description="Розкажіть, які послуги вам потрібні: облік ФОП, супровід малого бізнесу, звітність, консультація або робота з документами."
                thirdCardTitle="Онлайн-формат"
                thirdCardDescription="Консультації та обмін документами можна вести дистанційно через пошту, месенджери або клієнтський портал."
                accentLabel="Підбір послуг"
                accentTitle="Допоможу зрозуміти, який пакет підходить саме вам"
                accentDescription="Після короткого обговорення стане зрозуміло, чи вам потрібна разова консультація, базовий супровід або повне ведення обліку."
                statOneLabel="Для кого"
                statOneValue="ФОП / SMB"
                statTwoLabel="Формат"
                statTwoValue="Online"
                statThreeLabel="Рішення"
                statThreeValue="Пакет послуг"
                actionText="Отримати консультацію"
                actionHref="/#quick-consultation"
            />
            <ServicesPackagesComparison />
        </div>
    );
}
