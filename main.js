import './style.css'


/* Mobile Menu */
let mobile_menu_button_on = document.querySelector("#mobile-menu-button-on");
let mobile_menu_button_off = document.querySelector("#mobile-menu-button-off");
let mobile_menu = document.querySelector("#mobile-menu");
let mobile_menu_bg_blur = document.querySelector("#mobile-menu-bg-blur");

document.addEventListener("readystatechange", () => {
    mobile_menu.classList.remove("preload");
    mobile_menu_bg_blur.classList.remove("preload");
});

mobile_menu_button_on.addEventListener("click", toggleMenu)

mobile_menu_button_off.addEventListener("click", toggleMenu)

mobile_menu_bg_blur.addEventListener("click", toggleMenu)

function toggleMenu() {
    mobile_menu.classList.toggle("show-menu")
    mobile_menu_bg_blur.classList.toggle("show-menu")
}

/* Mobile SubMenu */
let submenu_items = document.querySelectorAll(".submenu-item")

submenu_items.forEach(submenu_item => {
    submenu_item.addEventListener("click", (event) => {
        //Rotate Arrow
        event.currentTarget.querySelector("svg").classList.toggle("open-submenu-arrow")
        //Toggle Menu
        let item_id = event.currentTarget.id
        let extended_menu = document.querySelector("#" + item_id + "-extender")
        extended_menu.classList.toggle("show-menu")
    })
}
)