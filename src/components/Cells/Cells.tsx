import { useEffect, useState } from "react";
import './Cells.sass'

interface cellsType {
    size: number;
    solution: number[];
    theme: string;
    xCell: number[];
}

const Cells = ({size, solution, theme, xCell}: cellsType) => {

    const [cells, setCells] = useState<React.ReactElement[]>([])
    // console.log(cells);
    
    useEffect(() => {
        createCells()
    }, [size, solution, theme, xCell])
    
    const createCells = () => {
        const newCells = []
        let baseStyle = ''
        let clickStyle = ''
        if(theme === 'light'){
            baseStyle = ''
            clickStyle = 'cell_black'
        } else {
            baseStyle = 'themeDark'
            clickStyle = 'cellDarkTheme'

        }
        for(let i = 0; i < size*size; i++){
            const xStyle = (xCell.includes(i)) ? 'cell_x' : ''
            const newStyle = (solution.includes(i)) ? `cell ${clickStyle}` : `cell ${xStyle} ${baseStyle}`
            newCells.push(
                <div 
                    className = {newStyle}
                    id={`${i}`} 
                    key={baseStyle + clickStyle + i}>
                </div>
            )
        }
        setCells(newCells)
    }

    return (
        <>
            {/* <div>Cells</div> */}
            {cells}
        </>
    );
};

export default Cells;