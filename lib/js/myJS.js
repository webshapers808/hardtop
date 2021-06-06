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

const firstLine = document.querySelector(".first-line");
const secondLine = document.querySelector(".second-line");
const thirdLine = document.querySelector(".third-line");
const fourthLine = document.querySelector(".fourth-line");

const nameInput = document.querySelector(".text-input");

const buttonContact = document.querySelector(".submit");
let buttonClicked = false;

buttonContact.addEventListener("click", () => {
    buttonClicked = true;
    firstLine.innerHTML = "THANK YOU";
    secondLine.innerHTML = "FOR YOUR";
    thirdLine.innerHTML = "MESSAGE";
    fourthLine.innerHTML = "";
})

const checkForFocus = () => {
    if (nameInput === document.activeElement && buttonClicked != true) {
        firstLine.innerHTML = "TELL";
        secondLine.innerHTML = "US"
        thirdLine.innerHTML = "YOUR"
        fourthLine.innerHTML = "NAME"
    }
}
const checkForName = () => {
    if (nameInput.value.length > 0 && buttonClicked != true) {
        firstLine.innerHTML = "NICE";
        secondLine.innerHTML = "TO";
        thirdLine.innerHTML = "MEET YOU";
        fourthLine.innerHTML = nameInput.value.toUpperCase() + "!";
    }
}

setInterval(() => {
    checkForFocus();
    checkForName();
}, 800);
