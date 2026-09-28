document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const header = document.querySelector('.header__nav');
    if (!burger || !header) return;

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        header.classList.toggle('active');
    });
});
