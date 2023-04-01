// Section intersection custom "observer"
var deviceWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
var deviceHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;

/**
 * Function which finds if the element is currently visible on screen.
 * Credit - https://codepen.io/tateishi-e/pen/xaEJxw
 * @param element the element to check.
 * @param fullyInView if the element has to be fully in view.
 * @param options offset options.
 * @returns Boolean (true = visible, false = invisible).
 */
const isElementIntersecting = (element: HTMLElement, fullyInView: boolean, options?: { offsetTop: number; offsetBottom: number }): boolean => {
    let offsetTop = options === undefined ? 0 : options.offsetTop;
    let offsetBottom = options === undefined ? 0 : options.offsetBottom;
    var pageTop = window.scrollY;
    var pageBottom = pageTop + deviceHeight;
    var elementTop = element.offsetTop + offsetTop;
    var elementBottom = elementTop + element.offsetHeight + offsetBottom;

    if (fullyInView === true) {
        // Take into account mobile screens
        return pageTop < elementTop && pageBottom > elementBottom || pageTop + deviceHeight/4 > elementTop && pageBottom < elementBottom ;
    } else {
        return elementTop <= pageBottom && elementBottom >= pageTop;
    }
};

/**
 * Function which adds an attribute whcih triggers CSS animations.
 * Credit - https://codepen.io/tateishi-e/pen/xaEJxw
 * @param repeat Boolean of if the effect should repeat or not.
 * @param afterPageLoad Indicates if the function was fired on page load.
 * @returns Undefined.
 */
const animateElement = (repeat: boolean, afterPageLoad: boolean) => {
    let offsets = { offsetTop: 0, offsetBottom: 30 };
    if (deviceWidth < 922) {
        offsets = { offsetTop: 0, offsetBottom: 80 };
    }
    let attribute = "data-js-intersecting";
    let elementsInView: Array<HTMLElement> = [];
    document.querySelectorAll("section").forEach((element) => {
        let isElementInView = isElementIntersecting(element, true, offsets);
        if (isElementInView) {
            element.setAttribute(attribute, "");
            elementsInView.push(element);
        } else if (repeat) {
            element.removeAttribute(attribute);
        }
    });

    if (elementsInView.length === 2 && repeat) {
        if (afterPageLoad && elementsInView[1].hasAttribute(attribute)) {
            elementsInView[1].removeAttribute(attribute);
            return;
        }

        if (elementsInView[0].hasAttribute(attribute)) {
            elementsInView[0].removeAttribute(attribute);
        }
    }
};

// Fires up the animateElement function on every scroll.
document.addEventListener(
    "scroll",
    () => {
        animateElement(true, false);
    },
    false
);

window.addEventListener("DOMContentLoaded", (e) => {
    animateElement(true, true);
    console.log("Custom observer loaded.");
});

export default {};
