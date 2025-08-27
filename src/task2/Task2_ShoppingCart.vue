<script setup>
import { getCurrentBasket, setCurrentBasket } from '@/localstorage.service';
import { computed, reactive } from 'vue';

const basket = reactive(getCurrentBasket());

function removeItem(id) {
    const index = basket.findIndex((item) => item.id == id);
    if (index >= 0) {
        basket.splice(index, 1);
        setCurrentBasket(basket);
    }
}

function increaseItemQuantity(item) {
    ++item.quantity;
    setCurrentBasket(basket);
}

function decreaseItemQuantity(item) {
    if (item.quantity > 1) {
        --item.quantity;
        setCurrentBasket(basket);
    }
}

const totalPrice = computed(() => {
    let total = 0;
    basket.forEach((item) => {
        total += item.price * item.quantity;
    });
    return total;
});
</script>

<template>
    <div class="container basket">
        <table class="basket-table">
            <thead class="basket-table__header">
                <tr>
                    <th>Product Details</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="basket-table__body">
                <template v-if="basket.length > 0">
                    <tr v-for="item in basket" :key="item.id">
                        <td>
                            <div class="basket-item">
                                <div class="basket-item__image">
                                    <img :src="item.imageUrl" alt="photo" />
                                </div>
                                <div class="basket-item__info">
                                    <h2 class="basket-item__info-h2">{{ item.name }}</h2>
                                    <p class="basket-item__info-p">{{ 'Color: ' + item.color }}</p>
                                    <p class="basket-item__info-p">{{ 'Size: ' + item.size }}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="basket-item__price">{{ '$' + item.price }}</p>
                        </td>
                        <td>
                            <div class="basket-item__quantity">
                                <button @click="decreaseItemQuantity(item)" class="quantity-button">
                                    –
                                </button>
                                <input type="number" :value="item.quantity" min="1" />
                                <button @click="increaseItemQuantity(item)" class="quantity-button">
                                    +
                                </button>
                            </div>
                        </td>
                        <td>
                            <p class="basket-item__price">{{ '$' + item.price * item.quantity }}</p>
                        </td>
                        <td>
                            <button
                                @click="removeItem(item.id)"
                                class="btn btn-delete"
                                aria-label="Удалить"
                            >
                                <svg
                                    class="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="5">
                            <div class="basket-table__summary">
                                <p class="basket-table__total">
                                    Total <b>${{ totalPrice }}</b>
                                </p>
                                <p>Tax ${{ (totalPrice * 0.1).toFixed(2) }}</p>
                            </div>
                        </td>
                    </tr>
                </template>

                <tr v-else>
                    <td colspan="5">
                        <p class="basket-table__empty">No items</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped src="./task2.css" />
