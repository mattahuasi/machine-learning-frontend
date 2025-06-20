<script setup>
import { ref, computed, onMounted, reactive, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRoute, useRouter } from "vue-router";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import {
  createTimeTableRequest,
  updateTimeTableRequest,
  getTimeTableRequest,
} from "@/api/timeTable";
import Form from "@/components/cards/CardForm.vue";
import Input from "@/components/inputs/Input.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  title: "",
  description: "",
  toleranceDelay: "",
  toleranceLack: "",
  toleranceOutput: "",
  earlyExit: "",
  punctuality: "",
  priority: "",
  schedule: {
    Monday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Tuesday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Wednesday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Thursday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Friday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Saturday: {
      entry: "",
      exit: "",
      enable: false,
    },
  },
});
const errors = ref([]);
const rules = computed(() => ({
  title: {
    required: helpers.withMessage("Por favor, ingrese el titulo", required),
  },
  description: {
    required: helpers.withMessage(
      "Por favor, ingrese una descripción",
      required
    ),
  },
  toleranceDelay: {
    required: helpers.withMessage(
      "Por favor, ingrese tolerancia en atraso",
      required
    ),
  },
  toleranceLack: {
    required: helpers.withMessage(
      "Por favor, ingrese tolerancia en falta",
      required
    ),
  },
  toleranceOutput: {
    required: helpers.withMessage(
      "Por favor, ingrese tolerancia a la salida",
      required
    ),
  },
  earlyExit: {
    required: helpers.withMessage(
      "Por favor, ingrese la salida adelantada",
      required
    ),
  },
  punctuality: {
    required: helpers.withMessage(
      "Por favor, ingrese la puntualidad",
      required
    ),
  },
  priority: {
    required: helpers.withMessage("Por favor, ingrese la prioridad", required),
  },
  schedule: {
    Monday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Tuesday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Wednesday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Thursday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Friday: {
      entry: "",
      exit: "",
      enable: false,
    },
    Saturday: {
      entry: "",
      exit: "",
      enable: false,
    },
  },
}));
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) await createTimeTableRequest(formData);
      else await updateTimeTableRequest(route.query.id, formData);
      toast.success("¡Horario guardado exitosamente!");
      router.push("/time-tables");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getTimeTableRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
      );
      route.push("/time-tables");
    }
  }
});
</script>

<template>
  <Form title="Horario" @handle-submit="handleSubmit">
    <div class="grid grid-cols-1 gap-6 mt-4 lg:grid-cols-2">
      <Input
        id="title"
        label-text="Titulo"
        v-model="v$.title.$model"
        :errors="v$.title.$errors"
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
    <div class="grid grid-cols-1 gap-6 mt-4 md:grid-cols-3">
      <Input
        id="toleranceDelay"
        label-text="Tolerancia en atraso (minutos)"
        v-model="v$.toleranceDelay.$model"
        :errors="v$.toleranceDelay.$errors"
        type="number"
        :min="0"
        :max="60"
      />
      <Input
        id="toleranceLack"
        label-text="Tolerancia en falta (minutos)"
        v-model="v$.toleranceLack.$model"
        :errors="v$.toleranceLack.$errors"
        type="number"
        :min="0"
        :max="60"
      />
      <Input
        id="toleranceOutput"
        label-text="Tolerancia a la salida (minutos)"
        v-model="v$.toleranceOutput.$model"
        :errors="v$.toleranceOutput.$errors"
        type="number"
        :min="0"
        :max="60"
      />
      <Input
        id="earlyExit"
        label-text="Salida adelantada (minutos)"
        v-model="v$.earlyExit.$model"
        :errors="v$.earlyExit.$errors"
        type="number"
        :min="0"
        :max="60"
      />
      <Input
        id="punctuality"
        label-text="Puntualidad (minutos)"
        v-model="v$.punctuality.$model"
        :errors="v$.punctuality.$errors"
        type="number"
        :min="0"
        :max="60"
      />
      <Input
        id="priority"
        label-text="Prioridad"
        v-model="v$.priority.$model"
        :errors="v$.priority.$errors"
        type="number"
        :min="0"
        :max="60"
      />
      <Input
        id="MondayEntry"
        label-text="Lunes (Entrada)"
        v-model="formData.schedule.Monday.entry"
        type="time"
      />
      <Input
        id="MondayExit"
        label-text="Lunes (Salida)"
        v-model="formData.schedule.Monday.exit"
        type="time"
      />
      <Checkbox
        id="MondayEnable"
        label-text="Lunes (Habilitado)"
        v-model="formData.schedule.Monday.enable"
      />
      <Input
        id="TuesdayEntry"
        label-text="Martes (Entrada)"
        v-model="formData.schedule.Tuesday.entry"
        type="time"
      />
      <Input
        id="TuesdayExit"
        label-text="Martes (Salida)"
        v-model="formData.schedule.Tuesday.exit"
        type="time"
      />
      <Checkbox
        id="TuesdayEnable"
        label-text="Martes (Habilitado)"
        v-model="formData.schedule.Tuesday.enable"
      />
      <Input
        id="WednesdayEntry"
        label-text="Miércoles (Entrada)"
        v-model="formData.schedule.Wednesday.entry"
        type="time"
      />
      <Input
        id="WednesdayExit"
        label-text="Miércoles (Salida)"
        v-model="formData.schedule.Wednesday.exit"
        type="time"
      />
      <Checkbox
        id="WednesdayEnable"
        label-text="Miércoles (Habilitado)"
        v-model="formData.schedule.Wednesday.enable"
      />
      <Input
        id="ThursdayEntry"
        label-text="Jueves (Entrada)"
        v-model="formData.schedule.Thursday.entry"
        type="time"
      />
      <Input
        id="ThursdayExit"
        label-text="Jueves (Salida)"
        v-model="formData.schedule.Thursday.exit"
        type="time"
      />
      <Checkbox
        id="ThursdayEnable"
        label-text="Jueves (Habilitado)"
        v-model="formData.schedule.Thursday.enable"
      />
      <Input
        id="FridayEntry"
        label-text="Viernes (Entrada)"
        v-model="formData.schedule.Friday.entry"
        type="time"
      />
      <Input
        id="FridayExit"
        label-text="Viernes (Salida)"
        v-model="formData.schedule.Friday.exit"
        type="time"
      />
      <Checkbox
        id="FridayEnable"
        label-text="Viernes (Habilitado)"
        v-model="formData.schedule.Friday.enable"
      />
      <Input
        id="SaturdayEntry"
        label-text="Sábado (Entrada)"
        v-model="formData.schedule.Saturday.entry"
        type="time"
      />
      <Input
        id="SaturdayExit"
        label-text="Sábado (Salida)"
        v-model="formData.schedule.Saturday.exit"
        type="time"
      />
      <Checkbox
        id="SaturdayEnable"
        label-text="Sábado (Habilitado)"
        v-model="formData.schedule.Saturday.enable"
      />
    </div>
  </Form>
</template>
