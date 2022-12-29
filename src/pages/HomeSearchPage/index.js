import React, { useState, useEffect } from 'react';
import { 
    isMobileOnly, 
    isFirefox, 
    isMobileSafari, 
    isDesktop,
    isTablet 
} from 'react-device-detect';

// Styles
import './styles.css';

// Components
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import FirstQueryForm from '../../components/FirstQueryForm';


function HomeSearchPage() {

    /* height is set only of the browser is Firefox and if the device is mobile */
    const [height, setHeight] = useState(sessionStorage.getItem('height'));
    const [focus, setFocus] = useState(false);

    console.log(focus);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);


    /* Orientation of the screen - Useful only for mobile */
    const [orientation, setOrientation] = useState();

    const ref = React.useRef();


    useEffect( () => { /* eslint-disable-line react-hooks/exhaustive-deps */
        /* If the browser is Firefox, and if the device is mobile only, 
        save the height of the homepage in the session storage and retrieve it */
        if (isFirefox && isMobileOnly) {
            if (!height && window.innerWidth < window.innerHeight) {
                sessionStorage.setItem('height', window.innerHeight);
                setHeight(sessionStorage.getItem('height'));
            }
        }
    });

    const reload = () => {
        window.location = window.location.href+'?eraseCache=true';
    }

    const changeOrientation = () => {
        const timeout = setTimeout(
            () => {
                orientation === "portrait" ? setOrientation("landscape") : setOrientation("portrait");
            }, 1000
        )
        clearTimeout(timeout);
        reload();
    }

    useEffect( () => {
        if (isMobileOnly && !isFirefox) {
            let screenOrientation = window.matchMedia(`(orientation: ${orientation})`);
            screenOrientation.addEventListener("change", changeOrientation);   
            return () => screenOrientation.removeEventListener("change", changeOrientation); 
        }
    });


    useEffect( () => {
        if (isMobileOnly && isFirefox) {
            if ((window.innerHeight !== windowHeight) && (window.innerWidth !== windowWidth)) {
                changeOrientation();
                setWindowWidth(window.innerWidth);
                setWindowHeight(window.innerHeight);
            }
        }
    }, [window.innerWidth, window.innerHeight]); // eslint-disable-line 


    useEffect( () => {
        // window.scrollTo(0,0);
        /* Do not show always the scrollbar on the body - auto by default */
        document.body.classList.remove('scroll');
        setOrientation(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    }, []);


    return (
        <div 
            id='homeSearchForm'
            style={{height: height}} /* Set the height for mobile Firefox in case the user opens the virtual keyboard */
            ismobileonly={isMobileOnly ? "true" : "false"}
            isdesktop={isDesktop ? "true" : "false"}
            istablet={isTablet ? "true" : "false"}
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