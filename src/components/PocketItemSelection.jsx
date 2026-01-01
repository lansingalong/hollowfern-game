import React, { useState } from 'react';
import GameFrame from './GameFrame';

const POCKET_ITEMS = [
    {
        id: 'lighter',
        label: 'Brass Lighter',
        desc: "A brass lighter, worn smooth from years of use. It doesn’t spark anymore, but you still flick it sometimes, just for the sound. It smells like old campfires, gasoline and someone you haven’t talked to in a long time.",
        image: import.meta.env.BASE_URL + 'assets/pocket-items/lighter.png'
    },
    {
        id: 'eye',
        label: 'Googly Eye',
        desc: "A single googly eye, loose and slightly scratched. You’re not sure where it came from, or what it used to belong to. But it’s been in your pocket for a while now, staring up at you like it knows something you don’t.",
        image: import.meta.env.BASE_URL + 'assets/pocket-items/eye.png'
    },
    {
        id: 'ticket',
        label: 'Train Ticket',
        desc: "A train ticket, soft at the edges and folded in half from a while ago. The ink’s faded, but the destination’s still legible. You don’t remember the ride as much as the moment before it, standing on the platform, deciding to go.",
        image: import.meta.env.BASE_URL + 'assets/pocket-items/ticket.png'
    },
    {
        id: 'charm',
        label: 'Monster Charm',
        desc: "A small plastic charm shaped like a little monster with stubby horns and a snaggletooth grin. It used to hang from your backpack in school. You kept it through three moves, two heartbreaks, and every time you swore you were finally getting organized.",
        image: import.meta.env.BASE_URL + 'assets/pocket-items/charm.png'
    },
    {
        id: 'eraser',
        label: 'Taco Eraser',
        desc: "A novelty eraser shaped like a taco, slightly smudged. It doesn’t erase anything well, but you respect the commitment to the bit. You thought about getting rid of it but it remains to have a permanent spot in your pencil case. You’ve never seen another one quite like it.",
        image: import.meta.env.BASE_URL + 'assets/pocket-items/taco.png'
    },
    {
        id: 'coin',
        label: 'Silver Coin',
        desc: "An old silver coin stamped with a crest worn smooth by time. It’s heavier than it looks, you found it in the locker room of the old field house, wedged behind a bench. You never let it decide anything. You just like the illusion of chance, it makes every choice feel like part of a bigger story.",
        image: import.meta.env.BASE_URL + 'assets/pocket-items/coin.png'
    }
];

const PocketItemSelection = ({ onComplete }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleConfirm = () => {
        if (selectedId) {
            const item = POCKET_ITEMS.find(i => i.id === selectedId);
            onComplete(item);
        }
    };

    const selectedItem = POCKET_ITEMS.find(i => i.id === selectedId);

    return (
        <GameFrame
            title="EXAMINE OBJECT"
            outerBackground={import.meta.env.BASE_URL + 'assets/ui/character_creation_bg.jpg'}
            viewportStyle={{
                backgroundImage: `url(${import.meta.env.BASE_URL}assets/ui/blue_pattern_bg.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)', // Restored depth
                height: '470px'
            }}
            titleStyle={{
                borderBottom: 'none'
            }}
            footerStyle={{
                borderTop: 'none'
            }}
            footerHeight="250px"
            footerContent={
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, overflowY: 'hidden', marginBottom: '0.5rem' }}>
                        {selectedItem ? (
                            <div style={{ animation: 'fadeIn 0.3s' }}>
                                <p style={{
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.2rem',
                                    margin: 0,
                                    lineHeight: '1.3',
                                    color: '#2c2c2c'
                                }}>
                                    {selectedItem.desc}
                                </p>
                            </div>
                        ) : null}
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', paddingTop: '0.5rem' }}>
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedId}
                            style={{
                                background: !selectedId ? '#666' : '#2e5c2e',
                                color: '#f8f5e3',
                                border: !selectedId ? 'none' : '2px solid #1a2f1a',
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.4rem',
                                padding: '8px 24px',
                                cursor: !selectedId ? 'not-allowed' : 'pointer',
                                textTransform: 'uppercase',
                                boxShadow: !selectedId ? 'none' : '0 4px 0 #1a2f1a',
                                borderRadius: '8px',
                                opacity: !selectedId ? 0.7 : 1,
                                transition: 'all 0.2s'
                            }}
                        >
                            Keep This
                        </button>
                    </div>
                </div>
            }
        >
            <div style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'nowrap',
                gap: '1rem',
                padding: '1rem 1rem 2rem 1rem', // Balanced padding
                maxWidth: '1050px',
                margin: '0 auto'
            }}>
                {POCKET_ITEMS.map(item => {
                    const isSelected = selectedId === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            style={{
                                width: '150px',
                                aspectRatio: '1',
                                background: '#fdfbf7',
                                border: isSelected ? '3px solid #b55239' : '3px solid #a09d8f',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5rem',
                                boxShadow: isSelected ? '0 0 0 2px #b55239' : '0 2px 4px rgba(0,0,0,0.1)',
                                transform: 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            <img
                                src={item.image}
                                alt={item.label}
                                style={{
                                    width: '80%',
                                    height: '80%',
                                    objectFit: 'contain',
                                    imageRendering: 'pixelated',
                                    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.2))'
                                }}
                            />
                            <span style={{
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1rem',
                                color: '#2c2c2c',
                                textAlign: 'center',
                                lineHeight: '1.1'
                            }}>
                                {item.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </GameFrame>
    );
};

export default PocketItemSelection;
