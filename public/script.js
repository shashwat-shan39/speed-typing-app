const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteInput = document.getElementById('quoteInput');
const timer =document.getElementById('timer');

quoteInput.addEventListener('input', () =>{
    const quoteArray = quoteDisplay.querySelectorAll('span');
    const inputArray = quoteInput.value.split('');
    let correct=true;
    quoteArray.forEach((charSpan, idx) => {
        const char = inputArray[idx];
        if(char == null){
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct=false;
        }
        else if(char === charSpan.innerText){
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        }
        else{
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            correct=false;
        }
    })
    if(correct){
        getNextQuote();
    }
})

function getRandomQuote(){
   return fetch(RANDOM_QUOTE_API_URL)
   .then(res => res.json())
   .then(data => data.content)
}

async function getNextQuote(){
    const quote = await getRandomQuote();
    quoteDisplay.innerHTML='';
    quote.split('').forEach(char => {
        const charSpan=document.createElement('span');
        charSpan.innerText=char;
        quoteDisplay.appendChild(charSpan);
    });
    quoteInput.value=null;
    startTimer()
}

let startTime;
function startTimer(){
    timer.innerText=0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime();
    },1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000);
}

getNextQuote();