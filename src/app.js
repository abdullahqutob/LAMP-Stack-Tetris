document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    const scoreDisplay = document.querySelector("#score")
    const startButton = document.querySelector('#start-button')
    const pausePlayBtn = document.querySelector('#play-pause')
    const restart = document.querySelector('#restart')
    var soundtrack = new Audio('audio/soundtrack.mp3');
    
    let nextRandom = 0
    let timerID
    let score = 0
    const colors = [
        'darkorange',
        'red',
        'darkorchid',
        'limegreen',
        'blue', 
        'magenta'
    ]

    // The Tetrominoes
    const tetrominoL = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    const tetrominoZ = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
      ]
    const tetrominoS = [
        [1, width, width + 1, 2*width],
        [0, 1, width + 1 , width+  2],
        [1, width, width + 1, 2*width],
        [0, 1, width + 1 , width+  2],
    ]
      const tetrominoT = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
      ]
      const tetrominoO = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
      ]
      const tetrominoI = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
      ]

    const theTetrominoes = [tetrominoL, tetrominoZ, tetrominoT, tetrominoO, tetrominoI, tetrominoS]
    
    // randomizing the tetromino that spawns
    let random = Math.floor(Math.random() * theTetrominoes.length)

    let currentPosition = 4
    let currentRotation = 0

    let currentBlock= theTetrominoes[random][0]
    
    // Drawing the first rotation in the first teromino
    function draw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    }

    function undraw() {
        currentBlock.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''
        })
    }

    function isAtLeftEdge() {
        
    }

    function isAtRightEdge() {

    }



    // Call the control() function on a key press
    document.addEventListener('keydown', control)
    
    /**
     * Function that calls tetris-related functions based on pressed key
     */
    function control(key) {
        if(key.keyCode === 37){
            moveLeft()
        } else if (key.keyCode === 39) {
            moveRight()
        } else if (key.keyCode === 40){
            moveDown()
        } else if (key.keyCode === 32){
            instaDrop()
        } else if (key.keyCode === 38) {
            rotate()
        } 
    }
    
    // Stop the browser from scorlling when key is pressed
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false)
    
    /**
     * Move the tetromino to the right unless it's at the right edge
    */
   function moveLeft() {
       undraw()
       isAtLeftEdge = currentBlock.some(index => (currentPosition + index) % width == 0)
       
       if(!isAtLeftEdge) currentPosition -=1
       if(currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))){
           currentPosition +=1
        }
        draw()
    }
    
    /**
     * Move the tetromino to the right unless it's at the right edge
    */
   function moveRight() {
       undraw()
       isAtRightEdge = currentBlock.some(index => (currentPosition + index) % width === width-1)
       if (!isAtRightEdge) currentPosition +=1
       if (currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))){
           currentPosition -=1
        }
        draw()
    }
    
        /**
         * Moves the tetromino down
         */
        function moveDown() {
            undraw()
            currentPosition += width
            draw()
            freeze()
        }

    /**
     * Function that repeatedly calls the moveDown() function until the current tetromino 
     * reaches the bottom, by checking if the score increases
     */
    function instaDrop() {
        undraw()
        initialScore = score
        while (!currentBlock.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            moveDown()
            // check to see if the score has gone up | if a new tetromino is spawned in
            if (initialScore < score) {
                freeze()
                break
            }
        }
    }
 
    /**
     * Stop the current tetromino
     */
    function freeze() {
        if(currentBlock.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            currentBlock.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            score +=1
            scoreDisplay.innerHTML = score
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            currentBlock = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
            makeFaster()
            gameOver()
        }
    }

    /**
     * Changes the interval of the tetromino drop based on the score
     */
    function makeFaster() {
        if (score > 500){
            clearInterval(timerID)
            timerID = setInterval(moveDown, 150)
        } else if (score > 400) {
            clearInterval(timerID)
            timerID = setInterval(moveDown, 200)
        }else if (score > 300) {
            clearInterval(timerID)
            timerID = setInterval(moveDown, 275)
        }else if (score > 200) {
            clearInterval(timerID)
            timerID = setInterval(moveDown, 350)
        }else if (score > 100){
            clearInterval(timerID)
            timerID = setInterval(moveDown, 500)
        }

    }


    //TODO: better comments
    // rotating the tetromino
    function rotate() {
        isAtLeftEdge = currentBlock.some(index => (currentPosition + index) % width == 0)
        isAtRightEdge = currentBlock.some(index => (currentPosition + index) % width === width-1)
        if (isAtLeftEdge || isAtRightEdge) {
            return
        }
        undraw()
        currentRotation ++
        // if the current rotation is 4, reset it | make it go back to 0
        if (currentRotation === currentBlock.length) { 
            currentRotation = 0
        }
        currentBlock = theTetrominoes[random][currentRotation]
        draw()
    }

    // show the upcoming tetromino in the mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 6
    const displayIndex = 7

    // the up next tetromino
    const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2], // Z tetromino
    [displayWidth + 1, 2*displayWidth, 2*displayWidth + 1, 2*displayWidth + 2], // T tetromino
    [displayWidth + 1, displayWidth + 2, 2*displayWidth + 1, 2*displayWidth + 2], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // I tetromino
    [2, displayWidth + 1, displayWidth + 2, 2*displayWidth+ 1], // S tetromino
    ]
 
    //TODO: better comments
    function displayShape() {
        // remove previous tetromino
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
        })
    }


    //TODO: make pause / play into a function
    /**
     * Function that toggles whether the game is playing
     */
    function pausePlay(){
        
    }

    //   functionality to the play/pause button
      pausePlayBtn.addEventListener('click', () => {
        audioPausePlay()
        if (timerID) {
            clearInterval(timerID)
            timerID = null
        } else {
            if (score < 50){
                timerID = setInterval(moveDown, 750)
            } else {
                makeFaster()
            }
        }
      })

    

    /**
     * Function that checks if the sountrack is paused/playing, and toggles between the modes
     */
      function audioPausePlay() {
        if(soundtrack.paused && soundtrack.currentTime > 0 && !soundtrack.ended) {
           soundtrack.play();
        } else {
           soundtrack.pause();
        }
     }

    // add score
    /**
     * Function that loops through every line, and checks if all the blocks
     * have 'taken', and if so, wipes the 
     */
    function addScore(){
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index => { // clears the row
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                //TODO: what do the next lines do?????
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }
    
    // index => squares[currentPosition + index + width] // of all the squares, is the block below taken?
    //     .classList.contains('taken') // is it taken

    
    /**
     * Function that ends the game. Resets game timer, pauses soundtrack, displays the restart game button,
     * and adds the score to the leaderboard
     */
    function gameOver() {
        if(currentBlock.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            scoreDisplay.innerHTML = score 
            clearInterval(timerID)
            soundtrack.pause()
            addToLeaderboard()
            restartGameBtn()
            addToLeaderboard()
        }
    }



    function restartGameBtn(){
        restart.style.visibility = 'visible';
        pausePlayBtn.style.visibility = 'hidden';   
    }

    var isScoreSubmitted = false

    function addToLeaderboard(){
        if (isScoreSubmitted){
            return
        }
        
        fetch('/tetris.php',
        {
            method:'post',
            cache:"no-cache", 
            credentials:"same-origin",
            body:score
        })
        .then(Response => {
            if (Response.status != 200){
                console.log("error submitting")
            }
        })
        .catch(()=>{
            addToLeaderboard()
        })
        
        isScoreSubmitted = true;
    }


    /**
     * 0 == not started, 1 == started
     */
    let gameStarted = 0

    function startGame() {
        soundtrack.play()
        draw()
        timerID = setInterval(moveDown, 800)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        // dont update the mini grid when button is clicked unless its the game starting
        if (gameStarted == 0) {
            displayShape()
            gameStarted = 1
        }
        pausePlayBtn.style.visibility = "visible"
        startButton.style.visibility = "hidden"
    }

    // adding functionality to the start/pause button
    startButton.addEventListener('click', () => {
        console.log("start button pressed");
        startGame()
    })

})
