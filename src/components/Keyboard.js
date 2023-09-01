import React from 'react';
import './Keyboard.css';
import Button from './Button'

const buttonValues = ['C', '+/-', '%', '←', 7, 8, 9, '÷', 4, 5, 6, '×', 1, 2, 3, '-', 0, '.', '=', '+'];

function Keyboard({onClick}) {

    return (
        <>
        {buttonValues.map((btn, i) => {
            return(
                <Button 
                    key={i}
                    className={typeof(btn) === 'number' ? 'number' : btn === '.' ? 'number' : 'operation'}
                    onClick={onClick}
                    value={btn}
            />
            )
        })}
        </>
    )
}

export default Keyboard;


