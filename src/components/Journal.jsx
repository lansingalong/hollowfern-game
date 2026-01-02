import React from 'react';

const Journal = ({ onClose }) => {
    // Helper to get dates for the current month
    const getCurrentMonthDays = () => {
        const curr = new Date();
        const year = curr.getFullYear();
        const month = curr.getMonth(); // 0-indexed

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayObj = new Date(year, month, 1);
        let startDay = firstDayObj.getDay(); // 0=Sun, 1=Mon...

        // Adjust for Monday start (Mon=0, ... Sun=6)
        // JS: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
        // Target: Mon=0, Tue=1, ... Sun=6
        const offset = startDay === 0 ? 6 : startDay - 1;

        const daysArray = [];

        // Add padding for start of month
        for (let i = 0; i < offset; i++) {
            daysArray.push({ type: 'padding', id: `pad-${i}` });
        }

        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push({
                type: 'day',
                num: i,
                date: new Date(year, month, i).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                name: `day-${i}`
            });
        }

        return { days: daysArray, monthName: firstDayObj.toLocaleDateString('en-US', { month: 'long' }), year };
    };

    const { days: monthDays, monthName, year } = getCurrentMonthDays();

    const weatherOptions = [
        'assets/weather/sun.png',
        'assets/weather/cloud.png',
        'assets/weather/rain.png',
        'assets/weather/storm.png'
    ];

    // Generate final days list with weather
    const days = monthDays.map(d => {
        if (d.type === 'padding') return d;
        return {
            ...d,
            weather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)]
        };
    });

    const title = `${monthName} ${year}`;

    const [activeTab, setActiveTab] = React.useState('calendar');

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '90px',
            zIndex: 300
        }} onClick={onClose}>
            <div style={{
                width: '95vw',
                maxWidth: '1400px',
                height: 'auto',
                maxHeight: 'calc(100vh - 400px)',
                overflowY: 'auto',
                backgroundColor: '#f4e4bc',
                backgroundImage: 'repeating-linear-gradient(#f4e4bc, #f4e4bc 24px, #e8d8b0 25px)',
                borderRadius: '5px',
                boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 0 50px rgba(139, 69, 19, 0.2)',
                padding: '2rem',
                position: 'relative',
                fontFamily: '"Jersey 20", sans-serif',
                color: '#2e2620',
                display: 'flex',
                flexDirection: 'column'
            }} onClick={e => e.stopPropagation()}>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '2px solid #8b5a2b', paddingBottom: '0.5rem' }}>
                    <button
                        onClick={() => setActiveTab('calendar')}
                        style={{
                            background: activeTab === 'calendar' ? '#8b5a2b' : 'transparent',
                            color: activeTab === 'calendar' ? '#f4e4bc' : '#5e3a18',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.5rem',
                            padding: '5px 15px',
                            borderRadius: '5px 5px 0 0',
                            textTransform: 'uppercase'
                        }}
                    >
                        Calendar
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        style={{
                            background: activeTab === 'map' ? '#8b5a2b' : 'transparent',
                            color: activeTab === 'map' ? '#f4e4bc' : '#5e3a18',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: '"Jersey 20", sans-serif',
                            fontSize: '1.5rem',
                            padding: '5px 15px',
                            borderRadius: '5px 5px 0 0',
                            textTransform: 'uppercase'
                        }}
                    >
                        House Map
                    </button>
                </div>

                {activeTab === 'calendar' ? (
                    <>
                        {/* Title (Date Range) */}
                        <h2 style={{
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            borderBottom: '4px double #2e2620',
                            paddingBottom: '1rem',
                            marginBottom: '1.5rem',
                            textTransform: 'uppercase'
                        }}>
                            {title}
                        </h2>

                        {/* Calendar Grid Container */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '12px',
                            overflowY: 'auto',
                            paddingRight: '5px'
                        }}>
                            {/* Header Row (Day Names) */}
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(dayName => (
                                <div key={dayName} style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    fontSize: '1.2rem',
                                    color: '#5e3a18',
                                    paddingBottom: '5px',
                                    borderBottom: '2px solid #8b5a2b'
                                }}>
                                    {dayName}
                                </div>
                            ))}

                            {/* Day Boxes */}
                            {days.map(day => {
                                if (day.type === 'padding') {
                                    return <div key={day.id} style={{ border: 'none', background: 'transparent' }} />;
                                }
                                return (
                                    <div key={day.name} style={{
                                        border: '2px solid #8b5a2b',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '140px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}>
                                        <img
                                            src={day.weather}
                                            alt="weather"
                                            style={{
                                                width: '64px',
                                                height: '64px',
                                                imageRendering: 'pixelated',
                                                opacity: 0.9
                                            }}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '5px',
                                            right: '8px',
                                            fontSize: '1.4rem',
                                            fontWeight: 'bold',
                                            color: '#5e3a18'
                                        }}>
                                            {day.num}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}>
                        <img
                            src="assets/house_map_pixel.png"
                            alt="House Map"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                border: '4px solid #5e3a18',
                                borderRadius: '4px',
                                imageRendering: 'pixelated',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                            }}
                        />
                        <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#5e3a18' }}>
                            The layout of Verna's house... some corners seem darker on the map than they should be.
                        </p>
                    </div>
                )}

                {/* Close Button Hint */}
                <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '2rem',
                    fontSize: '1rem',
                    opacity: 0.6,
                    fontStyle: 'italic'
                }}>
                    (Click outside to close)
                </div>
            </div>
        </div>
    );
};

export default Journal;
