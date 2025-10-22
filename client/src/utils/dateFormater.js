export const formatDate = (dateStr) => {
   const date = new Date(dateStr);

   return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};
