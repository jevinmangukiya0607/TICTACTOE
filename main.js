const selectBox = document.querySelector(".select-box");
const selectXbtn = selectBox.querySelector(".options .playerX");
const selectObtn = selectBox.querySelector(".options .playerO");
const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const resultBox = document.querySelector(".result-box");
const wonText = document.querySelector(".won-text");
const rePlay = document.querySelector(".btn button");

window.onload = ()=> {
    
    for(let i= 0 ; i < allBox.length; i++){
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    
}

selectXbtn.onclick = () =>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}
selectObtn.onclick = () =>{
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class","players active player");
} 


let playerXIcon = "fas fa-times"; 
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`; 
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; 
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    setTimeout(()=>{
        bot(runBot);
    },1000);
}

// bot

function bot(runBot) {
    let array = [];
       if (runBot) {
        playerSign = "O"; 
        for(let i= 0 ; i < allBox.length; i++){
           if(allBox[i].childElementCount == 0){
              array.push(i);
           }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)];
        if (array.length>0) {
            if (players.classList.contains("player")) {
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; 
                players.classList.remove("active");
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; 
                players.classList.remove("active");    
                allBox[randomBox].setAttribute("id", playerSign);
    
            }
        selectWinner();
        }
        allBox[randomBox].style.pointerEvents = "none";
        playBoard.style.pointerEvents = "auto";
        playerSign = "X";
       }
}

function getId(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkId(val1,val2,val3,sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkId(1,2,3,playerSign) || checkId(4,5,6, playerSign) || checkId(7,8,9, playerSign) || checkId(1,4,7, playerSign) || checkId(2,5,8, playerSign) || checkId(3,6,9, playerSign) || checkId(1,5,9, playerSign) || checkId(3,5,7, playerSign)) {
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
             playBoard.classList.remove("show");
             resultBox.classList.add("show");
        },700);
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }
    else{ 
        if(getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != ""){
            runBot = false; 
            bot(); 
            setTimeout(()=>{ 
                resultBox.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); 
            wonText.textContent = "Match has been drawn!"; 
        }
    }
}

rePlay.onclick = ()=>{
    window.location.reload();
}