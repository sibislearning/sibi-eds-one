import {fetchPlaceholders} from '../../scripts/placeholders.js';

export default async function decorate(block) {
    // get the current language from the URL
    const path = window.location.pathname;
    const locale = path.split('/')[1];

    // fetch the placeholders for the current language
    const placeholders = await fetchPlaceholders(`/${locale}`);

    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null, false);

    while(walker.nextNode()) {
        const node = walker.currentNode;
        node.textContent = node.textContent.replace(/\{\{([^}]+)\}\}/g, (match, key) => placeholders[key.trim()] ?? match);
    }
}