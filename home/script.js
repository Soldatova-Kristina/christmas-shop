

// Burger Menu
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.headerBurger').addEventListener("click", function() {
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
    })
})
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

    document.getElementById("day").textContent = day;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

if (document.body.dataset.page === "index") {
    setInterval(refreshTimer, 1000);
    refreshTimer();
}

//ScrollToTop
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
// Slider
const sliderLeftBtn = document.querySelector(".sliderLeftBtn");
const sliderRightBtn = document.querySelector(".sliderRightBtn");
const sliderItems = document.querySelector(".sliderItems");

// Gifts SortByID
const list = document.querySelector(".cardsCategory");
const items = document.querySelectorAll(".blocksItem");
const listItems = document.querySelectorAll(".categoryItem");

function filter() {
    list.addEventListener("click", evt => {
        const targetId = evt.target.dataset.id;
        console.log(list);
        listItems.forEach(listItem => listItem.classList.remove('active'))

        switch (targetId) {
            case 'all':
                items.forEach(item => {
                    if (item.classList.contains("blocksItem")) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                })
                break
            case 'work':
                items.forEach(item => {
                    if (item.classList.contains("ItemWork")) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                })
                break
            case 'health':
                items.forEach(item => {
                    if (item.classList.contains("ItemHealth")) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                })
                break
            case 'harmony':
                items.forEach(item => {
                    if (item.classList.contains("ItemHarmony")) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                })
                break
        }
    })
}

filter()

// Gifts slider

const arrowLeft = document.querySelector('.sliderLeftBtn');
const arrowRight = document.querySelector('.sliderRightBtn');
const slider = document.querySelector('.sliderItems');

let offset = 0;
const sliderWidth = 2061;
let visibleWidth = Math.min(window.innerWidth);
let step = calculateStep();

function calculateStep() {
    const stepValue = window.innerWidth < 769
        ? (sliderWidth - visibleWidth) / 6
        : (sliderWidth - visibleWidth) / 3;

    return Math.max(stepValue, 50);
}

const updateStepAndWidth = () => {
    visibleWidth = Math.min(window.innerWidth);
    step = calculateStep();
    offset = 0;
    slider.style.transform = `translateX(${offset}px)`;
    slider.style.transition = 'transform 0.5s ease';
};

const calculateLimits = () => ({
    maxOffset: 0,
    minOffset: -step * (window.innerWidth < 769 ? 6 : 3),
});

const updateButtons = () => {
    const { maxOffset, minOffset } = calculateLimits();
    arrowLeft.disabled = offset >= maxOffset;
    arrowRight.disabled = offset <= minOffset;

    arrowLeft.classList.toggle('disabled', offset >= maxOffset);
    arrowRight.classList.toggle('disabled', offset <= minOffset);
};

arrowRight.addEventListener('click', function () {
    const { minOffset } = calculateLimits();
    if (offset > minOffset) {
        offset -= step;
        if (offset < minOffset) offset = minOffset;
        slider.style.transform = `translateX(${offset}px)`;
        slider.style.transition = 'transform 0.5s ease';
        updateButtons();
    }
});

arrowLeft.addEventListener('click', function () {
    const { maxOffset } = calculateLimits();
    if (offset < maxOffset) {
        offset += step;
        if (offset > maxOffset) offset = maxOffset;
        slider.style.transform = `translateX(${offset}px)`;
        slider.style.transition = 'transform 1s ease';
        updateButtons();
    }
});

window.addEventListener('resize', () => {
    updateStepAndWidth();
    updateButtons();
});

updateStepAndWidth();
updateButtons();


//random and modal
var requestURL = "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/christmas-shop/gifts.json"
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

fetch('../home/gifts.json')
    .then(response => response.json())
    .then(data => {
        const cardsContainer = document.querySelector('.giftsItems');

        const mixedCards = data.sort(() => 0.5 - Math.random());
        const randomCards = mixedCards.slice(0, 4);

        randomCards.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('blocksItem');

            const cardDescription = document.createElement('div');
            cardDescription.classList.add('giftsText')

            let imageSrc = '';

            if (item.category === "work") {
                imageSrc = '..assets/images/gift-for-work.png';
            } else if (item.category === "harmony") {
                imageSrc = '..assets/images/gift-for-harmony.png';
            } else {
                imageSrc = '..assets/images/gift-for-health.png';
            }

            card.innerHTML = `
        <img src="${imageSrc}" alt="${item.category}"> 
    `;

            let fontColor = '';

            if (item.category === "work") {
                fontColor = '#4361FF';
            } else if (item.category === "harmony") {
                fontColor = '#FF43F7';
            } else {
                fontColor = '#06A44F';
            }


            cardDescription.innerHTML = `
        <h4 style="color: ${fontColor};">${item.category}</h4>
        <p>${item.name}</p>
    `
            card.appendChild(cardDescription)
            cardsContainer.appendChild(card);

            const cardsPopup = document.querySelector('.cards_popup');
            const body = document.querySelector('body')

            card.addEventListener('click', function () {

                cardsPopup.classList.add('open');
                body.classList.add('no_scroll')

                cardsPopup.innerHTML = `
    <div class="popup_container">
        <div class="popup">
            <div class="close_btn"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></div>
            <img src="${imageSrc}" alt="${item.category}"> 
            <div class="popup_content">
            <div class="popup_info">
            <h4 style="color: ${fontColor};">${item.category}</h4>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
        <div class="superpowers">
        <h4>Adds superpowers to:</h4></div>
        <div class="points_info">
            <p class="desc">Live</p>
            <p class="points">${item.superpowers.live}</p>
            <div class="snowflakes"></div>
        </div>
       <div class="points_info">
            <p class="desc">Create</p>
            <p class="points">${item.superpowers.create}</p>
            <div class="snowflakes"></div>
        </div>
    <div class="points_info">
            <p class="desc">Love</p>
            <p class="points">${item.superpowers.love}</p>
            <div class="snowflakes"></div>
        </div>
         <div class="points_info">
            <p class="desc">Dream</p>
            <p class="points">${item.superpowers.dream}</p>
            <div class="snowflakes"></div>
        </div>
    </div>

        </div>
`;
                Object.values(item.superpowers).forEach((flakesNumber, index) => {
                    let snowFlakesNumber = Number(flakesNumber) / 100;
                    let flakesContainer = document.querySelectorAll('.snowflakes');

                    if (flakesContainer[index]) {
                        let content = '';
                        for (let i = 1; i <= 5; i++) {
                            if (snowFlakesNumber >= i) {
                                content += `<div class="snowflakes_red"></div>`;
                            } else {
                                content += `<div class="snowflakes_none"></div>`;
                            }
                        }
                        flakesContainer[index].innerHTML = content;
                    }
                });
            })
            cardsPopup.addEventListener('click', function (event) {
                if (!event.target.closest('.popup')) {
                    cardsPopup.classList.remove('open');
                    body.classList.remove('no_scroll');
                }
            });

            const closeModalBtn = document.querySelector('.close_btn');
            cardsPopup.addEventListener('click', function (event) {
                if (event.target.closest('.close_btn')) {
                    cardsPopup.classList.remove('open');
                    body.classList.remove('no_scroll');
                }
            });
        })
    })

