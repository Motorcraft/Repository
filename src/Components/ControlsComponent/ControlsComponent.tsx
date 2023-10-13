import React from "react";
import './styles.css'

function ControlsComponent(props: any){
const{position,changePosition}=props
    const moveLeft = () => {
        changePosition({ ...position, x: position.x - 10 });
    };

    const moveRight = () => {
        changePosition({ ...position, x: position.x + 10 });
    };

    const moveUp = () => {
        changePosition({ ...position, y: position.y - 10 });
    };

    const moveDown = () => {
        changePosition({ ...position, y: position.y + 10 });
    };

    return (
        <div>
            <button className='button-up' onClick={moveUp}>{'↑'}</button>
            <button className='button-left' onClick={moveLeft}>{'←'}</button>
            <button className='button-right' onClick={moveRight}>{'→'}</button>
            <button className='button-down' onClick={moveDown}>{'↓'}</button>
        </div>
    )
}

export default ControlsComponent