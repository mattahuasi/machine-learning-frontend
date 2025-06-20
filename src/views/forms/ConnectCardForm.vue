<script setup>
import { ref, computed, onMounted, reactive, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { getRolesRequest } from "@/api/role";
import { getCardTypesRequest } from "@/api/cardType";
import {
  getCardTypeEmployeeRequest,
  connectCardRequest,
  getCardEmployeeRequest,
} from "@/api/card";
import { getEmployeeRequest } from "@/api/employee";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";
import Select from "@/components/inputs/Select.vue";

const route = useRoute();
const router = useRouter();
const userData = ref({
  firstName: "",
  lastName: "",
  email: "",
  roleId: "",
});
const formData = reactive({
  type: "",
  card: "",
});
const errors = ref([]);
const roles = ref([]);
const types = ref([]);
const cardsData = ref([]);
const rules = computed(() => ({
  type: {
    required: helpers.withMessage(
      "Por favor, elija un tipo de tarjeta",
      required
    ),
  },
  card: {
    required: helpers.withMessage("Por favor, elija una tarjeta", required),
  },
}));
const v$ = useVuelidate(rules, formData);

watch(
  () => formData.type,
  (type) => {
    loadCards();
  }
);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      const userId = {
        userId: userData.value.userId,
      };
      await connectCardRequest(formData.card, userId);
      toast.success("¡Tarjeta vinculada exitosamente!");
      router.push("/employees");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

async function loadCards() {
  try {
    const res = await getCardTypeEmployeeRequest(
      formData.type,
      userData.value.userId
    );
    cardsData.value = res.data;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
}

onMounted(async () => {
  try {
    const dataEmployee = await getEmployeeRequest(route.query.id);
    userData.value = dataEmployee.data;
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
  try {
    const card = await getCardEmployeeRequest(route.query.id);
    Object.assign(formData, card.data);
    loadCards();
  } catch (error) {
    toast.warning("El empleado no tiene tarjeta vinculada");
  }
  try {
    const res = await getCardTypesRequest();
    types.value = res.data;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
});
</script>

<template>
  <Form title="Asignar tarjeta" @handle-submit="handleSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Input
        id="firstName"
        label-text="Nombre/s"
        v-model="userData.firstName"
        type="text"
        disabled
      />
      <Input
        id="lastName"
        label-text="Nombre/s"
        v-model="userData.lastName"
        type="text"
        disabled
      />
      <Input
        id="email"
        label-text="Correo electrónico"
        v-model="userData.email"
        type="email"
        disabled
      />
      <Select
        id="role"
        label-text="Rol"
        v-model="userData.roleId"
        :options="roles"
        disabled
      />
      <Select
        id="type"
        label-text="Tipo de tarjeta"
        v-model="v$.type.$model"
        :errors="v$.type.$errors"
        :options="types"
      />
      <Select
        id="card"
        label-text="Tarjeta"
        v-model="v$.card.$model"
        :errors="v$.card.$errors"
        :options="cardsData"
        name="description"
        :disabled="!formData.type"
      />
    </div>
  </Form>
</template>
