let squares = document.querySelectorAll(".squares");
let barrer = document.querySelectorAll(".space-btw-sqr");

let message = document.getElementById('message');

let reloadBtn = document.getElementById('reloadBtn')

function reproduzirAudio(audio) {
  if(audio == "move"){
    let audioMove = document.getElementById('audioMove')
    audioMove.play();
  }else if(audio == "wall"){
    let audioWall = document.getElementById('audioWall')
    audioWall.play();
  }

}

const player1 = {
  playerName: '⚫BLACK',
  PlayerPosition: [0,4],
  positionYToWin: -4,
  SetPlayerPosition : function(position){
    let squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML += `<h1 id="player1" class="player">⚫</h1>`;
  },
  RmvOldPlyerPosition : function(position){
    squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML = "";
  }
}
const player2 = {
  playerName: '🔴RED',
  PlayerPosition: [0,-4],
  positionYToWin: 4,
  SetPlayerPosition : function(position){
    let squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML += `<h1 id="player2" class="player">🔴</h1>`;
  },
  RmvOldPlyerPosition : function(position){
    squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML = "";
  }
}

let Winner = function(){
 //winner message and new game button
  message.innerText = `${currentPlayer.playerName} winn!!!`

  reloadBtn.classList.remove('hidden')

  reloadBtn.addEventListener('click', ()=>{
    location.reload();
  })
  //block actions
  player1.PlayerPosition = 0;
  player2.PlayerPosition = 0;
  turn = 0;
  
}

let currentPlayer;
let turn = Math.floor(Math.random()*2)+1;

if(turn === 1){
  message.innerText = `${player1.playerName} starts`
}else{
  message.innerText = `${player2.playerName} starts`
}

if(turn === 1){//initial state
  currentPlayer = player1;
}else if(turn === 2){
  currentPlayer = player2;
}

const ChangeTurn = function(currentTurn){
  if(currentTurn === 1){
    currentPlayer = player2;
    message.innerText = `it's ${player2.playerName} turn`
    return turn = 2;
  }else if(currentTurn === 2){
    currentPlayer = player1;
    message.innerText = `it's ${player1.playerName} turn`
    return turn = 1;
  }
}

barrer.forEach(barrer =>{
  barrer.addEventListener("click", () =>{
    if(turn === 1 && barrer.classList.contains('white')){

      barrer.classList.remove('white');
      barrer.classList.add('black');

      ChangeTurn(turn);
    }else if(turn === 2 && barrer.classList.contains('white')){

      barrer.classList.remove('white');
      barrer.classList.add('red');

      ChangeTurn(turn);
      
    }
    reproduzirAudio("wall")
  });
});

const movementValidation = function(currentPos,clickedPosition){
  /*
   this method "Math.abs" ignores the sign of the number, so we don't care about the direction of the movement, but  whether its absolute value was just one movement.
    */
  let deltaX = Math.abs(clickedPosition[0] - currentPos[0]);
  let deltaY = Math.abs(clickedPosition[1] - currentPos[1]);
  
  if(deltaX === 1 && deltaY === 0){// x move

    if(clickedPosition[0] > currentPos[0]){
      let possibleBarrer = (clickedPosition[0] - 0.5);
      possibleBarrer = (`${possibleBarrer}/${clickedPosition[1]}`);
      console.log(`${possibleBarrer} 1`)
      if(turn == 1 && document.getElementById(possibleBarrer).classList.contains('black') ||
      turn == 2 && document.getElementById(possibleBarrer).classList.contains('red') ||
      document.getElementById(possibleBarrer).classList.contains('white')){
        console.log('Está funcionando2')
        return true;
      }else{
        false;
      }

    }else if(clickedPosition[0] < currentPos[0]){
      let possibleBarrer = (clickedPosition[0] + 0.5);
      possibleBarrer = (`${possibleBarrer}/${clickedPosition[1]}`);
      console.log(possibleBarrer)
      if(turn == 1 && document.getElementById(possibleBarrer).classList.contains('black') ||
      turn == 2 && document.getElementById(possibleBarrer).classList.contains('red') ||
      document.getElementById(possibleBarrer).classList.contains('white')){
        console.log('Está funcionando213')
        return true;
      }else{
        false;
      }
    }
  }else if(deltaX === 0 && deltaY === 1){// y move

      if(clickedPosition[1] > currentPos[1]){
        let possibleBarrer = (clickedPosition[1] - 0.5);
        possibleBarrer = (`${clickedPosition[0]}/${possibleBarrer}`);
        console.log(possibleBarrer)
        if(turn == 1 && document.getElementById(possibleBarrer).classList.contains('black') ||
        turn == 2 && document.getElementById(possibleBarrer).classList.contains('red') ||
        document.getElementById(possibleBarrer).classList.contains('white')){
          return true;
        }else{
          false;
        }

      }else if(clickedPosition[1] < currentPos[1]){
        let possibleBarrer = (clickedPosition[1] + 0.5);
        possibleBarrer = (`${clickedPosition[0]}/${possibleBarrer}`);
        console.log(possibleBarrer)
        if(turn == 1 && document.getElementById(possibleBarrer).classList.contains('black') ||
        turn == 2 && document.getElementById(possibleBarrer).classList.contains('red') ||
        document.getElementById(possibleBarrer).classList.contains('white')){
          return true;
        }else{
          false;
        }
      }
    }
    /* 
Quando clicked > current
SUBTRAIU 0.5 DA CLICKED POSITION
Assim conseguiria o valor da parede que esta na interseção

Quando clicked < current
somo 0.5 DA CLICKED POSITION
Assim conseguiria o valor da parede que esta na interseção
    */
}

squares.forEach(squares =>{
  squares.addEventListener("click", () =>{

    let crrPlayerPosition = currentPlayer.PlayerPosition;

    let clickedPosition = squares.id.split('/');
    clickedPosition = [Number(clickedPosition[0]),Number(clickedPosition[1])]

    console.log(`clicked:   \n${clickedPosition}`);
    console.log(`curr: \n${crrPlayerPosition}`);

    if(movementValidation(crrPlayerPosition, clickedPosition)){
      currentPlayer.PlayerPosition = clickedPosition;

      currentPlayer.RmvOldPlyerPosition(crrPlayerPosition);
    
      currentPlayer.SetPlayerPosition(currentPlayer.PlayerPosition);

      if(player1.PlayerPosition[0] === player2.PlayerPosition[0] &&
        player1.PlayerPosition[1] === player2.PlayerPosition[1]){

        return Winner();
 
      }else if(player1.PlayerPosition[1] === player1.positionYToWin || 
        player2.PlayerPosition[1] === player2.positionYToWin){
     
        return Winner();

      }else{
        ChangeTurn(turn);
        reproduzirAudio("move")
      }
    }
  });
});

player1.SetPlayerPosition(player1.PlayerPosition);
player2.SetPlayerPosition(player2.PlayerPosition);
