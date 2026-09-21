# Landing Page — Part 1: Markup

**Morning in a Cup** — a responsive two-page landing page for a fictional coffee shop, built with semantic HTML, CSS, and vanilla JavaScript.

---

## Evaluation Checklist

### 1. Pages and Navigation — 10 points

- [ ] Home page (`index.html`) and catalog page (`catalog.html`) have different URLs: **+4**
- [ ] Navigation between both pages works; logo/name links to the home page: **+2**
- [ ] Navigation contains links to main sections and the catalog page; anchor links use smooth scrolling: **+2**
- [ ] Favicon is connected on each page: **+2**

### 2. Required Elements — 25 points

- [ ] Unified `header` on both pages with logo/name, navigation, and theme toggle: **+5**
- [ ] Home page has at least 4 content sections (excluding header/footer): **+4**
- [ ] Hero section with heading, main info, and CTA: **+3**
- [ ] Slider/carousel section with controls: **+3**
- [ ] Catalog page has at least 3 categories with switching controls: **+3**
- [ ] At least 8 cards in one category with image, title, short description, and additional info: **+3**
- [ ] Button or pagination to show additional cards: **+2**
- [ ] Unified `footer` on both pages with contact info, external links, and project info: **+2**

### 3. Visual Design — 18 points

- [ ] Home page meets visual design requirements at **1440px**: **+3**
- [ ] Catalog page meets visual design requirements at **1440px**: **+3**
- [ ] Home page meets visual design requirements at **768px**: **+3**
- [ ] Catalog page meets visual design requirements at **768px**: **+3**
- [ ] Home page meets visual design requirements at **380px**: **+3**
- [ ] Catalog page meets visual design requirements at **380px**: **+3**

### 4. Responsiveness — 15 points

- [ ] Smooth resize **1440px → 768px**: no horizontal scroll, no overlapping, no clipped content: **+5**
- [ ] Smooth resize **768px → 380px**: no horizontal scroll, no overlapping, no clipped content: **+5**
- [ ] Images keep proportions; elements adapt without whole-page scaling; background spans full width; content is centered (not stretched) at **>1440px**: **+3**
- [ ] At **768px and below**, main navigation is hidden and a burger-menu button is shown: **+2**

### 5. Light and Dark Themes — 17 points

- [ ] Light and dark themes apply to all sections on both pages: **+4**
- [ ] Theme toggle works on both pages and switches the active theme: **+4**
- [ ] Selected theme is saved in `localStorage` and restored after reload: **+3**
- [ ] Selected theme is preserved when navigating between pages: **+2**
- [ ] Toggle state matches the active theme: **+2**
- [ ] Both themes maintain readability, sufficient contrast, and a unified visual style: **+2**

### 6. Validity, Semantics, and Accessibility — 10 points

- [ ] Home page passes W3C Validator without errors: **+2**
- [ ] Catalog page passes W3C Validator without errors: **+2**
- [ ] Semantic elements (`header`, `nav`, `main`, `section`, `footer`) are used appropriately: **+2**
- [ ] Only one `h1` per page; heading hierarchy is logical: **+2**
- [ ] Meaningful images have descriptive `alt`; decorative images are hidden from screen readers: **+2**

### 7. Links and Interactive States — 5 points

- [ ] Contact and external links perform the expected action (phone opens dialer, address opens map): **+2**
- [ ] Links, buttons, and cards have `hover` states: **+2**
- [ ] Appearance changes are smooth and do not shift neighboring elements: **+1**

---

## Penalties

- Using technologies forbidden by the [general technical requirements](https://github.com/rolling-scopes-school/tasks/blob/master/fullstack-engineering/tasks/landing-page/README.md#общие-технические-требования): **−100 points**
- Implementing the entire layout or separate blocks with images instead of HTML elements: **−100 points**

---

## Notes

- **Total maximum score: 100 points.**
- The **Coffee House** mockup is used as a visual guide (structure, layout, and style); pixel-perfect matching is not required.
- Each block is evaluated independently — flaws in one section do not affect the evaluation of others.
- Breakpoints between 1440px, 768px, and 380px are chosen by the student; the site is checked at these widths and all intermediate values.
