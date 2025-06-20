<script setup>
import { onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { updateProfileRequest } from "@/api/auth";
import { useProfileStore } from "@/stores/profile";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";

const profileStore = useProfileStore();
const formData = reactive({
  firstName: "",
  lastName: "",
  ci: "",
  phone: "",
  address: "",
  email: "",
});
const rules = {
  firstName: {
    required: helpers.withMessage("Por favor, ingresa tu nombre", required),
  },
  lastName: {
    required: helpers.withMessage("Por favor, ingresa tu apellido", required),
  },
  ci: {
    required: helpers.withMessage(
      "Por favor, ingresa tu cédula de identidad",
      required
    ),
  },
  phone: {
    required: helpers.withMessage(
      "Por favor, ingresa tu número de teléfono o celular",
      required
    ),
  },
  address: {
    required: helpers.withMessage(
      "Por favor, ingresa la dirección de tu domicilio",
      required
    ),
  },
  email: {
    email: helpers.withMessage(
      "Por favor, ingresa un correo electrónico válido",
      email
    ),
    required: helpers.withMessage(
      "Por favor, ingresa tu correo electrónico",
      required
    ),
  },
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      const res = await updateProfileRequest(formData);
      profileStore.user = res.data;
      toast.success("¡La información se ha actualizado correctamente!");
    } catch (error) {
      error.response.data.errors.map((item) => toast.error(item));
    }
  }
}

onMounted(() => {
  Object.assign(formData, profileStore.dataUser);
});
</script>

<template>
  <Form title="Información de usuario" @handle-submit="handleSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Input
        id="firstName"
        label-text="Nombres"
        v-model="v$.firstName.$model"
        :errors="v$.firstName.$errors"
        type="text"
      />
      <Input
        id="lastName"
        label-text="Apellidos"
        v-model="v$.lastName.$model"
        :errors="v$.lastName.$errors"
        type="text"
      />
      <Input
        id="ci"
        label-text="Cédula de identidad"
        v-model="v$.ci.$model"
        :errors="v$.ci.$errors"
        type="text"
        disabled
      />
      <Input
        id="email"
        label-text="Correo electrónico"
        v-model="v$.email.$model"
        :errors="v$.email.$errors"
        type="email"
        disabled
      />
      <Input
        id="phone"
        label-text="Teléfono o celular"
        v-model="v$.phone.$model"
        :errors="v$.phone.$errors"
        type="text"
      />
      <Input
        id="address"
        label-text="Dirección domicilio"
        v-model="v$.address.$model"
        :errors="v$.address.$errors"
        type="text"
      />
    </div>
  </Form>
</template>
