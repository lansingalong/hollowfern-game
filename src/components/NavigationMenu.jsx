import React from 'react';

const NavigationMenu = ({ onOpenJournal, onToggleMap, style }) => {
    // Style for the tabs
    const tabStyle = {
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
        position: 'relative',
        transition: 'transform 0.1s',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
        zIndex: 10
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            ...style // Allow overriding position from parent
        }} onClick={(e) => e.stopPropagation()}>
            <div
                onClick={onOpenJournal}
                style={tabStyle}
                title="Journal"
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                📖
            </div>
            <div
                onClick={onToggleMap}
                style={tabStyle}
                title="House Plan"
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
                🗺️
            </div>
        </div>
    );
};

export default NavigationMenu;
