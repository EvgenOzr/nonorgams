import { useEffect, useState } from 'react';
import './LevelField.sass'
import * as levels from '../../assets/Levels'
import { levelType } from '../../assets/Levels';
import { changeLevel } from '../App/nonoSlice';
import { useDispatch } from 'react-redux';


interface typeTemplate {
    template: number,
    level: number,
    theme: string
}

const LevelField = ({template, level, theme}: typeTemplate) => {

    const [levelName, setLevelName] = useState<levelType[]>([])
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        loadLevels()
    }, [template])

    const loadLevels = () =>{
        const currentlevel: levelType[] = (template === 0) ? levels.levels_5 : (template === 1) ? levels.levels_10 : levels.levels_15 
        setLevelName(currentlevel)
    }

    return (
        <div className="levelChoose">
            <span>Select level: </span>
            <select className={`selectLevel selectLevel_${theme}`} value={level} onChange={(e) => dispatch(changeLevel(+e.target.value))}>
                {levelName && levelName.map((level: levelType, index) => {
                    return <option key={level.name} value={index}>{level.name}</option>
                })}
            </select>
        </div>
    );
};

export default LevelField;