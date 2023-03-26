// Credit: https://stackoverflow.com/questions/63902512/js-show-hide-header-on-scroll-effect-but-only-after-the-header-has-scrolled

var prevScrollpos = window.pageYOffset;
var headerDiv = <HTMLElement>document.querySelector(".header-container");

const HideHeader = () => {
    //var headerBottom = headerDiv.offsetTop + headerDiv.offsetHeight;
    window.onscroll = function () {
        var currentScrollPos = window.pageYOffset;

        /* if scrolling down, let it scroll out of view as normal */
        if (prevScrollpos <= currentScrollPos) {
            headerDiv.classList.add("hidden");
        } else {
        /* otherwise if we're scrolling up, fix the nav to the top */
            headerDiv.classList.remove("hidden");
        }

        prevScrollpos = currentScrollPos;
    };
};
HideHeader();

export {};
