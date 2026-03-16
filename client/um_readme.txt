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


------------------------
----------- ts ---------
------------------------
const year: Ref<string|number> = ref('2020')
или
const year = ref<string|number>('2020')
------------------------
interface IBook {
    title: string
    year?: number
}
const book: IBook = reactive({title: 'vue'})
------------------------
const props = defineProps<{
    foo: string
    bar?:number
}>()
или
interface IProps {
    foo: string
    bar?:number
}
const props = defineProps<IProps>()
------------------------

деструкторизация defineProps во vue3.5:
const { count = 0, msg = 'hello' } = defineProps<{
  count?: number
  message?: string
}>()

------------------------
const emit = defineEmits({
    update:(value:string)=>{},
    changed:(id:number, ...rest: any[])=>{}
})
или
const emit = defineEmits<{
    (e: "update", value:string):void
    (e: "changed", id:number, ...rest: any[]):void
}>()
или
const emit = defineEmits<{
    update: [value:string]
    changed: [id:number, ...rest: any[]]
}>()