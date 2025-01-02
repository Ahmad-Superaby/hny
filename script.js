const textElement = document.getElementById('text');
const me = document.getElementById('me');
const clickTheb = document.getElementById('ctb');
const startButton = document.getElementById('start-button');
const happy = document.getElementById('heading');
const countdownContainer = document.getElementById('countdown-container');
const author = document.getElementById('author');
const hny2025 = document.getElementById('hny2025');
const newYearHeading = document.getElementById('new-year-heading');
const seeMagic = document.getElementById('magic');
const canvas = document.getElementById('newyear');

// Countdown background music
const backgroundMusic = new Audio('https://raw.githubusercontent.com/Ahmad-Superaby/hny/e468d1d6a7feff92c62e536a6e898f404b293814/happy-new-year2.mp3');
backgroundMusic.loop = false;
backgroundMusic.volume = 0.1;

// Fireworks celebration music and sound
const explosionSound = new Audio('https://raw.githubusercontent.com/Ahmad-Superaby/hny/e468d1d6a7feff92c62e536a6e898f404b293814/explosion.mp3');
const newYearMusic = new Audio('https://raw.githubusercontent.com/Ahmad-Superaby/hny/e468d1d6a7feff92c62e536a6e898f404b293814/newyear.mp3');
newYearMusic.loop = true;
newYearMusic.volume = 0.2;

// Ensure the sounds are initialized on user interaction
let audioInitialized = false;
document.body.addEventListener('click', () => {
    if (!audioInitialized) {
        explosionSound.muted = true;
        explosionSound.play();
        explosionSound.pause();
        explosionSound.muted = false;

        newYearMusic.muted = true;
        newYearMusic.play();
        newYearMusic.pause();
        newYearMusic.muted = false;

        audioInitialized = true;
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAnimation() {
    happy.textContent = '🌟 Happy New Year 2025! 🌟';
    textElement.innerHTML = `Wishing you a year full of joy, success, and new beginnings! Let's make this year one to remember, filled with learning, coding, and growth.<br><br>
If you enjoy this code, please upvote to share the celebration! <br><br>
 Don't forget to drop a comment below and let me know how you're enjoying the start of this new year. I'd love to hear about your resolutions, plans, or anything exciting happening in your life.<br><br>
Cheers to an amazing 2025!`;
    await delay(6000);

    happy.textContent = "";
    textElement.style.fontSize = "3rem";
    textElement.style.fontWeight = "bold";

    textElement.textContent = 'LADIES';
    await delay(1000);

    textElement.textContent = '';
    await delay(1000);

    textElement.textContent = 'AND GENTLEMEN';
    await delay(1400);

    textElement.textContent = '';
    await delay(2800);

    textElement.textContent = 'MAY I HAVE YOUR ATTENTION PLEASE';
    await delay(2200);

    textElement.textContent = '';
    await delay(1600);

    textElement.style.fontSize = "7rem";

    for (let i = 10; i >= 1; i--) {
        textElement.textContent = i;
        await delay(1300);
        textElement.textContent = '';
        await delay(700);
    }

    textElement.textContent = '';
    startFireworks();
}

function startFireworks() {
    countdownContainer.style.display = "none";
    author.style.display = "block";
    newYearHeading.style.display = "block";
    hny2025.style.display = "block";
    seeMagic.style.display = "block";
    canvas.style.display = "block";
    newYearMusic.play();
    initFireworks();
}

startButton.addEventListener('click', () => {
    backgroundMusic.play();
    runAnimation();
    me.style.display = 'none';
    clickTheb.style.display = 'none';
    startButton.style.display = 'none';
});

// Fireworks Code
const PI2 = Math.PI * 2;
const random = (min, max) => Math.random() * (max - min + 1) + min | 0;

class NewYear {
    constructor() {
        this.fireworks = [];
        this.counter = 0;
        this.resize();
    }

    resize() {
        this.width = canvas.width = window.innerWidth;
        let center = (this.width / 2) | 0;
        this.spawnA = center - center / 4 | 0;
        this.spawnB = center + center / 4 | 0;

        this.height = canvas.height = window.innerHeight;
        this.spawnC = this.height * 0.1;
        this.spawnD = this.height * 0.5;
    }

    onClick(evt) {
        let x = evt.clientX || (evt.touches && evt.touches[0].pageX);
        let y = evt.clientY || (evt.touches && evt.touches[0].pageY);

        let count = random(3, 5);
        for (let i = 0; i < count; i++) {
            this.fireworks.push(
                new Firework(
                    random(this.spawnA, this.spawnB),
                    this.height,
                    x,
                    y,
                    random(0, 260),
                    random(30, 110)
                )
            );
        }

        this.counter = -1;
    }

    update(delta) {
        const ctx = canvas.getContext('2d');
        ctx.globalCompositeOperation = "hard-light";
        ctx.fillStyle = `rgba(20,20,20,${7 * delta})`;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.globalCompositeOperation = "lighter";
        for (let firework of this.fireworks) firework.update(delta);

        this.counter += delta * 3; // Each second
        if (this.counter >= 1) {
            this.fireworks.push(
                new Firework(
                    random(this.spawnA, this.spawnB),
                    this.height,
                    random(0, this.width),
                    random(this.spawnC, this.spawnD),
                    random(0, 360),
                    random(30, 110)
                )
            );
            this.counter = 0;
        }

        if (this.fireworks.length > 20)
            this.fireworks = this.fireworks.filter((firework) => !firework.dead);
    }
}

class Firework {
    constructor(x, y, targetX, targetY, shade, explosions) {
        this.dead = false;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.shade = shade;
        this.explosions = explosions;
        this.history = [];
        this.exploded = false;
        this.playSound = Math.random() > 0.5;
    }

    update(delta) {
        const ctx = canvas.getContext('2d');
        const xDiff = this.targetX - this.x;
        const yDiff = this.targetY - this.y;

        if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
            this.x += xDiff * 2 * delta;
            this.y += yDiff * 2 * delta;
            this.history.push({ x: this.x, y: this.y });
            if (this.history.length > 20) this.history.shift();
        } else if (this.explosions && !this.exploded) {
            for (let i = 0; i < this.explosions / 2; i++) {
                newYear.fireworks.push(
                    new Firework(
                        this.x,
                        this.y,
                        this.x + this.explosions * Math.cos((PI2 * i) / (this.explosions / 2)),
                        this.y + this.explosions * Math.sin((PI2 * i) / (this.explosions / 2)),
                        this.shade,
                        0
                    )
                );
            }
            if (this.playSound) {
                setTimeout(() => {
                    explosionSound.volume = Math.random() * 0.5 + 0.1;
                    explosionSound.currentTime = 0;
                    explosionSound.play();
                }, 50);
            }
            this.exploded = true;
        } else {
            this.dead = true;
        }

        ctx.beginPath();
        ctx.fillStyle = `hsl(${this.shade},100%,50%)`;
        ctx.arc(this.x, this.y, 2, 0, PI2, false);
        ctx.fill();
    }
}

const newYear = new NewYear();
window.onresize = () => newYear.resize();
document.onclick = evt => newYear.onClick(evt);

function initFireworks() {
    let then = Date.now();
    function loop() {
        const now = Date.now();
        const delta = (now - then) / 1000;
        then = now;
        newYear.update(delta);
        requestAnimationFrame(loop);
    }
    loop();
}