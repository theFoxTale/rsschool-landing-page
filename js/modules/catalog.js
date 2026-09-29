import { MenuItem } from '../classes/MenuItem.js';

import coffee from '../data/menu/coffee.json';
import cakes from '../data/menu/cakes.json';
import pastry from '../data/menu/pastry.json';

import '../../scss/pages/_catalog.scss';

const menuGroups = [coffee, cakes, pastry];

//---------------------------------------------------------------------------

let rootElement;

let buttons;
let cards;
let moreWrap;
let moreButton;

const MOBILE_QUERY = '(max-width: 768px)';
const DESKTOP_PAGE_SIZE = 8;
const MOBILE_PAGE_SIZE = 4;

let category = 'coffee';
let visibleCount = MOBILE_PAGE_SIZE;
let mobileQuery;

//---------------------------------------------------------------------------

function matchingCards() {
    return cards.filter((card) => card.dataset.category === category);
}

function initialVisibleCount(total) {
    const pageSize = mobileQuery.matches ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
    return Math.min(pageSize, total);
}

function render() {
    const matching = matchingCards();

    cards.forEach((card) => {
        card.hidden = true;
    });

    matching.forEach((card, index) => {
        card.hidden = index >= visibleCount;
    });

    if (!moreWrap || !moreButton) return;

    const hasMore = matching.length > visibleCount;
    moreWrap.hidden = !hasMore;
    moreButton.hidden = !hasMore;
}

function setCategory(nextCategory) {
    category = nextCategory;
    visibleCount = initialVisibleCount(matchingCards().length);

    buttons.forEach((button) => {
        const active = button.dataset.categoryButton === category;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
    });

    render();
}

function onViewportChange() {
    visibleCount = initialVisibleCount(matchingCards().length);
    render();
}

function renderCards(grid) {
    const fragment = document.createDocumentFragment();

    menuGroups.forEach((group) => {
        group.items.forEach((item) => {
            const card = new MenuItem({ ...item, category: group.category }).render();
            fragment.append(card);
        });
    });

    grid.replaceChildren(fragment);
}

//---------------------------------------------------------------------------

function init() {
    rootElement = document.querySelector('[data-catalog]');
    const grid = rootElement?.querySelector('.catalog__grid');
    if (!rootElement || !grid) return;

    renderCards(grid);

    buttons = [...rootElement.querySelectorAll('[data-category-button]')];
    cards = [...grid.querySelectorAll('[data-category]')];
    moreWrap = rootElement.querySelector('[data-show-more-wrap]');
    moreButton = rootElement.querySelector('[data-show-more]');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            setCategory(button.dataset.categoryButton);
        });
    });

    moreButton?.addEventListener('click', () => {
        visibleCount = matchingCards().length;
        render();
    });

    mobileQuery = window.matchMedia(MOBILE_QUERY);
    mobileQuery.addEventListener('change', onViewportChange);

    setCategory(category);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
