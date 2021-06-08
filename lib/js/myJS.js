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
    
    $('.horizontal-gallery').mousemove(function(e){
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
        console.log(startX);
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
    });
    slider.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const displacementX = x - startX;
        slider.scrollLeft = scrollLeft - displacementX;
    });
}

/* CONTACT PAGE INTERACTIVE MESSAGE */
// Run this code only if user is on the contact page.
if (document.URL.includes("contact.html")) {
    console.log("Activate contact page interactivity");

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
