<?php


$db = new mysqli('localhost', 'root', '', 'tetris');

$query = "SELECT u.UserName, Score FROM Scores JOIN Users u on u.UserName = Scores.Username WHERE u.Display = 0 order by Score desc";

$result = $db->query($query);


?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css"></link>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard</title>



    <style>

</style>



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
        

    <?php 
    
        if ($result->num_rows>0){
                
    ?>

<div id="table">
    <table>
        <tr>
            <th>User</th>
            <th>Score</th>
        </tr>
        <?php
        while ($row = $result->fetch_row()){
        ?>
            <tr>
                <td><?php 
                    echo $row[0];
                ?></td>
                
                <td><?php 
                    echo $row[1];
                ?></td>
            </tr>
        <?php
        }
        ?>
    </table>
</div>



    <?php 
        } else {
            $nodata = "No leaderboard data yet";
    ?>

        <div id="lbNoData">
            <?=     "<h1>{$nodata}</h1>";  ?>
            <a href="tetris.php">Play Tetris</a>
        </div>
            <?php }  ?>
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 
        <br> <br> <br> <br> <br> <br> <br> <br> 

    </main>

</body>

</html>