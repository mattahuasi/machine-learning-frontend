<script setup>
import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { updatePasswordRequest } from "@/api/auth";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";

const formData = reactive({
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
});
const rules = {
  oldPassword: {
    required: helpers.withMessage(
      "Por favor, ingresa tu contraseña actual",
      required
    ),
  },
  newPassword: {
    required: helpers.withMessage(
      "Por favor, ingresa tu nueva contraseña",
      required
    ),
  },
  repeatPassword: {
    required: helpers.withMessage(
      "Por favor, repite tu nueva contraseña",
      required
    ),
  },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await updatePasswordRequest(formData);
      formData.oldPassword = "";
      formData.newPassword = "";
      formData.repeatPassword = "";
      v$.value.$reset();
      toast.success("¡Contraseña actualizada con éxito!");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
</script>

<template>
  <Form title="Cambiar contraseña" @handle-submit="handleSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4">
      <Input
        id="oldPassword"
        label-text="Actual contraseña"
        v-model="v$.oldPassword.$model"
        :errors="v$.oldPassword.$errors"
        type="password"
      />
      <Input
        id="newPassword"
        label-text="Nueva contraseña"
        v-model="v$.newPassword.$model"
        :errors="v$.newPassword.$errors"
        type="password"
      />
      <Input
        id="repeatPassword"
        label-text="Repetir nueva contraseña"
        v-model="v$.repeatPassword.$model"
        :errors="v$.repeatPassword.$errors"
        type="password"
      />
    </div>
  </Form>
</template>
