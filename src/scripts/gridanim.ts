import { wrapGrid } from "animate-css-grid";

const grid = document.querySelector(".skill-cards-container") as HTMLElement;

export const AnimateGrid = () => {
    if (grid) {
        wrapGrid(grid);
    }
};
