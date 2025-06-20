<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  createCardRequest,
  getCardRequest,
  updateCardRequest,
} from "@/api/card";
import { getCardTypesRequest } from "@/api/cardType";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";
import Select from "@/components/inputs/Select.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  rfid: "",
  cardTypeId: "",
  description: "",
});
const errors = ref([]);
const types = ref([]);
const rules = computed(() => ({
  rfid: {
    required: helpers.withMessage(
      "Por favor, ingresa el código RFID",
      required
    ),
  },
  cardTypeId: {
    required: helpers.withMessage(
      "Por favor, elija el tipo de tarjeta",
      required
    ),
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
      if (!route.query.id) await createCardRequest(formData);
      else await updateCardRequest(route.query.id, formData);
      toast.success("¡Tarjeta guardada exitosamente!");
      router.push("/cards");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  try {
    const res = await getCardTypesRequest();
    types.value = res.data;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
  if (route.query.id) {
    try {
      const res = await getCardRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
      );
      route.push("/cards");
    }
  }
});
</script>

<template>
  <Form
    title="Tarjeta"
    @handle-submit="handleSubmit"
  >
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-1">
      <Input
        id="rfid"
        label-text="Código RFID"
        v-model="v$.rfid.$model"
        :errors="v$.rfid.$errors"
        type="text"
      />
    </div>
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Select
        id="cardTypeId"
        label-text="Tipo de tarjeta"
        v-model="v$.cardTypeId.$model"
        :errors="v$.cardTypeId.$errors"
        :options="types"
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
