document.addEventListener("DOMContentLoaded", function() {
    const paddle1 = document.getElementById("paddle1");
    const paddle2 = document.getElementById("paddle2");
    const ball = document.getElementById("ball");
    const scoreDisplay = document.getElementById("score");
    const container = document.querySelector(".container");

    let ballX = container.clientWidth / 2 - ball.clientWidth / 2;
    let ballY = container.clientHeight / 2 - ball.clientHeight / 2;
    let ballSpeedX = 4;
    let ballSpeedY = 4;
    let paddleSpeed = 10;
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;

    // Move paddles
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp") {
            movePaddle(paddle2, -paddleSpeed);
        } else if (event.key === "ArrowDown") {
            movePaddle(paddle2, paddleSpeed);
        } else if (event.key === "w") {
            movePaddle(paddle1, -paddleSpeed);
        } else if (event.key === "s") {
            movePaddle(paddle1, paddleSpeed);
        }
    });

    function movePaddle(paddle, speed) {
        let top = parseInt(paddle.style.top) || container.clientHeight / 2 - paddle.clientHeight / 2;
        top += speed;
        top = Math.max(Math.min(top, container.clientHeight - paddle.clientHeight), 0);
        paddle.style.top = top + "px";
    }

    // Move ball
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Collision with walls
        if (ballY <= 0 || ballY >= container.clientHeight - ball.clientHeight) {
            ballSpeedY = -ballSpeedY;
        }

        // Collision with paddles
        if (ballX <= paddle1.clientWidth && 
            ballY + ball.clientHeight >= parseInt(paddle1.style.top) && 
            ballY <= parseInt(paddle1.style.top) + paddle1.clientHeight) {
            ballSpeedX = -ballSpeedX;
            scorePlayer1++;
            updateScore();
        }

        if (ballX + ball.clientWidth >= container.clientWidth - paddle2.clientWidth && 
            ballY + ball.clientHeight >= parseInt(paddle2.style.top) && 
            ballY <= parseInt(paddle2.style.top) + paddle2.clientHeight) {
            ballSpeedX = -ballSpeedX;
            scorePlayer2++;
            updateScore();
        }

        // Check if ball is out of bounds
        if (ballX <= 0 || ballX >= container.clientWidth - ball.clientWidth) {
            resetBall();
        }

        // Update ball position
        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";
    }

    function resetBall() {
        ballX = container.clientWidth / 2 - ball.clientWidth / 2;
        ballY = container.clientHeight / 2 - ball.clientHeight / 2;
    }

    function updateScore() {
        scoreDisplay.textContent = `${scorePlayer1} - ${scorePlayer2}`;
    }

    function gameLoop() {
        moveBall();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
S