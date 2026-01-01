import React, { useState } from 'react';
import GameFrame from './GameFrame';
import TypewriterText from './TypewriterText';

const TransitionNarration = ({ onComplete }) => {
    const [forceShow, setForceShow] = useState(false);

    const text = "You adjust your clothing, catching your reflection one last time. Your hand brushes something in your pocket: small, familiar, like it’s been there a while.\n\nYou hadn’t noticed it before. There’s something in your pocket. You reach in, and see…";

    return (
        <GameFrame
            title="The Arrival"
            outerBackground={import.meta.env.BASE_URL + 'assets/forest_bg.png'}
            viewportStyle={{
                backgroundImage: `url(${import.meta.env.BASE_URL}assets/train_interior.png)`,
                backgroundSize: '110% 110%',
                backgroundPosition: 'center',
                height: '500px'
            }}
            viewportContent={
                // Overlay simply to catch clicks if needed, though Global frame click works too
                <div
                    style={{ width: '100%', height: '100%' }}
                    onClick={() => !forceShow && setForceShow(true)}
                />
            }
            footerContent={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%' }}>
                    <TypewriterText
                        text={text}
                        speed={20}
                        forceShow={forceShow}
                        style={{
                            margin: 0,
                            fontSize: '1.4rem',
                            lineHeight: '1.4',
                            color: '#1a1a1a',
                            whiteSpace: 'pre-line'
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                        <button
                            onClick={onComplete}
                            style={{
                                background: '#2e5c2e',
                                color: '#f8f5e3',
                                border: '2px solid #1a2f1a',
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.4rem',
                                padding: '8px 20px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 0 #1a2f1a',
                                borderRadius: '8px'
                            }}
                        >
                            See what it is
                        </button>
                    </div>
                </div>
            }
        >
        </GameFrame>
    );
};

export default TransitionNarration;
