export const BASKET = 'basket';

export function setCurrentBasket(value) {
   localStorage.setItem(BASKET, JSON.stringify(value));
}

export function getCurrentBasket() {
   const v = localStorage.getItem(BASKET);
   if (v == null) return defaultBasket;
   else return JSON.parse(v);
}

const defaultBasket = [
   {
      id: 1,
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      size: 'M',
      price: 29.0,
      quantity: 1,
      imageUrl: './assets/crop-top.png',
   },
   {
      id: 2,
      name: 'Levender Hoodie',
      color: 'Levender',
      size: 'XXL',
      price: 119.0,
      quantity: 1,
      imageUrl: './assets/hoodie.png',
   },
   {
      id: 3,
      name: 'Black Sweatshirt',
      color: 'Black',
      size: 'XXL',
      price: 123.0,
      quantity: 1,
      imageUrl: './assets/sweatshirt.png',
   },
];

export const IS_LOGIN = 'is_login';

export function setCurrentLoginStatus(value) {
   localStorage.setItem(IS_LOGIN, JSON.stringify(value));
}

export function getCurrentLoginStatus() {
   const v = localStorage.getItem(IS_LOGIN);
   if (v == null) return false;
   else return JSON.parse(v);
}

export const TASKS = 'tasks';

export function setCurrentTasks(value) {
   localStorage.setItem(TASKS, JSON.stringify(value));
}

export function getCurrentTasks() {
   const v = localStorage.getItem(TASKS);
   if (v == null) return defaultTasks;
   else return JSON.parse(v);
}

const defaultTasks = [
   {
      id: '1',
      title: 'Задача 1',
      description: 'Описание задачи 1',
   },
   {
      id: '2',
      title: 'Задача 2',
      description: 'Описание задачи 2',
   },
   {
      id: '3',
      title: 'Задача 3',
      description: 'Описание задачи 3',
   },
];
