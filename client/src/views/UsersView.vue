<script setup lang="ts">
import LayoutContainer from '@/components/layouts/LayoutContainer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUsersStore } from '@/stores/users';
import { onBeforeMount, ref } from 'vue';
import MessageSpanBase from '@/components/base/MessageSpanBase.vue';
import { formatDate } from '@/utils/dateFormater';
import { Field, Form } from 'vee-validate';

const usersStore = useUsersStore();
const errorMessage = ref('');
const userMessage = ref<Record<string, { msg?: string; type?: string }>>({});
let t = 0;

onBeforeMount(async () => {
   const res = await usersStore.fetchUsers();

   if (res.error) {
      errorMessage.value = res.error;
   } else {
      usersStore.users = res.data ? res.data : [];
   }
});

const onPressRemoveUser = async (id: string) => {
   userMessage.value[id] = {};
   clearTimeout(t);
   const res = await usersStore.removeUser(id);
   console.log(res);
   if (res.error) {
      userMessage.value[id].msg = 'Ошибка сервера';
      userMessage.value[id].type = 'error';
      errorMessage.value = res.error;
   } else {
      userMessage.value[id].msg = 'Обновлено';
      userMessage.value[id].type = 'success';
   }

   t = setTimeout(() => {
      userMessage.value[id] = {};
   }, 2000);
};

const submitRoleChange = async (userId: string, newRoleId: number) => {
   userMessage.value[userId] = {};
   clearTimeout(t);
   console.log('submitRoleChange', userId, newRoleId);

   // если роль не изменилась - ничего не делаем
   if (usersStore.users.find((item) => item.id === userId)?.roleId === newRoleId) {
      return;
   }

   const res = await usersStore.changeUser(userId, newRoleId);
   console.log(res);
   if (res.error) {
      userMessage.value[userId].msg = 'Ошибка сервера';
      userMessage.value[userId].type = 'error';
   } else {
      userMessage.value[userId].msg = 'Обновлено';
      userMessage.value[userId].type = 'success';
   }

   t = setTimeout(() => {
      userMessage.value[userId] = {};
   }, 2000);
};
</script>

<template>
   <LayoutContainer>
      <h1 class="text-3xl font-bold text-center my-10">Пользователи</h1>

      <div class="bg-white rounded-md shadow-md p-8 mb-8">
         <MessageSpanBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageSpanBase>
         <table v-if="usersStore.users.length > 0" class="min-w-full table-fixed">
            <thead class="mb-4">
               <tr>
                  <th class="p-2">Логин</th>
                  <th class="p-2">Дата регистрации</th>
                  <th class="p-2">Роль</th>
                  <th class="p-2"></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="item in usersStore.users" :key="item.id">
                  <td class="text-center p-2">{{ item.login }}</td>
                  <td class="text-center p-2">{{ formatDate(item.registeredAt) }}</td>
                  <td class="text-center p-2">
                     <Form
                        @submit="(data) => submitRoleChange(item.id, data.role)"
                        class="flex items-center gap-2 relative"
                     >
                        <Field
                           as="select"
                           :value="item.roleId"
                           name="role"
                           :id="item.id + 'role'"
                           class="w-full border border-gray-700 rounded-md p-2"
                        >
                           <option value="" disabled>Select a role</option>
                           <option value="0">Admin</option>
                           <option value="1">Moderator</option>
                           <option value="2">User</option>
                        </Field>
                        <button
                           type="submit"
                           class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md cursor-pointer"
                        >
                           <FontAwesomeIcon :icon="faFloppyDisk" />
                        </button>
                        <MessageSpanBase
                           v-if="userMessage[item.id]?.msg != ''"
                           :type="userMessage[item.id]?.type"
                           class="absolute left-full ml-2"
                           >{{ userMessage[item.id]?.msg }}
                        </MessageSpanBase>
                     </Form>
                  </td>
                  <td class="p-2 text-end text-red-700 cursor-pointer">
                     <button @click="() => onPressRemoveUser(item.id)" class="cursor-pointer">
                        <FontAwesomeIcon :icon="faTrash" /> &nbsp; Удалить
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </LayoutContainer>
</template>

<style scoped></style>
