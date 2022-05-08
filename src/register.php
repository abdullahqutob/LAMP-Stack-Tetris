<?php 

session_start();

if($_SERVER["REQUEST_METHOD"] === "POST"){
    if($_POST['password'] !== $_POST['confirm-password']){
        $message = "Passwords do not match, please try again";
        echo "<script type='text/javascript'>alert('$message');</script>";
    } else {
        $db = new mysqli('localhost', 'root', 'password', 'tetris');
        $username = $_POST['username'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $password = $_POST['password'];
        $display = intval($_POST['display']);
        if ($db-> connect_errno){
            echo "error db couldnt connect";
            die();
        }

        $query = "INSERT INTO Users(UserName, FirstName, LastName, Password, Display) VALUES('$username', '$firstname', '$lastname', '$password', '$display')" ;

        $result = $db->query($query);

        if(!$result){
            echo "result query failed";
            die();
        } else {
            $_SESSION['username'] = $username;
            $_SESSION['firstname'] = $firstname;
            $_SESSION['lastname'] = $lastname;
            $_SESSION['display'] = $display;

            header('Location: http://localhost/tetris/index.php');
            die();
        }

    }
}





?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css"></link>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
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

        <div id="registerForm">
            <h1>Register</h1>

            <div id="formInputs">

                <form method="POST" action="#">

                    <input type="text" name="firstname" placeholder="First Name"> <br> <br>

                    <input type="text" name="lastname" placeholder="Last Name"> <br> <br>

                    <input type="text" name="username" placeholder="User name"> <br> <br>

                    <input type="password" name="password" placeholder="Password" id="Password"> <br> <br>

                    <input type="password" name="confirm-password" placeholder="Confirm Password">

                    <label for="displayScore">
                        <h4> Do you want your scores publicly displayed?</h4>
                        Yes  <input type="radio" name="display" value=0> <br id="split">
                        No <input type="radio" name="display" value=1>
                    </label> <br> <br>

                    <button type="submit" class="registerbtn">Register</button> <br> <br>

                    <a href="index.php">Back to Login</a>
 
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


</body>

</html>