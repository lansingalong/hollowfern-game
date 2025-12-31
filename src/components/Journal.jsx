import React from 'react';

const Journal = ({ onClose }) => {
    // Helper to get dates for the current week (Monday start)
    const getWeekDays = () => {
        const curr = new Date();
        const first = curr.getDate() - curr.getDay() + 1; // First day is Monday
        const week = [];

        for (let i = 0; i < 7; i++) {
            const next = new Date(curr.getTime());
            next.setDate(first + i);
            const dateStr = next.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const dateNum = next.getDate(); // Just the number
            const dayName = next.toLocaleDateString('en-US', { weekday: 'long' });
            week.push({ name: dayName, date: dateStr, num: dateNum });
        }
        return week;
    };

    const weekDates = getWeekDays();
    const weatherOptions = [
        '/assets/weather/sun.png',
        '/assets/weather/cloud.png',
        '/assets/weather/rain.png',
        '/assets/weather/storm.png'
    ];

    // Generate days (memoized ideally, but this is fine for now)
    const days = weekDates.map(d => ({
        ...d,
        weather: weatherOptions[Math.floor(Math.random() * weatherOptions.length)]
    }));

    const title = `${weekDates[0].date} - ${weekDates[6].date}`;

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
            alignItems: 'center',
            zIndex: 300
        }} onClick={onClose}>
            <div style={{
                width: '95vw',
                maxWidth: '1400px',
                height: 'auto',
                maxHeight: '500px', // Increased slightly for header
                backgroundColor: '#f4e4bc',
                backgroundImage: 'repeating-linear-gradient(#f4e4bc, #f4e4bc 24px, #e8d8b0 25px)',
                borderRadius: '5px',
                boxShadow: '0 0 20px rgba(0,0,0,0.8), inset 0 0 50px rgba(139, 69, 19, 0.2)',
                padding: '2rem',
                position: 'relative',
                fontFamily: '"Jersey 20", sans-serif',
                color: '#2e2620'
            }} onClick={e => e.stopPropagation()}>

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
                    gap: '12px'
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
                    {days.map(day => (
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
                            position: 'relative' // For absolute date positioning
                        }}>
                            {/* Weather Icon (Pixel Art Image) */}
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

                            {/* Date Number (Lower Right) */}
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
                    ))}
                </div>

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
