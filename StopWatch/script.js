let timerDisplay = document.querySelector('.timerDisplay');
let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let resetBtn = document.getElementById('resetBtn');

let msec = 0;
let secs = 0;
let min = 0;

let timerId = null;

startBtn.addEventListener('click',function(){
   if(timerId !== null){
    clearInterval(timerId);
   }
    timerId = setInterval(startTimer,10);
})
stopBtn.addEventListener('click',function(){
    clearInterval(timerId);
 })

 resetBtn.addEventListener('click',function(){
    clearInterval(timerId);
    timerDisplay.innerHTML = `00 : 00 : 00`;
    msec = secs = min = 0;
 })
 


function startTimer(){
    msec++;
    if(msec == 100){
      msec=0;
      secs++;
      if(secs == 60){
         secs = 0;
         min++;
      }
    }
   let msecString = msec < 10 ? `0${msec}` : msec;
   let secString = secs < 10 ? `0${secs}` : secs;
   let minString = min < 10 ? `0${min}` : min;

  timerDisplay.innerHTML = `${msecString} : ${secString} : ${minString}`;

}

