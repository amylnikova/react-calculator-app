import React, { useState, useEffect } from 'react';
import './Wrapper.css';
import Output from './Output';
import Keyboard from './Keyboard';


function Wrapper() {
    let [state, setState] = useState({
        sign: '',
        num: '0',
        res: '0',
        resultIsClicked: false
    });

    let [operationOutput, setOperationOutput] = useState('0');
    let [resultOutput, setResultOutput] = useState('0');
    let [longOutput, setLongOutput] = useState(false);

    useEffect(() => {
        setResultOutput(
            state.resultIsClicked ? formatNumber(state.res) 
                : !state.resultIsClicked && state.res !== '0' && state.num === '0'? formatNumber(state.res) 
                : formatNumber(state.num));
        setOperationOutput(
            state.sign && state.res !== '0' && state.num !=='0' ? `${formatNumber(state.res)}  ${state.sign} ${formatNumber(state.num)}`
                : !state.sign && state.res === '0' && state.num !== '0' ? `${formatNumber(state.num)}`
                : state.sign && state.res !== '0' && state.num === '0' ? `${formatNumber(state.res)} ${state.sign}`
                : state.resultIsClicked ? `${formatNumber(state.res)}`
                : '0'
        )
    },[state])
    
    useEffect(() => {
        if(state.num.length >= 9) {
            setLongOutput(true);
        }
        
        return () => setLongOutput(false);
    }, [state])
    

    function formatNumber(num) {
        if (/\./.test(num)) {
            let floatIndex = num.indexOf('.');
            let float = num.slice(floatIndex);
            let int = num.slice(0, floatIndex);
            if(int.length > 5) {
                for(let i = int.length - 3; i > 0; i -= 3) {
                
                    int = int.slice(0, i) + ',' + int.slice(i);
                }
            }
            num = int + float;
        }else if( /-/.test(num)){
            let positiveNum = num.slice(1);
            let minus = num.slice(0,1);
            if(positiveNum.length > 3) {
                for(let i = positiveNum.length - 3; i > 0; i -= 3) {
                
                    positiveNum = positiveNum.slice(0, i) + ',' + positiveNum.slice(i);
                }
            }
            num = minus + positiveNum;

        }else {
            if(num.length > 5) {
                for(let i = num.length - 3; i > 0; i -= 3) {
                
                    num = num.slice(0, i) + ',' + num.slice(i);
                }
            }
        }

        
        
        return num;
    }

    
    

    function clickHandler(e) {
        let btn = e.target.value;

        btn === 'C'
            ? resetClickHandler(btn)
            : btn === '+/-'
            ? invertClickHandler(btn)
            : btn === '%'
            ? percentClickHandler(btn)
            : btn === '←'
            ? returnClickHandler(btn)
            : btn === '÷' || btn === '×' || btn === '-' || btn === '+'
            ? signClickHandler(btn)
            : btn === '.'
            ? dotClickHandler(btn)
            : btn === '='
            ? resultClickHandler(btn)
            :numClickHandler(btn)

        function signHandler(sign) {
            let calculation = 0;
            switch(sign) {
                case '+':
                    calculation = (parseFloat(state.res) + parseFloat(state.num)).toString();
                    break;
                case '-':
                    calculation = (parseFloat(state.res) - parseFloat(state.num)).toString();
                    break;
                case '×':
                    calculation = (parseFloat(state.res) * parseFloat(state.num)).toString();
                    break;
                case '÷': 
                    calculation = (parseFloat(state.res) / parseFloat(state.num)).toString();
                    break;
                default:
                    calculation = 0;
                    break;
            }
            return calculation;
        }

        function resetClickHandler(reset) {
            setState({sign: '', num: '0', res: '0', resultIsClicked: false});
        }
    
        function invertClickHandler(invert) {
            setState(state.num !== '0' && /^-/.test(state.num) ? { ...state, num: state.num.slice(1), resultIsClicked: false} 
                : state.num !== '0' && !/^-/.test(state.num) ? {...state , num: `-${state.num}`, resultIsClicked: false} 
                : state.num === '0' && state.res !== '0' && /^-/.test(state.res) ? { ...state, res: state.res.slice(1), resultIsClicked: false} 
                : state.num === '0' && state.res !== '0' && !/^-/.test(state.res) ? {...state , res: `-${state.res}`, resultIsClicked: false}
                : {...state});
        }
    
        function percentClickHandler(percent) {
            setState(
                state.res === '0' ? {res: (parseFloat(state.num) / 100).toString(), num: '0', sign: '', resultIsClicked: false}
                    : state.res !== '0' && state.num === '0' ? {...state, res: (parseFloat(state.res) / 100).toString(), sign: '', resultIsClicked: false}
                    : state.sign ? { ...state, num: (parseFloat(state.res) * parseFloat(state.num) / 100).toString(), resultIsClicked: false} 
                    : {...state, resultIsClicked: false}
            );
        }

        function returnClickHandler(back) {
            setState(
                state.num.length === 1 ? {...state, num: '0', resultIsClicked: false}
                    : {...state, num: state.num.slice(0, -1), resultIsClicked: false}
            );
        }
    
        function signClickHandler(sign) {

            setState(
                state.res === '0' ? {sign: sign, num: '0', res: state.num, resultIsClicked: false}   
                    : !state.sign ? {...state, sign: sign, resultIsClicked: false}
                    : {sign: sign, num: '0', res: signHandler(state.sign), resultIsClicked: false}
            );
        }
    
        function dotClickHandler(dot) {
            setState(
                !/\./.test(state.num) ? {...state, num: state.num += '.', resultIsClicked: false} : {...state, resultIsClicked: false}
            );
        }
    
        function resultClickHandler(result) {

            setState(
                state.sign ? {sign: '', num: '0', res: signHandler(state.sign), resultIsClicked: true}
                    : {...state, num: '0', res: state.num, resultIsClicked: true}
            );

        }

        
    
        function numClickHandler(number) {
            
            setState(state.num === '0' ? {...state, num: number, resultIsClicked: false}
                : state.res !== '0' && !state.sign ? {...state, num: state.num+=number, res: '0', resultIsClicked: false}
                : state.num.length >= 9 ? {...state, resultIsClicked: false}
                : {...state, num: state.num += number, resultIsClicked: false}
            );

        }
    }

    return (
        <div className='calc_color_bg'>
            <div className='calc_container'>
                <Output result={resultOutput} operation={operationOutput} long={longOutput} />
                <div className='keyboard'>
                    <Keyboard onClick={clickHandler} />
                </div>
                
            </div>
        </div>
    )
}

export default Wrapper;
