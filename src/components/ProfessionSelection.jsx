
const PROFESSIONS = [
    {
        id: 'keyholder',
        title: 'Retail Manager',
        image: import.meta.env.BASE_URL + 'assets/professions/keyholder.png',
        desc: "You’re a retail manager, you’ve trained six new hires, watched four quit mid-shift, and felt your soul leave your body during inventory. You don’t manage a store, you preside over its slow decay.",
        bonus: "Stocked and Ready: Start each day with an extra resource. Insider Access: Early access to locked areas."
    },
    {
        id: 'healer',
        title: 'Nurse',
        image: import.meta.env.BASE_URL + 'assets/professions/healer.png',
        desc: "You’re a nurse, you’ve resuscitated lives, rewritten charts, and emotionally regulated five people before noon. The scrubs are the only thing holding you together.",
        bonus: "Tender Frequency: Stabilize spirits faster. Restorative Touch: Healing effects linger longer."
    },
    {
        id: 'mechanic',
        title: 'Mechanic',
        image: import.meta.env.BASE_URL + 'assets/professions/mechanic.png',
        desc: "You’ve been a mechanic long enough to fix engines, transmissions, and a few hearts along the way, whether or not they knew it.",
        bonus: "Quiet Efficiency: Fix mechanical tasks faster. Conductive Presence: Machines respond to you."
    },
    {
        id: 'teacher',
        title: 'Educator',
        image: import.meta.env.BASE_URL + 'assets/professions/teacher.png',
        desc: "You’re an educator, you taught through fire drills, heartbreak, and budget cuts, shaping minds with nothing but a whiteboard and sheer force of will.",
        bonus: "Lesson Plan: Preview major choice outcomes. Marginal Wisdom: Buffs from reading."
    },
    {
        id: 'radio',
        title: 'Radio Host',
        image: import.meta.env.BASE_URL + 'assets/professions/radio.jpg',
        desc: "You’re a radio host. You curate moods, not just playlists. You ask good questions, let people ramble, and understand that the best conversations usually happen when no one’s trying too hard.",
        bonus: "Signal in the Static: Hear hidden messages. Magnetic Personality: Build trust faster."
    },
    {
        id: 'engineer',
        title: 'Engineer',
        image: import.meta.env.BASE_URL + 'assets/professions/engineer.png',
        desc: "You’re a software engineer, you architect systems, debug reality, and automate the things people pretend aren’t broken.",
        bonus: "Reality Fork(): Choose alternate memories. Exploit Found: Skip parts of tasks."
    },
    {
        id: 'maker',
        title: 'Entrepreneur',
        image: import.meta.env.BASE_URL + 'assets/professions/maker.png',
        desc: "You’re an independent maker, you turned your coping mechanisms into product lines and your worst days into bestsellers.",
        bonus: "Maker’s Yield: Gather extra materials. Craft Economy: Crafted items are more effective."
    },
    {
        id: 'biologist',
        title: 'Wildlife Biologist',
        image: import.meta.env.BASE_URL + 'assets/professions/biologist.png',
        desc: "You’re a wildlife biologist: part scientist, part respectful trespasser. You read the forest like a field report: scat, tracks, broken twigs, a hush that means something big was just here.",
        bonus: "Tracker’s Instinct: Reveal hidden nature interactions. Field Notes: Identify plants/animals faster."
    }
];

import React, { useState } from 'react';
import GameFrame from './GameFrame';

const ProfessionSelection = ({ onComplete }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id) => {
        setSelectedId(id);
    };

    const handleConfirm = () => {
        if (selectedId) {
            const profession = PROFESSIONS.find(p => p.id === selectedId);
            onComplete(profession);
        }
    };

    const selectedProfession = PROFESSIONS.find(p => p.id === selectedId);

    return (
        <GameFrame
            title="What were you doing before coming here?"
            outerBackground={import.meta.env.BASE_URL + 'assets/ui/character_creation_bg.jpg'}
            viewportStyle={{
                background: '#f8f5e3',
                height: '470px'
            }}
            titleStyle={{
                borderBottom: 'none',
                fontSize: '1.6rem' // Slightly smaller to fit the long question
            }}
            footerStyle={{
                borderTop: 'none',
                padding: '2rem' // Keep padding for content spacing
            }}
            footerHeight="250px"
            footerContent={
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, marginBottom: '0.5rem' }}>
                        {selectedProfession ? (
                            <div style={{ animation: 'fadeIn 0.3s' }}>
                                <p style={{
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.2rem',
                                    margin: '0 0 1rem 0',
                                    lineHeight: '1.3',
                                    color: '#2c2c2c'
                                }}>
                                    {selectedProfession.desc}
                                </p>
                                <div style={{
                                    background: '#e8f5e9',
                                    border: '2px solid #2e5c2e',
                                    padding: '0.8rem',
                                    borderRadius: '10px',
                                    marginTop: 'auto',
                                    position: 'relative',
                                    boxShadow: '3px 3px 0 rgba(46, 92, 46, 0.2)'
                                }}>
                                    <p style={{
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.2rem',
                                        margin: 0,
                                        color: '#1a2f1a'
                                    }}>
                                        <span style={{ fontSize: '1.4rem', marginRight: '4px' }}>✨</span>
                                        <strong>Bonus:</strong> {selectedProfession.bonus}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p style={{
                                fontFamily: '"Jersey 20", sans-serif',
                                fontSize: '1.2rem',
                                color: '#666',
                                textAlign: 'center',
                                marginTop: '1rem'
                            }}>
                                Select a profession to see details...
                            </p>
                        )}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
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
                            Confirm Selection
                        </button>
                    </div>
                </div>
            }
        >
            <div style={{
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '0.8rem',
                padding: '1rem',
                maxWidth: '1050px',
                margin: '0 auto'
            }}>
                {PROFESSIONS.map(item => {
                    const isSelected = selectedId === item.id;
                    return (
                        <div
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            style={{
                                background: '#fdfbf7',
                                border: isSelected ? '3px solid #b55239' : '2px solid #a09d8f',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.5rem',
                                boxShadow: isSelected ? '0 0 0 2px #b55239' : '0 2px 4px rgba(0,0,0,0.1)',
                                transform: isSelected ? 'translateY(-2px)' : 'none',
                                transition: 'all 0.2s',
                                textAlign: 'center',
                                overflow: 'hidden'
                            }}
                        >
                            {/* If image exists, use it. Otherwise, show title */}
                            {item.image ? (
                                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{
                                        flex: 1,
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        marginBottom: '0.5rem'
                                    }}>
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                imageRendering: 'pixelated'
                                            }}
                                        />
                                    </div>
                                    <span style={{
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1rem',
                                        color: '#2c2c2c',
                                        lineHeight: '1.1',
                                        textTransform: 'uppercase'
                                    }}>
                                        {item.title}
                                    </span>
                                </div>
                            ) : (
                                <span style={{
                                    fontFamily: '"Jersey 20", sans-serif',
                                    fontSize: '1.2rem',
                                    color: '#2c2c2c',
                                    lineHeight: '1.1',
                                    textTransform: 'uppercase'
                                }}>
                                    {item.title}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </GameFrame>
    );
};

export default ProfessionSelection;
