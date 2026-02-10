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
  // Jackpot
  if (spinCount >= 10) {
    message = "💖 JACKPOT 💖 YOU ARE MY VALENTINE. THERE IS NO ESCAPE.";
    const isJackpot = spinCount >= 10;
    if (isJackpot) {
      forcedJackpot = jackpotCombos[Math.floor(Math.random() * jackpotCombos.length)];
    }

    if (isJackpot) {
      result.textContent = "💖 JACKPOT 💖 YOU ARE MY VALENTINE FOREVER AND ALWAYS";
      triggerJackpot();
    }
    document.body.style.background = "hotpink";
  }
  
   

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
