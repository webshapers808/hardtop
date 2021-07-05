import { Timer } from "./Timer.js";
import { sendEmails } from "./Email.js";

export class ContactWiz {
    constructor() {
        if (document.URL.includes("contact")) {
            this.formElements = document.querySelector("#contact-form").elements;
            this.nameInput = this.formElements[0];
            this.emailInput = this.formElements[1];
            this.messageInput = this.formElements[2];
            this.buttonContact = this.formElements[3];
    
            this.prompts = document.querySelectorAll(".prompt");
            this.buttonClicked = false;
            this.counter = 0;
        }
    }

    init() {
        this.addListeners();
        const timer = new Timer();
        timer.start();
    }

    addListeners() {
        this.addClickListeners();
        this.addSendBtnListeners();
    }

    // Add Click Listeners to all form elements
    addClickListeners() {
        for (let i = 0; i < this.formElements.length; i++) {
            this.formElements[i].addEventListener("click", () => {
                this.resetBorders(this.formElements[i]);
            });
        }
    }

    // Handle Button Click Events
    addSendBtnListeners(btn) {
        this.buttonContact.addEventListener("click", (e) => {
            e.preventDefault();
            if (this.nameInput.value.length < 1) {
                this.nameInput.style.border = "1px solid red"; 
                this.updateText(["PLEASE", "ENTER", "YOUR", "NAME"]);
            } else if (this.isEmail(this.emailInput.value) === false) { 
                this.emailInput.style.border = "1px solid red"; 
                this.updateText(["PLEASE", "ENTER", "A VALID", "EMAIL"]);
            } else if (this.messageInput.value.length < 1) { 
                this.messageInput.style.border = "1px solid red"; 
                this.updateText(["PLEASE", "INCLUDE", "A BRIEF", "MESSAGE"]);
            } else {
                this.buttonClicked = true;
                sendEmails();
                this.updateText(["THANK YOU", "FOR YOUR", "MESSAGE!", ""]); 
                setTimeout(() => {
                    this.createPopUpConfirmation("contact");
                }, 1000);
            }
        });
    }

    // Reset Border Styles for All form Elements
    resetBorders(input) {
        if (input === 2 || input === 3) { input.style.border = "1px solid black"; } 
        else { input.style.border = ""; input.style.borderBottom = "2px solid gray"; }
    }

    checkForActivity() {
        this.updatePromptText();
        this.updateBorderIfHovering();
    }

    updatePromptText() {
        if (this.nameInput === document.activeElement) { // IF the name input is active
            if (this.buttonClicked != true) {
                this.updateText(["TELL", "US", "YOUR", "NAME"]);
            }
        } 
        if (this.nameInput.value.length > 0 && this.buttonClicked != true && this.prompts[3].innerHTML != "EMAIL" && this.prompts[3].innerHTML != "MESSAGE") { // print out User's Name
            this.updateText(["NICE", "TO", "MEET YOU", this.getFirstWord(this.nameInput.value.toUpperCase()) + "!"]);
        }
    }
    updateBorderIfHovering() {
        for (let i = 0; i < this.formElements.length; i++) { // If any input element is hovered over, reset it's border
            if (this.formElements[i] === document.activeElement) {
                this.resetBorders(this.formElements[i]);
            }
        }
    }

    updateText(texts) { // Update Left-Blue Text 
        for (let i = 0; i < this.prompts.length; i++) { this.prompts[i].innerHTML = texts[i]; }
    }
    isEmail(email) { // Email Validation with Regex
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }
    getFirstWord(s) {
        let x = s.split(" ");
        return x[0];
    }

    createPopUpConfirmation(form) {
        const box = document.createElement("div");
        box.classList.add("pop-up-box");
        if (form === "footer") { box.style.top = "100%"; } 
        if (form === "contact") { box.style.top = "50%" }
        if (document.URL.includes("index") || document.URL.includes("about")) {
            box.style.top = "unset";
            box.style.bottom = "-200%";
            if (document.URL.includes("index")) { box.style.bottom = "-250%"; }
        }
        box.style.display = "block";

        const container = document.createElement("div");
        container.classList.add("success");
        const heading = document.createElement("h2");
        heading.innerHTML = "Success!";
        const icon = document.createElement("img");
        icon.src = "/assets/img/check-mark.png";
        container.appendChild(heading);
        container.appendChild(icon);

        const boxText = document.createElement("p");
        boxText.innerHTML = "Mahalo for contacting us! <br/> We will get back to you in 1-2 business days.";
        const okBtn = document.createElement("button");
        okBtn.classList.add("submit-btn");
        okBtn.innerText = "OK";

        okBtn.addEventListener("click", () => {
            setTimeout(() => {
                box.style.opacity = "0";
                location.reload();
            }, 300);
        });

        box.appendChild(container);
        box.appendChild(boxText);
        box.appendChild(okBtn);
        document.body.appendChild(box);

        setTimeout(() => {
            box.style.opacity = "1";
        }, 500);
    }


}