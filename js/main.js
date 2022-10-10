//Mobile Menu
const mobileMenuButton = document.querySelector(".navbar-mobile-button");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOpen = document.querySelector("#mobile-menu-open");
const mobileMenuClose = document.querySelector("#mobile-menu-close");

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.toggleAttribute("showing");
    mobileMenuClose.toggleAttribute("overlay");
    mobileMenuOpen.toggleAttribute("overlay");
});

//Language Menu
const languageButton = document.querySelector("#language-button");
const languageMenu = document.querySelector("#language-menu");
const languageMenuArrow = document.querySelector(".language-arrow")

languageButton.addEventListener('click', () => {
    languageMenu.toggleAttribute("showing");
    languageMenuArrow.toggleAttribute("showing");
});

