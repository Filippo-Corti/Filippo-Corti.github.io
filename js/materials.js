const materials = document.querySelectorAll(".image-card__container");

materials.forEach(el => {
    el.addEventListener('click', (e) => {
        let target = e.target;
        if (target.nodeName == "H1") target = e.target.parentElement;
        let modalId = target.getAttribute('data-activate');
        let modal = document.querySelector("#" + modalId);
        modal.showModal();
    })
})

const closeModalButtons = document.querySelectorAll(".plastic-modal__close-button");

closeModalButtons.forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.parentElement.close();
    })
})