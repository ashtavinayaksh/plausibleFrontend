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
            <div class="icon-wrapper">
              <HomeIcon class="menu-icon modern-icon" />
            </div>
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
            <div class="icon-wrapper">
              <GlobeAltIcon class="menu-icon modern-icon" />
            </div>
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
            <div class="icon-wrapper">
              <GlobeAltIcon class="menu-icon modern-icon" />
            </div>
            <span class="menu-title">Pricing</span>
          </a>
        </li>
        <li class="nav-item modern-nav-item logout-item">
          <a
            href="javascript:void(0)"
            class="nav-link modern-nav-link"
            data-bs-toggle="modal"
            data-bs-target="#logoutForm"
            @click="logoutNow()"
          >
            <div class="icon-wrapper">
              <ArrowRightOnRectangleIcon class="menu-icon modern-icon" />
            </div>
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
            <div class="icon-wrapper">
              <HomeIcon class="menu-icon modern-icon" />
            </div>
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
            <div class="icon-wrapper">
              <UsersIcon class="menu-icon modern-icon" />
            </div>
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
            <div class="icon-wrapper">
              <UserGroupIcon class="menu-icon modern-icon" />
            </div>
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
            <div class="icon-wrapper">
              <CreditCardIcon class="menu-icon modern-icon" />
            </div>
            <span class="menu-title">Membership Plans</span>
          </a>
        </li>
        <li class="nav-item modern-nav-item logout-item">
          <a
            href="javascript:void(0)"
            class="nav-link modern-nav-link"
            data-bs-toggle="modal"
            data-bs-target="#logoutForm"
            @click="logoutNow()"
          >
            <div class="icon-wrapper">
              <ArrowRightOnRectangleIcon class="menu-icon modern-icon" />
            </div>
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
}

};
</script>

<style scoped>
/* Modern Sidebar */
.modern-sidebar {
  background: #ffffff;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);
  border-right: 1px solid #f0f0f0;
  padding: 1rem 0;
}

.modern-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

/* Nav Item */
.modern-nav-item {
  border-radius: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.modern-nav-link {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  color: #4a5568;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.modern-nav-link:hover {
  background: #f7fafc;
  color: #667eea;
  transform: translateX(4px);
}

/* Active State */
.modern-nav-item.active .modern-nav-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.modern-nav-item.active .modern-nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #ffffff;
  border-radius: 0 4px 4px 0;
}

/* Icon Wrapper */
.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #f7fafc;
  margin-right: 1rem;
  transition: all 0.3s ease;
}

.modern-nav-link:hover .icon-wrapper {
  background: #edf2f7;
}

.modern-nav-item.active .icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.modern-icon {
  width: 22px;
  height: 22px;
  color: currentColor;
}

/* Menu Title */
.menu-title {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.2px;
}

/* Logout Item */
.logout-item {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  margin-top: 1rem;
}

.logout-item .modern-nav-link {
  color: #f56565;
}

.logout-item .modern-nav-link:hover {
  background: #fff5f5;
  color: #e53e3e;
}

.logout-item .icon-wrapper {
  background: #fff5f5;
}

.logout-item .modern-nav-link:hover .icon-wrapper {
  background: #fed7d7;
}

/* Modal Styling */
.modern-modal {
  border-radius: 16px;
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.modern-modal .modal-header {
  padding: 1.5rem 1.5rem 1rem;
}

.modern-modal .modal-title {
  font-weight: 700;
  color: #2d3748;
}

.modern-modal .modal-body {
  padding: 1rem 1.5rem;
  color: #4a5568;
}

.modern-modal .modal-footer {
  padding: 1rem 1.5rem 1.5rem;
}

.modern-modal .btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.modern-modal .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.modern-modal .btn-secondary {
  background: #f7fafc;
  color: #4a5568;
  border: none;
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.modern-modal .btn-secondary:hover {
  background: #edf2f7;
}

/* Responsive */
@media (max-width: 991px) {
  .modern-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1000;
  }

  .modern-nav {
    padding: 0 0.75rem;
  }

  .modern-nav-link {
    padding: 0.875rem 1rem;
  }

  .icon-wrapper {
    width: 36px;
    height: 36px;
    margin-right: 0.75rem;
  }

  .modern-icon {
    width: 20px;
    height: 20px;
  }

  .menu-title {
    font-size: 0.875rem;
  }
}
</style>
