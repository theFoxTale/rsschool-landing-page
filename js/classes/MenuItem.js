import { ModalWindow } from './ModalWindow.js';

const CURRENCY_SYMBOLS = {
    USD: '$',
    RUB: '₽',
    EUR: '€',
};

const BADGE_LABELS = {
    signature: 'Signature',
    bestseller: 'Bestseller',
    new: 'New',
    seasonal: 'Seasonal',
};

export class MenuItem {
    constructor({
        id,
        category,
        title,
        description,
        longDescription,
        badge = '',
        price,
        currency,
        image,
        alt,
        width,
        height,
        defaultSize = '',
        defaultMilk = null,
        sizes = [],
        milks = [],
        additives = [],
        toppings = [],
        extras = [],
        allergens = [],
    }) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.description = description;
        this.longDescription = longDescription;
        this.badge = badge;

        this.price = price;
        this.currency = currency;

        this.image = image;
        this.alt = alt;
        this.width = width;
        this.height = height;

        this.defaultSize = defaultSize;
        this.defaultMilk = defaultMilk;
        this.sizes = sizes;
        this.milks = milks;
        this.additives = additives;
        this.toppings = toppings;
        this.extras = extras;
        this.allergens = allergens;

        this.selectedSizeId = '';
        this.selectedMilkId = null;
        this.selectedAddonIds = new Set();
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
        this.addonOptionButtons = [];
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

        if (this.badge) {
            const badge = document.createElement('p');
            badge.className = 'menu-modal__badge';
            badge.textContent = BADGE_LABELS[this.badge] ?? this.badge;
            body.append(badge);
        }

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

        this.optionGroups().forEach((group) => {
            body.append(this.renderOptionGroup(group));
        });

        const summary = document.createElement('div');
        summary.className = 'menu-modal__summary';

        this.priceElement = document.createElement('p');
        this.priceElement.className = 'menu-modal__price';
        summary.append(this.priceElement);

        this.metaElement = document.createElement('p');
        this.metaElement.className = 'menu-modal__meta';
        summary.append(this.metaElement);

        body.append(summary);

        if (this.allergens.length) {
            const allergens = document.createElement('p');
            allergens.className = 'menu-modal__allergens';
            allergens.textContent = `Contains allergens: ${this.allergens.join(', ')}.`;
            body.append(allergens);
        }

        this.updateSummary();
        details.append(body);
        return details;
    }

    optionGroups() {
        const groups = [];

        if (this.sizes.length) {
            groups.push({
                id: 'size',
                legend: 'Size',
                mode: 'single',
                options: this.sizes,
                isSelected: (optionId) => optionId === this.selectedSizeId,
                select: (optionId) => {
                    this.selectedSizeId = optionId;
                },
            });
        }

        if (this.milks.length) {
            const milkIsOptional = !this.defaultMilk;
            groups.push({
                id: 'milk',
                legend: 'Milk',
                mode: milkIsOptional ? 'optional' : 'single',
                options: this.milks,
                isSelected: (optionId) => optionId === this.selectedMilkId,
                select: (optionId) => {
                    this.selectedMilkId =
                        milkIsOptional && this.selectedMilkId === optionId ? null : optionId;
                },
            });
        }

        const addons = [
            { legend: 'Additives', options: this.additives },
            { legend: 'Toppings', options: this.toppings },
            { legend: 'Extras', options: this.extras },
        ].find((group) => group.options.length);

        if (addons) {
            groups.push({
                id: 'addons',
                legend: addons.legend,
                mode: 'multiple',
                options: addons.options,
                isSelected: (optionId) => this.selectedAddonIds.has(optionId),
                select: (optionId) => {
                    if (this.selectedAddonIds.has(optionId)) {
                        this.selectedAddonIds.delete(optionId);
                    } else {
                        this.selectedAddonIds.add(optionId);
                    }
                },
            });
        }

        return groups;
    }

    renderOptionGroup(group) {
        const field = document.createElement('fieldset');
        field.className = 'menu-modal__group';

        const legend = document.createElement('legend');
        legend.className = 'menu-modal__legend';
        legend.textContent = group.legend;
        field.append(legend);

        const options = document.createElement('div');
        options.className = 'menu-modal__options';

        group.options.forEach((option) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'menu-modal__option';
            button.dataset.optionId = option.id;
            const count = group.id === 'addons' && this.isPerPiece(option) ? this.pieceCount() : 1;
            button.textContent = this.optionLabel(option, count);

            const selected = group.isSelected(option.id);
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));

            if (group.id === 'addons') {
                this.addonOptionButtons.push({ button, option });
            }

            button.addEventListener('click', () => {
                group.select(option.id);
                options.querySelectorAll('.menu-modal__option').forEach((item) => {
                    const isSelected = group.isSelected(item.dataset.optionId);
                    item.classList.toggle('is-active', isSelected);
                    item.setAttribute('aria-pressed', String(isSelected));
                });
                if (group.id === 'size') this.updateAddonLabels();
                this.updateSummary();
            });

            options.append(button);
        });

        field.append(options);
        return field;
    }

    optionLabel(option, count = 1) {
        const measure = option.volume || option.weight;
        const unit = Number(option.priceDelta) || 0;
        let delta = this.formatDelta(unit);

        if (unit && count > 1) {
            delta = `${count} × ${this.formatAmount(Math.abs(unit))}`;
        }

        return [option.label, measure, delta].filter(Boolean).join(' · ');
    }

    pieceCount() {
        const size = this.selectedSize();
        const explicit = Number(size?.quantity);
        if (explicit > 0) return explicit;

        const source = `${size?.weight ?? ''} ${size?.volume ?? ''}`;
        const match = source.match(/(\d+)\s+(?:pcs|pc|slices|slice)\b/i);
        return match ? Number(match[1]) : 1;
    }

    isPerPiece(option) {
        return [...this.toppings, ...this.extras].some((item) => item.id === option.id);
    }

    updateAddonLabels() {
        const count = this.pieceCount();
        this.addonOptionButtons.forEach(({ button, option }) => {
            button.textContent = this.optionLabel(option, this.isPerPiece(option) ? count : 1);
        });
    }

    resetSelection() {
        const sizeIds = this.sizes.map((size) => size.id);
        this.selectedSizeId = sizeIds.includes(this.defaultSize)
            ? this.defaultSize
            : (sizeIds[0] ?? '');

        const milkIds = this.milks.map((milk) => milk.id);
        this.selectedMilkId = milkIds.includes(this.defaultMilk) ? this.defaultMilk : null;
        this.selectedAddonIds = new Set();
    }

    selectedSize() {
        return this.sizes.find((size) => size.id === this.selectedSizeId) ?? null;
    }

    selectedMilk() {
        return this.milks.find((milk) => milk.id === this.selectedMilkId) ?? null;
    }

    selectedAddons() {
        const options = [...this.additives, ...this.toppings, ...this.extras];
        return options.filter((option) => this.selectedAddonIds.has(option.id));
    }

    totalPrice() {
        const sizeDelta = Number(this.selectedSize()?.priceDelta) || 0;
        const milkDelta = Number(this.selectedMilk()?.priceDelta) || 0;
        const addonDelta = this.selectedAddons().reduce(
            (sum, option) => sum + this.addonAmount(option.priceDelta, option),
            0,
        );
        const total = (Number(this.price) || 0) + sizeDelta + milkDelta + addonDelta;
        return Math.round(total * 100) / 100;
    }

    totalCalories() {
        const sizeCalories = Number(this.selectedSize()?.calories) || 0;
        const milkCalories = Number(this.selectedMilk()?.caloriesDelta) || 0;
        const addonCalories = this.selectedAddons().reduce(
            (sum, option) => sum + this.addonAmount(option.caloriesDelta, option),
            0,
        );
        return sizeCalories + milkCalories + addonCalories;
    }

    addonAmount(unit, option) {
        const count = this.isPerPiece(option) ? this.pieceCount() : 1;
        return (Number(unit) || 0) * count;
    }

    updateSummary() {
        if (!this.priceElement || !this.metaElement) return;

        this.priceElement.textContent = this.formatAmount(this.totalPrice());

        const measure = this.selectedSize()?.volume || this.selectedSize()?.weight;
        const details = [`${this.totalCalories()} kcal`];
        if (measure) details.push(measure);
        this.metaElement.textContent = details.join(' · ');
    }

    openModal() {
        this.resetSelection();
        const modal = new ModalWindow('modal_menu');
        modal.buildModal(this.renderModalContent());
    }

    formatPrice() {
        return this.formatAmount(this.price);
    }

    formatAmount(amount) {
        const symbol = CURRENCY_SYMBOLS[this.currency] ?? this.currency;
        const rounded = Math.round(Number(amount) * 100) / 100;
        return `${symbol}${rounded.toFixed(2)}`;
    }

    formatDelta(delta) {
        const value = Number(delta) || 0;
        if (!value) return '';
        const sign = value > 0 ? '+' : '−';
        return `${sign}${this.formatAmount(Math.abs(value))}`;
    }
}
