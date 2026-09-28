const BURGER_ACTIVE_CLASS = 'active';

let burger;
let header;

//---------------------------------------------------------------------------

function setMenuOpen(isOpen) {
    header.classList.toggle(BURGER_ACTIVE_CLASS, isOpen);
    burger.classList.toggle(BURGER_ACTIVE_CLASS, isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close a menu' : 'Open a menu');
}

//---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    burger = document.querySelector('.burger');
    header = document.querySelector('.header__nav');
    if (!burger || !header) return;

    burger.addEventListener('click', () => {
        const isMenuOpen = header.classList.contains(BURGER_ACTIVE_CLASS);
        setMenuOpen(!isMenuOpen);
    });

    document.addEventListener('keydown', (event) => {
        const isMenuOpen = header.classList.contains(BURGER_ACTIVE_CLASS);
        if (event.key === 'Escape' && isMenuOpen) {
            setMenuOpen(false);
        }
    });
});
