import { useRef } from 'react';
import './about.common.css';
import './about.layout.css';
import './about.hero.css';
import './about.wave.css';
import { useHorizontalScrollPin } from '../../hooks/useHorizontalScrollPin';
import AboutPanels from './aboutPanels';
import AboutWaveLine from './panels/AboutWaveLine';

function About() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useHorizontalScrollPin(sectionRef, trackRef, {
        enabledMinWidth: 1024,
        scrub: 1
    });

    return (
        <>
            <div ref={sectionRef} className="about-section relative isolate overflow-hidden ">
               

                <div ref={trackRef} className="about-track relative z-10">
                    <AboutWaveLine sectionRef={sectionRef} trackRef={trackRef} />
                    <AboutPanels />
                </div>
            </div>
        </>
    );
}

export default About;