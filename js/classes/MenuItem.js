const CURRENCY_SYMBOLS = {
    USD: '$',
    RUB: '₽',
    EUR: '€',
};

export class MenuItem {
    constructor({ id, category, title, description, price, currency, image, alt, width, height }) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;

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
            const symbol = CURRENCY_SYMBOLS[this.currency] ?? this.currency;
            price.textContent = `${symbol}${this.price.toFixed(2)}`;
            card.append(price);
        }

        return card;
    }
}
