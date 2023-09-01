import React from 'react';
import './Button.css';



function Button({className, value, onClick}) {

    return (
            <input type='button' className={className} onClick={onClick} value={value}/>
        )
}

export default Button;