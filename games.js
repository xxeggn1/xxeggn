// =========================
// MEMORY MATCH GAME
// =========================
const memoryGrid = document.getElementById("memory-grid");
const memoryStatus = document.getElementById("memory-status");
const memoryResetBtn = document.getElementById("memory-reset-btn");

if (memoryGrid) {
    const icons = ["🎧", "🎸", "🎮", "🎬", "🕹️", "🎵", "🎤", "🎼"];
    let flippedCards = [];
    let matchedCount = 0;
    let moves = 0;
    let lockBoard = false;

    function shuffleArray(arr) {
        return arr.sort(() => Math.random() - 0.5);
    }

    function buildMemoryBoard() {
        memoryGrid.innerHTML = "";
        flippedCards = [];
        matchedCount = 0;
        moves = 0;
        lockBoard = false;
        memoryStatus.textContent = "Moves: 0";

        const cardValues = shuffleArray([...icons, ...icons]);
        cardValues.forEach((icon) => {
            const card = document.createElement("div");
            card.classList.add("memory-card");
            card.dataset.icon = icon;
            card.textContent = "❓";
            card.addEventListener("click", () => handleCardClick(card));
            memoryGrid.appendChild(card);
        });
    }

    function handleCardClick(card) {
        if (lockBoard) return;
        if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

        card.classList.add("flipped");
        card.textContent = card.dataset.icon;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            memoryStatus.textContent = `Moves: ${moves}`;
            const [first, second] = flippedCards;

            if (first.dataset.icon === second.dataset.icon) {
                first.classList.add("matched");
                second.classList.add("matched");
                flippedCards = [];
                matchedCount++;
                if (matchedCount === icons.length) {
                    memoryStatus.textContent = `Completed in ${moves} moves! 🎉`;
                }
            } else {
                lockBoard = true;
                setTimeout(() => {
                    first.classList.remove("flipped");
                    second.classList.remove("flipped");
                    first.textContent = "❓";
                    second.textContent = "❓";
                    flippedCards = [];
                    lockBoard = false;
                }, 800);
            }
        }
    }

    memoryResetBtn.addEventListener("click", buildMemoryBoard);
    buildMemoryBoard();
}

// =========================
// JUMP GAME (endless runner, Chrome-dino style)
// =========================
const jumpCanvas = document.getElementById("jump-canvas");
const jumpScoreEl = document.getElementById("jump-score");
const jumpStartBtn = document.getElementById("jump-start-btn");

if (jumpCanvas) {
    const ctx = jumpCanvas.getContext("2d");
    let player = { x: 50, y: 150, width: 30, height: 30, vy: 0, jumping: false };
    let obstacles = [];
    let jumpScore = 0;
    let gameSpeed = 4;
    let gameRunning = false;
    let animationFrameId;

    const gravity = 1.2;
    const groundY = 150;

    function resetJumpGame() {
        player = { x: 50, y: groundY, width: 30, height: 30, vy: 0, jumping: false };
        obstacles = [];
        jumpScore = 0;
        gameSpeed = 4;
        jumpScoreEl.textContent = "Score: 0";
    }

    function spawnObstacle() {
        obstacles.push({ x: jumpCanvas.width, y: groundY, width: 20, height: 30 });
    }

    function jump() {
        if (!player.jumping && gameRunning) {
            player.vy = -18;
            player.jumping = true;
        }
    }

    function updateGame() {
        ctx.clearRect(0, 0, jumpCanvas.width, jumpCanvas.height);

        ctx.strokeStyle = "#7C3AED";
        ctx.beginPath();
        ctx.moveTo(0, groundY + player.height);
        ctx.lineTo(jumpCanvas.width, groundY + player.height);
        ctx.stroke();

        player.vy += gravity;
        player.y += player.vy;

        if (player.y > groundY) {
            player.y = groundY;
            player.vy = 0;
            player.jumping = false;
        }

        ctx.fillStyle = "#7C3AED";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        if (Math.random() < 0.02) spawnObstacle();

        obstacles.forEach((obs) => {
            obs.x -= gameSpeed;
            ctx.fillStyle = "#A78BFA";
            ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        });

        obstacles = obstacles.filter((obs) => obs.x + obs.width > 0);

        for (const obs of obstacles) {
            if (
                player.x < obs.x + obs.width &&
                player.x + player.width > obs.x &&
                player.y < obs.y + obs.height &&
                player.y + player.height > obs.y
            ) {
                gameRunning = false;
                jumpScoreEl.textContent = `Game Over — Score: ${jumpScore}`;
                cancelAnimationFrame(animationFrameId);
                jumpStartBtn.style.display = "inline-block";
                jumpStartBtn.textContent = "Play Again";
                return;
            }
        }

        jumpScore++;
        jumpScoreEl.textContent = `Score: ${Math.floor(jumpScore / 5)}`;

        if (jumpScore % 300 === 0) gameSpeed += 0.5;

        if (gameRunning) {
            animationFrameId = requestAnimationFrame(updateGame);
        }
    }

    jumpStartBtn.addEventListener("click", () => {
        resetJumpGame();
        gameRunning = true;
        jumpStartBtn.style.display = "none";
        updateGame();
    });

    window.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            e.preventDefault();
            jump();
        }
    });

    jumpCanvas.addEventListener("click", jump);
}
