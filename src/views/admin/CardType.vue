<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { getCardTypesRequest, deleteCardTypeRequest } from "@/api/cardType";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import CardData from "@/components/cards/CardData.vue";
import DataTable from "@/components/tables/DataTable.vue";
import Search from "@/components/inputs/Search.vue";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "color", label: "Color", color: true },
  { key: "description", label: "Descripción" },
  { key: "createdAt", label: "Creado", date: true },
]);

const options = ref([
  {
    id: "update",
    name: "Actualizar",
    icon: "hi-solid-pencil",
  },
  {
    id: "delete",
    name: "Eliminar",
    icon: "hi-solid-exclamation",
  },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCardTypesRequest();
    items.value = res.data;
    itemsDisplay.value = items.value;
    load.value = false;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
}

watch(searchQuery, () => {
  searchItems();
});

function searchItems(event) {
  const filteredItems = items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({
      path: "/update/card-types",
      query: { id: action.id },
    });
  } else if (action.action === "delete") {
    try {
      await deleteCardTypeRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Tipo de tarjeta eliminada exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar eliminar el tipo tarjeta. Por favor, inténtalo nuevamente."
      );
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Tipos de Tarjetas">
    <template v-slot:filters>
      <div class="flex flex-col justify-between md:flex-row gap-2 w-full">
        <Search v-model="searchQuery" />
        <button-add to="/new/card-types">Agregar Tipo de Tarjeta</button-add>
      </div>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
