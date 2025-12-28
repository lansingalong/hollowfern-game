import React, { useState } from 'react';

const PROFESSIONS = [
    { id: 'keyholder', label: 'Keyholder', desc: 'You\'re a retail manager, you\'ve trained six new hires, watched four quit mid-shift, and felt your soul leave your body during inventory. You don\'t manage a store. You preside over its slow decay.', bonus: 'Stocked and Ready', bonusDesc: 'Start with a random helpful item.', image: '/assets/professions/keyholder.png' },
    { id: 'healer', label: 'Healer on Call', desc: 'You\'re a nurse, you\'ve resuscitated lives, rewritten charts, and emotionally regulated five people before noon. The scrubs are the only thing holding you together.', bonus: 'Tender Frequency', bonusDesc: 'Unlocks unique dialogue options to calm others.', image: '/assets/professions/healer.png' },
    { id: 'machine', label: 'Machine Whisperer', desc: 'You\'ve been a mechanic long enough to fix engines, transmissions, and a few hearts along the way, whether or not they knew it.', bonus: 'Mechanical Intuition', bonusDesc: 'Repair broken objects without tools.', image: '/assets/professions/machine.png' },
    { id: 'educator', label: 'Final Exam Boss', desc: 'You\'re an educator, you taught through fire drills, heartbreak, and budget cuts, shaping minds with nothing but a whiteboard and sheer force of will. You grade in red. You dream in breakthrough moments.', bonus: 'Lesson Learned', bonusDesc: 'Gain more detailed information when examining items.', image: '/assets/professions/educator.png' },
    { id: 'radio', label: 'Midnight Voice', desc: 'You\'re a radio host, you cracked hearts open on air and called it "curation." People still hear your voice in their emotional damage.', bonus: 'Resonant Frequency', bonusDesc: 'Hear sounds and secrets from further away.', image: '/assets/professions/radio.png' },
    { id: 'coder', label: 'Code Gremlin', desc: 'You\'re a software engineer, you architect systems, debug reality, and automate the things people pretend aren\'t broken. Your code runs smoother than most conversations.', bonus: 'System Override', bonusDesc: 'Bypass electronic locks and terminals.', image: '/assets/professions/coder.png' },
    { id: 'maker', label: 'DIY Entrepreneur', desc: 'You\'re an independent maker, you turned your coping mechanisms into product lines and your worst days into bestsellers. Every piece ships with craftsmanship, charisma, and zero apologies.', bonus: 'Maker\'s Yield', bonusDesc: 'Salvage useful components from broken items.', image: '/assets/professions/maker.png' },
    { id: 'scholar', label: 'Open Tabs Scholar', desc: 'You\'re a student, formally, informally, perpetually. You collect questions like keepsakes, leave notes in the margins, and believe that understanding something doesn\'t always mean finishing it. You don\'t need closure, you just need Wi-Fi.', bonus: 'Overprepared', bonusDesc: 'Reveal hidden lore in descriptions.', image: '/assets/professions/scholar.png' }
];

const POCKET_ITEMS = [
    { id: 'lighter', label: 'Brass Lighter', desc: 'A brass lighter, worn smooth from years of use. It doesn\'t spark anymore, but you still flick it sometimes, just for the sound. It smells like old campfires, gasoline and someone you haven\'t talked to in a long time.', image: '/assets/pocket-items/lighter.png' },
    { id: 'eye', label: 'Googly Eye', desc: 'A single googly eye, loose and slightly scratched. You\'re not sure where it came from, or what it used to belong to. But it\'s been in your pocket for a while now, staring up at you like it knows something you don\'t.', image: '/assets/pocket-items/eye.png' },
    { id: 'ticket', label: 'Train Ticket', desc: 'A train ticket, soft at the edges and folded in half from a while ago. The ink\'s faded, but the destination\'s still legible. You don\'t remember the ride as much as the moment before it, standing on the platform, deciding to go.', image: '/assets/pocket-items/ticket.png' },
    { id: 'charm', label: 'Monster Charm', desc: 'A small plastic charm shaped like a little monster with stubby horns and a snaggletooth grin. It used to hang from your backpack in school. You kept it through three moves, two heartbreaks, and every time you swore you were finally getting organized.', image: '/assets/pocket-items/keychain.png' },
    { id: 'eraser', label: 'Taco Eraser', desc: 'A novelty eraser shaped like a taco, slightly smudged. It doesn\'t erase anything well, but you respect the commitment to the bit. You thought about getting rid of it but it remains to have a permanent spot in your pencil case. You\'ve never seen another one quite like it.', image: '/assets/pocket-items/taco.png' },
    { id: 'coin', label: 'Silver Coin', desc: 'An old silver coin stamped with a crest worn smooth by time. It\'s heavier than it looks, you found it in the locker room of the old field house, wedged behind a bench. You never let it decide anything. You just like the illusion of chance, it makes every choice feel like part of a bigger story.', image: '/assets/pocket-items/mirror.png' }
];

const BODY_TYPES = ['Type 1', 'Type 2', 'Type 3'];
const SKIN_TONES = ['#f8d9ce', '#f0c0b4', '#e0ac98', '#c08874', '#8d5524', '#523318', '#382212'];
const EYE_COLORS = ['#634e34', '#2e536f', '#3d6e3d', '#4d2d52', '#000000', '#8b0000'];
const HAIR_COLORS = ['#090806', '#2c222b', '#71635a', '#b55239', '#e6cea8', '#a7a7a7', '#dc0073', '#2e5c2e', '#3b5c7d'];
const HAIRSTYLES = ['short-messy', 'bob', 'long-straight', 'braid', 'bald', 'mohawk'];
const OUTFIT_CONCEPTS = {
    'Type 1': ['Overalls', 'Sundress', 'Leather Jacket', 'Sweater & Skirt', 'Tunic'],
    'Type 2': ['Flannel', 'T-Shirt & Jeans', 'Hoodie', 'Vest', 'Tunic'],
    'Type 3': ['Overalls', 'Hoodie', 'Leather Jacket', 'Vest', 'Tunic']
};

const PixelAvatar = ({ skin, eyes, hair, hairColor, outfit, bodyType }) => {
    // Coordinate system: 64x64 grid
    // Scale: Standard RPG Spirit (approx 16w x 24h scaled up)
    // Head: 24w x 22h, Body: 16w x 14h

    // Pixel Helper
    const P = ({ x, y, w, h, c }) => (
        <rect x={x} y={y} width={w} height={h} fill={c} shapeRendering="crispEdges" />
    );

    // Soft Outline Helper (Darker shade, not pure black)
    const O = ({ x, y, w, h }) => (
        <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} fill="#2a1d1d" shapeRendering="crispEdges" />
    );

    return (
        <svg viewBox="0 0 64 64" width="100%" height="100%">
            {/* Shadow */}
            <P x={18} y={56} w={28} h={4} c="rgba(0,0,0,0.2)" />

            {/* --- BODY BASE --- */}
            {/* Legs */}
            <O x={26} y={42} w={4} h={12} />
            <P x={26} y={42} w={4} h={12} c="#2c3e50" />
            <O x={34} y={42} w={4} h={12} />
            <P x={34} y={42} w={4} h={12} c="#2c3e50" />

            {/* Shoes */}
            <P x={24} y={52} w={6} h={4} c="#4a3b2a" />
            <P x={34} y={52} w={6} h={4} c="#4a3b2a" />

            {/* Torso */}
            <O x={22} y={30} w={20} h={14} />
            <P x={22} y={30} w={20} h={14} c={
                outfit.includes('Leather') ? '#1a1a1a' :
                    outfit.includes('Pink') ? '#ffb7b2' : // Soft Pastel Pink
                        '#c0392b' // Flannel Red
            } />

            {/* Shirt Detail / Patterns */}
            {outfit.includes('Flannel') && (
                <>
                    <P x={28} y={30} w={8} h={4} c="#2c3e50" /> {/* Collar */}
                    <P x={26} y={34} w={12} h={10} c="rgba(0,0,0,0.1)" /> {/* Plaid shadow */}
                    <P x={32} y={30} w={2} h={14} c="rgba(0,0,0,0.2)" />
                </>
            )}
            {outfit.includes('Pink') && (
                <>
                    <P x={30} y={32} w={4} h={12} c="#fff" /> {/* White inner shirt */}
                    <P x={22} y={30} w={20} h={2} c="#ffdac1" /> {/* Collar highlight */}
                </>
            )}
            {outfit.includes('Leather') && (
                <>
                    <P x={31} y={30} w={2} h={14} c="#555" /> {/* Zipper */}
                    <P x={24} y={34} w={4} h={2} c="#555" /> {/* Pocket */}
                </>
            )}

            {/* Arms */}
            <O x={16} y={32} w={6} h={12} />
            <P x={16} y={32} w={6} h={12} c={
                outfit.includes('Leather') ? '#1a1a1a' :
                    outfit.includes('Pink') ? '#ffb7b2' :
                        '#c0392b'
            } />
            <P x={16} y={42} w={6} h={4} c={skin} /> {/* Hands */}

            <O x={42} y={32} w={6} h={12} />
            <P x={42} y={32} w={6} h={12} c={
                outfit.includes('Leather') ? '#1a1a1a' :
                    outfit.includes('Pink') ? '#ffb7b2' :
                        '#c0392b'
            } />
            <P x={42} y={42} w={6} h={4} c={skin} />

            {/* --- HEAD --- */}
            {/* Hair Back */}


            {/* Face */}
            <O x={18} y={6} w={28} h={26} />
            <P x={18} y={6} w={28} h={26} c={skin} />

            {/* Eyes (Detailed RPG style) */}
            {/* White Sclera */}
            <P x={22} y={16} w={6} h={6} c="#fff" />
            <P x={36} y={16} w={6} h={6} c="#fff" />
            {/* Iris */}
            <P x={24} y={16} w={4} h={6} c={eyes} />
            <P x={38} y={16} w={4} h={6} c={eyes} />
            {/* Pupil/Shine */}
            <P x={26} y={16} w={2} h={2} c="#fff" opacity={0.8} />
            <P x={40} y={16} w={2} h={2} c="#fff" opacity={0.8} />

            {/* Blush */}
            <P x={20} y={24} w={4} h={2} c="#e5aeb3" opacity={0.6} />
            <P x={40} y={24} w={4} h={2} c="#e5aeb3" opacity={0.6} />

            {/* Mouth */}
            <P x={30} y={26} w={4} h={2} c="#a67c52" />

            {/* --- HAIR FRONT --- */}

            {/* Base Cap (All hair has this) */}
            <O x={16} y={4} w={32} h={10} />
            <P x={16} y={4} w={32} h={10} c={hairColor} />
            <P x={20} y={6} w={24} h={2} c="#fff" opacity={0.2} /> {/* Shine */}

            {/* Styles */}
            {hair === 'long-straight' && (
                <>
                    {/* Just Bangs for "Short with Bangs" look */}
                    <O x={14} y={10} w={6} h={10} /> {/* Left Sideburn */}
                    <P x={14} y={10} w={6} h={10} c={hairColor} />

                    <O x={44} y={10} w={6} h={10} /> {/* Right Sideburn */}
                    <P x={44} y={10} w={6} h={10} c={hairColor} />

                    {/* Cute Bangs Frame */}
                    <P x={18} y={14} w={4} h={4} c={hairColor} />
                    <P x={42} y={14} w={4} h={4} c={hairColor} />
                </>
            )}
            {/* Styles */}
            {hair === 'mohawk' && (
                <>
                    {/* Spiky Top Center */}
                    <O x={28} y={-4} w={8} h={12} />
                    <P x={28} y={-4} w={8} h={12} c={hairColor} />
                    {/* Highlights */}
                    <P x={30} y={-2} w={4} h={4} c="#fff" opacity={0.3} />
                    <P x={28} y={4} w={2} h={4} c="rgba(0,0,0,0.2)" />
                    <P x={34} y={4} w={2} h={4} c="rgba(0,0,0,0.2)" />
                </>
            )}
            {hair === 'short-messy' && (
                <>
                    {/* Side Fluff */}
                    <P x={14} y={10} w={6} h={8} c={hairColor} />
                    <P x={44} y={10} w={6} h={8} c={hairColor} />
                    {/* Texture Dots */}
                    <P x={14} y={16} w={2} h={2} c={hairColor} />
                    <P x={48} y={14} w={2} h={2} c={hairColor} />
                    <P x={22} y={6} w={6} h={4} c="#fff" opacity={0.15} /> {/* Highlight */}
                </>
            )}
            {hair === 'bob' && (
                <>
                    {/* Left Side */}
                    <O x={14} y={8} w={6} h={20} />
                    <P x={14} y={8} w={6} h={20} c={hairColor} />
                    {/* Right Side */}
                    <O x={44} y={8} w={6} h={20} />
                    <P x={44} y={8} w={6} h={20} c={hairColor} />
                    {/* Highlights */}
                    <P x={16} y={12} w={2} h={10} c="#fff" opacity={0.2} />
                    <P x={46} y={12} w={2} h={10} c="#fff" opacity={0.2} />
                    {/* Curved Ends */}
                    <P x={16} y={26} w={4} h={2} c={hairColor} />
                    <P x={44} y={26} w={4} h={2} c={hairColor} />
                </>
            )}

        </svg>
    );
};

const CharacterCreation = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        profession: PROFESSIONS[0].id,
        pocketItem: POCKET_ITEMS[0].id,
        appearance: {
            bodyType: 'Type 3',
            skin: SKIN_TONES[2],
            eyeColor: EYE_COLORS[0],
            hairStyle: 'short-messy', // Default for Type 3
            hairColor: '#4a3b2a',
            outfit: OUTFIT_CONCEPTS['Type 3'][0]
        }
    });

    const [step, setStep] = useState(1);

    // Auto-assign Hairstyle & Outfit based on Body Type
    React.useEffect(() => {
        let style = 'bob';
        let outfit = 'Tunic'; // Default

        const { bodyType } = formData.appearance;

        // Logic: 1 Standard Style per Body Type
        if (bodyType === 'Type 1') { // Formerly Female
            style = 'long-straight';
            outfit = 'Pink Jacket';
        } else if (bodyType === 'Type 2') { // Formerly Male
            style = 'mohawk';
            outfit = 'Flannel';
        } else {
            // Type 3 (Formerly Non-Binary)
            style = 'short-messy';
            outfit = 'Leather';
        }

        setFormData(prev => ({
            ...prev,
            appearance: {
                ...prev.appearance,
                hairStyle: style,
                outfit: outfit
            }
        }));
    }, [formData.appearance.bodyType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAppearanceChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            appearance: {
                ...prev.appearance,
                [field]: value,
                // Reset outfit if body type changes to ensure valid option
                ...(field === 'bodyType' ? { outfit: OUTFIT_CONCEPTS[value][0] } : {})
            }
        }));
    };

    const handleSelection = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step === 1 && !formData.name.trim()) return; // Validation for name
        setStep(prev => prev + 1);
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        onComplete(formData);
    };

    const SplitSelection = ({ items, field, selectedId }) => {
        const selectedItem = items.find(i => i.id === selectedId);

        return (
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 340px', // Fixed Right Column
                gap: '2rem',
                height: '482px', // Height for 4 rows of 110px + 3 gaps (110*4 + 16*3 = 488, adjusted to 482)
                alignItems: 'start'
            }}>
                {/* Left Column: Fixed Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)', // 2 Cols = Wider boxes
                    gridAutoRows: '110px',
                    gap: '1rem',
                    height: '100%',
                    alignContent: 'start'
                }}>
                    {items.map(item => {
                        const isSelected = selectedId === item.id;
                        return (
                            <div
                                key={item.id}
                                onClick={() => handleSelection(field, item.id)}
                                style={{
                                    border: 'none',
                                    boxSizing: 'border-box',
                                    // Fixed sizes
                                    width: '100%',
                                    height: '100%',
                                    // Stable Borders via Shadow
                                    boxShadow: isSelected
                                        ? 'inset 0 0 0 4px #2a2a2a, 0 4px 0 #1a1a1a'
                                        : 'inset 0 0 0 1px #666',
                                    background: isSelected ? '#3a3a3a' : 'rgba(200, 200, 200, 0.1)',
                                    color: isSelected ? '#f8f5e3' : '#2a2a2a',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    margin: '10px',
                                    transition: 'background 0.1s ease', // Only animate background color
                                    opacity: isSelected ? 1 : 0.85
                                }}
                            >

                                <div style={{ fontSize: '1.1rem', lineHeight: '1.2' }}>{item.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Right Column: Absolutely Fixed Size Card */}
                <div style={{
                    width: '340px',
                    height: '482px', // Matches Grid height
                    background: '#3a3a3a',
                    color: '#f8f5e3',
                    padding: '2rem',
                    borderRadius: '12px',
                    border: '4px double #f8f5e3',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.3)',
                    margin: '10px',
                    flexShrink: 0 // Prevent shrinking
                }}>
                    {selectedItem?.image ? (
                        <img
                            src={selectedItem.image}
                            alt={selectedItem.label}
                            style={{
                                width: '160px',
                                height: '160px',
                                imageRendering: 'pixelated',
                                marginBottom: '0.5rem',
                                objectFit: 'contain'
                            }}
                        />
                    ) : (
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                            {field === 'profession' ? '💼' : '🎒'}
                        </div>
                    )}
                    <p style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.4',
                        fontStyle: 'italic',
                        opacity: 0.9,
                        margin: 0,
                        padding: '0 0.5rem',
                        marginBottom: selectedItem?.bonus ? '1rem' : 0
                    }}>
                        {selectedItem?.desc}
                    </p>
                    {selectedItem?.bonus && (
                        <div
                            title={selectedItem.bonusDesc || "Special Ability"}
                            style={{
                                marginTop: 'auto',
                                padding: '0.75rem',
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '8px',
                                borderTop: '2px solid #f8f5e3',
                                cursor: 'help'
                            }}
                        >
                            <div style={{
                                fontSize: '1rem',
                                opacity: 0.7,
                                marginBottom: '0.25rem'
                            }}>Bonus Ability</div>
                            <div style={{
                                fontSize: '1.3rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                {selectedItem.bonus}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const getTitle = () => {
        switch (step) {
            case 1: return "How Do you look like now?";
            case 3: return "What is in your pocket?";
            case 5: return "What were you doing before coming here?";
            default: return "";
        }
    };

    const isNarrationStep = step === 2 || step === 4;

    return (
        <div className="scene-container character-creation" style={{
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100vw',
            backgroundImage: isNarrationStep ? `url('/assets/train_interior.png')` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'all 0.5s ease',
            position: 'relative' // Needed for absolute child
        }}>
            {isNarrationStep ? (
                <div style={{
                    maxWidth: '800px',
                    width: '90%',
                    background: '#f8f5e3', // Beige white
                    border: '4px double #2e5c2e', // Ornate green
                    padding: '2rem',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.5)',
                    imageRendering: 'pixelated',
                    position: 'absolute',
                    bottom: '4rem',
                    borderRadius: '15px'
                }}>
                    <p style={{
                        fontSize: '1.6rem',
                        lineHeight: '1.5',
                        marginBottom: '2rem',
                        color: '#1a2f1a', // Dark pine green text
                        fontFamily: '"Jersey 20", sans-serif',
                        letterSpacing: '0.5px',
                        whiteSpace: 'pre-wrap'
                    }}>
                        {step === 2
                            ? "You adjust your clothing, catching your reflection one last time. Your hand brushes something in your pocket—small, familiar, like it’s been there a while.\n\nYou hadn’t noticed it before.\n\nThere’s something in your pocket. You reach in, and see…"
                            : "You slip the item back into your pocket, feeling its weight settle against your side.\n\nFor a moment, you think about everything you left behind. The routines, the people, the version of yourself that existed before this train ride.\n\nWhat were you doing before coming here?"
                        }
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
            ) : (
                <div style={{
                    width: '100%',
                    maxWidth: '1000px', // Widened for grid
                    background: '#f8f5e3',
                    border: '4px double #2e5c2e',
                    padding: '2rem',
                    boxShadow: '0 8px 0 rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.5)',
                    imageRendering: 'pixelated',
                    borderRadius: '15px',
                    color: '#1a2f1a',
                    fontFamily: '"Jersey 20", sans-serif'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '2rem',
                        fontSize: '2.5rem',
                        fontFamily: '"Jersey 20", sans-serif',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        {getTitle()}
                    </h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Step 1: Identity & Visual Appearance */}
                        {step === 1 && (
                            <div style={{ display: 'flex', gap: '2rem', height: '500px' }}>
                                {/* LEFT: Controls */}
                                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                                    {/* Name & Pronouns */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label style={{ display: 'block', marginBottom: '0.8rem' }}>
                                            <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Name</span>
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
                                                    color: '#1a2f1a',
                                                    fontFamily: '"Jersey 20", sans-serif',
                                                    fontSize: '1.3rem',
                                                    padding: '8px',
                                                    borderRadius: '4px'
                                                }}
                                            />
                                        </label>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <label style={{ flex: 1 }}>
                                                <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.3rem' }}>Body Type</span>
                                                <select
                                                    value={formData.appearance.bodyType}
                                                    onChange={(e) => handleAppearanceChange('bodyType', e.target.value)}
                                                    style={{
                                                        width: '100%',
                                                        background: 'transparent',
                                                        border: '2px solid #2e5c2e',
                                                        color: '#1a2f1a',
                                                        fontFamily: '"Jersey 20", sans-serif',
                                                        fontSize: '1.1rem',
                                                        padding: '8px',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    <option value="Type 1">1</option>
                                                    <option value="Type 2">2</option>
                                                    <option value="Type 3">3</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Skin Tone */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Skin Tone</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <input
                                                type="color"
                                                value={formData.appearance.skin}
                                                onChange={(e) => handleAppearanceChange('skin', e.target.value)}
                                                style={{
                                                    width: '60px',
                                                    height: '40px',
                                                    border: '2px solid #2e5c2e',
                                                    borderRadius: '4px',
                                                    background: 'transparent',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <span style={{ fontFamily: '"Jersey 20", sans-serif', fontSize: '1.2rem' }}>
                                                {formData.appearance.skin}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Eye Color */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Eye Color</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <input
                                                type="color"
                                                value={formData.appearance.eyeColor}
                                                onChange={(e) => handleAppearanceChange('eyeColor', e.target.value)}
                                                style={{
                                                    width: '60px',
                                                    height: '40px',
                                                    border: '2px solid #2e5c2e',
                                                    borderRadius: '4px',
                                                    background: 'transparent',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <span style={{ fontFamily: '"Jersey 20", sans-serif', fontSize: '1.2rem' }}>
                                                {formData.appearance.eyeColor}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hair Color Only */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hair Color</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <input
                                                type="color"
                                                value={formData.appearance.hairColor}
                                                onChange={(e) => handleAppearanceChange('hairColor', e.target.value)}
                                                style={{
                                                    width: '60px',
                                                    height: '40px',
                                                    border: '2px solid #2e5c2e',
                                                    borderRadius: '4px',
                                                    background: 'transparent',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <span style={{ fontFamily: '"Jersey 20", sans-serif', fontSize: '1.2rem' }}>
                                                {formData.appearance.hairColor}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* RIGHT: Live Preview */}
                                <div style={{
                                    flex: 1,
                                    background: '#2c2c2c',
                                    borderRadius: '12px',
                                    border: '4px double #f8f5e3',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: '300px',
                                        height: '300px',
                                        imageRendering: 'pixelated'
                                    }}>
                                        <PixelAvatar
                                            skin={formData.appearance.skin}
                                            eyes={formData.appearance.eyeColor}
                                            hair={formData.appearance.hairStyle}
                                            hairColor={formData.appearance.hairColor}
                                            outfit={formData.appearance.outfit}
                                            bodyType={formData.appearance.bodyType}
                                        />
                                    </div>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '10px',
                                        color: '#f8f5e3',
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.5rem',
                                        textTransform: 'uppercase'
                                    }}>
                                        Preview
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Pocket Item */}
                        {step === 3 && (
                            <div>
                                <SplitSelection items={POCKET_ITEMS} field="pocketItem" selectedId={formData.pocketItem} />
                            </div>
                        )}

                        {/* Step 5: Profession */}
                        {step === 5 && (
                            <div>
                                <SplitSelection items={PROFESSIONS} field="profession" selectedId={formData.profession} />
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>


                            {step < 5 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={step === 1 && !formData.name.trim()}
                                    style={{
                                        flex: 1,
                                        background: (step === 1 && !formData.name.trim()) ? '#888' : '#2e5c2e',
                                        color: '#f8f5e3',
                                        border: (step === 1 && !formData.name.trim()) ? '2px solid #666' : '2px solid #1a2f1a',
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.5rem',
                                        padding: '12px',
                                        cursor: (step === 1 && !formData.name.trim()) ? 'not-allowed' : 'pointer',
                                        textTransform: 'uppercase',
                                        boxShadow: (step === 1 && !formData.name.trim()) ? 'none' : '0 4px 0 #1a2f1a',
                                        borderRadius: '8px',
                                        opacity: (step === 1 && !formData.name.trim()) ? 0.6 : 1
                                    }}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        background: '#2e5c2e',
                                        color: '#f8f5e3',
                                        border: '2px solid #1a2f1a',
                                        fontFamily: '"Jersey 20", sans-serif',
                                        fontSize: '1.5rem',
                                        padding: '12px',
                                        cursor: 'pointer',
                                        textTransform: 'uppercase',
                                        boxShadow: '0 4px 0 #1a2f1a',
                                        borderRadius: '8px'
                                    }}
                                >
                                    This was my profession
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CharacterCreation;
