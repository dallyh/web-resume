const timelineCards = document.querySelectorAll<HTMLElement>(".timeline-content");

let observerOptions = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    threshold: [0.85, 0.5],
};

let observer = new IntersectionObserver((entires, observer) => {
    entires.forEach((entry) => {
        if (entry.isIntersecting) {
            let timelineCard = <HTMLElement>entry.target;
            timelineCard.classList.add("animate");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (timelineCards) {
    timelineCards.forEach((element) => {
        observer.observe(element);
    });
}

export {}