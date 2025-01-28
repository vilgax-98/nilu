// Background Slideshow
const images = document.querySelectorAll('.background-image');
let currentIndex = 0;

function changeBackground() {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}

setInterval(changeBackground, 5000); // Change image every 5 seconds

// Heart Button
const heartButton = document.getElementById('heartButton');
const heartContainer = document.getElementById('heartContainer');

heartButton.addEventListener('click', () => {
  // Create a heart
  const heart = document.createElement('span');
  heart.innerHTML = '❤️';
  heart.style.fontSize = '2rem';
  heart.style.position = 'absolute';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animation = 'float 5s ease-in-out';
  heartContainer.appendChild(heart);

  // Remove the heart after animation
  setTimeout(() => {
    heart.remove();
  }, 5000);

  // Trigger confetti
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
});

// Floating animation for hearts
const style = document.createElement('style');
style.innerHTML = `
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) scale(0.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);