import React, { useState } from 'react';
import GameFrame from './GameFrame';

const PROFESSIONS = [
    { id: 'scholar', label: 'Open Tabs Scholar', desc: 'You\'re a student, formally, informally, perpetually. You collect questions like keepsakes, leave notes in the margins, and believe that understanding something doesn\'t always mean finishing it. You don\'t need closure, you just need Wi-Fi.', bonus: 'Overprepared', bonusDesc: 'Reveal hidden lore in descriptions.', image: import.meta.env.BASE_URL + 'assets/professions/scholar.png' },
];

const POCKET_ITEMS = [
    { id: 'compass', label: 'Brass Compass', desc: 'A heavy brass compass that doesn\'t always point North.', image: import.meta.env.BASE_URL + 'assets/pocket-items/compass.png' },
];

const PRESETS = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Vessel ${i + 1}`,
    image: `${import.meta.env.BASE_URL}assets/character/presets/character${i + 1}.png`
}));

const CharacterCreation = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        profession: 'scholar',
        pocketItem: 'compass',
        appearance: {
            presetId: 1,
            image: PRESETS[0].image
        },
        selectedPresetId: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePresetSelect = (preset) => {
        setFormData(prev => ({
            ...prev,
            selectedPresetId: preset.id,
            appearance: {
                presetId: preset.id,
                image: preset.image
            }
        }));
    };

    const handleComplete = () => {
        if (!formData.name.trim()) return;
        onComplete(formData);
    };

    return (
        <GameFrame
            title="WHO ARE YOU?"
            outerBackground={import.meta.env.BASE_URL + 'assets/ui/character_creation_bg.jpg'} // Set image BEHIND the frame
            viewportStyle={{ backgroundColor: '#f8f5e3' }} // Keep frame content beige
            footerHeight="100px" // Reduced footer height
            footerContent={
                // Reduced bottom padding/margin by ensuring this container is tight
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingBottom: '0' }}>
                    <button
                        onClick={handleComplete}
                        disabled={!formData.name.trim()}
                        style={{
                            background: !formData.name.trim() ? '#666' : '#2e5c2e',
                            color: '#f8f5e3',
                            border: !formData.name.trim() ? 'none' : '2px solid #1a2f1a',
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.4rem',
                            cursor: !formData.name.trim() ? 'not-allowed' : 'pointer',
                            padding: '8px 20px',
                            textTransform: 'uppercase',
                            boxShadow: !formData.name.trim() ? 'none' : '0 4px 0 #1a2f1a',
                            borderRadius: '8px',
                            opacity: !formData.name.trim() ? 0.7 : 1,
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (formData.name.trim()) e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            if (formData.name.trim()) e.target.style.transform = 'translateY(0)';
                        }}
                        onMouseDown={(e) => !formData.name.trim() || (e.target.style.transform = 'translateY(2px)')}
                        onMouseUp={(e) => {
                            if (formData.name.trim()) e.target.style.transform = 'translateY(-2px)'; // Return to hover state
                        }}
                    >
                        THIS IS ME
                    </button>
                </div>
            }
        >
            <div style={{ height: '100%', overflowY: 'hidden' }}>
                <div style={{
                    display: 'flex',
                    gap: '0.5rem', // Reduced gap between columns
                    height: '100%',
                    flexDirection: 'row',
                    alignItems: 'center', // vertically align items
                    justifyContent: 'center' // Center the columns
                }}>
                    {/* LEFT COLUMN: Input & Selection */}
                    <div style={{
                        flex: '0 0 auto', // Don't expand to fill space
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        minWidth: 0,
                        padding: '20px', // Added margin/padding around content
                    }}>
                        {/* Name Input */}
                        <div style={{ flexShrink: 0, maxWidth: '430px' }}>
                            <label style={{ display: 'block' }}>
                                {/* <span style={{ display: 'block', fontSize: '1.4rem', marginBottom: '0.4rem', color: '#000000' }}>Name</span> */}
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    style={{
                                        width: '100%',
                                        background: 'transparent',
                                        border: '2px solid #2e5c2e',
                                        color: '#000000', // Set to black
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.3rem',
                                        padding: '8px',
                                        borderRadius: '4px'
                                    }}
                                />
                            </label>
                        </div>

                        {/* Grid Layout (Selector) */}
                        {/* 4x4 Grid. Small cards. */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '0.6rem', // Increased gap for non-overlapping
                            paddingRight: '0.4rem',
                            flex: 1,
                            overflowY: 'auto',
                            alignContent: 'start',
                            maxWidth: '420px', // Constrain width to make cards smaller
                            scrollbarWidth: 'none', // Hide scrollbar Firefox
                            msOverflowStyle: 'none', // Hide scrollbar IE
                        }}>
                            <style>{`
                                .hide-scrollbar::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            <div className="hide-scrollbar" style={{ display: 'contents' }}></div>
                            {/* Actually cleaner to just inline the css or use className if possible, but inline style: */}
                            {PRESETS.map(preset => {
                                const isSelected = formData.selectedPresetId === preset.id;
                                return (
                                    <div
                                        key={preset.id}
                                        onClick={() => handlePresetSelect(preset)}
                                        style={{
                                            aspectRatio: '1',
                                            // Beige background
                                            background: '#f8f5e3',
                                            // Distinct border to show the card against similar background, highlight if selected
                                            border: isSelected ? '3px solid #b55239' : '2px solid #a09d8f',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            boxShadow: isSelected ? '0 0 0 1px #b55239' : '0 2px 4px rgba(0,0,0,0.1)',
                                            transition: 'all 0.2s ease',
                                            opacity: isSelected ? 1 : 0.9,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '4px'
                                        }}
                                    >
                                        <div style={{ width: '100%', height: '100%' }}>
                                            <img
                                                src={preset.image}
                                                alt={preset.name}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'contain',
                                                    imageRendering: 'pixelated'
                                                }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        </div>

                                        {/* Selection Indicator Removed */}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Preview Panel */}
                    <div style={{
                        width: '260px', // Shrink back to previous size
                        height: '460px', // Fixed height to prevent collapse
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '0',
                        flexShrink: 0,
                    }}>

                        {/* Large Character Image */}
                        <div style={{
                            width: '100%',
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '1rem',
                            // Removed noise/dark bg. Using simple transparent or subtle border if needed.
                            // background: 'url(/assets/ui/noise.png) repeat, #222', 
                            background: 'transparent',
                            borderRadius: '4px',
                            // border: '1px solid #333', // Removed or made subtle
                            overflow: 'hidden',
                            padding: '1rem',
                            position: 'relative'
                        }}>
                            <img
                                src={formData.appearance.image}
                                alt="Selected Character"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    imageRendering: 'pixelated',
                                    // transform: 'scale(1.5)', // Removed to prevent cutoff
                                    filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.2))' // Added shadow for contrast on beige
                                }}
                            />
                        </div>

                        {/* Minimal Text: "Vessel X" only */}
                        <div style={{
                            textAlign: 'center',
                            width: '100%'
                        }}>
                            <div style={{
                                color: '#000000', // Set to black
                                fontSize: '1.4rem',
                                fontFamily: '"Jersey 20", sans-serif', // Consistent font
                                marginTop: '-10px'
                            }}>
                                {PRESETS.find(p => p.id === formData.selectedPresetId)?.name || 'Unknown'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </GameFrame>
    );
};

export default CharacterCreation;
