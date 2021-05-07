const screens=document.querySelectorAll('.screen');
const choose_insect_btns=document.querySelectorAll('.choose-insect-btn');
const start_btn=document.getElementById('start-btn');
const game_container=document.getElementById('game-container');
const timeEl=document.getElementById('time');
const scoreEl=document.getElementById('score');
const message=document.getElementById('message');
const restart=document.querySelector('.refresh');
const aud=document.querySelector('.aud');
//audio
var start=new Audio('./audio/start.mp3');
var mc=new Audio('./audio/MC.mp3');
var bc=new Audio('./audio/BC.mp3');
var bsdk=new Audio('./audio/BSDK.mp3');
var machar=new Audio('./audio/macchar.mp3');
var tum=new Audio('./audio/tum.mp3');
var ho_kya=new Audio('./audio/ho kya.mp3');
// var saleem=new Audio('./audio/saleem.mp3');
var gandu=new Audio('./audio/gaandu.mp3');



//

let seconds=0;
let score=0;
let selected_insect={};

start_btn.addEventListener('click',()=>{
    start.play();
    screens[0].classList.add('up')
});
aud.addEventListener('click',()=>saleem.play())
restart.addEventListener('click',()=>{
    start.play();
    window.location.reload();
});


choose_insect_btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
        const img=btn.querySelector('img');
        const src=img.getAttribute('src');
        const alt=img.getAttribute('alt');
        selected_insect={src,alt};
        if(alt==='fly')
        bc.play();
        else if(alt==='spider')
        mc.play();
        else if(alt==='roach')
        bsdk.play();
        else
        machar.play();
        screens[1].classList.add('up');
        setTimeout(createInsect,1000);
        startGame();
    })
})

function startGame(){
    setInterval(increaseTime,1000);
}
function increaseTime(){
    let m=Math.floor(seconds/60);
    let s=seconds %60;
    m=m<10?`0${m}`:m;
    s=s<10?`0${s}`:s;
    timeEl.innerHTML=`Time: ${m}:${s}`;
    seconds++;
}
function createInsect(){
    const insect=document.createElement('div');
    insect.classList.add('insect');
    const{x,y}=getRandomLocation();
    insect.style.top=`${y}px`;
    insect.style.left=`${x}px`;
    
    insect.innerHTML=`
    <img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform:rotate(${Math.random()*360}deg)"/>
    `;
    
    insect.addEventListener('click',catchInsect);
    game_container.appendChild(insect);
    
}
//random loc
function getRandomLocation(){
    const width=window.innerWidth;
    const height=window.innerHeight;
    const x=Math.random()*(width-200)+100;
    const y=Math.random()*(height-200)+100;
    return{x,y};
}

let c=0;
function catchInsect(){
    //audio
    if(selected_insect.alt==='fly')
        bc.play();
    else if(selected_insect.alt==='spider')
        mc.play();
    else if(selected_insect.alt==='roach')
        bsdk.play();
    else
        {
            if(c==0)
            bc.play();
            else if(c==1)
            tum.play();
            else if(c==2)
            mc.play();
            else if(c==3)
            ho_kya.play();
            else if(c==4)
            bsdk.play();
            else if(c==5)
            gandu.play();
            else{
                machar.play();
                c=-1;
            }
            c++;
        }
    increaseScore();
    this.classList.add('caught');
    setTimeout(()=>this.remove(),2000);
    addInsects();
}
function increaseScore(){
    score++;
    if(score>19){
        message.classList.add('visible');
    }
    scoreEl.innerHTML=`Score: ${score}`;
}

function addInsects(){
    setTimeout(createInsect,1000);
    setTimeout(createInsect,1500);
    
}