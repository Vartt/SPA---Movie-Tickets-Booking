import main from './script.js';
import Slider from './components/Slider.js';

let renderCounter = 0;

const slidesData = generateScedule();

const slidesData1 = generateDayHours();

render(Slider(slidesData), "date");
render(Slider(slidesData1), "hour");

main();

function render(component, id) {
    
    const mainComponent = document.querySelector("#sliderContainer");
    mainComponent.insertAdjacentHTML("beforeend", component);
    addSliderLogic(renderCounter, id);
    renderCounter++;
}

function addSliderLogic(index, id) {
    
    // Получаем контейнер слайдов
    const slidesContainer = document.querySelectorAll(".slides")[index];
    slidesContainer.id = id;

    // Получаем слайды из контейнера
    const slides = Array.from(slidesContainer.children);

    // Кнопки
    const prevBtn = document.querySelectorAll("#prevBtn")[index];
    const nextBtn = document.querySelectorAll("#nextBtn")[index];

    // Счетчик для вычисления длины слайдшоу
    let counter = 0;

    nextBtn.addEventListener("click", () => {

        let sliderSize = slides[counter].offsetWidth;
        counter++;

        if (counter === slides.length) {
            counter = 0;
        }

        slidesContainer.style.transform = `translateX(${-sliderSize * counter}px)`;

    });

    prevBtn.addEventListener("click", () => {

        let sliderSize = slides[counter].offsetWidth;

        if (counter === 0)
        {

            counter = slides.length - 1;
            slidesContainer.style.transform = `translateX(${-sliderSize * counter}px)`;
            return;
        }

        counter--;
        slidesContainer.style.transform = `translateX(${-sliderSize * counter}px)`;

    });
}

function generateScedule() {
    
    const schedule = [];    
    let day = new Date();

    for (let i = 0; i < 15; i++) {
        
        day.setDate(day.getDate() + 1);
        schedule.push({data: `${day.getDate()}.${day.getMonth() < 10 ? "0" + (day.getMonth() + 1) : day.getMonth() + 1}`});
    }
   
    return schedule;
}

function generateDayHours() {

    const scheduleHours = [];
    let hour = new Date();

    for (let i = 0; i < 4; i++) {

        hour.setHours(hour.getHours()+2);

        if (hour.getHours() >= 1 && hour.getHours() < 9) {
            hour.setHours(9);
        }

        scheduleHours.push({data: `${hour.getHours()}:30`});
    }

    return scheduleHours;
}
    
export default Slider;