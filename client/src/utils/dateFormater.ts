export const formatDate = (dateStr: string) => {
   const date = new Date(dateStr);

   return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};
