document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const width = 10
    const scoreDisplay = document.querySelector("#score")
    const startButton = document.querySelector('#start-button')
    const pausePlayBtn = document.querySelector('#play-pause')
    const restart = document.querySelector('#restart')
    
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
    var soundtrack = new Audio('audio/soundtrack.mp3');

    // The Tetrominoes
    const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
      ]
    const sTetromino = [
        [1, width, width + 1, 2*width],
        [0, 1, width + 1 , width+  2],
        [1, width, width + 1, 2*width],
        [0, 1, width + 1 , width+  2],
    ]
      const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
      ]
      const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
      ]
      const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
      ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino, sTetromino]
    
    // randomizing the tetromino that spawns
    let random = Math.floor(Math.random()*theTetrominoes.length)

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

    // assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37){
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40){
            moveDown()
        } else if (e.keyCode === 32){
            instaDown()
        }
    }
    document.addEventListener('keydown', control)

    // the function to move the tetromino down
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    }
    // function that instantly makes the tetromino go down to the bottom/to other blocks 
    function instaDown() {
        undraw()
        downScore = score
        while (!currentBlock.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            moveDown()
            // check to see if the score has gone up | if a new tetromino is spawned in
            if (downScore < score) {
                freeze()
                break
            }
        }
    }

    // stop the tetromino 
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

    function makeFaster() {
        if (score > 400){
            clearInterval(timerID)
            timerID = setInterval(moveDown, 150)
        } else if (score > 300) {
            clearInterval(timerID)
            timerID = setInterval(moveDown, 200)
        }else if (score > 200) {
            clearInterval(timerID)
            timerID = setInterval(moveDown, 275)
        }else if (score > 100) {
            clearInterval(timerID)
            timerID = setInterval(moveDown, 350)
        }else if (score > 50){
            clearInterval(timerID)
            timerID = setInterval(moveDown, 500)
        }

    }

    // move the the tetromino sideways unless its at the left edge
    function moveLeft() {
        undraw()
        const isAtLeftEdge = currentBlock.some(index => (currentPosition + index) % width == 0)

        if(!isAtLeftEdge) currentPosition -=1
        if(currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1
        }
        draw()
    }

    // move the tetromino right unless it is at the right edge
    function moveRight() {
        undraw()
        const isAtRightEdge = currentBlock.some(index => (currentPosition + index) % width === width-1)
        if (!isAtRightEdge) currentPosition +=1
        if (currentBlock.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
    }


    // rotating the tetromino
    function rotate() {
        const isAtLeftEdge = currentBlock.some(index => (currentPosition + index) % width == 0)
        const isAtRightEdge = currentBlock.some(index => (currentPosition + index) % width === width-1)
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

    // the next up tetromino
    const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L tetromino
    [1, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2], // Z tetromino
    [displayWidth + 1, 2*displayWidth, 2*displayWidth + 1, 2*displayWidth + 2], // T tetromino
    [displayWidth + 1, displayWidth + 2, 2*displayWidth + 1, 2*displayWidth + 2], // O tetromino
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // I tetromino
    [2, displayWidth + 1, displayWidth + 2, 2*displayWidth+ 1], // S tetromino
    ]
 
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

    let btnval = 0

    // adding functionality to the start/pause button
    startButton.addEventListener('click', () => {
        soundtrack.play()
        draw()
        timerID = setInterval(moveDown, 800)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        // dont update the mini grid when button is clicked unless its the game starting
        if (btnval == 0) {
            displayShape()
            btnval+=1
        }
        pausePlayBtn.style.visibility = "visible";
      })

    //   functionality to the play/pause button
      pausePlayBtn.addEventListener('click', () => {
        togglePause()
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

    //   function that determines if audio is paused or playing, and toggles between those modes
      function togglePause() {
        if(soundtrack.paused && soundtrack.currentTime > 0 && !soundtrack.ended) {
           soundtrack.play();
        } else {
           soundtrack.pause();
        }
     }

    // add score
    function addScore(){
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
            if(row.every(index => squares[index].classList.contains('taken'))) {
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken')
                    squares[index].classList.remove('tetromino')
                    squares[index].style.backgroundColor = ''
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // game over function
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

        isScoreSubmitted = true;
        
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
    }

    // stop the browser from scolling down
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false)


})
