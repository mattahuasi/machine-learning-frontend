<script setup>
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";
import {
  getEmployeesRequest,
  getEntryHourRequest,
  getTotalRequest,
  getCardsRequest,
} from "@/api/stat";
import { dateFormat } from "@/utils/date";
import CardPieChart from "@/components/cards/CardPieChart.vue";
import CardStat from "@/components/cards/CardStat.vue";

const employees = ref(0);
const employeesTotal = ref([]);
const cardsTotal = ref([]);
const entries = ref(0);
const exits = ref(0);
const date = dateFormat(new Date());
const load = ref(false);

onMounted(async () => {
  try {
    const res = await getTotalRequest(date);
    employees.value = res.data.employees;
    entries.value = res.data.entries;
    exits.value = res.data.exits;
  } catch (error) {
    toast.error(error.message);
  }
  try {
    const res = await getEntryHourRequest(date);
  } catch (error) {
    toast.error(error.message);
  }
  try {
    load.value = true;
    const res = await getEmployeesRequest();
    employeesTotal.value.push({
      value: res.data.inside,
      name: "Empleados dentro",
    });
    employeesTotal.value.push({
      value: res.data.outside,
      name: "Empleados fuera",
    });
    load.value = false;
  } catch (error) {
    toast.error(error.message);
  }
  try {
    load.value = true;
    const res = await getCardsRequest();
    cardsTotal.value.push({
      value: res.data.assigned,
      name: "Tarjetas asignadas",
    });
    cardsTotal.value.push({
      value: res.data.unassigned,
      name: "Tarjetas sin asignar",
    });
    load.value = false;
  } catch (error) {
    toast.error(error.message);
  }
});
</script>

<template>
  <div>
    <div class="flex flex-wrap -mx-6">
      <div class="w-full px-6 lg:w-1/3">
        <card-stat
          title="Empleados registrados"
          :quantity="employees"
          :icon-bg="'bg-indigo-600'"
          :icon-name="'hi-solid-user-group'"
        />
      </div>
      <div class="w-full px-6 lg:w-1/3">
        <card-stat
          title="Entradas registradas hoy"
          :quantity="entries"
          :icon-bg="'bg-blue-600'"
          :icon-name="'hi-solid-login'"
        />
      </div>
      <div class="w-full px-6 lg:w-1/3">
        <card-stat
          title="Salidas registradas hoy"
          :quantity="exits"
          :icon-bg="'bg-pink-600'"
          :icon-name="'hi-solid-logout'"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-6">
      <div class="w-full px-6 lg:w-1/2">
        <card-pie-chart
          title="Total de empleados"
          chart-name="Total de empleados"
          :chart-data="employeesTotal"
          :load="load"
        />
      </div>
      <div class="w-full px-6 lg:w-1/2">
        <card-pie-chart
          title="Total de tarjetas"
          chart-name="Total de tarjetas"
          :chart-data="cardsTotal"
          :load="load"
        />
      </div>
    </div>
  </div>
</template>
