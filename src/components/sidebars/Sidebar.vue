<script setup>
import { ref } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import Anchor from "@/components/anchors/Anchor.vue";
import AnchorAccordion from "@/components/anchors/AnchorAccordion.vue";
import Logo from "@/components/branding/Logo.vue";

const { isOpen } = useSidebar();
const activeClass = ref(
  "bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100"
);
const inactiveClass = ref(
  "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
);
</script>

<template>
  <div class="flex">
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <router-link to="/">
        <Logo
          :size="'w-12 h-12'"
          :text-style="'mx-2 text-xl text-white'"
          :margin-top="'mt-8'"
        />
      </router-link>
      <nav class="mt-10">
        <Anchor
          to="/dashboard"
          icon="hi-solid-chart-pie"
          name="Panel de control"
        />
        <Anchor to="/employees" icon="hi-solid-user-group" name="Empleados" />
        <AnchorAccordion icon="hi-solid-collection" name="Tarjetas">
          <Anchor
            to="/card-types"
            icon="hi-solid-credit-card"
            name="Tipos de tarjetas"
          />
          <Anchor to="/cards" icon="hi-solid-identification" name="Tarjetas" />
        </AnchorAccordion>
        <AnchorAccordion
          icon="hi-solid-switch-horizontal"
          name="Entradas y salidas"
        >
          <Anchor to="/entries" icon="hi-solid-login" name="Entradas" />
          <Anchor to="/exits" icon="hi-solid-logout" name="Salidas" />
        </AnchorAccordion>
        <AnchorAccordion icon="hi-solid-calendar" name="Horarios">
          <Anchor to="/time-tables" icon="hi-solid-table" name="Horarios" />
          <Anchor to="/assigns" icon="hi-solid-clock" name="Asignar horarios" />
          <Anchor to="/vacations" icon="hi-solid-briefcase" name="Vacaciones" />
          <Anchor to="/employees" icon="hi-solid-ban" name="Inactivos" />
        </AnchorAccordion>
        <AnchorAccordion icon="hi-solid-cog" name="Configuración">
          <Anchor to="/roles" icon="hi-solid-users" name="Roles de empleados" />
          <Anchor to="/turnstiles" icon="hi-solid-refresh" name="Molinetes" />
        </AnchorAccordion>
      </nav>
    </div>
  </div>
</template>
