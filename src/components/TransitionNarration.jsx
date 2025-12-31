import React from 'react';
import GameFrame from './GameFrame';

const TransitionNarration = ({ onComplete }) => {
    return (
        <GameFrame
            title="Arrival"
            outerBackground='/assets/forest_bg.png'
            viewportStyle={{
                backgroundImage: `url('/assets/train_interior.png')`,
                backgroundSize: '110% 110%',
                backgroundPosition: 'center',
                height: '500px'
            }}
            footerContent={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
                    <button
                        onClick={onComplete}
                        style={{
                            background: '#2e5c2e',
                            color: '#f8f5e3',
                            border: '2px solid #1a2f1a',
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.6rem',
                            padding: '12px 32px',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 0 #1a2f1a',
                            borderRadius: '8px'
                        }}
                    >
                        Enter House
                    </button>
                </div>
            }
        >
            {/* Empty viewport content - just the background image controlled by viewportStyle */}
        </GameFrame>
    );
};

export default TransitionNarration;
