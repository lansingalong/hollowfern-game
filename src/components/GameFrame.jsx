import React from 'react';

const GameFrame = ({
    title,
    children,
    footerContent,
    showMinimap = false,
    minimapComponent = null,
    viewportStyle = {},
    outerBackground = null,

    footerHeight = '300px', // Default height
    enableTint = true, // New prop to toggle background tint
    showFrame = true   // New prop to toggle dialog frame styling
}) => {
    return (
        <div style={{
            backgroundColor: '#2e2620',
            backgroundImage: outerBackground
                ? (enableTint ? `linear-gradient(rgba(10, 45, 50, 0.75), rgba(10, 45, 50, 0.75)), url(${outerBackground})` : `url(${outerBackground})`)
                : `
                repeating-linear-gradient(90deg, 
                    #3d3228 0px, #3d3228 38px, 
                    #1a1612 39px, #1a1612 40px
                ),
                repeating-linear-gradient(0deg, 
                    transparent 0px, transparent 3px, 
                    rgba(0,0,0,0.2) 4px
                )
            `,
            backgroundBlendMode: outerBackground ? 'normal' : 'multiply',
            backgroundSize: outerBackground ? 'cover' : 'auto', // Cover for images
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
            position: 'relative',
            overflow: 'hidden' // Prevent scrollbars from frame
        }}>
            {/* Minimap Slot */}
            {showMinimap && minimapComponent && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 150 }}>
                    {minimapComponent}
                </div>
            )}

            <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1100px',
                border: showFrame ? '4px solid #f8f5e3' : 'none',
                // outline: '8px solid #4a3b2a', // Replaced by shadow for rounding
                borderRadius: '10px',
                background: showFrame ? '#4a3b2a' : 'transparent',
                boxShadow: showFrame ? '0 0 0 8px #4a3b2a, 0 20px 50px rgba(0,0,0,0.8)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                // overflow: 'hidden' // REMOVED: Allow overflow for navigation menu
            }}>
                {/* Title Bar */}
                <div style={{
                    background: showFrame ? '#4a3b2a' : 'transparent',
                    color: '#f8f5e3', // Keep text light? Or allow override?
                    // If transparent frame, title might be hard to read without shadow.
                    // But Title Bar has textShadow already.
                    textShadow: !showFrame ? '2px 2px 0 #000, 0 0 10px rgba(0,0,0,0.8)' : '2px 2px 0 #1a1a1a',
                    padding: '12px 0',
                    textAlign: 'center',
                    fontFamily: '"Jersey 20", sans-serif',
                    fontSize: '2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    borderBottom: showFrame ? '4px solid #f8f5e3' : 'none',
                    position: 'relative',
                    flexShrink: 0,
                    height: '60px', // Fixed height for title bar
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: '6px', // Match frame radius approx
                    borderTopRightRadius: '6px'
                }}>
                    <div style={{ position: 'absolute', left: '12px', width: '10px', height: '10px', backgroundColor: '#8b5a2b', boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.5)' }} />
                    <div style={{ position: 'absolute', right: '12px', width: '10px', height: '10px', backgroundColor: '#8b5a2b', boxShadow: 'inset 1px 1px 0 rgba(0,0,0,0.5)' }} />
                    {title || "Hollowfern"}
                </div>

                {/* Main Content Area (Viewport) */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '520px', // STRICT FIXED HEIGHT
                    // Default to dark screen, but allow override
                    backgroundColor: '#111',
                    imageRendering: 'pixelated',
                    overflow: 'hidden',
                    ...viewportStyle,
                    // height: '520px', // Ensure viewportStyle doesn't override height if we really want consistency, but let's allow it to be safe for now, but user said "independent of text". 
                    // Actually, to force consistency, I should probably enforce this height. 
                    // However, let's keep the spread but define height AFTER it to override? 
                    // No, let's respect custom style if passed, but typically we want 520px. 
                    // The user said "size of image and frame consistent".
                }}>
                    {children}
                </div>

                {/* Footer/Description Area */}
                {footerContent && (
                    <div style={{
                        background: '#f8f5e3',
                        color: '#1a1a1a',
                        padding: '1.5rem',
                        fontFamily: '"Jersey 20", sans-serif',
                        borderTop: '4px solid #4a3b2a',
                        flexShrink: 0,
                        height: footerHeight, // Use prop
                        overflowY: 'auto', // Scroll if text is long
                        display: 'flex',
                        flexDirection: 'column',
                        borderBottomLeftRadius: '6px', // Match frame radius approx
                        borderBottomRightRadius: '6px'
                    }}>
                        {footerContent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameFrame;
