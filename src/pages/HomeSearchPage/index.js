import React, { useState, useEffect } from 'react';
import { 
    isMobileOnly, 
    isFirefox, 
    isMobileSafari, 
    isDesktop,
    isTablet, 
    isAndroid
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
   

    useEffect( () => { /* eslint-disable-line react-hooks/exhaustive-deps */
        /* If the browser is Firefox, and if the device is mobile only, 
        save the height of the homepage in the session storage and retrieve it */
        if (isMobileOnly && (isFirefox || isAndroid)) {
            if (!height && window.innerWidth < window.innerHeight) {
                sessionStorage.setItem('height', window.innerHeight);
                setHeight(sessionStorage.getItem('height'));
            }
        }
    });


    useEffect( () => {
        if (isMobileOnly && !isMobileSafari) {
            window.scrollTo(0,0);
        }
        /* Do not show always the scrollbar on the body - auto by default */
        document.body.classList.remove('scroll');
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
            isandroid={isAndroid ? "true" : "false"}
        >

            <Banner transparency='transparentBg' />

            <FirstQueryForm 
                height={!isAndroid ? height-62 : null} /* 62px is the height of the footer on mobile */
            />

            <Footer />
            
        </div>
    )
}

export default HomeSearchPage;