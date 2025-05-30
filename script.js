console.log("hello");
let songIndex=0;
let songItem = Array.from(document.getElementsByClassName('songItem'));
let audioElment = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let prev = document.getElementById('prevbtn');
let next = document.getElementById('nextbtn');
let myProgressBar = document.getElementById("myProgressBar");
let songs = [
    {songname: "Warriyo salam",filepath:"songs/1.mp3",coverpath:"covers/1.jpg"},
    {songname: "Cielo salam",filepath:"songs/2.mp3",coverpath:"covers/2.jpg"},
    {songname: "Deaf salam",filepath:"songs/3.mp3",coverpath:"covers/3.jpg"},
    {songname: "Different salam",filepath:"songs/4.mp3",coverpath:"covers/4.jpg"},
];
let i=0;
songItem.forEach((element)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname;
    i = i+1;
})
masterPlay.addEventListener("click",()=>{
    console.log("clicked")
    if(audioElment.paused || audioElment.currentTime<=0){
        audioElment.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-pause');
    }else{
        audioElment.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-circle-play');
        document.getElementById(songIndex).classList.remove('fa-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
});

audioElment.addEventListener("timeupdate",()=>{
    var progress = parseInt((audioElment.currentTime/audioElment.duration)*100);
    myProgressBar.value=progress; 
});

myProgressBar.addEventListener("change",()=>{
    audioElment.currentTime = myProgressBar.value * audioElment.duration/100;
});
const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el)=>{
        el.classList.remove('fa-pause');
        el.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        if(audioElment.paused || audioElment.currentTime<=0){
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-pause');
            audioElment.src=`songs/${songIndex+1}.mp3`;
            audioElment.currentTime=0;
            audioElment.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-pause'); 
        }else{
            if(songIndex === parseInt(e.target.id)){
                audioElment.pause();
                makeAllPlay();
                masterPlay.classList.remove('fa-pause');
                masterPlay.classList.add('fa-circle-play');
                e.target.classList.remove('fa-pause');
                e.target.classList.add('fa-circle-play');
            }else{
                audioElment.pause();
                songIndex = parseInt(e.target.id);
                makeAllPlay();
                audioElment.src=`songs/${songIndex+1}.mp3`;
                audioElment.play();
                document.getElementById(songIndex).classList.add('fa-pause');
                document.getElementById(songIndex).classList.remove('fa-circle-play');
            }
        }
    });
})

next.addEventListener("click",()=>{
    if(songIndex===3){
        songIndex=0;
    }else{
        songIndex+=1;
    }
    makeAllPlay();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    audioElment.src=`songs/${songIndex+1}.mp3`;
    audioElment.currentTime=0;
    audioElment.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause'); 
});

prev.addEventListener("click",()=>{
    if(songIndex===0){
        songIndex=3;
    }
    else{
        songIndex-=1;
    }
    makeAllPlay();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-pause');
    audioElment.src=`songs/${songIndex+1}.mp3`;
    audioElment.currentTime=0;
    audioElment.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-pause'); 
})

