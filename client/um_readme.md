использовано
npm i vee-validate --save
npm i yup
https://docs.fontawesome.com/web/use-with/vue

https://tailwindcss.com/docs/installation/using-vite
https://tailwindcss.com/docs/editor-setup

API Яндекс погоды:
https://yandex.ru/dev/weather/doc/ru/concepts/how-to

----- бредятина ----
в компоненте 'onSearch':
const props = defineProps({
onSearch: { type: Function, required: true },
});

а при его использовании желательно использовать написание 'on-serch':
<SearchBase :on-search="articlesStore.fetchArticles" />
