import React, { useState, useEffect } from 'react';
import { 
    isMobileOnly, 
    isFirefox, 
    isMobileSafari, 
    isDesktop 
} from 'react-device-detect';

// Styles
import './styles.css';

// Components
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import FirstQueryForm from '../../components/FirstQueryForm';

// Helper function
// import { deviceOrientation } from '../../helpers';


function HomeSearchPage() {

    /* height is set only of the browser is Firefox and if the device is mobile */
    const [height, setHeight] = useState(sessionStorage.getItem('height'));
    const [focus, setFocus] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    console.log(focus);

    /* Orientation of the screen - Useful only for mobile */
    const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? "landscape" : "portrait");

    const ref = React.useRef();


    useEffect( () => {
        /* If the browser is Firefox, and if the device is mobile only, 
        save the height of the homepage in the session storage and retrieve it */
        if (isFirefox && isMobileOnly) {
            if (!height && window.innerWidth < window.innerHeight) {
                sessionStorage.setItem('height', window.innerHeight);
                setHeight(sessionStorage.getItem('height'));
            }
        }
    }, [height]); // To check with the mobile


    // useEffect( () => {

    //     const changeOrientation = () => {
    //         const input = document.querySelector("input[name='keyword']");
    //         const hasfocus = input.getAttribute('hasfocus');
    //         console.log(hasfocus);

    //         if (orientation === "portrait") {
    //             setOrientation("landscape");
    //         } else {
    //             setOrientation("portrait");
    //         }
    //     }  

    //     let screenOrientation = window.matchMedia(`(orientation: ${orientation})`);
    //     screenOrientation.addEventListener("change", changeOrientation);   
    //     return () => screenOrientation.removeEventListener("change", changeOrientation); 
    // }, [orientation]);


    useEffect( () => {
        if (window.innerHeight !== windowHeight && window.innerWidth !== windowWidth) {
            if (orientation === "portrait") {
                setOrientation("landscape");
            } else {
                setOrientation("portrait");
            }
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        }
    }, [windowWidth, windowHeight, orientation]);


    useEffect( () => {
        // window.scrollTo(0,0);
        /* Do not show always the scrollbar on the body - auto by default */
        document.body.classList.remove('scroll');
    }, []);


    return (
        <div 
            id='homeSearchForm'
            style={{height: height}} /* Set the height for mobile Firefox in case the user opens the virtual keyboard */
            ismobileonly={isMobileOnly ? "true" : "false"}
            isdesktop={isDesktop ? "true" : "false"}
            isfirefox={isFirefox ? "true" : "false"}
            ismobilesafari={isMobileSafari ? "true" : "false"}
            deviceorientation={orientation}
            ref={ref}
        >

            <Banner transparency='transparentBg' />

            <FirstQueryForm 
                height={height-62} /* 62px is the height of the footer on mobile */
                setFocus={setFocus}
            />

            <Footer />
            
        </div>
    )
}

export default HomeSearchPage;