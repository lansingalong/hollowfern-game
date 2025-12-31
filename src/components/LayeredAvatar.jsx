import React from 'react';

/**
 * TINTED LAYER COMPONENT
 * Uses CSS masking to tint a grayscale image with a specific color.
 */
const TintedLayer = ({ src, color, style, zIndex }) => {
    if (!src) return null;

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: color,
                WebkitMaskImage: `url(${src})`,
                maskImage: `url(${src})`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                zIndex: zIndex, // Ensure z-index is applied
                imageRendering: 'pixelated', // Critical for pixel art look
                ...style
            }}
        />
    );
};

/* Simple Image Layer (No Tinting) */
const ImageLayer = ({ src, style, zIndex }) => {
    if (!src) return null;
    return (
        <img
            src={src}
            alt=""
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                imageRendering: 'pixelated',
                zIndex: zIndex,
                ...style
            }}
        />
    );
};

const LayeredAvatar = ({ skin, eyes, hair, hairColor, outfit, bodyType }) => {
    /**
     * ASSET PATH CONFIGURATION
     * Matches the flat structure in /public/assets/character/
     */

    // Helper to format body type string to filename part (e.g. "Type 1" -> "body_type_1")
    const getBodyFilename = (type) => {
        if (!type) return 'body_type_1'; // Default
        return type.toLowerCase().replace(' ', '_');
    };

    // 1. BODY BASE
    // Assets: body_type_1.png, body_type_2.png
    const bodyFilename = getBodyFilename(bodyType);
    const bodySrc = `${import.meta.env.BASE_URL}assets/character/${bodyFilename}.png`;

    // 2. EYES
    // Assets: eyes_base.png (Generic for now)
    const eyesSrc = `${import.meta.env.BASE_URL}assets/character/eyes_base.png`;

    // 3. HAIR
    // Assets: hair_bob.png, hair_messy.png
    // Map hairstyles to filenames if needed, or use direct naming
    // Current options: 'short-messy', 'bob', 'long-straight', 'braid', 'bald', 'mohawk'
    // Available assets: hair_bob.png, hair_messy.png
    const getHairFilename = (style) => {
        if (style === 'bob') return 'hair_bob';
        if (style === 'short-messy') return 'hair_messy';
        // Fallbacks for missing assets
        if (style === 'long-straight') return 'hair_bob';
        if (style === 'mohawk') return 'hair_messy';
        if (style === 'braid') return 'hair_bob';
        return 'hair_messy'; // Default
    };

    const hairSrc = hair === 'bald' ? null : `${import.meta.env.BASE_URL}assets/character/${getHairFilename(hair)}.png`;

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Layer 1: Skin - Tinted Body Base */}
            <TintedLayer src={bodySrc} color={skin} zIndex={1} />

            {/* Layer 1b: Texture/Shading for Body (Multiply) 
                Using the same image as strict multiply layer to add definition back 
                if the tint wipes out all detail.
            */}
            <ImageLayer
                src={bodySrc}
                zIndex={2}
                style={{ mixBlendMode: 'multiply', opacity: 0.5 }}
            />

            {/* Layer 2: Eyes - Tinted */}
            <TintedLayer src={eyesSrc} color={eyes} zIndex={3} />

            {/* Layer 3: Hair - Tinted */}
            {hairSrc && <TintedLayer src={hairSrc} color={hairColor} zIndex={4} />}

            {/* Layer 3b: Hair Texture/Shading (Multiply) */}
            {hairSrc && (
                <ImageLayer
                    src={hairSrc}
                    zIndex={5}
                    style={{ mixBlendMode: 'multiply', opacity: 0.6 }}
                />
            )}

            {/* Note: Outfit layer omitted as no assets present yet */}
        </div>
    );
};

export default LayeredAvatar;
