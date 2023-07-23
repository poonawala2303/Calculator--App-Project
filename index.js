let runningTotal = 0;
let buffer = '';
let previousOperator;

const screen = document.querySelector('.main-display')

function buttonClick(value)
{
    if(isNaN(value))
    {
        handleSymbol(value)
    }
    else
    {
        handleNumber(value)
    }  
    screen.innerText = buffer 
}

function handleSymbol(symbol)
{
    switch(symbol){
        case 'C':
            buffer = ''
            runningTotal = 0
            break;
        
        case 'Calculate':
            if(previousOperator == null)
            {
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        
        case '←':
            if(buffer.length === 1)
            {
                buffer = 0;
            }
            else
            {
                buffer = buffer.substring(0,buffer.length-1)
            }
            break;
        
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;

    }

}

function handleMath(symbol)
{
    if(buffer === '0')
    {
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0)
    {
        runningTotal = intBuffer;
    }

    else
    {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = 0;
}

function flushOperation(intBuffer)
{
    if(previousOperator === '+')
    {
        runningTotal += intBuffer;
    }
    else if(previousOperator === '−')
    {
        runningTotal -= intBuffer;
    }
    else if(previousOperator === '×')
    {
        runningTotal *= intBuffer;
    }
    else if(previousOperator === '÷')
    {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numStr)
{
    if(buffer === 0)
    {
        buffer = numStr;
    }

    else
    {
        buffer += numStr
    }
}

function init()
{
    document.querySelector('.calci-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();