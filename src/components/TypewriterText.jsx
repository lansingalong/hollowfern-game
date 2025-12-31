
import React, { useState, useEffect, useRef } from 'react';

const TypewriterText = ({ text, speed = 25, style = {}, onComplete, forceShow = false, ...props }) => {
    const [displayedText, setDisplayedText] = useState('');
    const intervalRef = useRef(null);

    useEffect(() => {
        // If forceShow is true, show everything immediately
        if (forceShow) {
            setDisplayedText(text);
            clearInterval(intervalRef.current);
            // Do not call onComplete here; user can advance manually
            return;
        }

        // Reset and start typing
        setDisplayedText('');
        clearInterval(intervalRef.current);

        let currentIndex = 0;

        intervalRef.current = setInterval(() => {
            if (currentIndex < text.length) {
                const char = text.charAt(currentIndex);
                setDisplayedText((prev) => prev + char);
                currentIndex++;
            } else {
                clearInterval(intervalRef.current);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(intervalRef.current);
    }, [text, speed, forceShow, onComplete]); // Re-run if text or forceShow changes

    return (
        <div style={{ position: 'relative', ...style, whiteSpace: style.whiteSpace || 'pre-line' }} {...props}>
            {/* Ghost Text: Reserves full layout space immediately */}
            <div style={{ visibility: 'hidden' }}>
                {text}
            </div>

            {/* Visible Text: Overlays the ghost text */}
            <div style={{ position: 'absolute', top: 0, left: 0 }}>
                {displayedText}
            </div>
        </div>
    );
};

export default TypewriterText;

