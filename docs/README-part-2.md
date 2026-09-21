# Landing Page — Part 2: Interactivity

**Morning in a Cup** — interactive features for the RS School Fullstack Engineering landing page task.

---

## Evaluation Checklist

### 1. Burger Menu — 15 points

- [x] Burger button is visible at 768px and below and hidden on larger screens: **+3**
- [x] Clicking the burger toggles the mobile navigation menu: **+4**
- [x] Menu closes when a navigation link is clicked: **+3**
- [x] Menu closes when clicking outside or pressing `Esc`: **+2**
- [x] Burger icon animates to a close icon when the menu is open: **+3**

### 2. Slider / Carousel — 20 points

- [x] Slider displays slides with images and text: **+4**
- [x] Previous and next buttons navigate between slides: **+4**
- [x] Pagination dots indicate the current slide and allow direct navigation: **+4**
- [x] Slider supports swipe gestures on touch devices: **+4**
- [x] Automatic slide transition with pause on hover: **+4**

### 3. Catalog Filtering & Dynamic Cards — 20 points

- [x] Category buttons filter cards by category: **+5**
- [x] Active category button has a distinct visual state: **+3**
- [x] Cards are rendered dynamically from a data array: **+4**
- [x] “Show more” button loads additional cards: **+4**
- [x] Filtering and loading have smooth transitions without layout shifts: **+4**

### 4. Modal Window — 20 points

- [x] Clicking a card opens a modal with product details: **+4**
- [x] Modal displays image, title, description, and price: **+4**
- [x] Options (size, milk, syrup, etc.) update the price and summary live: **+4**
- [x] Modal closes via close button, overlay click, and `Esc` key: **+4**
- [x] Modal traps focus and restores focus to the trigger on close: **+4**

### 5. Theme Toggle & Persistence — 10 points

- [x] Theme toggle switches between light and dark themes on both pages: **+3**
- [x] Selected theme is saved in `localStorage`: **+3**
- [x] Theme is restored from `localStorage` on page load and navigation: **+2**
- [x] Toggle state matches the active theme: **+2**

### 6. Smooth Scrolling & Back-to-Top — 15 points

- [x] Anchor links scroll smoothly to target sections: **+5**
- [x] Back-to-top button appears after scrolling down: **+5**
- [x] Clicking back-to-top smoothly scrolls to the top: **+5**

---

## Penalties

- Using technologies forbidden by the [general technical requirements](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README.md#общие-технические-требования): **−100 points**
- Using ready‑made libraries for the slider, modal, or burger menu: **−100 points**

---

## Notes

- **Total maximum score: 100 points.**
- All interactive features are implemented from scratch using vanilla JavaScript (ES6+).
- No frameworks, no third‑party UI libraries, and no CSS frameworks are used.
- Interactions are smooth, accessible, and do not cause layout shifts.
