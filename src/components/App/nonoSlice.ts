import { createSlice } from "@reduxjs/toolkit"

type NonogramsState = {
    timerStart: boolean,
    gameOver: boolean,
    solution: number[],
    seconds: number,
    level: number,
    template: number,
    theme: string
}

const initialState: NonogramsState = {
    timerStart: false,
    gameOver: false,
    solution: [],
    seconds: 0,
    level: 0,
    template: 0,
    theme: 'light'
}

export const nonoSlice = createSlice({
    name: 'nonograms',
    initialState,
    reducers: {
        start: (state) => {
            state.timerStart = true
        },
        changeTemplate: (state, actions) => {
            state.template = actions.payload
            state.level = 0;
        },
        changeLevel: (state, action) => {
            state.level = action.payload
        },
        setSolution: (state, action) => {
            state.solution.push( action.payload)
        },
        removeSolution: (state, action) => {
            state.solution = state.solution.filter(item => item != action.payload)
        },
        gameOverGame: (state) => {
            state.gameOver = true
        },
        randomGame: (state, action) => {
            state.template = action.payload.template;
            state.level = action.payload.level
        },
        resetGame: (state) => {
            state.timerStart = false
            state.gameOver = false
            state.seconds = 0
            state.solution = []
        },
        setSeconds: (state, action) => {
            state.seconds = action.payload
        },
        showSolution: (state, action) => {
            state.timerStart = false
            state.gameOver = true
            state.solution = action.payload
        },
        loadLevelGame: (state, action) => {
            state.template = action.payload.template
            state.level = action.payload.level
        },
        loadSolutionGame: (state,action) => {
            state.timerStart = false
            state.gameOver = false
            state.solution = action.payload.solution
            state.seconds = action.payload.seconds
        },
        changTheme: (state) => {
            state.theme = (state.theme === 'light') ? 'dark' : 'light'
        }


    }
})

export const { start,
             changeTemplate,
             changeLevel,
             setSolution,
             gameOverGame,
             removeSolution,
             randomGame,
             resetGame,
             setSeconds,
             showSolution,
             loadLevelGame,
             loadSolutionGame,
             changTheme
            } = nonoSlice.actions

export default nonoSlice.reducer