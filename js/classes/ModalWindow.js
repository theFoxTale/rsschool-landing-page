const CLOSE_ICON =
    '<svg width="15" height="15" viewBox="0 0 21 22" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M12.4239 10.5172L20.6009 2.33999C21.1331 1.80809 21.1331 0.948089 20.6009 0.416194C20.069 -0.115701 19.209 -0.115701 18.6771 0.416194L10.4999 8.59343L2.3229 0.416194C1.79076 -0.115701 0.931004 -0.115701 0.399108 0.416194C-0.133036 0.948089 -0.133036 1.80809 0.399108 2.33999L8.5761 10.5172L0.399108 18.6945C-0.133036 19.2263 -0.133036 20.0863 0.399108 20.6182C0.664184 20.8836 1.01272 21.0169 1.361 21.0169C1.70929 21.0169 2.05758 20.8836 2.3229 20.6182L10.4999 12.441L18.6771 20.6182C18.9425 20.8836 19.2907 21.0169 19.639 21.0169C19.9873 21.0169 20.3356 20.8836 20.6009 20.6182C21.1331 20.0863 21.1331 19.2263 20.6009 18.6945L12.4239 10.5172Z" fill="currentColor"/></svg>';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export class ModalWindow {
    constructor(classes = '') {
        this.classes = classes;

        this.overlay = null;
        this.modal = null;
        this.modalContent = null;
        this.modalCloseBtn = null;

        this.isOpen = false;
        this.ownsScrollLock = false;
        this.lockedScrollY = 0;
        this.previouslyFocused = null;

        this.closeModal = this.closeModal.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    buildModal(content) {
        if (this.isOpen) this.closeModal();

        this.overlay = this.createDomNode('div', 'overlay', 'overlay_modal');
        this.modal = this.createDomNode('div', 'modal', this.classes);
        this.modalContent = this.createDomNode('div', 'modal__content');

        this.modal.tabIndex = -1;
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', 'true');

        this.modalCloseBtn = this.createDomNode('button', 'modal__close-icon');
        this.modalCloseBtn.type = 'button';
        this.modalCloseBtn.setAttribute('aria-label', 'Close');
        this.modalCloseBtn.innerHTML = CLOSE_ICON;

        this.setContent(content);
        this.appendModalElements();
        this.bindEvents();
        this.openModal();
    }

    createDomNode(element, ...classes) {
        const node = document.createElement(element);
        const tokens = classes.flatMap((value) => String(value ?? '').split(/\s+/)).filter(Boolean);

        if (tokens.length) node.classList.add(...tokens);
        return node;
    }

    setContent(content) {
        this.modalContent.replaceChildren();

        if (typeof content === 'string') {
            this.modalContent.innerHTML = content;
        } else if (content instanceof Node) {
            this.modalContent.append(content);
        }

        this.labelDialog();
    }

    labelDialog() {
        const title = this.modalContent.querySelector('[data-modal-title]');
        if (!title) {
            this.modal.removeAttribute('aria-labelledby');
            return;
        }

        if (!title.id) title.id = 'modal-title';
        this.modal.setAttribute('aria-labelledby', title.id);
    }

    appendModalElements() {
        this.modal.append(this.modalCloseBtn, this.modalContent);
        this.overlay.append(this.modal);
    }

    bindEvents() {
        this.modalCloseBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
        this.modal.addEventListener('click', (event) => event.stopPropagation());
    }

    openModal() {
        this.previouslyFocused = document.activeElement;
        this.lockPageScroll();
        document.body.append(this.overlay);
        this.isOpen = true;
        document.addEventListener('keydown', this.onKeyDown, true);
        this.focusDialog();
    }

    closeModal() {
        if (!this.isOpen) return;

        this.isOpen = false;
        document.removeEventListener('keydown', this.onKeyDown, true);
        this.overlay.remove();
        this.unlockPageScroll();

        const returnFocus = this.previouslyFocused;
        this.previouslyFocused = null;
        if (returnFocus instanceof HTMLElement && returnFocus.isConnected) {
            returnFocus.focus({ preventScroll: true });
        }
    }

    onKeyDown(event) {
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            this.closeModal();
            return;
        }

        if (event.key !== 'Tab' || !this.modal) return;

        const focusable = this.focusableElements();
        if (!focusable.length) {
            event.preventDefault();
            return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || !this.modal.contains(active))) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && (active === last || !this.modal.contains(active))) {
            event.preventDefault();
            first.focus();
        }
    }

    focusDialog() {
        const [first] = this.focusableElements();
        (first || this.modal).focus();
    }

    focusableElements() {
        return [...this.modal.querySelectorAll(FOCUSABLE)].filter(
            (node) => !node.hidden && !node.disabled && node.getAttribute('aria-hidden') !== 'true',
        );
    }

    /**
     * В бургер-меню используется этот же механизм блокировки прокрутки.
     * Если он уже включен, то повторная активация не требуется.
     *
     * TODO: возможно нужен рефакторинг? Подумать.
     */
    lockPageScroll() {
        const body = document.body;
        if (body.classList.contains('is-scroll-locked')) {
            this.ownsScrollLock = false;
            return;
        }

        this.ownsScrollLock = true;
        this.lockedScrollY = window.scrollY;
        body.style.top = `-${this.lockedScrollY}px`;
        body.classList.add('is-scroll-locked');
    }

    unlockPageScroll() {
        if (!this.ownsScrollLock) return;

        const body = document.body;
        body.classList.remove('is-scroll-locked');
        body.style.top = '';
        window.scrollTo({ top: this.lockedScrollY, behavior: 'instant' });
        this.ownsScrollLock = false;
    }
}
