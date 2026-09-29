import { ModalWindow } from './ModalWindow.js';

const CURRENCY_SYMBOLS = {
    USD: '$',
    RUB: '₽',
    EUR: '€',
};

export class MenuItem {
    constructor({
        id,
        category,
        title,
        description,
        longDescription,
        price,
        currency,
        image,
        alt,
        width,
        height,
    }) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.longDescription = longDescription;

        this.price = price;
        this.currency = currency;

        this.image = image;
        this.alt = alt;
        this.width = width;
        this.height = height;
    }

    render() {
        const card = document.createElement('article');
        card.className = 'menu-card';
        card.dataset.id = this.id;
        card.dataset.category = this.category;
        card.hidden = true;

        if (this.image) {
            const media = document.createElement('div');
            media.className = 'menu-card__media';

            const image = document.createElement('img');
            image.className = 'menu-card__image';
            image.src = this.image;
            image.alt = this.alt ?? '';
            if (this.width) image.width = this.width;
            if (this.height) image.height = this.height;
            image.loading = 'lazy';

            media.append(image);
            card.append(media);
        }

        if (this.title) {
            const title = document.createElement('h2');
            title.className = 'menu-card__title';
            title.textContent = this.title;
            card.append(title);
        }

        if (this.description) {
            const description = document.createElement('p');
            description.className = 'menu-card__text';
            description.textContent = this.description;
            card.append(description);
        }

        if (this.price != null && this.currency) {
            const price = document.createElement('p');
            price.className = 'menu-card__price';
            price.textContent = this.formatPrice();
            card.append(price);
        }

        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-haspopup', 'dialog');
        if (this.title) card.setAttribute('aria-label', this.title);

        card.addEventListener('click', () => this.openModal());
        card.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            this.openModal();
        });

        return card;
    }

    renderModalContent() {
        const details = document.createElement('div');
        details.className = 'menu-modal';

        if (this.image) {
            const media = document.createElement('div');
            media.className = 'menu-modal__media';

            const image = document.createElement('img');
            image.className = 'menu-modal__image';
            image.src = this.image;
            image.alt = this.alt ?? '';
            if (this.width) image.width = this.width;
            if (this.height) image.height = this.height;

            media.append(image);
            details.append(media);
        }

        const body = document.createElement('div');
        body.className = 'menu-modal__body';

        if (this.title) {
            const title = document.createElement('h2');
            title.className = 'menu-modal__title';
            title.dataset.modalTitle = '';
            title.textContent = this.title;
            body.append(title);
        }

        if (this.description) {
            const description = document.createElement('p');
            description.className = 'menu-modal__subtitle';
            description.textContent = this.description;
            body.append(description);
        }

        if (this.longDescription) {
            const longDescription = document.createElement('p');
            longDescription.className = 'menu-modal__text';
            longDescription.textContent = this.longDescription;
            body.append(longDescription);
        }

        if (this.price != null && this.currency) {
            const price = document.createElement('p');
            price.className = 'menu-modal__price';
            price.textContent = this.formatPrice();
            body.append(price);
        }

        details.append(body);
        return details;
    }

    openModal() {
        const modal = new ModalWindow('modal_menu');
        modal.buildModal(this.renderModalContent());
    }

    formatPrice() {
        const symbol = CURRENCY_SYMBOLS[this.currency] ?? this.currency;
        return `${symbol}${Number(this.price).toFixed(2)}`;
    }
}
