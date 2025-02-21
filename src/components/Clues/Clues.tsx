import { useSelector } from 'react-redux';
import './Clues.sass'
import { RootState } from '../App/store';
import React, { useEffect, useState } from 'react';


interface typeClues {
    typeClues: string,
    clues: number[][],
    theme: string
}

const Clues = ({typeClues, clues, theme}: typeClues) => {

    const level: number = useSelector((state: RootState) => state.level)
    const template: number = useSelector((state: RootState) => state.template)

    
    const [heightClues, setHeightClues] = useState('')
    const [widthClues, setWidthClues] = useState('')
    const [bottomClues, setBottomClues] = useState('')
    const [rightClues, setRightClues] = useState('')
    const [cells, setCells] = useState<React.ReactElement[]>([])
    
    useEffect(() => {
        // console.log(theme, level, template);
        const size: number = (template === 0) ? 5 : (template === 1) ? 10 : 15
        if(typeClues === 'upCluesCell') {
            setHeightClues(`${4*30 + size}px`)
            setWidthClues(`${size*30 + size}px`)
            setBottomClues(`${20 + size*30 + size}px`)
            createInnerCells(size, 'height', theme)
        } else {
            setHeightClues(`${size*30 + size}px`)
            setWidthClues(`${4*30 + size}px`)
            setRightClues(`${20 + size*30 + size}px`)
            createInnerCells(size, 'width', theme)
        }

    },[template, level, theme])

    const createInnerCells = (size: number, type: string, theme: string) => {
        const newStyle: React.CSSProperties = (type === 'height') ? {height: `100%`} : {width: `100%`, 'flexDirection': 'row-reverse'}
        const cellClue = []

        //clues
        for(let i = 0; i < size; i++){
            const innerCells = []
            const clueArr = JSON.parse(JSON.stringify(clues[i])).reverse()
            for(let j = 0; j < 4; j++) {
                innerCells.push(<div className="innerCell" key={type + i + j}>{clueArr[j]}</div>)
            }
            cellClue.push(<div className={`cellClue cellClue_${theme}`} style={newStyle} key={i}>{innerCells}</div>)
        }
        setCells(cellClue)
    }

    return (
        <div 
            className={typeClues} 
            style={
                {height: heightClues,
                 width: widthClues,
                 right: rightClues,
                bottom: bottomClues}
        }>
            {cells}
        </div>
    );
};

export default Clues;