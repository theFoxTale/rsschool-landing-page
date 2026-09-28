document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header__nav');
    if (!burger || !header) return;

    burger.addEventListener('click', () => {
        const isOpen = header.classList.toggle('active');

        burger.classList.toggle('active', isOpen);

        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Close a menu' : 'Open a menu');
    });
});
