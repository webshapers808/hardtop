import { ContactWiz } from "./ContactWiz.js";

export class FooterWiz {
    constructor() {
        this.footerEmail = document.querySelector(".footer-email");
        this.footerBtn = document.querySelector(".footer-btn");
        this.footerPopUpIsActive = false;
        this.contactWiz = new ContactWiz();
    }

    init() {
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

    showFooterPopUp = () => {
        this.footerBtn.style.pointerEvents = "none";
        this.footerPopUpIsActive = true;

        const footerBox = document.querySelector(".footer-pop-up-box");
        footerBox.style.display = "block";
        footerBox.classList.add("addTop");
        if (document.URL.includes("index") || document.URL.includes("about")) {
            footerBox.style.top = "unset";
            footerBox.classList.remove("addTop");
        }
        setTimeout(() => {
            footerBox.style.opacity = "1";
            footerBox.style.zIndex = "20";
        }, 500);

        const footerPopUpBtn = document.querySelector("#footer-pop-up-button");
        footerPopUpBtn.addEventListener("click", (e) => {
            e.preventDefault();
            footerBox.style.opacity = "0";
            footerBox.style.zIndex = "0";
            setTimeout(() => {
                this.footerBtn.style.pointerEvents = "all";
                this.footerPopUpIsActive = false;
                this.contactWiz.createPopUpConfirmation("footer");
            }, 1000);
        });
    }
}