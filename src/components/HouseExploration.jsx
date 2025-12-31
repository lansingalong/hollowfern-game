import React, { useState } from 'react';
import GameFrame from './GameFrame';
import TypewriterText from './TypewriterText';
// import NavigationMenu from './NavigationMenu'; // Component broken, using inline replacement
import Journal from './Journal'; // Disabled for debugging

const ROOMS = {
    PORCH: {
        id: 'PORCH',
        name: 'Front Porch',
        desc: 'The wooden boards are gray with age. To your left, the old swing bench hangs by rusted chains. The front yard is a tangle of overgrown ivy and rhododendrons.',
        img: 'assets/house_exterior.png',
        connections: ['SITTING_ROOM']
    },
    KITCHEN: {
        id: 'KITCHEN',
        name: 'Kitchen',
        desc: 'Stone tile floor, smoothed with time. Hanging bunches of dried herbs. A cast iron kettle always on the stove.',
        img: 'assets/kitchen.png',
        connections: ['SITTING_ROOM', 'BACK_NOOK']
    },
    SITTING_ROOM: {
        id: 'SITTING_ROOM',
        name: 'Sitting Room',
        desc: 'A framed black-and-white photo on the mantle. Fireplace burnt low. A velvet armchair with indentations like someone just got up.',
        img: 'assets/sitting_room.png',
        connections: ['PORCH', 'KITCHEN', 'HALLWAY']
    },
    HALLWAY: {
        id: 'HALLWAY',
        name: 'Hallway',
        desc: 'Family photographs—some with faces faded. A window that doesn’t open but lets in long rays of light.',
        img: 'assets/hallway.png',
        connections: ['SITTING_ROOM', 'BEDROOM', 'SECRET_CLOSET']
    },
    BEDROOM: {
        id: 'BEDROOM',
        name: 'Bedroom',
        desc: 'Canopy bed with layered quilts. A trunk at the foot of the bed with childhood toys.',
        img: 'assets/bedroom.png',
        connections: ['HALLWAY', 'BACK_NOOK']
    },
    BACK_NOOK: {
        id: 'BACK_NOOK',
        name: 'Back Nook / Garden Access',
        desc: 'Screen door leads to a fenced garden with stone steps and wild flowers.',
        img: 'assets/garden_access.png',
        connections: ['KITCHEN', 'BEDROOM']
    },
    SECRET_CLOSET: {
        id: 'SECRET_CLOSET',
        name: 'Hidden Closet',
        desc: 'A cramps space behind a loose panel. It smells of cedar and secrets.',
        img: 'assets/closet.png',
        connections: ['HALLWAY']
    }
};

const PORCH_INTERACTIONS = [
    { id: 1, x: 53, y: 21, text: "Herb bundles hanging to dry under the eaves" },
    { id: 2, x: 41, y: 53, text: "An old rocking chair with a woven throw" },
    { id: 3, x: 97, y: 80, text: "Crate with old fishing boots in it and bundles of firewood sticks by the door." }
];

const KITCHEN_INTERACTIONS = [
    { id: 4, x: 75, y: 40, text: "A cast iron kettle, still warm from earlier." },
    { id: 5, x: 30, y: 25, text: "Bunches of dried rosemary and lavender hanging from the ceiling." },
    { id: 6, x: 55, y: 65, text: "Ancient stone tiles, smoothed by decades of footsteps." }
];

const SITTING_ROOM_INTERACTIONS = [
    { id: 7, x: 50, y: 45, text: "A framed black-and-white photo of a younger Rose on the mantle." },
    { id: 8, x: 80, y: 70, text: "A velvet armchair with a slight indentation, as if someone just left." },
    { id: 9, x: 25, y: 55, text: "The fireplace is cold now, but the smell of cedar wood remains." }
];

const HALLWAY_INTERACTIONS = [
    { id: 10, x: 40, y: 30, text: "A row of faded family photographs. You recognize a few faces." },
    { id: 11, x: 90, y: 40, text: "Warm rays of light stream through the high window." }
];

const BEDROOM_INTERACTIONS = [
    { id: 12, x: 50, y: 50, text: "The canopy bed is covered in layered quilts, smelling of fresh linen." },
    { id: 13, x: 20, y: 80, text: "A heavy wooden trunk at the foot of the bed, filled with old toys." }
];

const BACK_NOOK_INTERACTIONS = [
    { id: 14, x: 45, y: 35, text: "The screen door is slightly ajar, letting in a cool breeze." },
    { id: 15, x: 70, y: 60, text: "A cluster of wild flowers peaking through the garden steps." }
];

const INTERACTIONS = {
    PORCH: PORCH_INTERACTIONS,
    KITCHEN: KITCHEN_INTERACTIONS,
    SITTING_ROOM: SITTING_ROOM_INTERACTIONS,
    HALLWAY: HALLWAY_INTERACTIONS,
    BEDROOM: BEDROOM_INTERACTIONS,
    BACK_NOOK: BACK_NOOK_INTERACTIONS,
    SECRET_CLOSET: [{ id: 16, x: 50, y: 50, text: "The small space smells intensely of cedar and old paper." }]
};

const HouseExploration = ({ playerData, initialRoom, onAutoSave }) => {
    // SAFE INITIALIZATION: Fallback to PORCH strictly
    const startRoom = (initialRoom && ROOMS[initialRoom]) ? ROOMS[initialRoom] : ROOMS.PORCH;
    const [currentRoom, setCurrentRoom] = useState(startRoom);
    const [activeDialogue, setActiveDialogue] = useState(null);
    const [forceShowFooter, setForceShowFooter] = useState(false);
    const [forceShowDialogue, setForceShowDialogue] = useState(false);

    // Track visited rooms (Set of IDs)
    const [visitedRooms, setVisitedRooms] = useState(new Set([initialRoom || 'PORCH']));

    const handleMove = (destId) => {
        if (!ROOMS[destId]) return; // Safety check
        setCurrentRoom(ROOMS[destId]);
        setForceShowFooter(false);
        setForceShowDialogue(false);

        // Update visited rooms
        const newVisited = new Set(visitedRooms);
        newVisited.add(destId);
        setVisitedRooms(newVisited);

        // Auto-save
        if (onAutoSave) {
            onAutoSave(destId);
        }
    };

    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('interaction-point')) return;
        // Optional: Log click for creating interaction points
        // console.log(`CLICK COORDS: ...`);
    };

    const handleGlobalClick = () => {
        setForceShowFooter(true);
        if (activeDialogue) setForceShowDialogue(true);
    };

    // DEBUG: Ensure we are rendering something
    if (!currentRoom) return <div style={{ color: 'red' }}>ERROR: No Room</div>;

    return (
        <div style={{ width: '100%', height: '100%' }} onClick={handleGlobalClick}>

            {/* Global Dialogue Overlay */}
            {activeDialogue && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 200
                }} onClick={() => setActiveDialogue(null)}>
                    <div style={{
                        background: '#f8f5e3', border: '4px double #2e5c2e', padding: '2rem',
                        maxWidth: '500px', borderRadius: '12px', boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <TypewriterText
                            key={activeDialogue}
                            text={activeDialogue}
                            speed={20}
                            forceShow={forceShowDialogue}
                            style={{
                                fontFamily: '"Jersey 20", sans-serif', fontSize: '1.5rem',
                                color: '#1a2f1a', lineHeight: '1.4', marginBottom: '1.5rem'
                            }}
                        />
                        <button
                            onClick={() => setActiveDialogue(null)}
                            style={{
                                background: '#2e5c2e', color: '#f8f5e3', border: 'none', padding: '8px 16px',
                                fontFamily: '"Jersey 20", sans-serif', fontSize: '1.2rem', cursor: 'pointer',
                                borderRadius: '4px', float: 'right'
                            }}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <GameFrame
                title={currentRoom.name}
                // Outer background disabled for debugging if causing issues, but let's try keeping it NULL for now
                outerBackground={null}
                footerContent={(
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <TypewriterText
                            key={currentRoom.id}
                            text={currentRoom.desc}
                            speed={20}
                            forceShow={forceShowFooter}
                            style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', lineHeight: '1.4' }}
                        />

                        <div className="navigation" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {currentRoom.connections.map(destId => (
                                <button
                                    key={destId}
                                    onClick={() => handleMove(destId)}
                                    style={{
                                        background: '#2e5c2e', color: '#f8f5e3', border: '2px solid #1a2f1a',
                                        fontFamily: '"Jersey 20", sans-serif', fontSize: '1.2rem', padding: '8px 20px',
                                        cursor: 'pointer', boxShadow: '0 4px 0 #1a2f1a', borderRadius: '8px',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    {(currentRoom.id === 'PORCH' && destId === 'SITTING_ROOM') ? 'Enter House' :
                                        (destId === 'PORCH') ? 'Go Outside' : `Go to ${ROOMS[destId].name}`}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Tabs (Inline Replacement) */}
                        <div style={{
                            position: 'absolute',
                            right: '-85px',
                            top: '-4px',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column'
                        }} onClick={(e) => e.stopPropagation()}>
                            {/* Journal Tab */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // setShowJournal(true); 
                                    console.log("Journal clicked");
                                    alert("Journal functionality coming next!");
                                }}
                                style={{
                                    background: '#4a3b2a',
                                    border: '2px solid #f8f5e3',
                                    color: '#f8f5e3',
                                    width: '65px',
                                    height: '65px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '2rem',
                                    marginBottom: '10px',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
                                }}
                                title="Journal"
                            >
                                📖
                            </div>

                            {/* Map Tab */}
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // setShowMinimap(!showMinimap); 
                                    console.log("Map clicked");
                                    alert("Map functionality coming next!");
                                }}
                                style={{
                                    background: '#4a3b2a',
                                    border: '2px solid #f8f5e3',
                                    color: '#f8f5e3',
                                    width: '65px',
                                    height: '65px',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '2rem',
                                    marginBottom: '10px',
                                    boxShadow: '2px 2px 5px rgba(0,0,0,0.5)'
                                }}
                                title="House Plan"
                            >
                                🗺️
                            </div>
                        </div>
                    </div>
                )}
            >
                {/* Viewport Content */}
                <div
                    onClick={handleBackgroundClick}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${currentRoom.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        backgroundColor: '#edc' // Fallback color
                    }}
                >
                    {/* Interaction Points */}
                    {(INTERACTIONS[currentRoom.id] || []).map(point => (
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
                                zIndex: 50, // Ensure it is above background
                                position: 'absolute'
                            }}
                        />
                    ))}
                </div>
            </GameFrame>

            <div style={{
                position: 'fixed', bottom: '10px', left: '10px',
                color: '#8b5a2b', fontFamily: '"Jersey 20", sans-serif', fontSize: '1rem',
                textShadow: '1px 1px 0 #000', zIndex: 200
            }}>
                Playing as: {playerData.name} ({playerData.profession})
            </div>
        </div>
    );
};

export default HouseExploration;
