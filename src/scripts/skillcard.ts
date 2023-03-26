const skillCards = document.querySelectorAll(".skill-card");

const handleOnMouseMove = (e: MouseEvent) => {
    let target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

skillCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        handleOnMouseMove(e as MouseEvent);
    });

    card.addEventListener("click", (click) => {
        card.classList.toggle("active");
        toggleFocus();
    });

    card.addEventListener('keypress', (e) => {
        let kbEvent = e as KeyboardEvent;
        if (kbEvent.key === 'Enter') {
            card.classList.toggle("active");
        }
        toggleFocus();
    });
})

const toggleFocus = () => {
    var html = getComputedStyle(document.documentElement);
    let smallScreen = html.getPropertyValue('--screen-sm');

    let activeSkillCard = document.querySelector(".skill-card.active");
    if (activeSkillCard === null)
    {
        skillCards.forEach((card) => {
            card.setAttribute("tabindex", "0");
        })
        return;
    }

    if (smallScreen === "true") return;
    let notActiveSkillCards = document.querySelectorAll(".skill-card:not(.active)");
    notActiveSkillCards.forEach((card) => {
        card.setAttribute("tabindex", "-1");
    }
)}

export {}