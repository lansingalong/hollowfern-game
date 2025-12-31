import React from 'react';

const ColorPicker = ({ colors, selectedColor, onSelect, size = '30px' }) => {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginTop: '0.5rem'
        }}>
            {colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                    <button
                        key={color}
                        type="button"
                        onClick={() => onSelect(color)}
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: color,
                            border: isSelected ? '2px solid #f8f5e3' : '2px solid #2e5c2e',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            outline: 'none',
                            boxShadow: isSelected
                                ? '0 0 0 2px #2e5c2e, 0 2px 4px rgba(0,0,0,0.5)'
                                : '0 1px 2px rgba(0,0,0,0.3)',
                            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                        aria-label={`Select color ${color}`}
                    />
                );
            })}
        </div>
    );
};

export default ColorPicker;
