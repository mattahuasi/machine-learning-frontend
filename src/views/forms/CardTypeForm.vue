<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  createCardTypeRequest,
  getCardTypeRequest,
  updateCardTypeRequest,
} from "@/api/cardType";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  name: "",
  color: "#e5e7eb",
  description: "",
});
const errors = ref([]);
const rules = {
  name: {
    required: helpers.withMessage("Por favor, ingresa un nombre", required),
  },
  color: {
    required: helpers.withMessage("Por favor, elija un color", required),
  },
  description: {
    required: helpers.withMessage(
      "Por favor, ingresa una descripción",
      required
    ),
  },
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createCardTypeRequest(formData);
      else await updateCardTypeRequest(route.query.id, formData);
      toast.success("¡Tipo de tarjeta guardada exitosamente!");
      router.push("/card-types");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
onMounted(async () => {
  if (route.query.id) {
    const res = await getCardTypeRequest(route.query.id);
    Object.assign(formData, res.data);
  }
});
</script>

<template>
  <Form
    title="Tipo de tarjeta"
    @handle-submit="handleSubmit"
  >
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-1">
      <Input
        id="name"
        label-text="Nombre"
        v-model="v$.name.$model"
        :errors="v$.name.$errors"
        type="text"
      />
    </div>
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Input
        id="color"
        label-text="Color"
        v-model="v$.color.$model"
        :errors="v$.color.$errors"
        type="color"
      />
      <Input
        id="description"
        label-text="Descripción"
        v-model="v$.description.$model"
        :errors="v$.description.$errors"
        type="text"
      />
    </div>
  </Form>
</template>
