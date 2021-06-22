import { ContactWiz } from "./ContactWiz.js";
import { FooterWiz } from "./FooterWiz.js";

/* 	PAGE TRANSITION */
$('.link-text').click(function(e) {
    console.log("link clicked");
    e.preventDefault();
    var goTo = this.getAttribute("href");
    console.log(goTo);
    removeElement(".footer-pop-up-box");
    removeElement(".pop-up-box");

    setTimeout(function(){
         window.location = goTo;
    },1900);       
});

/*
MOUSE FOLLOWS
*/
var cursorPos = document.getElementById('customCursor');

    $('.my-body').mousemove(function(e){
        TweenLite.to(cursorPos,0.4, {
            css: {
                left: e.pageX,
                top: e.pageY
            }
    })
        
/*
    console.log(e.pageX + ", " + e.pageY);
    cursorPos.style.left = e.pageX + "px";
    cursorPos.style.top = e.pageY + "px";
*/
}
);

var dragPosition = document.getElementById('drag-position');
$('.gallery-item').mousemove(function(e){
    TweenLite.to(dragPosition,0.9, {
        css: {
            left: e.pageX,
            top: e.pageY
        }
	})
    });


/*
DRAG TO SCROLL
*/

const slider = document.querySelector('.horizontal-gallery')
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        cancelMomentumTracking(); // Stop the drag momentum loop
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        beginMomentumTracking(); // Start a frame loop to continue drag momentum
    });
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const displacementX = (x - startX) * 1.5;
        // Store the previous scroll position
  		var prevScrollLeft = slider.scrollLeft;
        slider.scrollLeft = scrollLeft - displacementX;
        // Compare change in position to work out drag speed 
  		velX = slider.scrollLeft - prevScrollLeft;
    });
    // Listen for mouse wheel events
    slider.addEventListener('wheel', (e) => {
      cancelMomentumTracking(); // Stop the drag momentum loop
    });  
}

/* EASING FOR DRAGGING */

var momentumID;

function beginMomentumTracking(){
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop); 
}

function cancelMomentumTracking(){
  cancelAnimationFrame(momentumID);
}

function momentumLoop(){
  slider.scrollLeft += velX; // Apply the velocity to the scroll position
  velX *= 0.95; // Slow the velocity slightly
  if (Math.abs(velX) > 0.5){ // Still moving?
    momentumID = requestAnimationFrame(momentumLoop); // Keep looping 
  }
}


// Remove element while transitioning to a new page
const removeElement = (element) => {
    const el = document.querySelector(element);
    if (el) { el.remove(); }
}

const addInteractivity = () => {
    const footerWiz = new FooterWiz();
    footerWiz.init();

    if (document.URL.includes("contact")) {
        const contactWiz = new ContactWiz();
        contactWiz.init();
    }
}
addInteractivity();


/* CONTACT PAGE INTERACTIVE MESSAGE */
// Run this code only if user is on the contact page.
// if (document.URL.includes("contact.html")) {
//     const formElements = document.querySelector("#contact-form").elements;
//     const nameInput = formElements[0];
//     const emailInput = formElements[1];
//     const messageInput = formElements[2];
//     const buttonContact = formElements[3];

//     const lines = document.querySelectorAll(".prompt");
//     let buttonClicked = false;
//     counter = 0;

//     const footerEmail = document.querySelector(".footer-email");
//     const footerBtn = document.querySelector(".footer-btn");
//     let footerPopUpIsActive = false;

//     // Reset Border Styles for All form Elements
//     resetBorders = (input) => {
//         if (input === 2 || input === 3) { input.style.border = "1px solid black"; } 
//         else { input.style.border = ""; input.style.borderBottom = "2px solid gray"; }
//     };

//     // Add Click Listeners to all form elements
//     for (let i = 0; i < formElements.length; i++) {
//         formElements[i].addEventListener("click", () => {
//             resetBorders(formElements[i]);
//         });
//     }
    
//     // Handle Button Click Events
//     buttonContact.addEventListener("click", (e) => {
//         e.preventDefault();
//         if (nameInput.value.length < 1) {
//             nameInput.style.border = "1px solid red"; 
//             updateText(["PLEASE", "ENTER", "YOUR", "NAME"]);
//         } else if (isEmail(emailInput.value) === false) { 
//             emailInput.style.border = "1px solid red"; 
//             updateText(["PLEASE", "ENTER", "A VALID", "EMAIL"]);
//         } else if (messageInput.value.length < 1) { 
//             messageInput.style.border = "1px solid red"; 
//             updateText(["PLEASE", "INCLUDE", "A BRIEF", "MESSAGE"]);
//         } else {
//             buttonClicked = true;
//             updateText(["THANK YOU", "FOR YOUR", "MESSAGE!", ""]);  
//             createPopUpConfirmation();
//         }
//     });
    
//     // HELPER FUNCTIONS
//     const checkForUserInput = () => {

//         if (nameInput === document.activeElement) { // IF the name input is active
//             if (buttonClicked != true) {
//                 updateText(["TELL", "US", "YOUR", "NAME"]);
//             }
//         } 
//         if (nameInput.value.length > 0 && buttonClicked != true && lines[3].innerHTML != "EMAIL" && lines[3].innerHTML != "MESSAGE") { // print out User's Name
//             updateText(["NICE", "TO", "MEET YOU", getFirstWord(nameInput.value.toUpperCase()) + "!"]);
//         }

//         for (let i = 0; i < formElements.length; i++) { // If any input element is hovered over, reset it's border
//             if (formElements[i] === document.activeElement) {
//                 resetBorders(formElements[i]);
//             }
//         }

//         if (footerEmail === document.activeElement) {
//             if (footerPopUpIsActive !== true) {
//                 footerPopUpIsActive = true;
//                 showFooterPopUp();
//             }
//         } else {
//             const footerChildren = document.querySelectorAll(".footer-pop-up-child");
//             if (footerPopUpIsActive === true){
//                 if (checkForActiveElement(footerChildren) === false) {
//                     const footerPopUp = document.querySelector(".footer-pop-up-box");
//                     footerPopUpIsActive = false;
//                     footerPopUp.style.opacity = "0";
//                 }
//             }
//         }
//     }
//     const checkForActiveElement = (list) => {
//         for (let i = 0; i < list.length; i++) {
//             if (list[i] === document.activeElement) { return true; } 
//         }
//         return false;
//     }
//     const formIsEmpty = () => {
//         const inputs = document.querySelectorAll(".footer-pop-up-input");
//         for (let i = 0; i < inputs.length; i++) {
//             if (inputs[i].innerHTML.length > 0) { return false; }
//         }
//         return true;
//     }
//     const updateText = (texts) => { // Update Left-Blue Text 
//         for (let i = 0; i < lines.length; i++) {
//             lines[i].innerHTML = texts[i];
//         }
//     }
//     const isEmail = (email) => { // Email Validation with Regex
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//     }
//     const getFirstWord = (s) => {
//         let x = s.split(" ");
//         return x[0];
//     }
    
//     const createPopUpConfirmation  = () => {
//         const box = document.createElement("div");
//         box.classList.add("pop-up-box");
//         box.style.display = "block";

//         const container = document.createElement("div");
//         container.classList.add("success");
//         const heading = document.createElement("h2");
//         heading.innerHTML = "Success!";
//         const icon = document.createElement("img");
//         icon.src = "/assets/img/check-mark.png";
//         container.appendChild(heading);
//         container.appendChild(icon);

//         const boxText = document.createElement("p");
//         boxText.innerHTML = "Mahalo for contacting us! <br/> We will get back to you in 1-2 business days.";
//         const okBtn = document.createElement("button");
//         okBtn.classList.add("submit-btn");
//         okBtn.innerText = "OK";

//         okBtn.addEventListener("click", () => {
//             setTimeout(() => {
//                 box.style.opacity = "0";
//                 location.reload();
//             }, 300);
//         });

//         box.appendChild(container);
//         box.appendChild(boxText);
//         box.appendChild(okBtn);
//         document.body.appendChild(box);

//         setTimeout(() => {
//             box.style.opacity = "1";
//         }, 500);
//     }

//     showFooterPopUp = () => {
//         footerBtn.style.pointerEvents = "none";
//         footerPopUpIsActive = true;

//         const footerBox = document.querySelector(".footer-pop-up-box");
//         setTimeout(() => {
//             footerBox.style.opacity = "1";
//         }, 500);

//         const footerPopUpBtn = document.querySelector("#footer-pop-up-button");
//         footerPopUpBtn.addEventListener("click", (e) => {
//             e.preventDefault();
//             footerBox.style.opacity = "0";
//             setTimeout(() => {
//                 footerBtn.style.pointerEvents = "all";
//                 footerPopUpIsActive = false;
//                 createPopUpConfirmation();
//             }, 1000);
//         });
//     }

//     (addFooterListeners = () => {
//         footerEmail.addEventListener("click", () => {
//             if (footerPopUpIsActive !== true) {
//                 footerPopUpIsActive = true;
//                 showFooterPopUp();
//             }
//         });
//     })();
    
//     // RESET THE TIMER IF USER IS INTERACTING WITH SITE
//     const resetTimer = () => {
//         counter = 0;
//     }
//     (addDocumentListeners = () => {
//         const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
//         activityEvents.map(event => document.addEventListener(event, resetTimer));
//     })();
    
//     // TIMER - RUNS EVERY 1 SECOND
//     setInterval(() => { 
//         checkForUserInput(); // See Helper Functions Above
//         counter++;
//         if (counter === 300) { // After 5 minutes of inactivity, end session and prompt user to refresh page
//             nameInput.value = "";
//             alert("Your session has timed out due to inactivity. Press OK to refresh the page.");
//             counter = 0;
//             window.location.reload();
//         }
//     }, 1000);
// }
