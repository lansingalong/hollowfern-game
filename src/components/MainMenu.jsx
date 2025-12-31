import React from 'react';
import GameFrame from './GameFrame';

const MainMenu = ({ onNewGame, onLoadGame, hasSave }) => {
    return (
        <GameFrame
            title=" " // Hide title text
            outerBackground="/assets/ui/main_menu_bg.jpg" // Updated main menu background
            enableTint={false}
            showFrame={false}
            viewportStyle={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2rem'
            }}
            footerHeight="0" // No footer needed really, or minimal
            footerContent={null}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem',
                padding: '2rem'
            }}>
                {/* Decorative Icon or Logo Placeholder */}
                <div style={{
                    fontSize: '4rem',
                    color: '#2e5c2e',
                    fontFamily: '"Jersey 20", sans-serif',
                    marginBottom: '1rem',
                    textShadow: '2px 2px 0 rgba(0,0,0,0.1)'
                }}>
                    ❦
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '300px'
                }}>
                    <button
                        onClick={onNewGame}
                        style={{
                            background: '#b55239',
                            border: '4px double #8b3a26',
                            color: '#fff',
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.8rem',
                            padding: '1rem 2rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                            textTransform: 'uppercase',
                            width: '100%'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        New Game File
                    </button>

                    {/* Load Game Button - Visual update */}
                    <button
                        onClick={hasSave ? onLoadGame : undefined}
                        disabled={!hasSave}
                        style={{
                            background: hasSave ? '#a09d8f' : '#555',
                            border: hasSave ? '4px double #78756a' : '4px double #333',
                            color: hasSave ? '#e0ddcf' : '#888',
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.8rem',
                            padding: '1rem 2rem',
                            cursor: hasSave ? 'pointer' : 'not-allowed',
                            width: '100%',
                            opacity: hasSave ? 1 : 0.6,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => hasSave && (e.target.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => hasSave && (e.target.style.transform = 'scale(1)')}
                    >
                        {hasSave ? "Continue Journey" : "Load Game"}
                    </button>
                </div>
            </div>
        </GameFrame>
    );
};

export default MainMenu;
