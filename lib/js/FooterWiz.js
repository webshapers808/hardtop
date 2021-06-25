import { ContactWiz } from "./ContactWiz.js";
import { sendEmails } from "./Email.js";

export class FooterWiz {
    constructor() {
        this.footerEmail = document.querySelector(".footer-email");
        this.footerBtn = document.querySelector(".footer-btn");
        this.footerPopUpIsActive = false;
        this.error = false;
        this.contactWiz = new ContactWiz();
    }

    init() {
        console.log("initialized FooterWiz Successfully!");
        this.addFooterListeners();
    }

    addFooterListeners = () => {
        this.footerEmail.addEventListener("click", () => {
            if (this.footerPopUpIsActive !== true) {
                this.footerPopUpIsActive = true;
                this.showFooterPopUp();
            }
        });
    }

    checkForActivity() {
        if (this.footerEmail === document.activeElement) {
            if (this.footerPopUpIsActive !== true) {
                this.footerPopUpIsActive = true;
                this.showFooterPopUp();
            }
        } else {
            const footerChildren = document.querySelectorAll(".footer-pop-up-child");
            if (this.footerPopUpIsActive === true){
                if (this.checkForActiveElement(footerChildren) === false) {
                    const footerPopUp = document.querySelector(".footer-pop-up-box");
                    this.footerPopUpIsActive = false;
                    footerPopUp.style.opacity = "0";
                    footerPopUp.zIndex = "0";
                }
            }
        }
    }

    checkForActiveElement = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === document.activeElement) { return true; } 
        }
        return false;
    }

    checkForError() {
        const elements = document.querySelector(".contact-form").elements;    
        const message = document.querySelector(".footer-pop-up-message");
        const nameInput = elements[0];
        const emailInput = elements[1];
        const messageInput = elements[2];
        for (let el of elements) { el.style.border = "2px solid black"; }
        
        if (nameInput.value.length < 1) {
            this.error = true;
            nameInput.style.border = "1px solid red"; 
            message.innerHTML = "Please Enter Your Name";
        } else if (this.contactWiz.isEmail(emailInput.value) === false) { 
            this.error = true;
            emailInput.style.border = "1px solid red"; 
            message.innerHTML = "Please Enter A Valid Email";
        } else if (messageInput.value.length < 1) { 
            this.error = true;
            messageInput.style.border = "1px solid red"; 
            message.innerHTML = "Please Enter A Brief Message";
        } else {
            this.error = false;
            message.innerHTML = "Thank You For Your Message!";
        }

    }

    showFooterPopUp = () => {
        this.footerBtn.style.pointerEvents = "none";
        this.footerPopUpIsActive = true;

        const footerBox = document.querySelector(".footer-pop-up-box");
        footerBox.style.display = "block";
        footerBox.classList.add("addTop");
        if (!document.URL.includes("contact")) {
            footerBox.style.top = "unset";
            footerBox.classList.remove("addTop");
        }
        setTimeout(() => {
            footerBox.style.opacity = "1";
            footerBox.style.zIndex = "20";
        }, 500);

        const footerPopUpBtn = document.querySelector(".send");
        footerPopUpBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.checkForError();
            if (!this.error) {
                footerBox.style.opacity = "0";
                footerBox.style.zIndex = "0";
                sendEmails();
                setTimeout(() => {
                    this.footerBtn.style.pointerEvents = "all";
                    this.footerPopUpIsActive = false;
                    this.contactWiz.createPopUpConfirmation("footer");
                }, 1000);
            }
        });
    }
}
