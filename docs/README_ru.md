**Язык:** [English](../README.md) | [Русский](./README_ru.md)

# ☕ [Morning in a Cup] — Лендинг

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-0A66C2?style=flat&logo=githubpages&logoColor=white)](https://your-username.github.io/rsschool-landing-page/)
[![HTML5](https://img.shields.io/badge/markup-HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://your-username.github.io/rsschool-landing-page/)
[![CSS3](https://img.shields.io/badge/styles-CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://your-username.github.io/rsschool-landing-page/)
[![JavaScript](https://img.shields.io/badge/JS-Vanilla-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://your-username.github.io/rsschool-landing-page/)
[![RS School](https://img.shields.io/badge/RS%20School-Fullstack%20Engineering-000000?style=flat)](https://rs.school/courses/fullstack-engineering)

## Живая демонстрация

- **Лендинг:** [https://theFoxTale.github.io/rsschool-landing-page/](https://theFoxTale.github.io/rsschool-landing-page/)

## Скриншот

Идея:
![Landing page idea](docs/idea.jpg)

## О проекте

Адаптивный двухстраничный лендинг для вымышленной кофейни, созданный в рамках курса **RS School Fullstack Engineering**.  
Проект отличается тёплой палитрой в кофейных тонах, плавными взаимодействиями и полностью кастомной реализацией — без фреймворков, только семантический HTML, CSS и чистый JavaScript.

## Возможности

- **Две связанные страницы** — Главная и Меню/Каталог
- **Семантические ориентиры HTML5** (`header`, `main`, `footer`, `nav`, `section`, `article`)
- **Светлая и тёмная темы** с сохранением в `localStorage`
- **Бургер-меню** для мобильной навигации
- **Слайдер/карусель** для избранных напитков или акций (реализован с нуля)
- **Фильтрация по категориям** и динамическое отображение карточек в каталоге
- **Модальное окно** с деталями товара и живым обновлением опций
- **Полностью адаптивная вёрстка** от 1440px до 380px
- **CSS-переменные** для централизованной системы цветов и типографики
- **Локальные шрифты** — без внешнего CDN
- **Изображения WebP** с `loading="lazy"`
- **Плавная прокрутка** и кнопка возврата наверх

## Стек технологий

| Область         | Инструменты                                                  |
| --------------- | ------------------------------------------------------------ |
| Разметка        | HTML5                                                        |
| Стили           | CSS3 (Flexbox, Grid, пользовательские свойства, transitions) |
| Интерактивность | Чистый JavaScript (ES6+)                                     |
| Шрифты          | [Локальные .woff2 файлы]                                     |
| Ресурсы         | SVG-иконки, WebP-изображения                                 |
| Деплой          | GitHub Pages                                                 |

## Структура проекта

```text
rsschool-landing-page/
├── .github/workflows/      # CI: деплой на GitHub Pages
├── index.html              # Главная страница
├── catalog.html            # Страница меню / каталога
├── scss/                   # SCSS 7-1, компилируется Vite
│   ├── main.scss
│   ├── abstracts/
│   ├── base/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── themes/
│   └── vendors/
├── js/
│   ├── modules/
│   │   ├── main.js         # Общие стили; включает плавную прокрутку после загрузки
│   │   ├── theme.js        # Переключение светлой и тёмной темы
│   │   ├── slider.js       # Карусель напитков
│   │   └── catalog.js      # Фильтры категорий и «показать ещё»
│   │   └── burger.js       # Burger - меню и навигация на мобильных устройствах
│   └── pages/
│       ├── home.js         # Точка входа главной страницы
│       └── catalog.js      # Точка входа страницы меню
├── assets/
│   ├── fonts/              # Локальные woff2-файлы шрифтов
│   ├── icons/              # SVG-иконки
│   └── images/             # WebP-изображения проекта
├── README.md
├── docs/
│   ├── idea.jpg                # Изображение, вдохновившее меня на этот проект
│   ├── README-part-1.md        # Описание части 1 (разметка и темы)
│   ├── README-part-2.md        # Описание части 2 (интерактивность)
└── .gitignore
```

## Начало работы

```bash
git clone https://github.com/theFoxTale/rsschool-landing-page.git
cd rsschool-landing-page
```

Установите зависимости и запустите сервер разработки (Node 20 или новее):

```bash
npm install
npm run dev
```

Vite выводит локальный URL, обычно `http://localhost:5173`. Страница меню — `catalog.html` на том же origin.

Соберите статический сайт в `dist/`:

```bash
npm run build
npm run preview
```

## Развёртывание (GitHub Actions → Pages)

Каждый push в ветку деплоя запускает `.github/workflows/deploy-pages.yml`, который публикует сайт на GitHub Pages.

### Разовая настройка репозитория

1. Откройте **Settings → Pages**
2. В разделе **Build and deployment → Source** выберите **GitHub Actions**
3. Смёржите workflow в основную ветку или запустите его один раз через **Actions → Deploy to GitHub Pages → Run workflow**

После этого живой сайт обновляется автоматически при каждом слиянии.

## Задание RS School

Этот репозиторий следует заданию **Landing Page** из курса RS School Fullstack Engineering.

- **Имя репозитория:** `rsschool-landing-page` (личный публичный репозиторий)
- **Работа с ветками:**  
  `landing-page` → [Часть 1 (разметка и темы)](./README-part-1-ru.md)
  `landing-page-part-2` → [Часть 2 (интерактивность)](./README-part-2-ru.md)
- **Деплой через:** GitHub Pages
- **Контент на английском**

**Технические ограничения:**

- Только чистый JavaScript — без JS-фреймворков (React, Angular, Vue)
- Без CSS-фреймворков (Bootstrap, Tailwind и т.д.)
- Без готовых библиотек для слайдера, модального окна или бургер-меню
- CSS-препроцессоры (SASS/SCSS) и `modern-normalize` разрешены

## Контакты

- GitHub: [theFoxTale](https://github.com/theFoxTale)
- Telegram: [@annie_in_life](https://t.me/@annie_in_life)
- Email: [makarenkoanna@yandex.ru](mailto:makarenkoanna@yandex.ru)

## Лицензия

Личный портфолио-проект в образовательных целях (RS School).  
Все права защищены, если не указано иное.
