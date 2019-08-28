import React, { useEffect, useState } from 'react';
import "./style.sass";

export default function BackgroundAuth() {

    const [heightImageBackground, stateHeightImageBackground] = useState(0)

    useEffect(() => {
        updateHeightImageBackground();
        window.addEventListener('resize', updateHeightImageBackground)

        return () => {
            window.removeEventListener('resize', updateHeightImageBackground)
        }
    }, [])

    function updateHeightImageBackground() {
        let heightContent = document.body.scrollHeight;
        let heightWindow = window.innerHeight;
        let height = heightWindow >= heightContent ? heightWindow : heightContent
        stateHeightImageBackground(height)
    }

    return (
        <div className="scrollable-container">
            <div className="mp-form-background" style={{ height: heightImageBackground }} />
        </div>
    );
};
