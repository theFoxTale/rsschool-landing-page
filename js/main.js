import '../scss/main.scss';

const STORAGE_KEY = 'coffee_morning_in_cup_theme';
let toggle;

function readTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
    } catch (error) {
        return 'light';
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
    }
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    if (!toggle) {
        return;
    }

    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

document.addEventListener('DOMContentLoaded', () => {
    toggle = document.querySelector('.theme-toggle');

    applyTheme(readTheme());

    if (!toggle) {
        return;
    }

    toggle.addEventListener('click', function () {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        saveTheme(next);
    });
});
