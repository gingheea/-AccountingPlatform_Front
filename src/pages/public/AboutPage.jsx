import {AboutHeader} from "../../components/relume/about/AboutHeader.jsx";
import {AboutExperience} from "../../components/relume/about/AboutExperience.jsx";
import {AboutPersonalApproach} from "../../components/relume/about/AboutPersonalApproach.jsx";
import {AboutCredentials} from "../../components/relume/about/AboutCredentials.jsx";
import {AboutTestimonials} from "../../components/relume/about/AboutTestimonials.jsx";
import {Contact14} from "../../components/relume/about/Contact14.jsx";

export default function AboutPage() {
    return (
        <div>
            <AboutHeader />
            <AboutExperience />
            <AboutPersonalApproach />
            <AboutCredentials />
            <AboutTestimonials />
            <Contact14 />
        </div>
    );
}
