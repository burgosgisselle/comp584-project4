/* DOM elements*/
const catImage = document.getElementById('catImage');
const catBreed = document.getElementById('catBreed');
const catDescription = document.getElementById('catDescription');
const catCard = document.getElementById('catCard');
const newCatBtn = document.getElementById('newCatBtn');

/* Popmotion setup */
/* Styler lets Popmotion control CSS styles */
const { styler, tween, easing } = window.popmotion;
const btnStyler = styler(newCatBtn);

/* Function to fetch cat data */
async function fetchCat() {
  try {
    /* Fetch the list of all cat breeds */
    const res = await fetch("https://api.thecatapi.com/v1/breeds");
    const breeds = await res.json();

    /* Pick a random breed from list */
    const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

    /* Fetch the image for that breed using its reference image */
    const imgRes = await fetch(`https://api.thecatapi.com/v1/images/${randomBreed.reference_image_id}`);
    const imgData = await imgRes.json();

    /* Update UI elements with new cat information */
    catImage.src = imgData.url;
    catBreed.textContent = randomBreed.name;
    catDescription.textContent = randomBreed.description;

    /* Fallback in the case of errors */
  } catch (err) {
    console.error("Error fetching cat:", err);
    catBreed.textContent = "Error loading breed";
    catDescription.textContent = "Try again!";
  }
}

/* Button animation*/
function animateButton() {
  tween({

    /* Scales up quickly and back down */
    from: { scale: 1 },
    to: { scale: 1.1 },
    duration: 120,

    /* One bounce */
    yoyo: 1,
    ease: easing.easeInOut
  }).start(btnStyler.set);
}

newCatBtn.addEventListener('click', () => {
  animateButton();
  fetchCat();
});

/*Load the cat data*/
fetchCat();