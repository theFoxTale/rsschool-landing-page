let rootElement;

let buttons;
let cards;
let moreWrap;
let moreButton;

const pageSize = 8;

let category = 'coffee';
let visibleCount = pageSize;

//---------------------------------------------------------------------------

function matchingCards() {
    return cards.filter((card) => card.dataset.category === category);
}

function render() {
    const matching = matchingCards();

    cards.forEach((card) => {
        card.hidden = true;
    });

    matching.forEach((card, index) => {
        card.hidden = index >= visibleCount;
    });

    const hasMore = matching.length > visibleCount;
    moreWrap.hidden = !hasMore;
    moreButton.hidden = !hasMore;
}

function setCategory(nextCategory) {
    category = nextCategory;
    visibleCount = pageSize;

    buttons.forEach((button) => {
        const active = button.dataset.categoryButton === category;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
    });

    render();
}

//---------------------------------------------------------------------------

function init() {
    rootElement = document.querySelector('[data-catalog]');
    if (!rootElement) return;

    buttons = [...rootElement.querySelectorAll('[data-category-button]')];
    cards = [...rootElement.querySelectorAll('[data-category]')];
    moreWrap = rootElement.querySelector('[data-show-more-wrap]');
    moreButton = rootElement.querySelector('[data-show-more]');

    if (!moreWrap || !moreButton) return;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            setCategory(button.dataset.categoryButton);
        });
    });

    moreButton.addEventListener('click', () => {
        visibleCount += pageSize;
        render();
    });

    setCategory(category);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
