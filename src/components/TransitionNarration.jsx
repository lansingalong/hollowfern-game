import React from 'react';

const TransitionNarration = ({ onComplete }) => {
    return (
        <div className="scene-container intro-sequence" style={{
            backgroundImage: `url('/assets/train_interior.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: '4rem',
            transition: 'all 0.5s ease'
        }}>
            <div style={{
                maxWidth: '800px',
                width: '90%',
                background: '#f8f5e3', // Beige white
                border: '4px double #2e5c2e', // Ornate green
                padding: '2rem',
                boxShadow: '0 8px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.5)',
                imageRendering: 'pixelated',
                position: 'relative',
                borderRadius: '15px',
                display: 'flex',
                justifyContent: 'center'
            }}>
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
                    Enter House
                </button>
            </div>
        </div>
    );
};

export default TransitionNarration;
