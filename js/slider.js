(function () {
    const root = document.querySelector('[data-coffee-slider]');
    if (!root) return;

    const viewport = root.querySelector('.coffee__viewport');
    const track = root.querySelector('.coffee__track');
    const slides = [...track.children];
    const prevButton = root.querySelector('.coffee__arrow--prev');
    const nextButton = root.querySelector('.coffee__arrow--next');
    const dotsWrap = root.querySelector('.coffee__dots');
    const controls = root.querySelector('.coffee__controls');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!slides.length) return;

    let starts = [];
    let pageIndex = 0;
    let pointerId = null;
    let startX = 0;
    let startY = 0;

    function getPerView() {
        const value = Number(getComputedStyle(root).getPropertyValue('--coffee-per-view'));
        return Number.isFinite(value) && value > 0 ? value : 1;
    }

    function getGap() {
        const gap = parseFloat(getComputedStyle(track).columnGap);
        return Number.isFinite(gap) ? gap : 0;
    }

    function getStarts(perView) {
        if (slides.length <= perView) return [0];

        const next = [];
        for (let index = 0; index <= slides.length - perView; index += perView) {
            next.push(index);
        }

        const last = slides.length - perView;
        if (next[next.length - 1] !== last) next.push(last);
        return next;
    }

    function sameStarts(next) {
        return next.length === starts.length && next.every((value, index) => value === starts[index]);
    }

    function syncDots() {
        dotsWrap.querySelectorAll('.coffee__dot').forEach((dot, index) => {
            const active = index === pageIndex;
            dot.classList.toggle('is-active', active);
            if (active) {
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.removeAttribute('aria-current');
            }
        });
    }

    function renderDots() {
        dotsWrap.replaceChildren();

        starts.forEach((start, index) => {
            const dot = document.createElement('button');
            const from = start + 1;
            const to = Math.min(start + getPerView(), slides.length);

            dot.type = 'button';
            dot.className = 'coffee__dot';
            dot.setAttribute(
                'aria-label',
                from === to ? `Show drink ${from}` : `Show drinks ${from} to ${to}`
            );
            dot.addEventListener('click', () => {
                pageIndex = index;
                move(true);
            });
            dotsWrap.appendChild(dot);
        });

        syncDots();
    }

    function move(animate) {
        if (!viewport.clientWidth || !starts.length) return;

        const shouldAnimate = animate && !reduceMotion.matches;
        if (!shouldAnimate) track.style.transition = 'none';

        const distance = starts[pageIndex] * ((viewport.clientWidth + getGap()) / getPerView());
        track.style.transform = `translate3d(${-distance}px, 0, 0)`;

        if (!shouldAnimate) {
            track.offsetHeight;
            track.style.transition = '';
        }

        syncDots();
    }

    function update(animate) {
        const nextStarts = getStarts(getPerView());
        const changed = !sameStarts(nextStarts);

        starts = nextStarts;
        if (pageIndex >= starts.length) pageIndex = 0;
        controls.hidden = starts.length < 2;
        if (changed) renderDots();
        move(animate);
    }

    function go(nextIndex) {
        if (starts.length < 2) return;
        pageIndex = (nextIndex + starts.length) % starts.length;
        move(true);
    }

    prevButton.addEventListener('click', () => go(pageIndex - 1));
    nextButton.addEventListener('click', () => go(pageIndex + 1));

    root.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            go(pageIndex + 1);
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            go(pageIndex - 1);
        }
    });

    viewport.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
    });

    viewport.addEventListener('pointerup', (event) => {
        if (event.pointerId !== pointerId) return;

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        pointerId = null;

        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;
        go(deltaX < 0 ? pageIndex + 1 : pageIndex - 1);
    });

    viewport.addEventListener('pointercancel', () => {
        pointerId = null;
    });

    update(false);
    new ResizeObserver(() => update(false)).observe(viewport);
})();
