let squares = document.querySelectorAll(".squares");
let barrer = document.querySelectorAll(".space-btw-sqr");

squareProperty = {
  top:true,
  right:true,
  bottom:true,
  ledt:true,
}

const player1 = {
  playerName: 'player1',
  PlayerPosition: [-4,4],
  SetPlayerPosition : function(position){
    let squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML += "<h1 id=\"player1\">⚫</h1>";
  },
  RmvOldPlyerPosition : function(position){
    squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML = "";
  }
}
const player2 = {
  playerName: 'player2',
  PlayerPosition: [4,4],
  SetPlayerPosition : function(position){
    let squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML += "<h1 id=\"player2\">🔴</h1>";
  },
  RmvOldPlyerPosition : function(position){
    squareElement = document.getElementById(`${String(position[0])}/${String(position[1])}`);
  
    squareElement.innerHTML = "";
  }
}

let currentPlayer;
let turn = 1;

if(turn === 1){//initial state
  currentPlayer = player1;
}else if(turn === 2){
  currentPlayer = player2;
}


const ChangeTurn = function(currentTurn){
  if(currentTurn === 1){
    currentPlayer = player2;
    return turn = 2;
  }else if(currentTurn === 2){
    currentPlayer = player1;
    return turn = 1;
  }
}



const movementValidation = function(currentPos,clickedPosition){
  /**
   * this method "Math.abs" ignores the sign of the number, so we don't care about the direction of the movement, but  whether its absolute value was just one movement.Thanks chatgpt :)
   * */
  let deltaX = Math.abs(clickedPosition[0] - currentPos[0]);
  let deltaY = Math.abs(clickedPosition[1] - currentPos[1]);
  
  if(deltaX === 1 && deltaY === 0){// x move

    return true

  }else if(deltaX === 0 && deltaY === 1){// y move

    return true

    }
}

barrer.forEach(barrer =>{
  barrer.addEventListener("click", () =>{
    if(turn === 1 && barrer.style.backgroundColor === ""){
      barrer.style.backgroundColor = "black"
      barrer.id = '';
      ChangeTurn(turn);
    }else if(turn === 2 && barrer.style.backgroundColor === ""){
      barrer.style.backgroundColor = "red"
      barrer.id = '';
      ChangeTurn(turn);
    }
  });
});

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

      if(player1.PlayerPosition[0] === player2.PlayerPosition[0]){
        if(player1.PlayerPosition[1] === player2.PlayerPosition[1]){
          console.log(`${currentPlayer.playerName} winn!!!`)
          location.reload();
        }
      }
      ChangeTurn(turn);
    }
  });
});

player1.SetPlayerPosition(player1.PlayerPosition);
player2.SetPlayerPosition(player2.PlayerPosition);
