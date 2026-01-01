import React, { useState } from 'react';
import GameFrame from './GameFrame';
import TypewriterText from './TypewriterText';

/**
 * HouseScene – a dialogue scene describing the house and key discovery.
 * This component follows the same pattern as other narrative scenes in the game.
 */
const HouseScene = ({ onComplete }) => {
    const [forceShow, setForceShow] = useState(false);

    const narrative = `The house is just as you remember it. Weathered, white clapboard siding with a small, wraparound porch and two mismatched rocking chairs. Faint metallic clinks coming from the hanging wind chime, you spot the old planter by the back door where the spare key is tucked.

You crouch down, brush away a few dry leaves, and lift it.

The key’s right where Rose said it would be, tucked beneath the cracked saucer, cold and familiar in your hand.

The door opens like it remembers you. A little stiff. A little stubborn.

You step inside.`;

    const handleGlobalClick = () => {
        if (!forceShow) setForceShow(true);
    };

    return (
        <GameFrame
            onClick={handleGlobalClick}
            title="The House"
            viewportStyle={{ background: '#f8f5e3', height: '470px' }}
            footerHeight="250px"
            footerContent={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', height: '100%' }}>
                    <div style={{ padding: '0 1rem', fontFamily: '"Jersey 20", sans-serif', fontSize: '1.2rem', color: '#1a1a1a' }}>
                        <div style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                            (Click anywhere to skip)
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                        <button
                            onClick={onComplete}
                            style={{
                                background: '#2e5c2e',
                                color: '#f8f5e3',
                                border: '2px solid #1a2f1a',
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.4rem',
                                padding: '8px 25px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 0 #1a2f1a',
                                borderRadius: '8px'
                            }}
                        >
                            Enter
                        </button>
                    </div>
                </div>
            }
        >
            <TypewriterText text={narrative} onComplete={onComplete} forceShow={forceShow} />
        </GameFrame>
    );
};

export default HouseScene;
