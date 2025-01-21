// Burger Menu
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.headerBurger').addEventListener("click", function () {
        document.querySelector('.header').classList.toggle('open');
        document.querySelector('body').classList.toggle('no_scroll');
    });

    document.querySelectorAll('.headerMenuItem').forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const link = this.href;

            document.querySelector('.header').classList.remove('open');
            document.querySelector('body').classList.remove('no_scroll');

            setTimeout(() => {
                window.location.href = link;
            }, 500);
        });
    });
});

// New Year Timer
function getDate() {
    const thisYear = new Date().getFullYear();
    return new Date(`January 1, ${thisYear + 1} 00:00:00`).getTime();
}

let newYearDate = getDate();

function refreshTimer() {
    const thisDate = new Date().getTime();
    const availableTime = newYearDate - thisDate;

    if (availableTime <= 0) {
        newYearDate = getDate();
        return;
    }

    const day = Math.floor(availableTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (availableTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (availableTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((availableTime % (1000 * 60)) / 1000);

    document.getElementById("day").textContent = day.toString();
    document.getElementById("hours").textContent = hours.toString();
    document.getElementById("minutes").textContent = minutes.toString();
    document.getElementById("seconds").textContent = seconds.toString();
}

if (document.body.dataset.page === "index") {
    setInterval(refreshTimer, 1000);
    refreshTimer();
}

// ScrollToTop
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768 && window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Gifts Filter
const list = document.querySelector(".cardsCategory");
const items = document.querySelectorAll(".blocksItem");
const listItems = document.querySelectorAll(".categoryItem");

list.addEventListener("click", (evt) => {
    const targetId = evt.target.dataset.id;
    listItems.forEach((listItem) => listItem.classList.remove("active"));
    evt.target.classList.add("active");

    items.forEach((item) => {
        item.style.display = targetId === "all" || item.classList.contains(`Item${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`) ? "block" : "none";
    });
});

// Gifts Slider
let offset = 0;
const step = 300;
const maxOffset = 0;
const minOffset = -step * 3;

const arrowRight = document.querySelector('.sliderRightBtn');
const arrowLeft = document.querySelector('.sliderLeftBtn');
const slider = document.querySelector('.sliderItems');

arrowRight.addEventListener('click', () => {
    if (offset > minOffset) offset -= step;
    slider.style.transform = `translateX(${offset}px)`;
});

arrowLeft.addEventListener('click', () => {
    if (offset < maxOffset) offset += step;
    slider.style.transform = `translateX(${offset}px)`;
});

// Fetch and Modal
fetch('./gifts.json')
    .then((response) => {
        if (!response.ok) throw new Error('Error fetching data');
        return response.json();
    })
    .then((data) => {
        const cardsContainer = document.querySelector('.giftsItems');
        const randomCards = data.sort(() => Math.random() - 0.5).slice(0, 4);

        randomCards.forEach((item) => {
            const card = document.createElement('div');
            card.classList.add('blocksItem');

            const imageSrc = {
                work: '../assets/images/gift-for-work.png',
                harmony: '../assets/images/gift-for-harmony.png',
                health: '../assets/images/gift-for-health.png',
            }[item.category];

            const fontColor = {
                work: '#4361FF',
                harmony: '#FF43F7',
                health: '#06A44F',
            }[item.category];

            card.innerHTML = `
                <img src="${imageSrc}" alt="${item.category}" loading="lazy">
                <div class="giftsText">
                    <h4 style="color: ${fontColor}">${item.category}</h4>
                    <p>${item.name}</p>
                </div>
            `;
            cardsContainer.appendChild(card);

            card.addEventListener('click', () => openModal(item, imageSrc, fontColor));
        });
    })
    .catch((error) => console.error('Error loading gifts:', error));

function openModal(item, imageSrc, fontColor) {
    const cardsPopup = document.querySelector('.cards_popup');
    const body = document.querySelector('body');

    const snowflakesHTML = Object.values(item.superpowers)
        .map(count => {
            const flakes = Math.round(count / 100);
            return `<div class="snowflakes">
                ${Array(5).fill(0).map((_, i) => i < flakes ? `<div class="snowflakes_red"></div>` : `<div class="snowflakes_none"></div>`).join('')}
            </div>`;
        })
        .join('');

    cardsPopup.innerHTML = `
        <div class="popup_container">
            <div class="popup">
                <button class="close_btn">✖</button>
                <img src="${imageSrc}" alt="${item.category}">
                <div class="popup_content">
                    <h4 style="color: ${fontColor}">${item.category}</h4>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${snowflakesHTML}
                </div>
            </div>
        </div>
    `;

    cardsPopup.classList.add('open');
    body.classList.add('no_scroll');

    cardsPopup.querySelector('.close_btn').addEventListener('click', () => {
        cardsPopup.classList.remove('open');
        body.classList.remove('no_scroll');
    });

    cardsPopup.addEventListener('click', (e) => {
        if (!e.target.closest('.popup')) {
            cardsPopup.classList.remove('open');
            body.classList.remove('no_scroll');
        }
    });
}