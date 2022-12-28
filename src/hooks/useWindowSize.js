import { useEffect, useState } from 'react';

function useWindowSize() {

    // the size of the window in the begginning
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // we use the useEffect hook to listen to the window resize event
    useEffect(() => {
        window.onresize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        }, []);

    return windowSize;

}

export default useWindowSize;