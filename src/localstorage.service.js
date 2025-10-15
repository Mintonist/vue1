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
      id: '1',
      name: 'Blue Flower Print Crop Top',
      color: 'Yellow',
      size: 'M',
      price: 29.0,
      quantity: 1,
      imageUrl: './assets/crop-top.png',
   },
   {
      id: '2',
      name: 'Levender Hoodie',
      color: 'Levender',
      size: 'XXL',
      price: 119.0,
      quantity: 1,
      imageUrl: './assets/hoodie.png',
   },
   {
      id: '3',
      name: 'Black Sweatshirt',
      color: 'Black',
      size: 'XXL',
      price: 123.0,
      quantity: 1,
      imageUrl: './assets/sweatshirt.png',
   },
];
