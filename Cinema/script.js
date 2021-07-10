function main () {
    
    const buttonPick = document.querySelector("#buttonPick");
    const firstPage = document.querySelector(".first-page");
    const secondPage = document.querySelector(".second-page");
    const backButton = document.querySelector(".back-btn");
    const buttonPay = document.querySelector("#buttonPay");
   
    // Date and Hours
    let date;
    let hour;

    //Modal segment
    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close-modal");
    
    
    // get element slider
    const slider = document.querySelectorAll(".slides");

    function setTime(event, item) { 
        Array.from(item.children).forEach((slide) => {
            if (slide.classList.contains("selected")) {
                slide.classList.remove("selected");
            }
        });

        event.target.parentElement.classList.add("selected");
        return event.target.textContent;
    }

    slider.forEach((slider) => slider.addEventListener("click", (event) => {
        
        if (slider.id === "date") {  
            date = setTime(event, slider);
        }
         
        if (slider.id === "hour") {
            hour = setTime(event, slider);
        }
        
    }));

    const modalAlert = document.querySelector(".modal__alert");
    const closeAlert = document.querySelector(".close__alert");

    buttonPick.addEventListener("click", () => {
        
        if (date === undefined || hour === undefined) {
            // alert("Pick date and hour");
            modalAlert.classList.add("modal__alert--on");
            window.scrollTo(290, 290);
            
            closeAlert.addEventListener("click", () => {
                modalAlert.classList.remove("modal__alert--on");
                window.scrollTo(200, 420);   
            });

            window.addEventListener('click', (e) => {
                if (e.target === modalAlert) {
                    modalAlert.classList.remove("modal__alert--on");
                    window.scrollTo(200, 420);   
                }
            });

            return;
        }

        firstPage.classList.add("notActive");
        secondPage.classList.add("active");
        if (window.pageYOffset > 0) {
            window.scrollTo(0, 0);
        }
        
    });

    backButton.addEventListener("click", () => {
        firstPage.classList.remove("notActive");
        secondPage.classList.remove("active");
        window.scrollTo(200, 420); 
    });
    
    // Seats and purchase segment
    const price = 13;
    let total = document.querySelector("#total");
    let count;

    const seats = document.querySelector(".seats");

    let seatsArray = [];
    let seatRow;
    let seatNumber;

    seats.addEventListener("click", (event) => {
        
        if (event.target.classList.contains("seat") && !event.target.classList.contains("occupied")) {
            
            event.target.classList.add("occupied");

            count = parseInt(total.textContent);
            count += price;
            total.textContent = count + "$";

            // Fill row and seat data
            seatNumber = event.target;
            seatNumber = seatNumber.classList[1].slice(4); 
            
            seatRow = event.target.parentElement;
            seatRow = seatRow.classList[1].slice(3);

            seatsArray.push({row: seatRow, seat: seatNumber});
            
            modal.classList.remove("modal-on");

        } else if (event.target.classList.contains("seat") && event.target.classList.contains("occupied")) {
            
            event.target.classList.remove("occupied");

            count = parseInt(total.textContent);
            count -= price;
            total.textContent = count + "$";

            // Remove seats data from arr
            seatNumber = event.target;
            seatNumber = seatNumber.classList[1].slice(4); 
            
            seatRow = event.target.parentElement;
            seatRow = seatRow.classList[1].slice(3);
            
            seatsArray = seatsArray.filter((item) => {
                return item.row !== seatRow || item.seat !== seatNumber;
            });

            modal.classList.remove("modal-on");
        }
    });

    buttonPay.addEventListener("click", () => {
        
        if (seatsArray.length === 0) {
            return;
        }

        
        modal.classList.add("modal-on");
        // modal.style.display = "block";
        window.scrollTo(1000, 1000);
        
        const orderData = document.querySelector(".order-data");
        orderData.innerHTML = "";
        
        const orderDataResult = seatsArray.map((item) => {
            return ` 
            <div class="order-group">
            <p class="order-data__seat">Date: <span class="seatNumber">${date}</span></p>
            <p class="order-data__seat">Time: <span class="seatNumber">${hour}</span></p>          
            <p class="order-data__row">Row: <span class="rowNumber">${item.row}</span></p>
            <p class="order-data__seat">Seat: <span class="seatNumber">${item.seat}</span></p>
            <p class="order-data__price">Price: <span class="priceResult">${price}$</span></p> 
            </div>`
        })
        
        orderData.insertAdjacentHTML("beforeend", orderDataResult.join(""));
        
        // total price
        const totalPrice = document.querySelector('.totalPrice');
        totalPrice.textContent = total.textContent;
    })

    closeModal.addEventListener("click", () => {
        modal.classList.remove("modal-on");
        // modal.style.display = "none";
    })


    // window.addEventListener('scroll', () => {
    //     if (window.pageYOffset > 50) {
    //         backButton.style.position = 'fixed';
    //     } else {
    //         backButton.style.position = 'static';
    //     }
    // })
}


export default main;