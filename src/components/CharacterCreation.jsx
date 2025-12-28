import React, { useState } from 'react';

const PROFESSIONS = [
    { id: 'keyholder', label: 'Keyholder', desc: 'Retail manager. Bonus: Stocked and Ready.' },
    { id: 'healer', label: 'Healer on Call', desc: 'Nurse. Bonus: Tender Frequency.' },
    { id: 'mechanic', label: 'Machine Whisperer', desc: 'Mechanic. Bonus: Quiet Efficiency.' },
    { id: 'teacher', label: 'Final Exam Boss', desc: 'Educator. Bonus: Lesson Plan.' },
    { id: 'radio', label: 'Midnight Voice', desc: 'Radio Host. Bonus: Signal in the Static.' },
    { id: 'coder', label: 'Code Gremlin', desc: 'Software Engineer. Bonus: Reality Fork().' },
    { id: 'maker', label: 'DIY Entrepreneur', desc: 'Maker. Bonus: Maker’s Yield.' },
    { id: 'scholar', label: 'Open Tabs Scholar', desc: 'Student. Bonus: Overprepared.' }
];

const POCKET_ITEMS = [
    'Brass lighter',
    'Googly eye',
    'Train ticket',
    'Plastic monster charm',
    'Taco eraser',
    'Silver coin'
];

const CharacterCreation = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        name: '',
        pronouns: '',
        profession: PROFESSIONS[0].id,
        pocketItem: POCKET_ITEMS[0],
        appearance: {
            skin: 'Medium',
            outfit: 'Outfit 1'
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name.trim()) {
            onComplete(formData);
        }
    };

    return (
        <div className="scene-container character-creation" style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Who are you?</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <label style={{ display: 'block', textAlign: 'left' }}>
                        <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</span>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="input-field"
                            required
                        />
                    </label>

                    <label style={{ display: 'block', textAlign: 'left' }}>
                        <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Pronouns</span>
                        <select
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="">Select...</option>
                            <option value="she/her">She/Her</option>
                            <option value="he/him">He/Him</option>
                            <option value="they/them">They/Them</option>
                        </select>
                    </label>

                    <label style={{ display: 'block', textAlign: 'left' }}>
                        <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Profession</span>
                        <select
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {PROFESSIONS.map(p => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                        <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
                            {PROFESSIONS.find(p => p.id === formData.profession)?.desc}
                        </small>
                    </label>

                    <label style={{ display: 'block', textAlign: 'left' }}>
                        <span style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Pocket Item</span>
                        <select
                            name="pocketItem"
                            value={formData.pocketItem}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {POCKET_ITEMS.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <small style={{ display: 'block', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>Found in your pocket. Familiar.</small>
                    </label>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Begin Journey</button>
                </form>
            </div>
        </div>
    );
};

export default CharacterCreation;
