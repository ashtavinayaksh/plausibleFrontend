<template>
  <nav class="sidebar sidebar-offcanvas modern-sidebar" id="sidebar">
    <ul class="nav modern-nav">
      <!-- User Menu -->
      <template v-if="ldata && ldata.type === 'user'">
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 1 }"
        >
          <a :href="'/'" class="nav-link modern-nav-link" @click="set_menu(1)">
            <HomeIcon class="menu-icon modern-icon" />
            <span class="menu-title">Dashboard</span>
          </a>
        </li>
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 2 }"
        >
          <a
            :href="'/my_websites'"
            class="nav-link modern-nav-link"
            @click="set_menu(2)"
          >
            <GlobeAltIcon class="menu-icon modern-icon" />
            <span class="menu-title">My Websites</span>
          </a>
        </li>
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 3 }"
        >
          <a
            :href="'/pricing_page'"
            class="nav-link modern-nav-link"
            @click="set_menu(3)"
          >
            <CreditCardIcon class="menu-icon modern-icon" />
            <span class="menu-title">Pricing</span>
          </a>
        </li>
        <li class="nav-item modern-nav-item logout-item">
          <a
            href="javascript:void(0)"
            class="nav-link modern-nav-link"
            data-bs-toggle="modal"
            data-bs-target="#logoutForm"
          >
            <ArrowRightOnRectangleIcon class="menu-icon modern-icon" />
            <span class="menu-title">Logout</span>
          </a>
        </li>
      </template>

      <!-- Admin Menu -->
      <template v-if="ldata && ldata.type === 'admin'">
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 1 }"
        >
          <a :href="'/'" class="nav-link modern-nav-link" @click="set_menu(1)">
            <HomeIcon class="menu-icon modern-icon" />
            <span class="menu-title">Dashboard</span>
          </a>
        </li>
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 2 }"
        >
          <a
            :href="'/all_users'"
            class="nav-link modern-nav-link"
            @click="set_menu(2)"
          >
            <UsersIcon class="menu-icon modern-icon" />
            <span class="menu-title">All Customers</span>
          </a>
        </li>
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 3 }"
        >
          <a
            :href="'/subscribers'"
            class="nav-link modern-nav-link"
            @click="set_menu(3)"
          >
            <UserGroupIcon class="menu-icon modern-icon" />
            <span class="menu-title">Subscribers</span>
          </a>
        </li>
        <li
          class="nav-item modern-nav-item"
          :class="{ active: menu_pos === 4 }"
        >
          <a
            :href="'/mem_plans'"
            class="nav-link modern-nav-link"
            @click="set_menu(4)"
          >
            <CreditCardIcon class="menu-icon modern-icon" />
            <span class="menu-title">Membership Plans</span>
          </a>
        </li>
        <li class="nav-item modern-nav-item logout-item">
          <a
            href="javascript:void(0)"
            class="nav-link modern-nav-link"
            data-bs-toggle="modal"
            data-bs-target="#logoutForm"
          >
            <ArrowRightOnRectangleIcon class="menu-icon modern-icon" />
            <span class="menu-title">Logout</span>
          </a>
        </li>
      </template>
    </ul>

    <!-- Logout Modal -->
    <div class="modal fade" id="logoutForm" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content modern-modal">
          <div class="modal-header border-0">
            <h5 class="modal-title">Confirm Logout</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to logout?</p>
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="logoutNow()"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mainBaseUrl } from "@/apis/appconst";
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";

export default {
  name: "MainMenu",
  methods: {
    set_menu($pos) {
      this.menu_pos = $pos;
      for (var x = 0; x < 6; x++) {
        if (document.getElementById("m" + (x + 1))) {
          if (this.menu_pos == x) {
            document.getElementById("m" + (x + 1)).className =
              "nk-menu-link active";
          } else {
            document.getElementById("m" + (x + 1)).className = "nk-menu-link";
          }
        }
      }
    },
    logoutNow() {
      sessionStorage.clear();
      window.location.reload();
    },
  },
  components: {
    HomeIcon,
    UsersIcon,
    UserGroupIcon,
    CreditCardIcon,
    GlobeAltIcon,
    ArrowRightOnRectangleIcon,
  },
  data() {
    return {
      base_url: "",
      menu_pos: 3,
      ldata: null,
    };
  },
  mounted() {
    if (
      sessionStorage.getItem("ldata") &&
      sessionStorage.getItem("ldata").length > 0
    ) {
      this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
    }

    this.base_url = mainBaseUrl;
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments.length ? pathSegments.pop() : "";

    if (lastSegment && lastSegment.localeCompare("bookings") === 0) {
      this.set_menu(2);
    } else {
      this.set_menu(1);
    }
  },
};
</script>

<style scoped>
/* Modern Sidebar */
.modern-sidebar {
  background: #ffffff;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.05);
  border-right: 1px solid #e2e8f0;
  padding: 1rem 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Logo Section */
.sidebar-logo {
  padding: 1rem 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sidebar-logo img {
  max-width: 120px;
  height: auto;
  object-fit: contain;
}

.modern-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 1rem;
  flex: 1;
}

/* Nav Item */
.modern-nav-item {
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
}

.modern-nav-link {
  display: flex;
  align-items: center;
  padding: 0.875rem 1rem;
  color: #64748b;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;
  gap: 0.875rem;
}

/* .modern-nav-link:hover {
  background: #f8fafc;
  color: #00b7ff;
} */

/* Icon Styling */
.modern-icon {
  width: 20px;
  height: 20px;
  color: #000;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

/* Active State */
.modern-nav-item.active .modern-nav-link {
  background: linear-gradient(135deg, #00b7ff 0%, #006bff 100%);
  color: #000;
}

.modern-nav-item.active .modern-icon {
  color: #000;
  transform: scale(1.1);
}

.modern-nav-item.active .modern-nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 24px;
  background: #000;
  border-radius: 0 3px 3px 0;
}

/* Menu Title */
.menu-title {
  font-size: 0.925rem;
  font-weight: 500;
  letter-spacing: -0.2px;
  white-space: nowrap;
}

/* Logout Item */
.logout-item {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.logout-item .modern-nav-link {
  color: #ef4444;
}

/* .logout-item .modern-nav-link:hover {
  background: #fef2f2;
  color: #dc2626;
} */

.logout-item .modern-icon {
  color: currentColor;
}

/* Modal Styling */
.modern-modal {
  border-radius: 16px;
  border: none;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.modern-modal .modal-header {
  padding: 1.5rem 1.5rem 1rem;
  background: #000;
  border-radius: 16px 16px 0 0;
}

.modern-modal .modal-title {
  font-weight: 600;
  color: #1e293b;
  font-size: 1.125rem;
}

.modern-modal .modal-body {
  padding: 1.5rem;
  color: #64748b;
  font-size: 0.95rem;
}

.modern-modal .modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  background: #000;
  border-radius: 0 0 16px 16px;
  gap: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.modern-modal .btn-primary {
  background: linear-gradient(135deg, #00b7ff 0%, #006bff 100%);
  border: none;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.925rem;
  transition: all 0.3s ease;
}

/* .modern-modal .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 183, 255, 0.3);
} */

.modern-modal .btn-secondary {
  background: #000;
  color: #64748b;
  border: 1px solid #e2e8f0;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.925rem;
  transition: all 0.3s ease;
}

/* .modern-modal .btn-secondary:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
} */

.btn-close {
  background: transparent;
  opacity: 0.5;
}

/* .btn-close:hover {
  opacity: 1;
} */

/* Responsive */
@media (max-width: 991px) {
  .modern-sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }

  .modern-sidebar.show {
    left: 0;
  }

  .sidebar-logo {
    padding: 1rem 1.25rem 1.5rem;
  }

  .sidebar-logo img {
    max-width: 100px;
  }

  .modern-nav {
    padding: 0 0.75rem;
  }

  .modern-nav-link {
    padding: 0.75rem 0.875rem;
    gap: 0.75rem;
  }

  .modern-icon {
    width: 18px;
    height: 18px;
  }

  .menu-title {
    font-size: 0.875rem;
  }
}

@media (max-width: 576px) {
  .modern-sidebar {
    width: 100%;
    left: -100%;
  }

  .modern-modal .modal-dialog {
    margin: 1rem;
  }
}
</style>
