<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import LayoutContainer from './LayoutContainer.vue';
import type { IYandexWeatherApiResponse } from '@/types';

const year: string = new Date().toLocaleString('ru-RU', { year: 'numeric' });
const city = ref<string>('');
const temp = ref<number>(0);
const osadki = ref<number>(0);

const lat: number = 50.13434;
const lon: number = 50.13434;

onBeforeMount(() => {
   const accessKey: string = import.meta.env.VITE_APP_YANDEX_WEATHER_KEY;
   console.log(accessKey, import.meta.env);
   const headers = {
      'X-Yandex-Weather-Key': accessKey,
   };

   fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${lat}&lon=${lon}`, { headers })
      .then((response) => response.json())
      .then((json: IYandexWeatherApiResponse) => {
         console.log(json);
         city.value = json.geo_object.locality.name;
         temp.value = json.fact.temp;
         osadki.value = json.fact.prec_strength;
      });
});
</script>

<template>
   <LayoutContainer>
      <div class="flex items-center justify-between py-8">
         <div>
            <p>Блог веб-разработчика</p>
            <p><a href="mailto:web@blog.ru">web@blog.ru</a></p>
         </div>
         <div class="text-right">
            <p>{{ city }}, {{ year }}</p>
            <p>Сила осадков {{ osadki }}, {{ temp }}С</p>
         </div>
      </div>
   </LayoutContainer>
</template>

<style scoped></style>
