import React, { useState } from 'react';
import GameFrame from './GameFrame';
import TypewriterText from './TypewriterText';

// --- DATA: ROOMS AND INTERACTION POINTS ---
const ROOMS = {
    PORCH: {
        id: 'PORCH',
        name: 'Front Porch',
        desc: 'The wooden boards are gray with age. To your left, the old swing bench hangs by rusted chains. The front yard is a tangle of overgrown ivy and rhododendrons.',
        img: 'assets/house_exterior.png'
    },
    KITCHEN: {
        id: 'KITCHEN',
        name: 'Kitchen',
        desc: 'Stone tile floor, smoothed with time. Hanging bunches of dried herbs. A cast iron kettle always on the stove.',
        img: 'assets/kitchen.png'
    },
    SITTING_ROOM: {
        id: 'SITTING_ROOM',
        name: 'Sitting Room',
        desc: 'A framed black-and-white photo on the mantle. Fireplace burnt low. A velvet armchair with indentations like someone just got up.',
        img: 'assets/sitting_room.png'
    },
    HALLWAY: {
        id: 'HALLWAY',
        name: 'Hallway',
        desc: 'Family photographs—some with faces faded. A window that doesn’t open but lets in long rays of light.',
        img: 'assets/hallway.png'
    },
    BEDROOM: {
        id: 'BEDROOM',
        name: 'Bedroom',
        desc: 'Canopy bed with layered quilts. A trunk at the foot of the bed with childhood toys.',
        img: 'assets/bedroom.png'
    },
    BACK_NOOK: {
        id: 'BACK_NOOK',
        name: 'Back Nook / Garden Access',
        desc: 'Screen door leads to a fenced garden with stone steps and wild flowers.',
        img: 'assets/garden_access.png'
    },
    SECRET_CLOSET: {
        id: 'SECRET_CLOSET',
        name: 'Hidden Closet',
        desc: 'A cramps space behind a loose panel. It smells of cedar and secrets.',
        img: 'assets/closet.png'
    }
};

// Defined Linear Order
const ROOM_ORDER = ['PORCH', 'KITCHEN', 'SITTING_ROOM', 'HALLWAY', 'BEDROOM', 'BACK_NOOK'];

const INTERACTIONS = {
    PORCH: [
        { id: 1, x: 53, y: 21, text: "Herb bundles hanging to dry under the eaves" },
        { id: 2, x: 41, y: 53, text: "An old rocking chair with a woven throw" },
        { id: 3, x: 97, y: 80, text: "Crate with old fishing boots in it and bundles of firewood sticks by the door." }
    ],
    KITCHEN: [
        { id: 4, x: 61, y: 18, text: "An old book full of teas, tinctures, and dried petals", type: 'collect', img: 'assets/pocket-items/eye.png' },
        { id: 5, x: 9, y: 16, text: "A familiar herbal blend that you remember from childhood.", type: 'collect', img: 'assets/pocket-items/charm.png' },
        { id: 6, x: 35, y: 80, text: "A recipe card in Verna’s handwriting", type: 'collect', img: 'assets/pocket-items/ticket.png' },
        { id: 901, x: 33, y: 26, text: "Hanging bunches of dried herbs. Some look like rosemary, mint and sage" },
        { id: 902, x: 86, y: 73, text: "A cast iron kettle that's always on the stove" }
    ],
    SITTING_ROOM: [
        { id: 7, x: 50, y: 45, text: "A framed black-and-white photo of a younger Rose on the mantle." },
        { id: 8, x: 80, y: 70, text: "A velvet armchair with a slight indentation, as if someone just left." },
        { id: 9, x: 25, y: 55, text: "The fireplace is cold now, but the smell of cedar wood remains." }
    ],
    HALLWAY: [
        { id: 10, x: 40, y: 30, text: "A row of faded family photographs. You recognize a few faces." },
        { id: 11, x: 90, y: 40, text: "Warm rays of light stream through the high window." }
    ],
    BEDROOM: [
        { id: 12, x: 50, y: 50, text: "The canopy bed is covered in layered quilts, smelling of fresh linen." },
        { id: 13, x: 20, y: 80, text: "A heavy wooden trunk at the foot of the bed, filled with old toys." }
    ],
    BACK_NOOK: [
        { id: 14, x: 45, y: 35, text: "The screen door is slightly ajar, letting in a cool breeze." },
        { id: 15, x: 70, y: 60, text: "A cluster of wild flowers peaking through the garden steps." }
    ],
    SECRET_CLOSET: [
        { id: 16, x: 50, y: 50, text: "The small space smells intensely of cedar and old paper." }
    ]
};

// --- JOURNAL COMPONENT ---
const JournalModal = ({ onClose, collectedItems }) => {
    const [activeTab, setActiveTab] = useState('MAP');

    // Helper to find item details
    const getCollectedItemDetails = () => {
        let items = [];
        Object.values(INTERACTIONS).forEach(roomItems => {
            roomItems.forEach(item => {
                if (collectedItems.includes(item.id)) {
                    items.push(item);
                }
            });
        });
        return items;
    };

    return (
        <>
            {/* Dimmed Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 1999,
                    backdropFilter: 'blur(2px)' // Optional: adds a nice blur effect
                }}
            />

            {/* Journal Container */}
            <div style={{
                position: 'absolute',
                top: '50px',
                left: '10%',
                right: '10%',
                bottom: '150px', // More space at bottom
                backgroundColor: '#f4f1ea', // Paper color
                backgroundImage: 'repeating-linear-gradient(#f4f1ea 0px, #f4f1ea 24px, #e5e0d8 25px)', // Lined paper effect
                border: '8px solid #5d4037', // Leather-like border
                borderRadius: '12px',
                boxShadow: '0 0 50px rgba(0,0,0,0.7)',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: '"Jersey 20", serif',
                color: '#000000'
            }}>
                {/* Header / Tabs */}
                <div style={{
                    display: 'flex',
                    backgroundColor: '#5d4037',
                    padding: '10px 10px 0 10px',
                    gap: '4px'
                }}>
                    {['MAP', 'CALENDAR', 'INVENTORY'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                flex: 1,
                                padding: '8px 0',
                                border: 'none',
                                borderRadius: '8px 8px 0 0',
                                backgroundColor: activeTab === tab ? '#f4f1ea' : '#3e2723',
                                color: activeTab === tab ? '#3e2723' : '#a1887f',
                                fontFamily: 'inherit',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontWeight: 'bold'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                    <button
                        onClick={onClose}
                        style={{
                            marginLeft: 'auto',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffab91',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            padding: '0 8px'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Content Area */}
                <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                    {activeTab === 'MAP' && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <h3 style={{ borderBottom: '2px solid #5d4037', width: '100%', textAlign: 'center' }}>House Map</h3>
                            <div style={{
                                width: '280px', height: '280px',
                                border: '2px dashed #5d4037',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                opacity: 0.5
                            }}>
                                (Map Sketch Placeholder)
                            </div>
                            <p style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                                "A rough sketch of the old house layouts..."
                            </p>
                        </div>
                    )}

                    {activeTab === 'CALENDAR' && (
                        <div>
                            <h3 style={{ borderBottom: '2px solid #5d4037', textAlign: 'center', marginBottom: '10px' }}>October</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                gap: '4px',
                                textAlign: 'center'
                            }}>
                                {/* Days of Week */}
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <div key={i} style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{d}</div>
                                ))}
                                {/* Grid for 30 days */}
                                {Array.from({ length: 31 }).map((_, i) => (
                                    <div key={i} style={{
                                        border: '1px solid #ccc',
                                        aspectRatio: '1/1',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        background: 'rgba(255,255,255,0.5)'
                                    }}>
                                        <span>{i + 1}</span>
                                        <span style={{ fontSize: '10px' }}>
                                            {['☀️', '☁️', '🌧️', '⛈️'][Math.floor(Math.random() * 4)]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'INVENTORY' && (
                        <div>
                            <h3 style={{ borderBottom: '2px solid #5d4037', textAlign: 'center', marginBottom: '10px' }}>Collected Items</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {getCollectedItemDetails().length === 0 ? (
                                    <p style={{ fontStyle: 'italic', textAlign: 'center', color: '#888' }}>No items collected yet.</p>
                                ) : (
                                    getCollectedItemDetails().map((item, idx) => (
                                        <div key={idx} style={{
                                            border: '1px solid #5d4037',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            background: '#fff',
                                            boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px'
                                        }}>
                                            {/* Item Image */}
                                            {item.img && (
                                                <div style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    flexShrink: 0
                                                }}>
                                                    <img
                                                        src={item.img}
                                                        alt="Item"
                                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                                    />
                                                </div>
                                            )}

                                            <div>
                                                <strong>Item #{idx + 1}</strong>
                                                <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem' }}>{item.text}</p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

const HouseExploration = ({ playerData, initialRoom, onAutoSave }) => {
    // 1. Initialize State
    // Default to index 0 (PORCH) if initialRoom not found in order
    const startIndex = ROOM_ORDER.indexOf(initialRoom);
    const [currentIndex, setCurrentIndex] = useState(startIndex >= 0 ? startIndex : 0);
    const [activeDialogue, setActiveDialogue] = useState(null); // Now stores the entire interaction object or null
    const [collectedItems, setCollectedItems] = useState([]);
    const [showJournal, setShowJournal] = useState(false);

    const currentRoomId = ROOM_ORDER[currentIndex];
    const currentRoom = ROOMS[currentRoomId];
    const isLastRoom = currentIndex === ROOM_ORDER.length - 1;

    // 2. Handlers
    const handleNext = () => {
        if (!isLastRoom) {
            setCurrentIndex(prev => prev + 1);
            setActiveDialogue(null);
        } else {
            alert("End of current demo exploration.");
        }
    };

    const handleInteractionClick = (item) => {
        setActiveDialogue(item);
    };

    const handleCloseDialogue = () => {
        if (activeDialogue && activeDialogue.type === 'collect') {
            setCollectedItems(prev => [...prev, activeDialogue.id]);
        }
        setActiveDialogue(null);
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* Journal Modal Overlay */}
            {showJournal && (
                <JournalModal
                    onClose={() => setShowJournal(false)}
                    collectedItems={collectedItems}
                />
            )}

            {/* Interaction Modal / Pop-up */}
            {activeDialogue && (
                <div
                    onClick={handleCloseDialogue}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 1000,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#f4f1ea',
                            border: '4px double #2e5c2e',
                            padding: '2rem',
                            maxWidth: '500px',
                            width: '90%',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        <TypewriterText
                            text={activeDialogue.text}
                            speed={15}
                            style={{
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.5rem',
                                lineHeight: '1.4',
                                color: '#1a2f1a'
                            }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={handleCloseDialogue}
                                style={{
                                    background: '#2e5c2e',
                                    color: '#f8f5e3',
                                    border: '2px solid #1a2f1a',
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.2rem',
                                    padding: '8px 20px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    boxShadow: '0 4px 0 #1a2f1a',
                                    borderRadius: '8px',
                                    transition: 'transform 0.1s'
                                }}
                                onMouseDown={(e) => e.target.style.transform = 'translateY(2px)'}
                                onMouseUp={(e) => e.target.style.transform = 'translateY(0)'}
                            >
                                {activeDialogue.type === 'collect' ? 'Collect' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Journal Icon - Top Right with Bounding Box */}
            <button
                onClick={() => setShowJournal(!showJournal)}
                title="Open Journal"
                style={{
                    position: 'absolute',
                    right: '25px',
                    top: '80px',
                    background: '#8d6e63', // Wood-like background
                    border: '3px solid #5d4037', // Darker border
                    borderRadius: '12px', // Rounded square
                    cursor: 'pointer',
                    fontSize: '2rem',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    zIndex: 1500,
                    transition: 'transform 0.1s, background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.background = '#a1887f'}
                onMouseLeave={(e) => e.target.style.background = '#8d6e63'}
                onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
            >
                📖
            </button>

            <GameFrame
                title={currentRoom.name}
                // Only show wood pattern for interior rooms if desired, or always
                outerBackground={['PORCH', 'SITTING_ROOM', 'KITCHEN', 'BEDROOM', 'HALLWAY'].includes(currentRoomId) ? 'assets/wood_pattern.png' : null}
                footerContent={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                        {/* Room Description */}
                        <div style={{ flex: 1 }}>
                            <TypewriterText
                                key={currentRoomId} // Force re-type on room change
                                text={currentRoom.desc}
                                speed={10}
                                style={{
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.4rem',
                                    lineHeight: '1.4',
                                    color: '#1a1a1a'
                                }}
                            />
                        </div>

                        {/* Navigation Buttons: SINGLE BUTTON NOW */}
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: 'auto' }}>
                            <button
                                onClick={handleNext}
                                disabled={isLastRoom}
                                style={{
                                    background: isLastRoom ? '#666' : '#2e5c2e',
                                    color: '#f8f5e3',
                                    border: '2px solid #1a2f1a',
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.2rem',
                                    padding: '8px 20px',
                                    cursor: isLastRoom ? 'default' : 'pointer',
                                    textTransform: 'uppercase',
                                    boxShadow: isLastRoom ? 'none' : '0 4px 0 #1a2f1a',
                                    borderRadius: '8px',
                                    marginBottom: '4px',
                                    opacity: isLastRoom ? 0.7 : 1
                                }}
                                onMouseDown={(e) => !isLastRoom && (e.target.style.transform = 'translateY(2px)')}
                                onMouseUp={(e) => !isLastRoom && (e.target.style.transform = 'translateY(0)')}
                            >
                                {isLastRoom
                                    ? 'End of Tour'
                                    : (currentRoomId === 'PORCH' ? 'Enter House' : 'Explore Next Room')
                                }
                            </button>
                        </div>
                    </div>
                }
            >
                {/* Main Viewport Content */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {/* Background Image */}
                    <img
                        src={currentRoom.img}
                        alt={currentRoom.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Interaction Orbs */}
                    {INTERACTIONS[currentRoomId] && INTERACTIONS[currentRoomId]
                        .filter(item => !collectedItems.includes(item.id)) // Filter out collected items
                        .map(item => (
                            <div
                                key={item.id}
                                className="interaction-point"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleInteractionClick(item);
                                }}
                                title={item.text.substring(0, 20) + "..."}
                                style={{
                                    top: `${item.y}%`,
                                    left: `${item.x}%`,
                                    position: 'absolute'
                                }}
                            />
                        ))}
                </div>
            </GameFrame>
        </div>
    );
};

export default HouseExploration;
