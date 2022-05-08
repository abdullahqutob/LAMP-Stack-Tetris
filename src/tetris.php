<?php 

session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $db = new mysqli('localhost', 'root', 'password', 'tetris');

    if (!array_key_exists('username', $_SESSION)){
        http_response_code(403);
        die();
    } else{
        $username = $_SESSION['username'];
        $score = file_get_contents('php://input')+0;
        $query = "INSERT INTO Scores(Username, Score) VALUES('$username', $score)";
        $result = $db->query($query);
        die();
    }
  

}

?>






<!DOCTYPE html>
<html lang="en">
<head>
    <script src="app.js"></script>
    <meta content="width = device-width" charset="utf-8">
    <link rel="stylesheet" href="style.css"></link>
    <title>Play Tetris</title>
</head>


<body>   

    <main>
        <header id="header">
        
            <ul class="navbar">
                <li><a href="index.php">Home</a></li>
                <ul id="navbar-right">
                    <li><a href="tetris.php">Play Tetris</a></li>
                    <li><a href="leaderboard.php">Leaderboard</a></li>
                </ul>
            </ul>
        
        </header>
        
        <br>
        <div id="mid-buttons">
            <button id="start-button" onclick="style.display = 'none'">Start the game</button>
        </div>
        

        <div class="container">
            

            <div class="grid1">
                <img id="grid-bg" src="images/tetris-grid-bg.png">
                <div class="grid">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>    
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                    <div class="taken"></div>
                </div>
            </div>

            <div class="side-display">
                <h3>Your Score: <span id="score">0</span></h3>

                <div class="grid2">
                    <img id="mini-grid-bg" src="images/tetris-mini-grid-bg.png">
                    <div class="mini-grid">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                </div>

                <button id="play-pause" >Play/Pause</button>
                <button id="restart" onClick="window.location.reload()">Play Again</button>
                
                <div id="controls">
                    <p style='font-size: 120%; font-style: italic; text-decoration: underline;'>Controls:</p>
                    <p>Rotate: ↑</p>
                    <p>Move Down: ↓</p>
                    <p>Insta Drop: Spacebar</p>
                    <p>Move Left: ←</p>
                    <p>Move Right: →</p>
                </div>

            </div>
            
        </div>

        <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 


    </main>

</body>
</html>