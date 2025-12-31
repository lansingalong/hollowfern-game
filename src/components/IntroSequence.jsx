import React, { useState } from 'react';
import GameFrame from './GameFrame';
import TypewriterText from './TypewriterText';

const INTRO_STEPS = [
    {
        type: 'description',
        text: "[Interior of a dim train car. Early morning light flickers through the window. Someone left the window open a bit too long and the outside air smells like moss and rusted metal. You see thick pine groves and hills that grow sharper.]",
        bg: '/assets/train_interior.png',
        bgAudio: '/assets/train_ambience.mp3'
    },
    {
        text: "You know this stretch. You counted these bends on the ride home from school. Back when you used to press your forehead to the glass and try to guess which turn came next.",
        bg: '/assets/train_interior.png'
    },
    {
        text: "You put away your phone and reach into your coat pocket. There's an envelope in there you've been meaning to open.",
        bg: '/assets/train_interior.png'
    },
    {
        type: 'letter',
        text: "Your grandmother, Verna, passed away early Sunday morning. Peacefully, in her chair by the window. The funeral is Wednesday. Two o’clock. The chapel on Bell Hollow still stands. I thought you should know. I left the spare key under the planter by the back door—same as always. You’re welcome to stay at the house, if that feels right.",
        bg: '/assets/train_interior.png'
    },
    {
        type: 'description',
        text: "[The window fogs slightly. A sign on a wooden board past: HOLLOWFERN – NEXT STOP.]",
        bg: '/assets/train_interior.png'
    },
    {
        text: "You briefly remember Rose mentioning the white asters and how they bloomed out of season. Your grandma’s lakeside garden nursery was quiet, half wild. You used to pick things for the kitchen table and she’d always smile warmly and tell you about what you picked. You wonder briefly if the house smells the same. If her old radio still plays that one station out of the valley. If she still had the old quilt you loved to snuggle in so much as a kid.",
        bg: '/assets/train_interior.png'
    },
    {
        type: 'description',
        text: "[The train begins to slow. The platform comes into view—faded wood, pine needles in the cracks.]",
        bg: '/assets/train_interior.png'
    },
    {
        text: "You hear soft static, then a low voice come over the overhead speaker:\n\n*This is Hollowfern Station. If this is your stop, please watch your step.*",
        bg: '/assets/train_interior.png'
    },
    {
        text: "The first thing you notice is the quiet.\n\nNot silence, just quiet. The kind that settles in after something leaves, but before anything else begins.",
        bg: '/assets/train_interior.png'
    },
    {
        text: "You step down onto the platform. The wooden planks ease beneath your boots, softened by weather and time but still solid. Someone’s kept them up, sanded smooth in places, a fresh stain here and there. Like the platform remembers being cared for. To your left, the bulletin board leans gently in its frame. The flyers are yellowed but tidy. One for a play, another for a lost cat. Someone’s underlined “missing” in fresh ink.",
        bg: '/assets/train_interior.png'
    },
    {
        text: "The rail sings low behind you as the train pulls away, metal on metal, fading into pine and fog. The air smells like wet cedar, iron, and wildflowers just past bloom. A crow calls from somewhere above. It all still smells and sounds like you remembered it, but more worn.",
        bg: '/assets/train_interior.png'
    },
    {
        text: "You catch your reflection in the window of the station office...muted, hazy around the edges.\n\nYou don’t look like you did back then. But you still know this face.\n\n\"How do you look like now?\"",
        bg: '/assets/train_interior.png', // Transition to char creation
        sfx: '/assets/leaves_crunch.mp3',
        stopBgAudio: true
    }
];

const IntroSequence = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [forceShow, setForceShow] = useState(false);
    const bgAudioRef = React.useRef(null);
    const sfxAudioRef = React.useRef(null);

    // Reset skip state when step changes
    React.useEffect(() => {
        setForceShow(false);
    }, [step]);

    const handleGlobalClick = () => {
        if (!forceShow) {
            setForceShow(true);
        }
    };

    React.useEffect(() => {
        const currentData = INTRO_STEPS[step];

        // Handle Background Audio
        if (currentData.bgAudio) {
            if (!bgAudioRef.current || bgAudioRef.current.src !== window.location.origin + currentData.bgAudio) {
                if (bgAudioRef.current) {
                    bgAudioRef.current.pause();
                }
                bgAudioRef.current = new Audio(currentData.bgAudio);
                bgAudioRef.current.loop = true;
                bgAudioRef.current.volume = 0.5;
                bgAudioRef.current.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
            }
        } else if (currentData.stopBgAudio && bgAudioRef.current) {
            bgAudioRef.current.pause();
            bgAudioRef.current = null;
        }

        // Handle SFX
        if (currentData.sfx) {
            if (sfxAudioRef.current) {
                sfxAudioRef.current.pause();
                sfxAudioRef.current = null;
            }
            sfxAudioRef.current = new Audio(currentData.sfx);
            sfxAudioRef.current.volume = 0.8;
            sfxAudioRef.current.play().catch(e => console.log("SFX play failed:", e));
        }

        // Cleanup on unmount
        return () => {
            if (step === INTRO_STEPS.length - 1) {
                // Don't kill bg audio if we are just moving to next step, only if unmounting completely 
            }
        };
    }, [step]);

    // Cleanup on component unmount
    React.useEffect(() => {
        return () => {
            if (bgAudioRef.current) bgAudioRef.current.pause();
            if (sfxAudioRef.current) sfxAudioRef.current.pause();
        };
    }, []);

    const handleNext = () => {
        if (step < INTRO_STEPS.length - 1) {
            setStep(step + 1);
        } else {
            if (bgAudioRef.current) bgAudioRef.current.pause(); // Ensure audio stops when sequence completes
            onComplete();
        }
    };

    const currentData = INTRO_STEPS[step];
    const isLetter = currentData.type === 'letter';

    // Title Logic
    const getTitle = () => {
        if (isLetter) return "A Letter from Rose";
        if (step === 0) return "Prologue";
        if (step >= 6) return "Hollowfern Station";
        return "The Ride Home";
    };

    return (
        <div style={{ width: '100%', height: '100%' }} onClick={handleGlobalClick}>
            <GameFrame
                title={getTitle()}
                outerBackground='/assets/forest_bg.png'
                viewportStyle={{
                    backgroundColor: '#111',
                    // For non-letter steps, we handle background in the content or shared container style
                    // actually, let's keep the bg image in the style if it's not overridden by children
                    backgroundImage: `url(${currentData.bg})`,
                    backgroundSize: '110% 110%',
                    backgroundPosition: 'center',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'visible', // Allow overlap into footer
                    zIndex: 10 // Ensure on top of footer
                }}
                footerContent={
                    // If description or letter, we render an empty div to keep the frame size/shape
                    (currentData.type === 'description' || isLetter) ? <div /> : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                            <TypewriterText
                                key={step} // Force reset on step change
                                text={currentData.text}
                                speed={20}
                                forceShow={forceShow}
                                style={{
                                    margin: 0,
                                    fontSize: '1.4rem',
                                    lineHeight: '1.4',
                                    color: '#1a1a1a',
                                    whiteSpace: 'pre-line' // matches original
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button
                                    onClick={handleNext}
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
                                    Next
                                </button>
                            </div>
                        </div>
                    )
                }
            >
                {/* Viewport Content */}

                {/* Case 1: Letter */}
                {isLetter && (
                    <div style={{
                        position: 'absolute',
                        bottom: '-260px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 10
                    }}>
                        <div className="letter-paper" style={{
                            background: '#fdfbf7',
                            color: '#2c2c2c',
                            padding: '3rem',
                            maxWidth: '500px',
                            width: '90%',
                            fontFamily: '"Homemade Apple", cursive',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            transform: 'rotate(-1deg)',
                            transformOrigin: 'top center', // Unfold from top
                            animation: 'unfoldLetter 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                            position: 'relative',
                            borderRadius: '2px'
                        }}>
                            <TypewriterText
                                key={step}
                                text={currentData.text}
                                speed={25}
                                forceShow={forceShow}
                                style={{
                                    fontSize: '1.4rem',
                                    lineHeight: '2',
                                    marginBottom: '1.5rem',
                                    whiteSpace: 'pre-wrap' // Letter needs pre-wrap
                                }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={handleNext}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #8b4513',
                                        color: '#8b4513',
                                        padding: '8px 16px',
                                        fontFamily: '"Homemade Apple", cursive',
                                        fontSize: '1.1rem',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Fold & Put Away
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Case 2: Description (Black Box) */}
                {currentData.type === 'description' && (
                    <div style={{
                        maxWidth: '1000px',
                        width: '90%',
                        background: '#0d0d0d', // Very dark gray/black
                        border: '4px double #5c5c5c', // Steel gray double border
                        padding: '2rem',
                        boxShadow: '0 8px 0 rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.8)',
                        position: 'absolute', // Absolute positioning for overlap
                        bottom: '-280px', // Push down to bottom of footer (300px height)
                        left: '50%',
                        transform: 'translateX(-50%)',
                        borderRadius: '15px',
                        zIndex: 20 // Higher than frame elements
                    }}>
                        <TypewriterText
                            key={step}
                            text={currentData.text}
                            speed={20}
                            forceShow={forceShow}
                            style={{
                                fontSize: '1.5rem',
                                lineHeight: '1.6',
                                marginBottom: '2rem',
                                color: '#b0b0b0',
                                fontFamily: '"Jersey 20", sans-serif',
                                letterSpacing: '0.5px'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleNext}
                                style={{
                                    background: '#1a1a1a',
                                    color: '#b0b0b0',
                                    border: '2px solid #5c5c5c',
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.3rem',
                                    padding: '8px 20px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 0 #5c5c5c',
                                    borderRadius: '8px'
                                }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

            </GameFrame>
        </div>
    );
};

export default IntroSequence;
