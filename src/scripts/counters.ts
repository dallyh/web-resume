const counters = document.querySelectorAll<HTMLElement>("[data-count]");
let duration = 2000;

const Counter = (element: HTMLElement, start: number, end: number, duration: number) => {
    let obj = element,
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration / range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current.toString();
            if (current == end) {
                clearInterval(timer);
            }
        }, step);
};

let observerOptions = {
    rootMargin: "0px",
    threshold: [0.85, 0.5],
};

let observer = new IntersectionObserver((entires, observer) => {
    entires.forEach((entry) => {
        if (entry.isIntersecting) {
            let counter = <HTMLElement>entry.target;
            let start = Number(counter.attributes.getNamedItem("data-count-from")?.value);
            if (!start) start = 0;
            let end = Number(counter.attributes.getNamedItem("data-count")?.value);
            Counter(counter, start, end, duration);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (counters) {
    setTimeout(() => {
        // Check for open dialogs
        const dialogs = document.querySelectorAll("dialog");
        let isDialogOpen = false;
        dialogs.forEach((dialog) => {
            if (dialog.open) {
                isDialogOpen = true;
                dialog.addEventListener("close", () => {
                    counters.forEach((element) => {
                        observer.observe(element);
                    });
                });
            }
        });

        if (isDialogOpen == false) {
            counters.forEach((element) => {
                observer.observe(element);
            });
        }
    });
}

export {};
