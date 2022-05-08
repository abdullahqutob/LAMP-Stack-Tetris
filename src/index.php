<?php 

session_start();

if($_SERVER["REQUEST_METHOD"] == "POST"){

    $db = new mysqli('localhost', 'root', 'password', 'tetris');

    $query = "SELECT UserName, FirstName, LastName, Display from Users where UserName = '{$_POST['username']}' AND Password = '{$_POST['password']}'";

    $result = $db->query($query);

    if ($result->num_rows != 1){
        $message = "Incorrect username and/or password, please try again";
        echo "<script type='text/javascript'>alert('$message');</script>";
    } else{
        $user = $result->fetch_row();

        $_SESSION['username'] = $user[0];
        $_SESSION['firstname'] = $firstname[1];
        $_SESSION['lastname'] = $lastname[2];
        $_SESSION['display'] = $display[3];

        header('Location: http://localhost/tetris/index.php');
        die();
    }
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css"></link>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
</head>
    



<main>

    <body>   

        <?php
            if (array_key_exists('username', $_SESSION)){
        ?>
        
        <header id="header">
        
            <ul class="navbar">
                <li><a href="index.php">Home</a></li>
                <ul id="navbar-right">
                    <li><a href="tetris.php">Play Tetris</a></li>
                    <li><a href="leaderboard.php">Leaderboard</a></li>
                </ul>
            </ul>
        
        </header>
        
            <div id="indexWelcome">
                    <h1 id='welc'>Welcome to Tetris</h1>
                    <a id="indexPlay" href="tetris.php">Click Here to Play</a>
            </div>
            <br> <br> <br> <br> <br> <br> <br> <br> 
            <br> <br> <br> <br> <br> <br> <br> <br> 
            <br> <br> <br> <br> <br> <br> <br> <br> 
            <br> <br> <br> <br> <br> <br> <br> <br> 
            <br> <br> <br> <br> <br> <br> <br> <br> 
            <br> <br> <br> <br> <br> <br> <br> <br> 
            <br> <br> <br> <br> <br> 

        
            
    </body>



<?php

    } else{

?>

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

        <div id="loginForm">
            <h1>Login</h1>

            <div id="loginInputs">
                
                <form method="POST" action="#">

                    <input type="text" name="username" placeholder="User name"> <br> <br>

                    <input type="password" name="password" placeholder="Password" id="Password"> <br> <br>

                    <button type="submit" class="registerbtn">Login</button> <br> <br>

                    <p>Don’t have an account?  <a href="register.php">Register now</a></p>
 
                </form>

            </div>
        </div>


        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 

    </main>

<?php

    }


?>
</html>
