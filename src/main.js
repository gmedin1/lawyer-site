import "./style.scss";
import cross from "./cross.svg";
import menu from "./menu.svg";

window.addEventListener('DOMContentLoaded', () => {
    const dialog = document.querySelector('.c-dialog-nav');
    if (dialog) { new Dialog(dialog); }
    const icons = document.querySelectorAll('[data-icon]');
    icons.forEach((icon) => {
        if (icon.getAttribute('data-icon') === 'cross') {
            icon.innerHTML = cross;
        }
        if (icon.getAttribute('data-icon') === 'menu') {
            icon.innerHTML = menu;
        }
    });
})

class Dialog {
    constructor(element) {
        this.element = element;
        this.isExpanded = false;
        this.init();
        this.addEventListeners();
    }

    init() {
        this.element.setAttribute('role', 'dialog');
        this.element.setAttribute('aria-modal', 'true');
        this.element.setAttribute('aria-live', 'polite');
        this.toggle = document.querySelector('button.c-toggle');
        if (!this.toggle) {
            console.warn(`element with class 'button.c-toggle' not found.`);
            return;
        }
        this.toggle.setAttribute('aria-expanded', this.isExpanded);
        this.closers = this.element.querySelectorAll('[data-close]');
        this.closers.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.isExpanded = false;
                this.element.classList.remove('open');
                this.toggle.setAttribute('aria-expanded', this.isExpanded);
            });
        });
    }

    addEventListeners() {
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.isExpanded = !this.isExpanded;
            this.element.classList.toggle('open');
            this.toggle.setAttribute('aria-expanded', this.isExpanded);
        });
    }
}