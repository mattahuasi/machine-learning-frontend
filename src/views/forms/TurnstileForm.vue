<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  createTurnstileRequest,
  getTurnstileRequest,
  updateTurnstileRequest,
} from "@/api/turnstile";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  name: "",
  description: "",
});
const errors = ref([]);
const rules = computed(() => ({
  name: {
    required: helpers.withMessage("Por favor, ingresa un nombre", required),
  },
  description: {
    required: helpers.withMessage(
      "Por favor, ingresa una descripción",
      required
    ),
  },
}));

const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createTurnstileRequest(formData);
      else await updateTurnstileRequest(route.query.id, formData);
      toast.success("¡Molinete guardada exitosamente!");
      router.push("/turnstiles");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getTurnstileRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
      );
      route.push("/turnstiles");
    }
  }
});
</script>

<template>
  <Form title="Molinete" @handle-submit="handleSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-1">
      <Input
        id="name"
        label-text="Nombre"
        v-model="v$.name.$model"
        :errors="v$.name.$errors"
        type="text"
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
