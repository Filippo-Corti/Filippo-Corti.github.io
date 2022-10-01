const materials = document.querySelectorAll(".image-card__container");

materials.forEach(el => {
    el.addEventListener('click', (e) => {
        let target = e.target;
        if (target.nodeName == "H1") target = e.target.parentElement;
        let modalId = target.getAttribute('data-activate');
        let modal = document.querySelector("#" + modalId);
        modal.showModal();
        document.querySelector("body").classList.add("lock-background");
    })
})

const closeModalButtons = document.querySelectorAll(".plastic-modal__close-button");

closeModalButtons.forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.close();
        document.querySelector("body").classList.remove("lock-background");
    })
})

const dialogs = document.querySelectorAll(".plastic-modal__container");

dialogs.forEach(el => {
    el.addEventListener('cancel', (e) => {
        document.querySelector("body").classList.remove("lock-background");
    })
})
