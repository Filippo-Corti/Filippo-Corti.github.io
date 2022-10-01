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

//Language Modal
const languageButton = document.querySelector(".language-button");
const languageModal = document.querySelector(".modal-language");

languageButton.addEventListener('click', () => {
    languageModal.showModal();
});

