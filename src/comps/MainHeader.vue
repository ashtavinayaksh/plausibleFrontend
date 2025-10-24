<template>
  <nav
    class="navbar modern-navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row"
  >
    <div
      class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start"
    >
      <div class="me-3">
        <button
          class="navbar-toggler navbar-toggler align-self-center modern-toggle"
          type="button"
          data-bs-toggle="minimize"
        >
          <Bars3Icon class="icon-menu icsize" />
        </button>
      </div>
      <div>
        <a class="navbar-brand brand-logo" href="javascript:void(0)">
          <img :src="base_url + 'images/logo-dark.png'" alt="Logo" />
        </a>
        <a class="navbar-brand brand-logo-mini" href="javascript:void(0)">
          <img :src="base_url + 'images/logo-dark.png'" alt="Logo" />
        </a>
      </div>
    </div>

    <div class="navbar-menu-wrapper d-flex align-items-top">
      <ul class="navbar-nav">
        <li class="nav-item fw-semibold d-none d-lg-block ms-0">
          <h1 class="welcome-text-modern">
            Hello!!
            <span
              class="user-name-highlight"
              v-if="ldata != null && ldata != undefined"
              >{{ ldata.name }}</span
            >
          </h1>
        </li>
      </ul>

      <ul class="navbar-nav ms-auto modern-nav-items">
        <!-- User Profile Dropdown -->
        <!-- <li
          class="nav-item dropdown d-none d-lg-block user-dropdown modern-user-dropdown"
        >
          <a
            class="nav-link user-profile-link"
            id="UserDropdown"
            href="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div class="user-avatar-modern">
              <span v-if="ldata != null && ldata != undefined">{{
                ldata.name.charAt(0)
              }}</span>
            </div>
          </a>

          <div
            class="dropdown-menu dropdown-menu-right modern-dropdown"
            aria-labelledby="UserDropdown"
          >
            <div class="dropdown-header-modern text-center">
              <div class="user-avatar-large">
                <span v-if="ldata != null && ldata != undefined">{{
                  ldata.name.charAt(0)
                }}</span>
              </div>
              <p
                class="user-name-dropdown"
                v-if="ldata != null && ldata != undefined"
              >
                {{ ldata.name }}
              </p>
              <p
                class="user-email-dropdown"
                v-if="ldata != null && ldata != undefined"
              >
                {{ ldata.email }}
              </p>
            </div>

            <a class="dropdown-item modern-dropdown-item" @click="logoutNow()">
              <i class="fa fa-power-off dropdown-icon"></i>
              <span>Sign Out</span>
            </a>
          </div>
        </li> -->
      </ul>

      <button
        class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
        type="button"
        data-bs-toggle="offcanvas"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </nav>
</template>

<script>
import { mainBaseUrl } from "@/apis/appconst";
import { getNotiList } from "@/apis/webapis";
import { Bars3Icon } from "@heroicons/vue/24/outline";

export default {
  name: "MainHeader",
  components: {
    Bars3Icon,
  },
  methods: {
    async getListNow($page_no) {
      this.page_no = $page_no;
      const response = await getNotiList(
        this.page_no,
        this.count,
        this.ldata.user_id
      );
      if (response.status) {
        this.notis = response.records;
      }
    },
    get_dur(datetime) {
      const now = new Date();
      const targetDate = new Date(datetime);
      let diffMs = Math.abs(now - targetDate);
      const seconds = Math.floor(diffMs / 1000);

      if (seconds >= 2592000) {
        const months = Math.floor(seconds / 2592000);
        return `${months} month${months !== 1 ? "s" : ""}`;
      } else if (seconds >= 86400) {
        const days = Math.floor(seconds / 86400);
        return `${days} day${days !== 1 ? "s" : ""}`;
      } else if (seconds >= 3600) {
        const hours = Math.floor(seconds / 3600);
        return `${hours} hour${hours !== 1 ? "s" : ""}`;
      } else if (seconds >= 60) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
      } else {
        return `${seconds} second${seconds !== 1 ? "s" : ""}`;
      }
    },
    logoutNow() {
      sessionStorage.clear();
      window.location.reload();
    },
  },
  data() {
    return {
      base_url: "",
      ldata: null,
      notis: [],
      page_no: 0,
      count: 10,
    };
  },
  mounted() {
    this.base_url = mainBaseUrl;
    if (
      sessionStorage.getItem("ldata") &&
      sessionStorage.getItem("ldata").length > 0
    ) {
      this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
    }
  },
};
</script>

<style scoped>
/* Modern Navbar Styling */
.modern-navbar {
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
}

.navbar-brand-wrapper {
  background: #ffffff;
  border-right: 1px solid #f0f0f0;
}

.modern-toggle {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.modern-toggle:hover {
  background: #f5f6fa;
}

.icsize {
  width: 24px;
  height: 24px;
  color: #4a5568;
}

/* Welcome Text */
.welcome-text-modern {
  font-size: 1.5rem;
  font-weight: 400;
  color: #2d3748;
  margin: 0;
  letter-spacing: -0.5px;
}

.user-name-highlight {
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Navigation Items */
.modern-nav-items {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Notification */
.notification-item {
  position: relative;
}

.modern-notification {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #f7fafc;
  transition: all 0.3s ease;
  position: relative;
}

.modern-notification:hover {
  background: #edf2f7;
  transform: translateY(-2px);
}

.notification-bell {
  font-size: 20px;
  color: #4a5568;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  background: #f56565;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

/* User Profile */
.modern-user-dropdown {
  margin-left: 0.5rem;
}

.user-profile-link {
  display: flex;
  align-items: center;
  padding: 0;
}

.user-avatar-modern {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.user-avatar-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* Dropdown Menu */
.modern-dropdown {
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 0;
  margin-top: 12px;
  overflow: hidden;
}

.dropdown-header-modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1.5rem;
  border-bottom: none;
}

.user-avatar-large {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 24px;
  margin: 0 auto 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.user-name-dropdown {
  font-size: 1.125rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
}

.user-email-dropdown {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
}

.modern-dropdown-item {
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.modern-dropdown-item:hover {
  background: #f7fafc;
  color: #667eea;
}

.dropdown-icon {
  font-size: 18px;
  color: #667eea;
}

/* Responsive */
@media (max-width: 991px) {
  .welcome-text-modern {
    font-size: 1.25rem;
  }

  .user-name-highlight {
    display: block;
    margin-top: 0.25rem;
  }
}

@media (max-width: 576px) {
  .modern-dropdown {
    min-width: 240px;
  }

  .user-avatar-modern {
    width: 38px;
    height: 38px;
    font-size: 16px;
  }
}
</style>
