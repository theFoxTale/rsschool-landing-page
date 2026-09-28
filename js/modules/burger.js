const BURGER_ACTIVE_CLASS = 'active';
const PAGE_SCROLL_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '];

let burger;
let header;

//---------------------------------------------------------------------------

let lockedScrollY = 0;
let touchStartY = 0;

/**
 * Возвращает true, если открытое меню всё ещё может прокручиваться в указанном направлении.
 * Положительное значение deltaY соответствует прокрутке к нижней части списка.
 *
 */
function menuCanConsumeScroll(deltaY) {
    if (header.scrollHeight <= header.clientHeight) return false;

    const maxScroll = header.scrollHeight - header.clientHeight;
    if (deltaY > 0) return header.scrollTop < maxScroll - 1;
    if (deltaY < 0) return header.scrollTop > 0;

    return false;
}

/**
 * Возвращает направление прокрутки меню для клавиши страницы.
 * ArrowUp, PageUp и Home прокручивают меню вверх, остальные клавиши — вниз.
 */
function menuScrollDeltaForKey(key) {
    if (key === 'ArrowUp' || key === 'PageUp' || key === 'Home') return -1;
    return 1;
}

/**
 * Фиксирует страницу, пока меню открыто, а затем возвращает её к той же позиции прокрутки.
 */
function setScrollLocked(isLocked) {
    const body = document.body;

    if (isLocked) {
        lockedScrollY = window.scrollY;
        body.style.top = `-${lockedScrollY}px`;
        body.classList.add('is-scroll-locked');
        return;
    }

    body.classList.remove('is-scroll-locked');
    body.style.top = '';
    window.scrollTo({ top: lockedScrollY, behavior: 'instant' });
}

/**
 * Изменить состояние burger-меню (открыть / закрыть)
 */
function setMenuOpen(isOpen) {
    header.classList.toggle(BURGER_ACTIVE_CLASS, isOpen);
    burger.classList.toggle(BURGER_ACTIVE_CLASS, isOpen);

    burger.setAttribute('aria-expanded', String(isOpen));
    burger.setAttribute('aria-label', isOpen ? 'Close a menu' : 'Open a menu');

    if (isOpen) {
        header.scrollTop = 0;
    }

    setScrollLocked(isOpen);
}

/**
 * Обрабатывает клик по ссылке меню.
 * Ссылка на секцию той же страницы закрывает меню, а затем прокручивает к этой секции.
 * Ссылка на другую страницу передаётся браузеру.
 */
function followMenuLink(event) {
    const link = event.target.closest('a');
    if (!link || !header.classList.contains(BURGER_ACTIVE_CLASS)) return;

    const url = new URL(link.href, window.location.href);
    const samePage =
        url.origin === window.location.origin && url.pathname === window.location.pathname;
    if (!samePage || !url.hash) return;

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView();

    if (window.location.hash !== url.hash) {
        history.pushState(null, '', url.hash);
    }
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

    header.addEventListener('click', followMenuLink);

    // Нажатие клавиши Escape
    document.addEventListener('keydown', (event) => {
        const isMenuOpen = header.classList.contains(BURGER_ACTIVE_CLASS);
        if (event.key === 'Escape' && isMenuOpen) {
            setMenuOpen(false);
        }
    });

    /**
     * Пока меню открыто, страницу нельзя прокрутить с помощью клавиш на клавиатуре,
     */
    window.addEventListener(
        'keydown',
        (event) => {
            if (!document.body.classList.contains('is-scroll-locked')) return;
            if (!PAGE_SCROLL_KEYS.includes(event.key)) return;
            if (
                header.contains(event.target) &&
                menuCanConsumeScroll(menuScrollDeltaForKey(event.key))
            ) {
                return;
            }

            event.preventDefault();
        },
        { capture: true },
    );

    /**
     * Пока меню открыто, страницу нельзя прокрутить колесом,
     * но само меню можно прокручивать, если в нём есть контент, который не поместился на экран.
     *
     * Как только меню докручено до края — дальнейшая прокрутка колесом блокируется,
     * чтобы не дёргалась страница под ним.
     */
    document.addEventListener(
        'wheel',
        (event) => {
            if (!document.body.classList.contains('is-scroll-locked')) return;
            if (header.contains(event.target) && menuCanConsumeScroll(event.deltaY)) return;
            event.preventDefault();
        },
        { passive: false },
    );

    /**
     * Отслеживает начало касания на документе и запоминает вертикальную координату пальца,
     * чтобы touchmove мог определить расстояние и направление движения пальца.
     */
    document.addEventListener(
        'touchstart',
        (event) => {
            if (event.touches.length !== 1) return;
            touchStartY = event.touches[0].clientY;
        },
        { passive: true },
    );

    /**
     * Пока меню открыто, страницу нельзя прокрутить тачпадом,
     * но само меню можно прокручивать, если в нём есть контент, который не поместился на экран.
     *
     * Как только меню докручено до края — дальнейшая прокрутка тападом блокируется,
     * чтобы не дёргалась страница под ним.
     */
    document.addEventListener(
        'touchmove',
        (event) => {
            if (!document.body.classList.contains('is-scroll-locked')) return;

            const touch = event.touches[0];
            if (!touch) return;

            const deltaY = touchStartY - touch.clientY;
            if (header.contains(event.target) && menuCanConsumeScroll(deltaY)) return;

            event.preventDefault();
        },
        { passive: false },
    );
});
