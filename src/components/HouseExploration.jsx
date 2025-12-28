import React, { useState } from 'react';

const ROOMS = {
    PORCH: {
        id: 'PORCH',
        name: 'Front Porch',
        desc: 'The wooden boards are gray with age. To your left, the old swing bench hangs by rusted chains. The front yard is a tangle of overgrown ivy and rhododendrons.',
        img: '/assets/house_exterior.png',
        connections: ['SITTING_ROOM']
    },
    KITCHEN: {
        id: 'KITCHEN',
        name: 'Kitchen',
        desc: 'Stone tile floor, smoothed with time. Hanging bunches of dried herbs. A cast iron kettle always on the stove.',
        img: '/assets/kitchen.png',
        connections: ['SITTING_ROOM', 'BACK_NOOK']
    },
    SITTING_ROOM: {
        id: 'SITTING_ROOM',
        name: 'Sitting Room',
        desc: 'A framed black-and-white photo on the mantle. Fireplace burnt low. A velvet armchair with indentations like someone just got up.',
        img: '/assets/sitting_room.png',
        connections: ['PORCH', 'KITCHEN', 'HALLWAY']
    },
    HALLWAY: {
        id: 'HALLWAY',
        name: 'Hallway',
        desc: 'Family photographs—some with faces faded. A window that doesn’t open but lets in long rays of light.',
        img: '/assets/hallway.png',
        connections: ['SITTING_ROOM', 'BEDROOM']
    },
    BEDROOM: {
        id: 'BEDROOM',
        name: 'Bedroom',
        desc: 'Canopy bed with layered quilts. A trunk at the foot of the bed with childhood toys.',
        img: '/assets/bedroom.png',
        connections: ['HALLWAY', 'BACK_NOOK']
    },
    BACK_NOOK: {
        id: 'BACK_NOOK',
        name: 'Back Nook / Garden Access',
        desc: 'Screen door leads to a fenced garden with stone steps and wild flowers.',
        img: '/assets/garden_access.png',
        connections: ['KITCHEN', 'BEDROOM'] // Simplified logic
    }
};

const PORCH_INTERACTIONS = [
    { id: 1, x: 53, y: 21, text: "Herb bundles hanging to dry under the eaves" },
    { id: 2, x: 41, y: 53, text: "An old rocking chair with a woven throw" },
    { id: 3, x: 97, y: 80, text: "Crate with old fishing boots in it and bundles of firewood sticks by the door." }
];

const HouseExploration = ({ playerData }) => {
    const [currentRoom, setCurrentRoom] = useState(ROOMS.PORCH);
    const [activeDialogue, setActiveDialogue] = useState(null);

    const handleMove = (roomId) => {
        setCurrentRoom(ROOMS[roomId]);
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('interaction-point')) return;

        // Get the bounding rectangle of the target (the container)
        const rect = e.currentTarget.getBoundingClientRect();

        // Calculate x and y relative to the element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Convert to percentages
        const xPercent = Math.round((x / rect.width) * 100);
        const yPercent = Math.round((y / rect.height) * 100);

        console.log(`CLICK COORDS: Top: ${yPercent}%, Left: ${xPercent}%`);
    };

    return (
        <div
            className="scene-container house-exploration"
            onClick={handleBackgroundClick}
            style={{
                backgroundImage: `url(${currentRoom.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
                position: 'relative' // relative positioning for absolute children
            }}>

            {/* Dialogue Overlay */}
            {activeDialogue && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 20
                }} onClick={() => setActiveDialogue(null)}>
                    <div style={{
                        background: '#f8f5e3',
                        border: '4px double #2e5c2e',
                        padding: '2rem',
                        maxWidth: '500px',
                        borderRadius: '12px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <p style={{
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.5rem',
                            color: '#1a2f1a',
                            lineHeight: '1.4',
                            marginBottom: '1.5rem'
                        }}>{activeDialogue}</p>
                        <button
                            onClick={() => setActiveDialogue(null)}
                            style={{
                                background: '#2e5c2e',
                                color: '#f8f5e3',
                                border: 'none',
                                padding: '8px 16px',
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                float: 'right'
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Clickable Areas Overlay for Front Porch */}
            {currentRoom.id === 'PORCH' && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none' // Let clicks pass through to underneath elements unless hit by a child
                }}>
                    {PORCH_INTERACTIONS.map(point => (
                        <div
                            key={point.id}
                            className="interaction-point"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveDialogue(point.text);
                            }}
                            style={{
                                top: `${point.y}%`,
                                left: `${point.x}%`,
                                pointerEvents: 'auto'
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="glass-panel" style={{ padding: '1rem', display: 'inline-block', alignSelf: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-accent)' }}>{currentRoom.name}</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>Playing as: {playerData.name} ({playerData.profession})</p>
            </div>

            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                width: '100%',
                background: '#f8f5e3', // Beige white
                border: '4px double #2e5c2e', // Ornate green
                padding: '2rem',
                boxShadow: '0 8px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.5)',
                imageRendering: 'pixelated',
                borderRadius: '15px',
                position: 'relative'
            }}>
                {/* Hide description for PORCH */}
                {currentRoom.id !== 'PORCH' && (
                    <p style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.5',
                        marginBottom: '2rem',
                        color: '#1a2f1a', // Dark pine green text
                        fontFamily: '"Jersey 20", sans-serif',
                        letterSpacing: '0.5px'
                    }}>{currentRoom.desc}</p>
                )}

                <div className="navigation" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {currentRoom.connections.map(destId => (
                        <button
                            key={destId}
                            onClick={() => handleMove(destId)}
                            style={{
                                background: '#2e5c2e',
                                color: '#f8f5e3',
                                border: '2px solid #1a2f1a',
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.2rem',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                boxShadow: '0 4px 0 #1a2f1a',
                                borderRadius: '8px'
                            }}
                        >
                            {currentRoom.id === 'PORCH' && destId === 'SITTING_ROOM' ? 'Enter House' : `Go to ${ROOMS[destId].name}`}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HouseExploration;
