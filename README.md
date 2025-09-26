# RentalCar

Веб-додаток для оренди автомобілів.
Пошук авто за брендом, бронювання, перегляд деталей

Реалізовано на React + Vite з використанням API: https://car-rental-api.goit.global

## Основні функції

- Перегляд каталогу автомобілів з пагінацією
- Фільтрація за брендом, ціною та пробігом
- Перегляд детальної інформації про авто
- Додавання авто в улюблене (LocalStorage)
- Форма бронювання з валідацією (Formik + Yup)
- Сповіщення користувача через iziToast
- Лоадери (react-spinners)

## Використані технології

- UI & UX: react-icons, react-hot-toast, izitoast, react-spinners, modern-normalize
- Forms & Validation: formik, yup, react-datepicker
- State Management: zustand
- Routing: react-router-dom
- Networking: axios
- Utils: date-fns

## Сторінки

- `/` — Домашня сторінка (банер з кнопкою переходу в каталог)
- `/catalog` — Каталог автомобілів з фільтрами та кнопкою "Load More"
- `/catalog/:id` — Сторінка детального опису автомобіля з формою для бронювання

## Запуск проєкту

1. Клонувати репозиторій:
   git clone https://github.com/usernameRuslant/NextRide.git
   cd NextRide
   code .

2. Встановити залежності:
   npm install

3. Запустити локально:
   npm run dev

4. Збірка проєкту:
   npm run build

## Мета

Створення фронтенд частини веб-додатку для компанії "RentalCar".

## Автор

**Ruslan T.**

- GitHub: [usernameRuslant](https://github.com/usernameRuslant)
- Email: ruslan_t1992@icloud.com
