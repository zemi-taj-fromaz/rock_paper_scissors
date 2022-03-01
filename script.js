function computerPlay(){
    let a = Math.floor(Math.random()*3);
    if(a==0){
        return "rock";
    }
    else if (a==1){
        return "paper";
    }
    return "scissors";
}

const moves = Array.from(document.querySelectorAll(".move"))

function playRound(playerSelection,computerSelection){
    const results = document.querySelector('.results')
    let newGame = document.createElement('div');
    newGame.innerText = playerSelection + " " + computerSelection
    if(computerSelection == playerSelection){
        newGame.innerText = "TIE"
    }
    else if (playerSelection == "ROCK" && computerSelection == "SCISSORS" || playerSelection=="PAPER" && computerSelection == "ROCK" || playerSelection == "SCISSORS" && computerSelection == "ROCK"){
        let score = document.querySelector('.player')
        let currText = score.innerText
        score.innerText = parseInt(currText) + 1

        if(score.innerText == "5"){
            console.log("POBJEDA")
            const gameOver = document.querySelector('.msg');
            
            gameOver.style.color="green";
            gameOver.innerText = "YOU WIN"
            const end = gameOver.parentNode;
            const button = document.createElement('button')
            button.innerText = "PLAY AGAIN"
            button.addEventListener('click', function() {
                window.parent.location = window.parent.location.href;
            }, false);
            end.appendChild(button)
           
            

            moves.forEach(move => move.removeEventListener('click',makeMove))
        }
        
    }
    else {
        let score = document.querySelector('.computer')
        let currText = score.innerText
        score.innerText = parseInt(currText) + 1

        if(score.innerText == "5"){
            console.log("PORAZ")
            const gameOver = document.querySelector('.msg');
            
            gameOver.style.color="red";
            gameOver.innerText = "YOU LOSE"
            const end = gameOver.parentNode;
            const button = document.createElement('button')
            button.innerText = "PLAY AGAIN"
            button.addEventListener('click', function() {
                window.parent.location = window.parent.location.href;
            }, false);
            end.appendChild(button)
            results.appendChild(newGame)

            moves.forEach(move => move.removeEventListener('click',makeMove))
        }
    }

    results.appendChild(newGame)

    


    

}




function makeMove(e){
    const playerMove = e.path[1].classList[0].toUpperCase()
    const elem = document.querySelector('.' + e.path[1].classList[0]);
    console.log(elem)
    elem.classList.add('playing');
    const computerMove = computerPlay().toUpperCase();
    playRound(playerMove,computerMove)
    
}

function removeTransition(e){
    console.log(e)
    e.target.classList.remove('playing');
}

moves.forEach(move => move.addEventListener('click',makeMove))
moves.forEach(e => e.addEventListener('transitionend', removeTransition));

//game();
