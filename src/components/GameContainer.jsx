import React, { useState } from 'react';
import IntroSequence from './IntroSequence';
import CharacterCreation from './CharacterCreation';
import TransitionNarration from './TransitionNarration';
import PocketItemSelection from './PocketItemSelection';
import HouseScene from './HouseScene';

import HouseExploration from './HouseExploration';
import MainMenu from './MainMenu';
import ProfessionSelection from './ProfessionSelection';

export const SCENES = {
    MENU: 'MENU',
    INTRO: 'INTRO',
    CHAR_CREATION: 'CHAR_CREATION',
    TRANSITION: 'TRANSITION',
    POCKET_SELECTION: 'POCKET_SELECTION',
    HOUSE: 'HOUSE',
    GARDEN: 'GARDEN',
    PROFESSION: 'PROFESSION',
    HOUSE_SCENE: 'HOUSE_SCENE'
};

const GameContainer = () => {
    const [currentScene, setCurrentScene] = useState(SCENES.MENU);
    const [playerData, setPlayerData] = useState({
        name: '',
        pronouns: '',
        profession: '',
        appearance: {},
        pocketItem: null,
        inventory: [],
        saveTitle: ''
    });
    const [hasSave, setHasSave] = useState(false);
    const [saveMetadata, setSaveMetadata] = useState(null);
    const [audioSettings, setAudioSettings] = useState({
        volume: 0.03,
        muted: false
    });

    // Check for save file on mount
    React.useEffect(() => {
        const saved = localStorage.getItem('hollowfern_save_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setHasSave(true);
                setSaveMetadata({
                    title: parsed.playerData.saveTitle || 'Untitled Journey',
                    timestamp: parsed.timestamp || Date.now()
                });
            } catch (e) {
                console.error("Failed to parse save data", e);
            }
        }
    }, []);

    const saveGame = (scene, data, room = null) => {
        const timestamp = Date.now();
        const saveData = {
            scene,
            playerData: data,
            lastRoom: room,
            timestamp
        };
        localStorage.setItem('hollowfern_save_data', JSON.stringify(saveData));
        setHasSave(true);
        setSaveMetadata({
            title: data.saveTitle || 'Untitled Journey',
            timestamp
        });
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

    const handleNewGame = (title = 'Untitled') => {
        setPlayerData(prev => ({ ...prev, saveTitle: title }));
        setCurrentScene(SCENES.INTRO);
    };

    const handleIntroComplete = () => {
        setCurrentScene(SCENES.CHAR_CREATION);
    };

    const handleCharacterComplete = (data) => {
        const newData = { ...playerData, ...data };
        setPlayerData(newData);
        setCurrentScene(SCENES.TRANSITION);
        saveGame(SCENES.TRANSITION, newData);
    };

    const handleTransitionComplete = () => {
        setCurrentScene(SCENES.POCKET_SELECTION);
    };

    const handlePocketSelectionComplete = (item) => {
        const newData = { ...playerData, pocketItem: item };
        setPlayerData(newData);
        setCurrentScene(SCENES.PROFESSION);
        saveGame(SCENES.PROFESSION, newData);
    };

    const handleProfessionComplete = (profession) => {
        const newData = { ...playerData, profession: profession };
        setPlayerData(newData);
        // Transition to the narrative house scene first
        setCurrentScene(SCENES.HOUSE_SCENE);
        saveGame(SCENES.HOUSE_SCENE, newData, 'PORCH');
    };

    const renderScene = () => {
        switch (currentScene) {
            case SCENES.MENU:
                return <MainMenu
                    onNewGame={handleNewGame}
                    onLoadGame={loadGame}
                    hasSave={hasSave}
                    saveMetadata={saveMetadata}
                    audioSettings={audioSettings}
                    setAudioSettings={setAudioSettings}
                />;
            case SCENES.INTRO:
                return <IntroSequence
                    onComplete={handleIntroComplete}
                    audioSettings={audioSettings}
                />;
            case SCENES.CHAR_CREATION:
                return <CharacterCreation onComplete={handleCharacterComplete} />;
            case SCENES.TRANSITION:
                return <TransitionNarration onComplete={handleTransitionComplete} />;
            case SCENES.POCKET_SELECTION:
                return <PocketItemSelection onComplete={handlePocketSelectionComplete} />;
            case SCENES.PROFESSION:
                return <ProfessionSelection onComplete={handleProfessionComplete} />;
            case SCENES.HOUSE_SCENE:
                return <HouseScene onComplete={() => {
                    // After house narrative, go to house exploration
                    setCurrentScene(SCENES.HOUSE);
                    // Save progress for house exploration
                    saveGame(SCENES.HOUSE, playerData, 'PORCH');
                }} />;
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
