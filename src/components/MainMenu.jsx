import React, { useState } from 'react';
import GameFrame from './GameFrame';

const MainMenu = ({ onNewGame, onLoadGame, hasSave, saveMetadata, audioSettings, setAudioSettings }) => {
    const getFormattedDate = () => {
        const now = new Date();
        return now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const [showSaveInput, setShowSaveInput] = useState(false);
    const [saveName, setSaveName] = useState(getFormattedDate());

    const [showSavedMessage, setShowSavedMessage] = useState(false);

    const handleSave = () => {
        setShowSaveInput(false);
        setShowSavedMessage(true);
    };

    const handleStartNewGame = () => {
        setSaveName(getFormattedDate());
        setShowSaveInput(true);
    };

    const handleProceed = () => {
        onNewGame(saveName || 'Untitled Journey');
    };

    // Play Main Menu Music
    React.useEffect(() => {
        const audio = new Audio(import.meta.env.BASE_URL + 'assets/audio/menu.ogg');
        audio.loop = true;

        // Initial volume set
        audio.volume = audioSettings.muted ? 0 : audioSettings.volume * 0.8; // 0.8 as base relative to master

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio autoplay prevented by browser policy:", error);
            });
        }

        window._mainMenuAudio = audio;

        return () => {
            audio.pause();
            audio.currentTime = 0;
            delete window._mainMenuAudio;
        };
    }, []); // Run once on mount

    // Update volume when settings change
    React.useEffect(() => {
        if (window._mainMenuAudio) {
            window._mainMenuAudio.volume = audioSettings.muted ? 0 : audioSettings.volume * 0.8;
        }
    }, [audioSettings]);

    return (
        <GameFrame
            title=" " // Hide title text
            outerBackground={import.meta.env.BASE_URL + 'assets/ui/main_menu_bg_v2.jpg'} // Updated with user provided image
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
                {/* Decorative Frame Container */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '450px',
                    padding: '3rem 4rem',
                    backgroundColor: '#f8f5e3', // Solid beige background
                    border: '4px solid #8b5a2b', // Simple brown border
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    {!showSaveInput && !showSavedMessage ? (
                        <>
                            {hasSave ? (
                                <>
                                    {/* Load Game Button (Primary) */}
                                    <button
                                        onClick={onLoadGame}
                                        style={{
                                            background: '#b55239',
                                            border: '4px double #8b3a26',
                                            color: '#fff',
                                            fontFamily: '"Jersey 20", sans-serif',
                                            fontSize: '1.8rem',
                                            padding: '1rem 2rem',
                                            cursor: 'pointer',
                                            width: '100%',
                                            transition: 'all 0.2s',
                                            borderRadius: '10px',
                                            textTransform: 'uppercase',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.2rem',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        <span style={{ fontSize: '1.6rem' }}>Continue Journey</span>

                                    </button>

                                    {/* New Game Button (Secondary) */}
                                    <button
                                        onClick={handleStartNewGame}
                                        style={{
                                            background: '#2e5c2e',
                                            border: '4px double #1a2f1a',
                                            color: '#fff',
                                            fontFamily: '"Jersey 20", sans-serif',
                                            fontSize: '1.8rem',
                                            padding: '1rem 2rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textTransform: 'uppercase',
                                            width: '100%',
                                            borderRadius: '10px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        New Game File
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* New Game Button (Primary) */}
                                    <button
                                        onClick={handleStartNewGame}
                                        style={{
                                            background: '#2e5c2e',
                                            border: '4px double #1a2f1a',
                                            color: '#fff',
                                            fontFamily: '"Jersey 20", sans-serif',
                                            fontSize: '1.8rem',
                                            padding: '1rem 2rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                            textTransform: 'uppercase',
                                            width: '100%',
                                            borderRadius: '10px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        New Game File
                                    </button>

                                    {/* Load Game Button (Enabled but effectively no-op if no save) */}
                                    <button
                                        onClick={onLoadGame}
                                        style={{
                                            background: '#b55239',
                                            border: '4px double #8b3a26',
                                            color: '#fff',
                                            fontFamily: '"Jersey 20", sans-serif',
                                            fontSize: '1.8rem',
                                            padding: '1rem 2rem',
                                            cursor: 'pointer',
                                            width: '100%',
                                            transition: 'all 0.2s',
                                            borderRadius: '10px',
                                            textTransform: 'uppercase',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.2rem'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                    >
                                        <span style={{ fontSize: '1.6rem' }}>Load Game</span>
                                    </button>
                                </>
                            )}
                        </>
                    ) : showSavedMessage ? (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                            <div style={{
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '2rem',
                                color: '#5e3a18',
                                textTransform: 'uppercase',
                                borderBottom: '2px solid #8b5a2b',
                                paddingBottom: '0.5rem'
                            }}>
                                File Saved
                            </div>

                            <button
                                onClick={handleProceed}
                                style={{
                                    background: '#2e5c2e',
                                    border: '2px solid #1a2f1a',
                                    color: '#f8f5e3',
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.6rem',
                                    padding: '10px 30px',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Start Game
                            </button>
                        </div>
                    ) : (
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <label style={{
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.4rem',
                                color: '#5e3a18',
                                textTransform: 'uppercase'
                            }}>
                                Name Your Save File
                            </label>
                            <input
                                type="text"
                                value={saveName}
                                onChange={(e) => setSaveName(e.target.value)}
                                placeholder="E.g. The First Night"
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    fontSize: '1.2rem',
                                    fontFamily: '"Jersey 20", sans-serif',
                                    border: '2px solid #8b5a2b',
                                    borderRadius: '5px',
                                    background: '#fff9e6',
                                    color: '#2e2620'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: '0.5rem' }}>
                                <button
                                    onClick={() => setShowSaveInput(false)}
                                    style={{
                                        flex: 1,
                                        background: '#a09d8f',
                                        border: '2px solid #78756a',
                                        color: '#fff',
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.2rem',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    style={{
                                        flex: 1,
                                        background: '#b55239',
                                        border: '2px solid #8b3a26',
                                        color: '#fff',
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.2rem',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </GameFrame>
    );
};

export default MainMenu;
