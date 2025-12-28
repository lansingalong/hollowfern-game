import React, { useState } from 'react';

const INTRO_STEPS = [
    {
        type: 'description',
        text: "[Interior of a dim train car. Early evening light flickers through the window. Someone left the window open a bit too long, and the outside the air smells like moss and rusted metal. You see thick pine groves and hills that grow sharper.]",
        bg: '/assets/train_interior.png',
        bgAudio: '/assets/train_ambience.mp3'
    },
    {
        text: "You know this stretch. You counted these bends on the ride home from school. Back when you used to press your forehead to the glass and try to guess which turn came next.",
        bg: '/assets/train_interior.png'
    },
    {
        text: "You’ve read the letter twice. Once when it arrived. Once more since you boarded the train. You don’t need to read it again. You can still hear Rose’s handwriting in your head.",
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
        text: "You briefly remember Rose mentioning the white asters and how they bloomed out of season.\n\nThe lakeside nursery grandma built was quiet, half-wild and full of botanical names you never asked her to repeat. You used to pick things for the kitchen table and she’d always smile warmly and tell you about what you picked. Grandma always had a way with that place.\n\nYou wonder briefly if the house smells the same. If her old radio still plays that one station out of the valley. If she still had the old quilt you loved to snuggle in so much as a kid.",
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
    const bgAudioRef = React.useRef(null);
    const sfxAudioRef = React.useRef(null);

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
                // BUT here we want to persist if the next step needs it.
                // Simplified: The effect runs on every step change.
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

    return (
        <div className="scene-container intro-sequence" style={{
            backgroundImage: `url(${currentData.bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: currentData.type === 'letter' ? 'center' : 'flex-end',
            alignItems: 'center',
            paddingBottom: currentData.type === 'letter' ? '0' : '4rem',
            transition: 'all 0.5s ease'
        }}>
            {currentData.type === 'letter' ? (
                <div className="letter-paper" style={{
                    background: '#fdfbf7',
                    color: '#2c2c2c',
                    padding: '3rem',
                    maxWidth: '600px',
                    width: '90%',
                    fontFamily: '"Homemade Apple", cursive',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    transform: 'rotate(-1deg)',
                    position: 'relative',
                    borderRadius: '2px'
                }}>
                    <p style={{
                        fontSize: '1.5rem',
                        lineHeight: '2.2',
                        whiteSpace: 'pre-wrap',
                        marginBottom: '2rem'
                    }}>
                        {currentData.text}
                    </p>
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
            ) : currentData.type === 'description' ? (
                <div style={{
                    maxWidth: '800px',
                    width: '90%',
                    background: '#0d0d0d', // Very dark gray/black
                    border: '4px double #5c5c5c', // Steel gray double border
                    padding: '2rem',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.8)',
                    position: 'relative',
                    borderRadius: '15px'
                }}>
                    <p style={{
                        fontSize: '1.5rem',
                        lineHeight: '1.6',
                        marginBottom: '2rem',
                        color: '#b0b0b0', // Dim gray text
                        fontFamily: '"Jersey 20", sans-serif',
                        letterSpacing: '0.5px'
                    }}>
                        {currentData.text}
                    </p>
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
            ) : (
                <div style={{
                    maxWidth: '800px',
                    width: '90%',
                    background: '#f8f5e3', // Beige white
                    border: '4px double #2e5c2e', // Ornate green
                    padding: '2rem',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.5)',
                    imageRendering: 'pixelated',
                    position: 'relative',
                    borderRadius: '15px'
                }}>
                    <p style={{
                        fontSize: '1.6rem',
                        lineHeight: '1.5',
                        marginBottom: '2rem',
                        whiteSpace: 'pre-line', // Preserve newlines
                        color: '#1a2f1a', // Dark pine green text
                        fontFamily: '"Jersey 20", sans-serif',
                        letterSpacing: '0.5px'
                    }}>
                        {currentData.text}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
        </div >
    );
};

export default IntroSequence;
