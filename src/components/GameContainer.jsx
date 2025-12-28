import React, { useState } from 'react';
import IntroSequence from './IntroSequence';
import CharacterCreation from './CharacterCreation';
import TransitionNarration from './TransitionNarration';
import HouseExploration from './HouseExploration';

export const SCENES = {
    INTRO: 'INTRO',
    CHAR_CREATION: 'CHAR_CREATION',
    TRANSITION: 'TRANSITION',
    HOUSE: 'HOUSE',
    GARDEN: 'GARDEN'
};

const GameContainer = () => {
    const [currentScene, setCurrentScene] = useState(SCENES.INTRO);
    const [playerData, setPlayerData] = useState({
        name: '',
        pronouns: '',
        profession: '',
        appearance: {},
        pocketItem: '',
        inventory: []
    });

    const handleIntroComplete = () => {
        setCurrentScene(SCENES.CHAR_CREATION);
    };

    const handleCharacterComplete = (data) => {
        setPlayerData({ ...playerData, ...data });
        setCurrentScene(SCENES.HOUSE);
    };

    const handleTransitionComplete = () => {
        setCurrentScene(SCENES.HOUSE);
    };

    const renderScene = () => {
        switch (currentScene) {
            case SCENES.INTRO:
                return <IntroSequence onComplete={handleIntroComplete} />;
            case SCENES.CHAR_CREATION:
                return <CharacterCreation onComplete={handleCharacterComplete} />;
            case SCENES.TRANSITION:
                return <TransitionNarration onComplete={handleTransitionComplete} />;
            case SCENES.HOUSE:
                return <HouseExploration playerData={playerData} />;
            default:
                return <div>Unknown Scene</div>;
        }
    };

    return (
        <div className="game-container">
            {renderScene()}
        </div>
    );
};

export default GameContainer;
