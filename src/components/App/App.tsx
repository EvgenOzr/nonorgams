import { useSelector } from 'react-redux'
import GameField from '../GameField/GameField'
import MenuField from '../MenuField/MenuField'
import './App.sass'
import { RootState } from './store'

function App() {

    const currentTheme = useSelector((state: RootState) => state.theme)

	return (
		<div className = {`app app_${currentTheme}`}>
			<h1 className = 'title'>Nonograms</h1>
			<div className = 'gameContainer'>
				<MenuField />
				<GameField /> 
			</div>
		</div>
	)
}

export default App
