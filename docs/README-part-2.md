# Landing Page — Part 2: Interactivity

**Morning in a Cup** — interactive features for the RS School Fullstack Engineering landing page task.

---

## Evaluation Checklist

### 1. Working with Data — 10 points

- [ ] Cards of all categories are generated dynamically using JavaScript based on an array of objects from a separate `.js` or `.json` file: **+6**.
- [ ] The card and its corresponding modal window are generated from the same array object. Data is not duplicated in HTML and is not stored in separate copies: **+4**.

### 2. Burger Menu — 20 points

- [x] At a width of 768px and below, the menu opens and closes smoothly when the button is clicked: **+4**.
- [ ] When the menu is open, page scrolling is blocked, and after closing it is restored: **+3**.
- [ ] The open menu occupies the available space under the `header` and matches the visual design of the project, and the icon smoothly switches between a burger and an X: **+4**.
- [x] Links lead to the corresponding sections of the main page or to the catalog and close the menu; the menu also closes when the `Escape` key is pressed: **+4**.
- [x] At a width of 769px and above, the open menu closes, the button is hidden, and the main navigation is displayed: **+3**.
- [x] The menu works correctly on both pages: **+2**.

### 3. Slider or Carousel — 20 points

- [x] The “forward” and “back” buttons switch elements in the corresponding direction: **+6**.
- [x] The slider or carousel contains at least three elements; cyclic switching between the first and last elements is implemented: **+4**.
- [x] Changing elements is accompanied by smooth animation: **+4**.
- [x] One element or the group provided by the design is displayed on the screen; the remaining elements are not visible outside the container boundaries; indicators, if any, correspond to the current state: **+3**.
- [x] The selected component works correctly at widths of 1440px, 768px, and 380px, as well as after resizing the window: **+3**.

### 4. Category Switching — 12 points

- [x] When opening or reloading the catalog page, the first category is active and its corresponding cards are displayed: **+4**.
- [x] When another category is selected, it becomes active, is visually highlighted, and the corresponding set of cards is displayed: **+6**.
- [x] Switching occurs without page reload; only one category is active at a time: **+2**.

### 5. Card Display Management — 13 points

Set size: when the window width is greater than 768px, eight cards of the active category are displayed. At a width of 768px or less, four cards are shown initially, and if there are more, a button is displayed. After clicking, all cards are shown and the button is hidden.

- [ ] On load, the initial set of cards is displayed. Controls are available only if part of the cards in the active category did not fit into this set: **+5**.
- [ ] The button shows additional or all remaining cards and hides after all cards are displayed; selecting a pagination number shows the corresponding set of cards and visually highlights the selected number. Updating occurs without page reload: **+4**.
- [ ] When switching categories, the initial set of cards is displayed; if pagination is used, the first number becomes active: **+2**.
- [ ] When the window width changes, the selected mechanism continues to work correctly, and the number of cards and the state of the controls correspond to the current width: **+2**.

### 6. Modal Window — 12 points

- [ ] Clicking on any part of the card opens a modal window with the data of the selected item: **+3**.
- [ ] The area around the window is darkened, the window is centered on the screen and matches the visual design of the project: **+2**.
- [ ] While the window is open, page scrolling is blocked, and after closing it is restored: **+2**.
- [ ] The window closes when clicking the close button, the darkened area, or the `Escape` key; clicking inside the window does not close it: **+3**.
- [ ] The window displays correctly at widths of 1440px, 768px, and 380px in light and dark themes: **+2**.

### 7. Card Parameters — 13 points

- [ ] In the modal window there are at least two parameters that allow the user to adjust or refine their choice; selected options are visually highlighted: **+3**.
- [ ] After opening the window, the parameters and related information correspond to the initial state of the selected card: **+3**.
- [ ] Selection of parameters works according to their purpose and immediately updates related information without page reload: **+5**.
- [ ] When opening another card, the parameters and related information correspond to the selected card: **+2**.

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
