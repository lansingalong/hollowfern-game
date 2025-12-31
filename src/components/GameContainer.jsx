import React, { useState } from 'react';
import IntroSequence from './IntroSequence';
import CharacterCreation from './CharacterCreation';
import TransitionNarration from './TransitionNarration';
import HouseExploration from './HouseExploration';
import MainMenu from './MainMenu';

export const SCENES = {
    MENU: 'MENU',
    INTRO: 'INTRO',
    CHAR_CREATION: 'CHAR_CREATION',
    TRANSITION: 'TRANSITION',
    HOUSE: 'HOUSE',
    GARDEN: 'GARDEN'
};

const GameContainer = () => {
    const [currentScene, setCurrentScene] = useState(SCENES.MENU);
    const [playerData, setPlayerData] = useState({
        name: '',
        pronouns: '',
        profession: '',
        appearance: {},
        pocketItem: '',
        inventory: []
    });
    const [hasSave, setHasSave] = useState(false);

    // Check for save file on mount
    React.useEffect(() => {
        const saved = localStorage.getItem('hollowfern_save_data');
        if (saved) {
            setHasSave(true);
        }
    }, []);

    const saveGame = (scene, data, room = null) => {
        const saveData = {
            scene,
            playerData: data,
            lastRoom: room,
            timestamp: Date.now()
        };
        localStorage.setItem('hollowfern_save_data', JSON.stringify(saveData));
        setHasSave(true);
    };

    const loadGame = () => {
        const saved = localStorage.getItem('hollowfern_save_data');
        if (saved) {
            const parsed = JSON.parse(saved);
            setPlayerData(parsed.playerData);
            setCurrentScene(parsed.scene);
            // If we are loading into house, we might need to pass the room down
            // For now, we'll store it in playerData temporarily or just handle it in render
        }
    };

    const handleNewGame = () => {
        setCurrentScene(SCENES.INTRO);
    };

    const handleIntroComplete = () => {
        setCurrentScene(SCENES.CHAR_CREATION);
    };

    const handleCharacterComplete = (data) => {
        const newData = { ...playerData, ...data };
        setPlayerData(newData);
        setCurrentScene(SCENES.HOUSE);
        saveGame(SCENES.HOUSE, newData, 'PORCH'); // Auto-save on entry
    };

    const handleTransitionComplete = () => {
        setCurrentScene(SCENES.HOUSE);
    };

    const renderScene = () => {
        switch (currentScene) {
            case SCENES.MENU:
                return <MainMenu
                    onNewGame={handleNewGame}
                    onLoadGame={loadGame}
                    hasSave={hasSave}
                />;
            case SCENES.INTRO:
                return <IntroSequence onComplete={handleIntroComplete} />;
            case SCENES.CHAR_CREATION:
                return <CharacterCreation onComplete={handleCharacterComplete} />;
            case SCENES.TRANSITION:
                return <TransitionNarration onComplete={handleTransitionComplete} />;
            case SCENES.HOUSE:
                // Pass a callback to save progress when moving rooms
                return <HouseExploration
                    playerData={playerData}
                    onAutoSave={(roomId) => saveGame(SCENES.HOUSE, playerData, roomId)}
                    initialRoom={localStorage.getItem('hollowfern_save_data') ? JSON.parse(localStorage.getItem('hollowfern_save_data')).lastRoom : null}
                />;
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
