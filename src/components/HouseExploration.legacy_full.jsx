import React, { useState, useEffect } from 'react';
import GameFrame from './GameFrame';
import TypewriterText from './TypewriterText';
import Journal from './Journal';
import NavigationMenu from './NavigationMenu';

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

const Minimap = ({ currentRoomId, onMove, onClose }) => {
    // Helper for common styles
    const getRoomStyle = (id) => ({
        background: currentRoomId === id ? '#2e5c2e' : '#d4d0c5',
        color: currentRoomId === id ? '#f8f5e3' : '#5c5c5c',
        border: '1px solid #666',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.85rem', cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: currentRoomId === id ? 'inset 0 0 5px rgba(0,0,0,0.5)' : 'none',
        position: 'relative'
    });

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} onClick={onClose}>
            <div style={{
                background: '#f4f1ea',
                border: '4px solid #333',
                padding: '20px',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '500px', // Larger size
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                fontFamily: '"Jersey 20", sans-serif'
            }} onClick={e => e.stopPropagation()}>
                <h4 style={{ margin: '0 0 4px 0', textAlign: 'center', color: '#333', letterSpacing: '2px', borderBottom: '2px solid #333', paddingBottom: '4px' }}>HOUSE PLAN</h4>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1fr', // Wider Sitting/Kitchen, narrowly Hallway/Bed
                    gridTemplateRows: '40px 80px 80px 40px',
                    gap: '4px',
                    height: 'auto',
                    background: '#333', // Dark gap color = walls
                    border: '2px solid #333'
                }}>

                    {/* Back Nook (Garden Access) - Top Spanning */}
                    <div
                        onClick={() => onMove('BACK_NOOK')}
                        title="Garden Access"
                        style={{
                            gridColumn: '1 / span 2',
                            gridRow: '1',
                            ...getRoomStyle('BACK_NOOK'),
                            background: currentRoomId === 'BACK_NOOK' ? '#3d6e3d' : '#bdc7bd', // slightly greener for garden
                        }}>
                        Garden Nook
                    </div>

                    {/* Kitchen - Middle Left */}
                    <div
                        onClick={() => onMove('KITCHEN')}
                        style={{
                            gridColumn: '1', gridRow: '2',
                            ...getRoomStyle('KITCHEN')
                        }}>
                        Kitchen
                    </div>

                    {/* Bedroom - Middle Right */}
                    <div
                        onClick={() => onMove('BEDROOM')}
                        style={{
                            gridColumn: '2', gridRow: '2',
                            ...getRoomStyle('BEDROOM')
                        }}>
                        Bedroom
                    </div>

                    {/* Sitting Room - Bottom Left */}
                    <div
                        onClick={() => onMove('SITTING_ROOM')}
                        title="Front Entrance"
                        style={{
                            gridColumn: '1', gridRow: '3',
                            ...getRoomStyle('SITTING_ROOM'),
                        }}>
                        Sitting Room
                    </div>

                    {/* Hallway - Bottom Right */}
                    <div
                        onClick={() => onMove('HALLWAY')}
                        style={{
                            gridColumn: '2', gridRow: '3',
                            ...getRoomStyle('HALLWAY'),
                            background: currentRoomId === 'HALLWAY' ? '#2e5c2e' : '#e6e2d3' // Lighter for hall
                        }}>
                        Hallway
                    </div>

                    {/* Front Porch - Bottom Spanning */}
                    <div
                        onClick={() => onMove('PORCH')}
                        title="Front Porch"
                        style={{
                            gridColumn: '1 / span 2',
                            gridRow: '4',
                            ...getRoomStyle('PORCH'),
                            background: currentRoomId === 'PORCH' ? '#8b5a2b' : '#d2b48c', // Wood color
                        }}>
                        Front Porch
                    </div>
                </div>

                <div style={{ fontSize: '1rem', textAlign: 'center', color: '#444', marginTop: '8px' }}>
                    <span style={{ color: '#2e5c2e', fontWeight: 'bold' }}>●</span> You are here
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                    (Click room to fast travel)
                </div>
            </div>
        </div>
    );
};

const HouseExploration = ({ playerData, initialRoom, onAutoSave }) => {
    // Safety check for startRoom
    const startRoom = (initialRoom && ROOMS[initialRoom]) ? ROOMS[initialRoom] : ROOMS.PORCH;
    const [currentRoom, setCurrentRoom] = useState(startRoom);
    const [activeDialogue, setActiveDialogue] = useState(null);
    const [showJournal, setShowJournal] = useState(false);
    const [showMinimap, setShowMinimap] = useState(false);
    const [forceShowFooter, setForceShowFooter] = useState(false);
    const [forceShowDialogue, setForceShowDialogue] = useState(false);

    // Track visited rooms (Set of IDs)
    const [visitedRooms, setVisitedRooms] = useState(new Set([initialRoom || 'PORCH']));
    const [showSleepChoice, setShowSleepChoice] = useState(false);

    // Logic for delayed trigger
    const [moveCount, setMoveCount] = useState(0);
    const [completionMoveCount, setCompletionMoveCount] = useState(null);

    const handleMove = (destId) => {
        setCurrentRoom(ROOMS[destId]);
        setMoveCount(prev => prev + 1);
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

    // Check for "All Rooms Visited" logic
    useEffect(() => {
        const requiredRooms = ['PORCH', 'SITTING_ROOM', 'KITCHEN', 'HALLWAY', 'BEDROOM'];
        const allVisited = requiredRooms.every(id => visitedRooms.has(id));

        if (allVisited) {
            // First time we realize we visited everything? Mark the current move count.
            if (completionMoveCount === null) {
                setCompletionMoveCount(moveCount);
            }
            // If we have already marked completion, AND we have moved since then...
            else if (moveCount > completionMoveCount && !showSleepChoice) {
                const timer = setTimeout(() => {
                    setShowSleepChoice(true);
                }, 1000);
                return () => clearTimeout(timer);
            }
        }
    }, [visitedRooms, moveCount, completionMoveCount, showSleepChoice]);

    const handleSleep = (location) => {
        alert(`You chose to sleep in the ${location}. Ends the current demo (Day 1 Complete).`);
        // Here we would trigger Day 2 or save state
    };

    const handleGlobalClick = () => {
        setForceShowFooter(true);
        if (activeDialogue) setForceShowDialogue(true);
    };

    return (
        <div style={{ width: '100%', height: '100%' }} onClick={handleGlobalClick}>
            {/* Journal Modal */}
            {showJournal && <Journal onClose={() => setShowJournal(false)} />}

            {/* End of Night / Sleep Choice Modal */}
            {showSleepChoice && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 400
                }}>
                    <div style={{
                        background: '#f4f1ea',
                        border: '4px double #2e5c2e',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        borderRadius: '4px',
                        boxShadow: '0 0 30px rgba(0,0,0,0.8)',
                        textAlign: 'center',
                        fontFamily: '"Jersey 20", sans-serif'
                    }}>
                        <div style={{ fontSize: '1.6rem', color: '#1a2f1a', marginBottom: '2rem', lineHeight: '1.4' }}>
                            "It’s late. You have to go to bed to meet everyone at the funeral tomorrow. Better get some rest."
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                onClick={() => handleSleep('Bedroom')}
                                style={{
                                    background: '#2e5c2e', color: '#f8f5e3', border: 'none',
                                    padding: '12px', fontSize: '1.4rem', cursor: 'pointer',
                                    borderRadius: '4px', textTransform: 'uppercase'
                                }}
                            >
                                a) Sleep in the Bedroom
                            </button>
                            <button
                                onClick={() => handleSleep('Couch')}
                                style={{
                                    background: 'transparent', color: '#2e5c2e', border: '2px solid #2e5c2e',
                                    padding: '12px', fontSize: '1.4rem', cursor: 'pointer',
                                    borderRadius: '4px', textTransform: 'uppercase'
                                }}
                            >
                                b) Sleep on the Couch
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Map Modal */}
            {showMinimap && (
                <Minimap
                    currentRoomId={currentRoom.id}
                    onMove={(id) => { handleMove(id); setShowMinimap(false); }}
                    onClose={() => setShowMinimap(false)}
                />
            )}

            {/* Global Dialogue Overlay */}
            {activeDialogue && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 200
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
                        <TypewriterText
                            key={activeDialogue}
                            text={activeDialogue}
                            speed={20}
                            forceShow={forceShowDialogue}
                            style={{
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.5rem',
                                color: '#1a2f1a',
                                lineHeight: '1.4',
                                marginBottom: '1.5rem'
                            }}
                        />
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
            <GameFrame
                title={currentRoom.name}
                outerBackground={['PORCH', 'SITTING_ROOM', 'KITCHEN', 'BEDROOM', 'HALLWAY'].includes(currentRoom.id) ? 'assets/wood_pattern.png' : null}
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
                                        background: '#2e5c2e',
                                        color: '#f8f5e3',
                                        border: '2px solid #1a2f1a',
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.2rem',
                                        padding: '8px 20px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 0 #1a2f1a',
                                        borderRadius: '8px',
                                        marginBottom: '0.5rem'
                                    }}
                                >
                                    {(currentRoom.id === 'PORCH' && destId === 'SITTING_ROOM')
                                        ? 'Enter House'
                                        : (destId === 'PORCH')
                                            ? 'Go Outside'
                                            : `Go to ${ROOMS[destId].name}`}
                                </button>
                            ))}
                        </div>

                        {/* Navigation Tabs (Right Side of Footer) */}
                        <NavigationMenu
                            onOpenJournal={(e) => { e.stopPropagation(); setShowJournal(true); }}
                            onToggleMap={(e) => { e.stopPropagation(); setShowMinimap(!showMinimap); }}
                            style={{
                                position: 'absolute',
                                right: '-85px',
                                top: '-4px', // Lowered by 20px from -24px
                                zIndex: 10
                            }}
                        />
                    </div>
                )}
            >
                <div
                    onClick={(e) => {
                        // Handle background click logic if needed, currently global handler covers it
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${currentRoom.img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
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
                                left: `${point.x}%`
                            }}
                        />
                    ))}
                </div>
            </GameFrame>

            <div style={{
                position: 'fixed', bottom: '10px', left: '10px',
                color: '#8b5a2b', fontFamily: '"Jersey 20", sans-serif', fontSize: '1rem',
                textShadow: '1px 1px 0 #000',
                zIndex: 200
            }}>
                Playing as: {playerData?.name} ({playerData?.profession})
            </div>
        </div>
    );
};

export default HouseExploration;
