import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away-subtle.css';
import type {Placement} from 'tippy.js'

export const InitializeTooltips = () => {
    console.info("Initializing tooltips.");
    // Get all data selectors
    const tooltips =  document.querySelectorAll("[data-tooltip]");

    if (tooltips.length === 0)
    {
        console.info(`No tooltips found`);
        return;
    }
    console.log(`Found ${tooltips.length} of tooltips.`);

    const InitializeTooltip = (tooltip:Element) => {
        // Get content
        let content = tooltip.attributes.getNamedItem("data-tooltip-text")?.value;
        // Get placement
        let placement = tooltip.attributes.getNamedItem("data-tooltip")?.value as Placement;

        console.info(`Content ${content}, placement: ${placement}`);
        tippy(tooltip, {
            content: content,
            placement: placement,
            animation: 'shift-away-subtle'
        });
    }

    tooltips.forEach((e) => {
        console.info(`Tooltip found.`);
        InitializeTooltip(e);
    });
}