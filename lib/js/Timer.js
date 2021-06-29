import { ContactWiz } from "./ContactWiz.js";
import { FooterWiz } from "./FooterWiz.js";

export class Timer {
    constructor() {
        this.counter = 0;
        this.addDocumentListeners();
        this.contactWiz = new ContactWiz();
        this.footerWiz = new FooterWiz();
    }
    start() {
        this.counter = 0;
        setInterval(() => {
            this.counter++;
            this.contactWiz.checkForActivity();
            this.footerWiz.checkForActivity();
            //console.log(this.getTimerValue());
            if (this.getTimerValue() >= 300) {
                alert("Your session has timed out due to inactivity. Press OK to refresh the page.");
                this.reset();
                location.reload();
            }
        }, 1000);
    }
    reset() {
        this.counter = 0;
    }
    getTimerValue() {
        return this.counter;
    }
    addDocumentListeners() {
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        activityEvents.map(event => document.addEventListener(event, () => { this.reset(); }));
    }

}