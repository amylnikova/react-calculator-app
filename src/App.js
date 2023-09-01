import React from 'react';
import './App.css';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <div className='App'>
      <Wrapper />
    </div>
  );
}

export default App;





/*
<div className='calc_color_bg'>
        <div className='calc_container'>
          <div className='output'>
            <div className='input'></div>
            <div className='result'>= 30</div>
          </div>
          <div className='keyboard'>
            <button className='clean'>C</button>
            <button className='change_sign'>+/-</button>
            <button className='percent'>%</button>
            <button className='return'>&#8592;</button>
            <button className='number' onClick={clickHandler}>7</button>
            <button className='number' onClick={clickHandler}>8</button>
            <button className='number' onClick={clickHandler}>9</button>
            <button className='operation divide' onClick={clickHandler}>÷</button>
            <button className='number' onClick={clickHandler}>4</button>
            <button className='number' onClick={clickHandler}>5</button>
            <button className='number' onClick={clickHandler}>6</button>
            <button className='operation multiply' onClick={clickHandler}>×</button>
            <button className='number' onClick={clickHandler}>1</button>
            <button className='number' onClick={clickHandler}>2</button>
            <button className='number' onClick={clickHandler}>3</button>
            <button className='operation subtract' onClick={clickHandler}>-</button>
            <button className='number' onClick={clickHandler}>0</button>
            <button className='number dot' onClick={clickHandler}>.</button>
            <button className='total'>=</button>
            <button className='operation add'>+</button>
          </div>
        </div>
      </div>
*/