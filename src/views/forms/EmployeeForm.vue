<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import { useProfileStore } from "@/stores/profile";
import { getRolesRequest } from "@/api/role";
import {
  createEmployeeRequest,
  getEmployeeRequest,
  updateEmployeeRequest,
} from "@/api/employee";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";
import Select from "@/components/inputs/Select.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";

const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  roleId: "",
  ci: "",
  phone: "",
  address: "",
  staff: false,
  admin: false,
});
const rules = {
  email: {
    required: helpers.withMessage(
      "Por favor, ingresa un correo electrónico",
      required
    ),
    email: helpers.withMessage(
      "Por favor, ingresa un correo electrónico válido",
      email
    ),
  },
  firstName: {
    required: helpers.withMessage("Por favor, ingresa el nombre/s", required),
  },
  lastName: {
    required: helpers.withMessage("Por favor, ingresa los apellidos", required),
  },
  ci: {
    required: helpers.withMessage(
      "Por favor, ingresa la cédula de identidad",
      required
    ),
  },
  roleId: {
    required: helpers.withMessage("Por favor, elige un rol", required),
  },
  address: {},
  phone: {},
  password: {},
  staff: {},
  admin: {},
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);
const roles = ref([]);

watch(
  () => formData.admin,
  (admin) => {
    if (admin && !formData.staff) {
      formData.staff = true;
    }
  }
);

watch(
  () => formData.staff,
  (staff) => {
    if (!staff && formData.admin) {
      formData.admin = false;
    }
  }
);

async function handleSubmit(event) {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) {
        formData.password = `ML${formData.ci}`;
        await createEmployeeRequest(formData);
      } else await updateEmployeeRequest(route.query.id, formData);
      toast.success("¡Empleado guardada exitosamente!");
      router.push("/employees");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
onMounted(async () => {
  try {
    const res = await getRolesRequest();
    roles.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
  }
  if (route.query.id) {
    try {
      const res = await getEmployeeRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
      );
      route.push("/employees");
    }
  }
});
</script>

<template>
  <Form title="Empleado" @handle-submit="handleSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Input
        id="firstName"
        label-text="Nombre/s"
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
      />
      <Select
        id="role"
        label-text="Rol"
        v-model="v$.roleId.$model"
        :errors="v$.roleId.$errors"
        :options="roles"
      />
      <Input
        id="email"
        label-text="Correo electrónico"
        v-model="v$.email.$model"
        :errors="v$.email.$errors"
        type="email"
      />
      <Input
        id="phone"
        label-text="Teléfono o celular"
        v-model="v$.phone.$model"
        :errors="v$.phone.$errors"
        type="text"
      />
      <Checkbox
        v-if="profileStore.isAdmin"
        id="staff"
        label-text="Acceso del sistema"
        v-model="v$.staff.$model"
      />
      <Checkbox
        v-if="profileStore.isAdmin"
        id="admin"
        label-text="Permisos de administrador"
        v-model="v$.admin.$model"
      />
    </div>
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-1">
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
