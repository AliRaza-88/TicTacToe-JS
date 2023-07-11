console.log("welcome to game");

let music = new Audio("/music.mp3");
let audioTurn = new Audio("/ting.mp3");
let gameOverMusic = new Audio("/gameover.mp3");

let gameOver = false;
let turn = "X";



//function to change the turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

//function to check for a win
const checkWin = () => {
    let boxTexts = document.getElementsByClassName('boxText'); 
    let wins = [
        [0,1,2, 5,5,0, 10,10,0],
        [3,4,5, 5,15,0, 10,30,0],
        [6,7,8, 5,25,0, 10,50,0],
        [0,3,6, -5,15,90, -10,30,90],
        [1,4,7, 5, 15,90, 10,30,90],
        [2,5,8, 15,15,90, 30,30,90],
        [0,4,8, 5,15,45, 10,30,45],
        [2,4,6, 5,15,135, 10,30,135]
    ];
    wins.forEach(e => {
        if((boxTexts[e[0]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[2]].innerText === boxTexts[e[1]].innerText) && (boxTexts[e[0]].innerText !== '')){
            document.querySelector('.info').innerText = boxTexts[e[0]].innerText + " Won";
            gameOver = true;
            gameOverMusic.play();
            gameOverMusic.volume = 1.0;
            let imageBox= document.getElementsByClassName('imgBox');
           imageBox[0].getElementsByTagName('img')[0].style.width = '200px';

            if(isViewportMatchingMediaQuery(450)){
              document.querySelector('.line').style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[8]}deg)`;
              document.querySelector('.line').style.width = "40vw";
            }else if(isViewportMatchingMediaQuery(1440)){
              document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
           document.querySelector('.line').style.width = "20vw";
            }
           
        }
    })

};


function isViewportMatchingMediaQuery(x){
  return window.innerWidth <= x;
}

//Game logic
music.play();
music.volume = 0.3;
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxText");
  element.addEventListener("click", () => {
    if (boxText.innerText === "") {
        boxText.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if(!gameOver){
        document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
      }
    }
  });
});

document.querySelector('.reset').addEventListener('click', ()=>{
    let boxTexts = document.getElementsByClassName('boxText'); 
    Array.from(boxTexts).forEach(e=>{
            e.innerText = ''
    });
    turn = 'X';
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    let imageBox= document.getElementsByClassName('imgBox');
    imageBox[0].getElementsByTagName('img')[0].style.width = '0px';
    document.querySelector('.line').style.width = "0vw";



})