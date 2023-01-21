const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
    card.addEventListener("click", (click) => {
        let targetCard = card;
        targetCard.classList.toggle("active");
    })
})

export {}