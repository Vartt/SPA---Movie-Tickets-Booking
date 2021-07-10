


function Slider(slidesData) {
    
    let slides = "";
    
    for (let i = 0; i < slidesData.length; i++) {
        slides += `<div class="slide">
                        <p class="slide-item">${slidesData[i].data}</p>
                    </div>`
    } 

     
    return `<div class="slider">
                <button type="button" id="prevBtn" class="prevBtn"></button>

                <div class="slider-container">
                    <div class="slides">
                       ${slides} 
                    </div>
                </div>
                
                <button type="button" id="nextBtn" class="nextBtn"></button>
            </div>
            `
}

export default Slider;