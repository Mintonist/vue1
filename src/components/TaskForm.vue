<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import validationSchema from './validationSchema.js';

const props = defineProps({ info: { type: Object, required: false } });
const emit = defineEmits(['submit', 'reset']);

const submitSuccess = ref(false);

const onFormSubmit = (values, actions) => {
   submitSuccess.value = true;
   console.log('onFormSubmit', values, props.info);

   emit('submit', values);

   actions.resetForm();
};
</script>

<template>
   <Form
      :validation-schema="validationSchema"
      :initial-values="info ? info : null"
      class="form"
      autocomplete="off"
      @submit="onFormSubmit"
      @reset="$emit('reset')"
   >
      <h3 class="form__title">{{ info ? 'Редактировать задачу' : 'Добавить новую задачу' }}</h3>
      <div class="form-group">
         <Field class="form-control" name="title" type="text" id="title" placeholder="Название задачи" />
         <ErrorMessage name="title" />
      </div>
      <div class="form-group">
         <Field
            as="textarea"
            class="form-control"
            name="description"
            type="text"
            id="description"
            placeholder="Описание задачи"
         />
         <ErrorMessage name="description" />
      </div>
      <button class="btn btn--cancel" type="reset">Отмена</button>
      <button class="btn btn--add-task" type="submit">{{ info ? 'Сохранить' : 'Добавить' }}</button>
   </Form>
</template>

<style scoped>
.form {
   display: block;
}

.form__title {
   font-size: 1.5em;
   margin-bottom: 10px;
}

.form-control {
   display: block;
   width: 100%;
   box-sizing: border-box;
   margin-bottom: 20px;
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
   resize: none;
}

.btn--cancel {
   background-color: #007bff;
   color: white;
}

.btn--cancel:hover {
   background-color: #0056b3;
}

.btn--add-task {
   flex-direction: column;
   gap: 12px;
}

.form-control {
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
}

.btn--add-task {
   background-color: #28a745;
   color: white;
}

.btn--add-task:hover {
   background-color: #218838;
}
</style>
