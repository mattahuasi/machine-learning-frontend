import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile";

// Layout
import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// Administrador
import Assign from "@/views/admin/Assign.vue";
import Card from "@/views/admin/Card.vue";
import CardType from "@/views/admin/CardType.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import Employee from "@/views/admin/Employee.vue";
import Entry from "@/views/admin/Entry.vue";
import Exit from "@/views/admin/Exit.vue";
import Role from "@/views/admin/Role.vue";
import Setting from "@/views/admin/Setting.vue";
import TimeTable from "@/views/admin/TimeTable.vue";
import Turnstile from "@/views/admin/Turnstile.vue";
import Vacation from "@/views/admin/Vacation.vue";

// Autenticación
import Login from "@/views/auth/Login.vue";

// Formularios
import CardForm from "@/views/forms/CardForm.vue";
import CardTypeForm from "@/views/forms/CardTypeForm.vue";
import ConnectCardForm from "@/views/forms/ConnectCardForm.vue";
import EmployeeForm from "@/views/forms/EmployeeForm.vue";
import ProfileForm from "@/views/forms/ProfileForm.vue";
import RoleForm from "@/views/forms/RoleForm.vue";
import TimeTableForm from "@/views/forms/TimeTableForm.vue";
import TurnstileForm from "@/views/forms/TurnstileForm.vue";
import UpdatePasswordForm from "@/views/forms/UpdatePasswordForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        // Panel de control
        {
          path: "/dashboard",
          component: Dashboard,
        },
        // Actualización de perfil
        {
          path: "/update/profile",
          component: ProfileForm,
        },
        {
          path: "/update/password",
          component: UpdatePasswordForm,
        },
        // Empleados
        {
          path: "/employees",
          component: Employee,
        },
        {
          path: "/new/employees",
          component: EmployeeForm,
        },
        {
          path: "/update/employees",
          component: EmployeeForm,
        },
        {
          path: "/connect/cards/employees",
          component: ConnectCardForm,
        },
        // Tipos de tarjetas
        {
          path: "/card-types",
          component: CardType,
          meta: { requiresAdmin: true },
        },
        {
          path: "/new/card-types",
          component: CardTypeForm,
          meta: { requiresAdmin: true },
        },
        {
          path: "/update/card-types",
          component: CardTypeForm,
          meta: { requiresAdmin: true },
        },
        // Tarjetas
        {
          path: "/cards",
          component: Card,
        },
        {
          path: "/new/cards",
          component: CardForm,
        },
        {
          path: "/update/cards",
          component: CardForm,
        },
        // Entradas
        {
          path: "/entries",
          component: Entry,
        },
        // Salidas
        {
          path: "/exits",
          component: Exit,
        },
        // Horarios
        {
          path: "/time-tables",
          component: TimeTable,
        },
        {
          path: "/new/time-tables",
          component: TimeTableForm,
        },
        {
          path: "/update/time-tables",
          component: TimeTableForm,
        },
        // Asignación
        {
          path: "/assigns",
          component: Assign,
        },
        // Vacaciones
        {
          path: "/vacations",
          component: Vacation,
        },
        // Roles
        {
          path: "/roles",
          component: Role,
          meta: { requiresAdmin: true },
        },
        {
          path: "/new/roles",
          component: RoleForm,
          meta: { requiresAdmin: true },
        },
        {
          path: "/update/roles",
          component: RoleForm,
          meta: { requiresAdmin: true },
        },
        // Molinos
        {
          path: "/turnstiles",
          component: Turnstile,
          meta: { requiresAdmin: true },
        },
        {
          path: "/new/turnstiles",
          component: TurnstileForm,
          meta: { requiresAdmin: true },
        },
        {
          path: "/update/turnstiles",
          component: TurnstileForm,
          meta: { requiresAdmin: true },
        },
      ],
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: Auth,
      meta: { notAuthenticated: true },
      children: [
        {
          path: "/auth/login",
          component: Login,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  let ok = false;
  let path = "";
  const profileStore = useProfileStore();

  if (!profileStore.isAuthenticated) {
    try {
      await profileStore.verifyToken();
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!profileStore.isAuthenticated) {
      path = "/auth/login";
      ok = false;
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.notAuthenticated)) {
    if (profileStore.isAuthenticated) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!profileStore.isAdmin) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }
  if (ok) {
    next();
  } else {
    next({ path });
  }
});

export default router;
