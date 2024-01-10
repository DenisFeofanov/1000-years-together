### 1000 лет вместе [ПОКА БЕЗ КОНТЕНТА]

Спектакль состоящий из бесед со случайными собеседниками. Пользователь выбирает 5 историй, которые становятся актами спектакля (Пролог, Кульминация и т.д.)

![](preview.gif)

### Демо

https://1000-years-together.vercel.app/

### Особенности

- Выбор и прослушивание историй в выбранном порядке (истории сохранены на время сессии)
- Сбор отзывов через форму

### Что я узнал

- Как создать кастомный аудио плеер на основе тега `<audio>`
- Как создать анимацию на скролл
- Как собрать отзывы и отправить их на почту без бекенда через react-hook-form и Resend API
- Как работать с попами через тег `<dialog>`
- Как оптимизировать загрузку нескольких шрифтов с Next.js и Tailwind CSS
- Как сделать автомасштабируемое поле ввода `<textarea>`

### Как установить и запустить

1. Добавить файл .env в корень проекта с ключом для Resend API
   RESEND_API_KEY="INSERT_KEY_HERE"
2. `npm install && npm run dev`
