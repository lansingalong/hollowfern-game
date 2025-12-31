import React from 'react';

const HouseExploration = ({ playerData }) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'red',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontSize: '2rem',
            fontFamily: 'sans-serif'
        }}>
            <h1>DEBUG MODE: RED BOX TEST</h1>
            <p>If you see this, the House Exploration component is mounting correctly.</p>
            <p>Playing as: {playerData ? playerData.name : 'Unknown'}</p>
        </div>
    );
};

export default HouseExploration;
