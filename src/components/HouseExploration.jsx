import React, { useState } from 'react';

const ROOMS = {
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
        connections: ['KITCHEN', 'HALLWAY']
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

const HouseExploration = ({ playerData }) => {
    const [currentRoom, setCurrentRoom] = useState(ROOMS.KITCHEN);

    const handleMove = (roomId) => {
        setCurrentRoom(ROOMS[roomId]);
    };

    return (
        <div className="scene-container house-exploration" style={{
            backgroundImage: `url(${currentRoom.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem',
        }}>
            <div className="glass-panel" style={{ padding: '1rem', display: 'inline-block', alignSelf: 'flex-start' }}>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--color-accent)' }}>{currentRoom.name}</h3>
                <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>Playing as: {playerData.name} ({playerData.profession})</p>
            </div>

            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem' }}>{currentRoom.desc}</p>

                <div className="navigation" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {currentRoom.connections.map(destId => (
                        <button
                            key={destId}
                            onClick={() => handleMove(destId)}
                            className="btn-secondary"
                        >
                            Go to {ROOMS[destId].name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HouseExploration;
