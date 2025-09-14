import { ref } from 'vue';

export function useFetch() {
   const isLoading = ref(false);
   const error = ref('');

   const fetchData = async (url, options = {}) => {
      error.value = '';
      isLoading.value = true;
      try {
         const response = await fetch(
            url,
            options
               ? {
                    ...options,
                    body: options.body ? JSON.stringify(options.body) : null,
                    headers: {
                       ...options.headers,
                       'Content-Type': options.body ? 'application/json' : null,
                    },
                 }
               : null,
         );
         if (!response.ok) {
            console.log(response);
            error.value = response.status + ' ' + response.statusText;
            return;
         }

         const data = await response.json();

         return data;
      } catch (err) {
         error.value = err.message;
      } finally {
         isLoading.value = false;
      }
   };

   return { isLoading, error, fetchData };
}
