import React from 'react';
import './Output.css';

export default function Output({result, operation, long}) {

    if(!long) {
        return(
            <div className='output'>
                <div className='input'>{operation}</div>
                <div className='result'>{result}</div>
            </div>
        )
    }else {
        return(
            <div className='output'>
                <div className='input'>{operation}</div>
                <div className='result long'>{result}</div>
            </div>
        )
    }

    
}