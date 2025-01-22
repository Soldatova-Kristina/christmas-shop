// Burger Menu
document.addEventListener("DOMContentLoaded", function () {
  // Add an event listener to the burger menu button to toggle menu visibility
  document
    .querySelector(".headerBurger")
    .addEventListener("click", function () {
      // Toggle the 'open' class on the header and 'no_scroll' on the body
      document.querySelector(".header").classList.toggle("open");
      document.querySelector("body").classList.toggle("no_scroll");
    });

  // Add click event listeners to all menu items
  document.querySelectorAll(".headerMenuItem").forEach((link) => {
    link.addEventListener("click", function (event) {
      // Prevent the default anchor click behavior
      event.preventDefault();
      const link = this.href; // Store the href of the clicked link

      // Close the menu and restore body scrolling
      document.querySelector(".header").classList.remove("open");
      document.querySelector("body").classList.remove("no_scroll");

      // Redirect to the link after a 500ms delay
      setTimeout(() => {
        window.location.href = link;
      }, 500);
    });
  });
});

// New Year Timer
function getDate() {
  // Get the timestamp for January 1st of the next year
  const thisYear = new Date().getFullYear();
  return new Date(`January 1, ${thisYear + 1} 00:00:00`).getTime();
}

let newYearDate = getDate(); // Store the timestamp for the next New Year

function refreshTimer() {
  // Get the current timestamp
  const thisDate = new Date().getTime();
  // Calculate the remaining time until the New Year
  const availableTime = newYearDate - thisDate;

  // Reset the countdown if the New Year has passed
  if (availableTime <= 0) {
    newYearDate = getDate();
    return;
  }

  // Calculate days, hours, minutes, and seconds from the remaining time
  const day = Math.floor(availableTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (availableTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((availableTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((availableTime % (1000 * 60)) / 1000);

  // Update the DOM elements with the calculated time
  document.getElementById("day").textContent = day.toString();
  document.getElementById("hours").textContent = hours.toString();
  document.getElementById("minutes").textContent = minutes.toString();
  document.getElementById("seconds").textContent = seconds.toString();
}

// Start the timer if the current page is the index page
if (document.body.dataset.page === "index") {
  setInterval(refreshTimer, 1000); // Refresh the timer every second
  refreshTimer(); // Initialize the timer
}

// ScrollToTop
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show or hide the "Scroll to Top" button based on scroll position and screen width
window.addEventListener("scroll", () => {
  if (window.innerWidth <= 768 && window.scrollY > 300) {
    scrollToTopBtn.style.display = "block"; // Show button
  } else {
    scrollToTopBtn.style.display = "none"; // Hide button
  }
});

// Smoothly scroll to the top of the page when the button is clicked
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling effect
  });
});

// Gifts Slider

const arrowLeft = document.querySelector('.sliderLeftBtn'); // Left arrow button
const arrowRight = document.querySelector('.sliderRightBtn'); // Right arrow button
const slider = document.querySelector('.sliderItems'); // Slider container
const sliderContainer = document.querySelector('.sliderContainer'); // Slider's outer container

let offset = 0; // Current slider offset
const paddingLeft = 20; // Fixed left padding
let step = calculateStep(); // Calculate the step size for scrolling
let maxClicks = getNumClicks(); // Number of clicks required for a full scroll

// Calculate the step size based on the screen width and slider dimensions
function calculateStep() {
  const visibleWidth = sliderContainer.clientWidth - paddingLeft; // Visible slider width with padding
  const totalWidth = slider.scrollWidth; // Total width of the slider content
  const clicks = getNumClicks(); // Number of clicks based on screen width
  return (totalWidth - visibleWidth) / clicks; // Step size for each click
}

// Determine the number of clicks based on the screen width
function getNumClicks() {
  return window.innerWidth <= 767 ? 6 : 3; // 6 clicks for <= 767px, 3 clicks for > 768px
}

// Update the state of navigation buttons
function updateButtons() {
  arrowLeft.disabled = offset >= 0; // Disable the left button at the start
  arrowRight.disabled = offset <= -(step * maxClicks); // Disable the right button at the end

  // Add or remove the 'disabled' class based on button state
  arrowLeft.classList.toggle('disabled', offset >= 0);
  arrowRight.classList.toggle('disabled', offset <= -(step * maxClicks));

  // Add specific styling for inactive right button
  if (arrowRight.disabled) {
    arrowRight.classList.add('inactive'); // Add the 'inactive' class when disabled
  } else {
    arrowRight.classList.remove('inactive'); // Remove the 'inactive' class when enabled
  }
}

// Scroll the slider to the right
arrowRight.addEventListener('click', () => {
  if (offset > -(step * maxClicks)) {
    offset -= step; // Decrease offset
    slider.style.transform = `translateX(${offset + paddingLeft}px)`; // Apply transformation
    slider.style.transition = 'transform 0.5s ease'; // Add smooth animation
    updateButtons(); // Update button states
  }
});

// Scroll the slider to the left
arrowLeft.addEventListener('click', () => {
  if (offset < 0) {
    offset += step; // Increase offset
    slider.style.transform = `translateX(${offset + paddingLeft}px)`; // Apply transformation
    slider.style.transition = 'transform 0.5s ease'; // Add smooth animation
    updateButtons(); // Update button states
  }
});

// Adjust the slider settings and reset its position on window resize
window.addEventListener('resize', () => {
  maxClicks = getNumClicks(); // Recalculate the number of clicks
  step = calculateStep(); // Recalculate the step size
  offset = 0; // Reset the offset
  slider.style.transform = `translateX(${paddingLeft}px)`; // Reset the slider to its starting position
  updateButtons(); // Update button states
});

// Set the initial position of the slider
slider.style.transform = `translateX(${paddingLeft}px)`;
updateButtons(); // Update button states initially

// Random Cards

document.addEventListener("DOMContentLoaded", async () => {
  const giftsContainer = document.querySelector('.giftsItems');

  // Load data from gifts.json
  async function loadGiftsData() {
    try {
      const response = await fetch('./gifts.json'); // Указан правильный путь
      if (!response.ok) {
        throw new Error('Failed to fetch gifts data');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Get 4 random cards
  function getRandomCards(data, count = 4) {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Create card HTML
  function createCardHTML(card) {
    let categoryClass = '';
    let imageSrc = '';

    switch (card.category.toLowerCase()) {
      case 'for work':
        categoryClass = 'ItemWork';
        imageSrc = '../assets/images/gift-for-work.png';
        break;
      case 'for health':
        categoryClass = 'ItemHealth';
        imageSrc = '../assets/images/gift-for-health.png';
        break;
      case 'for harmony':
        categoryClass = 'ItemHarmony';
        imageSrc = '../assets/images/gift-for-harmony.png';
        break;
      default:
        categoryClass = 'ItemWork';
        imageSrc = '../assets/images/gift-for-work.png';
    }

    return `
            <div class="blocksItem ${categoryClass}">
                <img src="${imageSrc}" width="310" height="230" alt="${card.category}" loading="lazy">
                <div class="giftsText">
                    <h4>${card.category}</h4>
                    <p class="heading">${card.name}</p>
                </div>
            </div>
        `;
  }

  // Render cards
  async function renderRandomCards() {
    const data = await loadGiftsData();
    const randomCards = getRandomCards(data);

    giftsContainer.innerHTML = randomCards.map(createCardHTML).join('');
  }

  // Initial rendering
  renderRandomCards();
});

