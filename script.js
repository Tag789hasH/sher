const startBtn = document.getElementById('start-btn');
const landingScreen = document.getElementById('landing-screen');
const questionScreen = document.getElementById('question-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const bgMusic = document.getElementById('bg-music');
const questionText = document.getElementById('question-text');
const particlesContainer = document.getElementById('particles-container');

// Generate glowing background particles continuously
setInterval(() => {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 8 + 4; // 4px to 12px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.animationDuration = `${Math.random() * 3 + 4}s`; // 4s to 7s
    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 7000);
}, 300);

// Typewriter effect function
const fullText = "Will you go to the Matric Dance with me?";
let charIndex = 0;

function typeWriter() {
    if (charIndex < fullText.length) {
        questionText.innerHTML += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Transition from landing to question screen & play music
startBtn.addEventListener('click', () => {
    landingScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    
    // Start typewriter effect
    typeWriter();

    // Play background music (safely handled if browser blocks autoplay)
    bgMusic.play().catch(error => {
        console.log("Audio autoplay restricted by browser: ", error);
    });
});

// Growing Yes button tracking scale
let yesScale = 1;

// Make the "No" button dodge on hover/touch & grow the Yes button
const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 100);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 100);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Grow the Yes button incrementally
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;
};

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

// Trigger Firework Confetti Burst and Celebration on "Yes"
yesBtn.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    celebrationScreen.classList.remove('hidden');

    // Firework-style multi-burst confetti
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Firework bursts from random points across the screen
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#ff1e38', '#ffffff', '#ff4d6d']
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#ff1e38', '#ffffff', '#000000']
        }));
    }, 250);
});
