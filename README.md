Привет!
Предлагаю ознакомиться с моим проектом - персональным сайтом junior-разработчика.

* Сайт адаптивен под мобильные устройства;

* Содержит хорошие показатели на https://developers.google.com/speed/pagespeed/insights/

* Прописаны meta-теги для представления в социальных сетях;

* В проекте продемонстрирована работа с API Github'a.

Ссылка на проект https://izosimov.github.io/website/

## 1. Global dependencies

You must have installed: `node`, `npm`, `gulp`.

How to work with this project ?

git clone git@github.com:izosimov/website.git app
cd app
npm i
gulp ... or NODE_ENV=production gulp (for production version)

## 2. Project structure

* `src/`

    * `fonts/`

    * `styles/` entry-point styles, font styles & reset styles

        * `index.css`

        * `fonts.css`

        * `reset.css`

    * `scripts/`

        * `index.js` entry-point scripts

    * `templates/` entry-point template and other templates

        * `index.hbs` entry-point (template)

    * `images/` files using template (svg, png e.g.)

    * `data.json` handlebars context

* `build/` build directory

* `.env` Supports declaring default environment variables in an environment file

* `eslintrc.json` eslint rules

* `stylelintrc.json` stylilint rules
