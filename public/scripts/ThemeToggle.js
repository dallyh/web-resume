// Get the current theme from local storage
let currentTheme = localStorage.getItem("theme");

// Function to set theme
window.__switchTheme = (dark) => {
    if (dark) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
};

window.__matchMediaScheme = () => {
    // If the current local storage item can be found
    if (currentTheme === null) {
        // Check media query
        if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                window.__switchTheme(true);
            } else {
                window.__switchTheme(false);
            }
        }
    } else {
        // Set the body data-theme attribute to match the local storage item
        document.documentElement.setAttribute("data-theme", currentTheme);
    }
};
