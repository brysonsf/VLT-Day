
const names = [
  { text: "Courtney", emoji: "💗" },
  { text: "Pretty Lady", emoji: "💃" },
  { text: "Lovely Lady", emoji: "🌹" },
  { text: "My Sweet Girl", emoji: "🍬" },
  { text: "My Queen", emoji: "👑" },
  { text: "Love of My Life", emoji: "💞" }
];
const adjectives = [
  { text: "superbly sweet", emoji: "🍓" },
  { text: "dangerously delicious", emoji: "🍫" },
  { text: "absurdly attractive", emoji: "😏" },
  { text: "concerningly cute", emoji: "🐰" },
  { text: "painfully pretty", emoji: "💖" },
  { text: "the peak of perfection", emoji:"🏔️" }
];
const outcomes = [
  { text: "have my whole heart this Valentines.", emoji: "💘" },
  { text: "owe me a billion kisses.", emoji: "😘" },
  { text: "I love you like a fat kid loves cake.", emoji: "🎂" },
  { text: "you make my head spin like a broken PS2 disc.", emoji: "💫" },
  { text: "I treasure you deeply in my life.", emoji: "🧸" },
  { text: "you are my Valentine forever and always.", emoji: "♾️💖" }
];

let spinCount = 0;

const reelName = document.getElementById("reel-name");
const reelAdj = document.getElementById("reel-adj");
const reelOut = document.getElementById("reel-outcome");
const result = document.getElementById("result");

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function spinReel(reel, arr, duration, finalItem) {
  const itemHeight = 120;
  const spins = Math.floor(duration / 100);

  reel.style.transition = "none";
  reel.style.transform = "translateY(0)";
  reel.innerHTML = "";

  // Create fake spinning items
  for (let i = 0; i < spins; i++) {
    const temp = randomItem(arr);
    reel.innerHTML += `
      <div class="reel-item">
        ${temp.emoji}
      </div>
    `;
  }

  // Append the REAL final item
  reel.innerHTML += `
    <div class="reel-item">
      ${finalItem.emoji}
    </div>
  `;

  // Force layout before animating
  reel.offsetHeight;

  const finalOffset = spins * itemHeight;
  
// Use duration for smooth stopping
  reel.style.transition = `transform ${duration}ms cubic-bezier(.2,.7,.3,1.1)`;
  
  reel.style.transform = `translateY(-${finalOffset}px)`;
}

document.getElementById("spinBtn").addEventListener("click", () => {
  spinCount++;

  const finalName = randomItem(names);
  const finalAdj = randomItem(adjectives);
  const finalOutcome = randomItem(outcomes);

  spinReel(reelName, names, 1500, finalName);
  spinReel(reelAdj, adjectives, 2000, finalAdj);
  spinReel(reelOut, outcomes, 3000, finalOutcome);

   setTimeout(() => {
    let message = `${finalName.text} you are ${finalAdj.text} and ${finalOutcome.text}`;
    lever.style.transform = "rotate(0deg)";
    if (spinCount >= 3) {
      message += " 😳";
    }
    if (spinCount >= 5) {
      message = "💖 " + message.toUpperCase() + " 💖";
    }

    // Jackpot
    if (spinCount >= 10) {
      message = "💖 JACKPOT 💖 YOU ARE MY VALENTINE. THERE IS NO ESCAPE.";
    
        result.textContent = "💖 JACKPOT 💖 YOU ARE MY VALENTINE FOREVER AND ALWAYS";
        triggerJackpot();
        document.body.style.background = "hotpink";
        if(spinCount===10)
        setTimeout(() => {
          revealValentine();
        }, 2500); // 2000 milliseconds = 2 seconds
    }
    result.textContent = message;
  }, 2200);
});

function triggerJackpot() {
  document.body.classList.add("jackpot");

  document.querySelectorAll(".reel").forEach(r => {
    r.classList.add("jackpot");
  });

  for (let i = 0; i < 30; i++) {
    setTimeout(spawnHeart, i * 1000);
  }
  /* Play sound
  const sound = document.getElementById("jackpotSound");
  sound.currentTime = 0;
  sound.play();
  */
  // Confetti
  if (window.confetti) {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { x: 0.5, y: 0.4 }
      });
    }, 300);
  } else {
    console.error("Confetti failed to load");
  }
}
const heartContainer = document.getElementById("heart-container");

const hearts = ["💖", "💘", "💕", "💗", "💓"];

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 20 + Math.random() * 30 + "px";
  heart.style.animationDuration = 6 + Math.random() * 6 + "s";

  heartContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}

setInterval(spawnHeart, 400);

const lever = document.getElementById("lever");

lever.addEventListener("mousedown", () => {
  // Pull lever down
  lever.style.transform = "rotate(60deg)";
  // Trigger spin
  document.getElementById("spinBtn").click();
});
function revealValentine() {
  const overlay = document.getElementById("valentineOverlay");
  overlay.style.display = "flex";
  startRunawayButton();
}

function startRunawayButton(){

  const no = document.getElementById("noBtn");

  let offsetX = 0;
  let offsetY = 0;
  const safeRadius = 100; // mouse must stay this far from the button

  document.addEventListener("mousemove", e => {
    const rect = no.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = btnX - e.clientX;
    const dy = btnY - e.clientY;
    const dist = Math.hypot(dx, dy);

    if (dist < safeRadius) {
      const angle = Math.atan2(dy, dx);

      // Move only as much as needed to be outside the radius
      const move = safeRadius - dist;
      offsetX += Math.cos(angle) * move;
      offsetY += Math.sin(angle) * move;

      no.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

      const curr = no.getBoundingClientRect();
      
      const currX = curr.left + rect.width / 2;
      const currY = curr.top + rect.height / 2;
      if(currX>window.innerWidth){
        offsetX-=curr.width / 2;
      }
      if(currX<0){
        offsetX+=curr.width / 2;
      }
      
      if(currY>window.innerHeight){
        offsetY-=curr.height / 2;
      }

      if(currY<0){
        offsetY+=curr.height / 2;
      }
      no.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    }
  });
}
document.getElementById("yesBtn").addEventListener("click", () => {
  // hide the overlay
  document.getElementById("valentineOverlay").style.display = "none";

  // show the celebration above the slot machine
  document.getElementById("valentineReveal").style.display = "flex";

  // optional: confetti energy
  document.body.classList.add("valentine-win");
});

const photos = document.querySelectorAll('.photo');
const collage = document.querySelector('.valentine-collage');

photos.forEach(photo => {
  photo.addEventListener('click', () => {
    const isActive = photo.classList.contains('featured');

    // Reset all
    photos.forEach(p => p.classList.remove('featured'));
    collage.classList.remove('dim');

    // Activate clicked if it wasn't already
    if (!isActive) {
      photo.classList.add('featured');
      collage.classList.add('dim');
    }
  });
});