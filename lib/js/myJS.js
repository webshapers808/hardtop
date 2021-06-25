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
    console.log("attempting to add interactivity...");
    const footerWiz = new FooterWiz(); // Call the FooterWiz on every page
    footerWiz.init();

    if (document.URL.includes("contact")) { // Call the ContactWiz only on the contact page
        const contactWiz = new ContactWiz(); 
        contactWiz.init();
    }
}
addInteractivity();
