import RecordsField, { recordType } from '../RecordsField/RecordsField';
import {useDispatch, useSelector } from "react-redux";
import './MenuField.sass'
import { useEffect, useState } from 'react';
import LevelField from '../LevelField/LevelField';
import { RootState } from '../App/store';
import * as levels from '../../assets/Levels'
import {changeTemplate,
        loadLevelGame, 
        loadSolutionGame, 
        randomGame, 
        resetGame, 
        showSolution,
        changTheme} from '../App/nonoSlice'
import { levelType } from '../../assets/Levels';

interface saveGameType {
    template: number
    level: number,
    solution: number[],
    seconds: number
}


const MenuField = () => {

    const [currentTemplate, setCurrentTemplate] = useState(0)
    const [currentlevel, setCurrentLevel] = useState(0)
    const [newRecord, setNewRecord] = useState<recordType | null>(null)
    const currentlevelGame: levelType[] = (currentTemplate === 0) ? levels.levels_5 : (currentTemplate === 1) ? levels.levels_10 : levels.levels_15

    const level = useSelector((state: RootState) => state.level)
    const template = useSelector((state: RootState) => state.template)
    const solution = useSelector((state: RootState) => state.solution)
    const seconds = useSelector((state: RootState) => state.seconds)
    const currentTheme = useSelector((state: RootState) => state.theme)
    const gameOver = useSelector((state: RootState) => state.gameOver)
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentTemplate(template)
        setCurrentLevel(level)
        
    }, [template, level])

    const randomGameHandle = () => {

        function random(min: number, max: number) {
            const rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
    
        const template = random(0, 2)
        const level = random(0, 4)
    
        dispatch(randomGame({level, template}))
    }

    useEffect(() => {
        if(gameOver) {
            const templateLevels = ['5 x 5', '10 x 10', '15 x 15']
            const recordNew :recordType = {
                name: currentlevelGame[currentlevel].name,
                template: templateLevels[currentTemplate],
                seconds
            }
            setNewRecord(recordNew)
        }

    }, [gameOver])
    
    const resetGameHandle = () => {
        dispatch(resetGame())
    }

    const showSolutionHandle = () => {
        dispatch(showSolution(currentlevelGame[currentlevel].solution))
    }

    const saveGameHandle = () => {
        let saveGame: saveGameType = {
            template,
            level,
            solution,
            seconds
        }
        localStorage.setItem('saveGame', JSON.stringify(saveGame))
    }

    const loadGameHandle = () => {
        const storage = localStorage.getItem('saveGame')
        if(storage) {
            let saveGame: saveGameType = JSON.parse(storage) 
            const template = +saveGame.template
            const level = +saveGame.level
            const solution = saveGame.solution
            const seconds = +saveGame.seconds
            
            dispatch(loadLevelGame({template, level}))
            setTimeout(
                () => dispatch(loadSolutionGame({solution, seconds}))
            ,50)
        } else {
            alert('No saved games')
        }
    }

    const changThemeHandle = () => {
        dispatch(changTheme())
    }

    return (
        <div className={`menuField menuField_${currentTheme}`}>
            <div className="templateChoose">
                <span>Select template: </span>
                <select className ={`selectTemplate selectTemplate_${currentTheme}`} value={currentTemplate} onChange={(e) => dispatch(changeTemplate(+e.target.value))}>
                    <option value="0">5 x 5</option>
                    <option value="1">10 x 10</option>
                    <option value="2">15 x 15</option>
                </select>
            </div>
            <LevelField template={template} level={currentlevel} theme={currentTheme}/>
            <button className={`menuButton menuButton_${currentTheme}`} onClick={resetGameHandle}>Reset game</button>
            <button className={`menuButton menuButton_${currentTheme}`} onClick={saveGameHandle}>Save game</button>
            <button className={`menuButton menuButton_${currentTheme}`} onClick={loadGameHandle}>Load game</button>
            <button className={`menuButton menuButton_${currentTheme}`} onClick={randomGameHandle}>Random game</button>
            <button className={`menuButton menuButton_${currentTheme}`} onClick={showSolutionHandle}>Show solution</button>
            <button className={`menuButton menuButton_${currentTheme}`} onClick={changThemeHandle}>Change theme</button>
            <button className={`menuButton menuButton_${currentTheme}`}>Sound off</button>
            <RecordsField theme={currentTheme} record={newRecord}/>
        </div>
    );
};

export default MenuField;