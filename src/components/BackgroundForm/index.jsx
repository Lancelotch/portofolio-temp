import React, { useEffect, useState } from 'react';
import "./style.sass";

export default function BackgroundForm() {
    const [heightImageBackground, stateHeightImageBackground] = useState(0)

    useEffect(() => {
        window.addEventListener('resize', updateHeightImageBackground)
        updateHeightImageBackground()
        return () => {
            window.removeEventListener('resize', updateHeightImageBackground)
        }
    }, [])

    function updateHeightImageBackground() {
        let heightContent = window.document.getElementById("root").offsetHeight;
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
