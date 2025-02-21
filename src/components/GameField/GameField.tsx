// import React from 'react';
import { useEffect, useRef, useState} from "react";
import {useDispatch, useSelector } from "react-redux";
import {start, setSolution, gameOverGame, removeSolution, resetGame, setSeconds} from '../App/nonoSlice'
import './GameField.sass'
import { RootState } from "../App/store";
import * as levels from '../../assets/Levels'
import Clues from "../Clues/Clues";
import { levelType } from "../../assets/Levels";
import Cells from "../Cells/Cells";


const GameField = () => {

    const game = useSelector((state: RootState) => state.timerStart)
    const level = useSelector((state: RootState) => state.level)
    const template = useSelector((state: RootState) => state.template)
    const solution = useSelector((state: RootState) => state.solution)
    const gameOver = useSelector((state: RootState) => state.gameOver)
    const seconds =  useSelector((state: RootState) => state.seconds)
    const currentTheme = useSelector((state: RootState) => state.theme)

    const dispatch = useDispatch()

    const [timer, setTimer] = useState(0)
    const [size, setSize] = useState(5)
    const [xCell, setXCell] = useState<number[]>([]) 
    const [fieldSize, setFieldSize]= useState('')
    const [gameFieldSize, setGameFieldSize]= useState('')
    const timerId = useRef(0)
    const currentlevel: levelType[] = (template === 0) ? levels.levels_5 : (template === 1) ? levels.levels_10 : levels.levels_15

    useEffect(() => {
        if(game){
            timerId.current = setInterval(() => {       
                setTimer(t => t + 1)
            }, 1000)
        } else {
            createGameField()
            setXCell([])
        }        
        return () => {
            clearInterval(timerId.current)
        }
    }, [game])

    useEffect(() => {
        dispatch(setSeconds(timer))
    },[timer])

    useEffect(() => {
        clearInterval(timerId.current)
    }, [gameOver])

    useEffect(() => {
        dispatch(resetGame())
        createGameField()
    },[level, template])

    useEffect(() => {

        if(!gameOver) {
            const sortSolution: number[] = JSON.parse(JSON.stringify(solution))
            sortSolution.sort((a, b) => a - b)
            setTimeout(() => {
                if(JSON.stringify(currentlevel[level].solution) === JSON.stringify(sortSolution)) {
                    dispatch(gameOverGame())
                    alert(`Great! You have solved the nonogram in ${seconds} seconds!`)
                }
            }, 300)
        }
        if(!game) {
            createGameField(seconds)
        }
    },[solution])

    const createGameField = (seconds = 0) => {
        const size: number = (template === 0) ? 5 : (template === 1) ? 10 : 15
        setSize(size)
        setTimer(seconds)
        setFieldSize(`${size*30 + 200}px`)
        setGameFieldSize(`${size*30 + size}px`)
    }


    // const playSound = (sound: string) => {
    //     const newSound = new Audio()
    //     newSound.src = `../../sounds/${sound}.mp3`
    //     console.log(newSound.src);
    //     newSound.play()
    // }

    const updateTimer = () => {
        let minutes: string = (Math.floor(timer/60) < 10) ? `0${Math.floor(timer/60)}` : `${Math.floor(timer/60)}`
        let seconds: string = (timer%60 < 10) ? `0${timer%60}` : `${timer%60}`
        return `${minutes}:${seconds}`;
    }

    const leftClickFieldHandle = (e) => {
        if(!game && !gameOver) dispatch(start())
        if(e.target.classList.contains('cell') && !gameOver){
            if(e.target.classList.contains('cell_x')) e.target.classList.remove('cell_x')
                if(!e.target.classList.contains('cell_black')){
                    dispatch(setSolution(+e.target.id))
                    // playSound('left')
                } else {
                    dispatch(removeSolution(+e.target.id))
                }
                e.target.classList.toggle('cell_black')
        }
    }

    const rightClickFieldHandle = (e) => {
        if(!game && !gameOver) dispatch(start())
        e.preventDefault()
        if(e.target.classList.contains('cell') && !gameOver){
            if(e.target.classList.contains('cell_black')){
                dispatch(removeSolution(+e.target.id))
                e.target.classList.remove('cell_black')
            }
            e.target.classList.toggle('cell_x')
            setXCell((state) => [...state, +e.target.id])
        }
    }

    return (
        <div className ='fieldWrapper'>
            <div className={`field field_${currentTheme}`} style={{height: fieldSize, width: fieldSize}}>
                <div className={`timer timer_${currentTheme}`}>
                    {updateTimer()}
                </div>
                <div className={`gameField`} 
                     style={{height: gameFieldSize, width: gameFieldSize}} 
                     onClick ={leftClickFieldHandle}
                     onContextMenu={rightClickFieldHandle}>
                    <Cells size={size} solution={solution} theme={currentTheme} xCell={xCell}/>
                </div>
                <Clues typeClues={'upCluesCell'} clues={currentlevel[level].upClues} theme={currentTheme}/>
                <Clues typeClues={'leftCluesCell'} clues={currentlevel[level].leftClues} theme={currentTheme}/>
            </div>
        </div>
    );
};

export default GameField;
