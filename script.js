let curBoard;
const human='O';
const engine='X';
const winCombos=[
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]




const cells = document.querySelectorAll('.cell');
const checkWin=(curBoard,player)=>{
    let tempboard=[];

    // wrote in using brute force should optimise it


    for(let i=0;i<9;i++){
        if(curBoard[i]===player){
            tempboard.push(i);
        }
    }
    
    for(let i=0;i<winCombos.length;i++){
        let count=0;
        for(let j=0;j<winCombos[i].length;j++){
            if(tempboard.includes(winCombos[i][j])){
                 count++;
            }
        }

        if(count==3){
            return winCombos[i];
        }
    }
   
    

    return false;

       
}


const endGame=(isWin)=>{
   for(let i=0;i<isWin.length;i++){
    document.getElementById(isWin[i]).style.backgroundColor="blue";
   }
   for (var i = 0; i < 9; i++) {
    cells[i].removeEventListener('click', turnClick, false);
}

}

const turn=(id,player)=>{
   curBoard[id]=player;
   document.getElementById(id).innerText=player;
   let isWin=checkWin(curBoard,player)
    if(isWin){
        endGame(isWin);
    }
}

const checkTie = () => {
    for (let i = 0; i < curBoard.length; i++) {
        if (typeof curBoard[i] == 'number') {
            return false;
        }
    }
    return true;
}

const freeSpot = () => {
    let temp = [];
    for (let i = 0; i < curBoard.length; i++) {
        if (typeof curBoard[i] == 'number') {
            temp.push(i);
        }
    }
    return temp;
}



const minimax = (newBoard, player) => {
    let availSpots = freeSpot(newBoard);

    if (checkWin(newBoard, human)) {
        return { score: -10 };
    } else if (checkWin(newBoard, engine)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = newBoard[availSpots[i]];

        newBoard[availSpots[i]] = player;

        if (player == engine) {
            let result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, engine);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    let bestMove;
    if (player === engine) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}


const bestSpot = () => {
   //return freeSpot()[0];

   return minimax(curBoard, engine).index;
}

const turnClick = (square) => {
    //console.log(square.target.id);
    if (typeof curBoard[square.target.id] == 'number') {
		turn(square.target.id, human)
		if (!checkTie()) turn(bestSpot(), engine);
	}
    //turn(square.target.id,human)
};

const startGame = () => {
    document.querySelector(".endgame").style.display = "none";
    curBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 9; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
};

startGame();



