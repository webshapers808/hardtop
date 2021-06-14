/* 	PAGE TRANSITION */

$('.link-text').click(function(e) {
    console.log("link clicked");
    e.preventDefault();
    var goTo = this.getAttribute("href");
    console.log(goTo);

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

/* CONTACT PAGE INTERACTIVE MESSAGE */
// Run this code only if user is on the contact page.
if (document.URL.includes("contact.html")) {
    const nameInput = document.querySelector(".text-input");
    const buttonContact = document.querySelector(".submit");
    let buttonClicked = false;
    counter = 0;
    
    // Handle Button Click Events
    buttonContact.addEventListener("click", () => {
        if (nameInput.value.length < 1) {
            updateText(["PLEASE", "ENTER", "YOUR", "NAME"]);
        } else {
            buttonClicked = true;
            updateText(["THANK YOU", "FOR YOUR", "MESSAGE!", ""]);
        }
    })
    
    // HELPER FUNCTIONS
    const checkForUserInput = () => {
        if (nameInput === document.activeElement) {
            if (buttonClicked != true) {
                updateText(["TELL", "US", "YOUR", "NAME"]);
            }
        } 
        if (nameInput.value.length > 0 && buttonClicked != true) {
            updateText(["NICE", "TO", "MEET YOU", nameInput.value.toUpperCase() + "!"]);
        }
    }
    const updateText = (texts) => {
        const lines = document.querySelectorAll(".prompt");
        for (let i = 0; i < lines.length; i++) {
            lines[i].innerHTML = texts[i];
            //console.log("changed prompt " + (i + 1) + " to " + " '" + lines[i].innerHTML + "'");
        }
    }
    
    // RESET THE TIMER IF USER IS INTERACTING WITH SITE
    const resetTimer = () => {
        counter = 0;
    }
    (addDocumentListeners = () => {
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        activityEvents.map(event => document.addEventListener(event, resetTimer));
    })();
    
    // TIMER - RUNS EVERY 1 SECOND
    setInterval(() => { 
        checkForUserInput(); // See Helper Functions Above
        counter++;
        console.log(counter);
        if (counter === 300) { // After 5 minutes of inactivity, end session and prompt user to refresh page
            nameInput.value = "";
            alert("Your session has timed out due to inactivity. Press OK to refresh the page.");
            counter = 0;
            window.location.reload();
        }
    }, 1000);
}
