<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <!-- Left Section -->
      <div class="auth-left">
        <div class="auth-card animate-fade">
          <!-- LOGIN -->
          <div v-if="page_no == 1">
            <div class="auth-header">
              <img
                :src="base_url + 'images/logo-dark.png'"
                alt="logo"
                class="auth-logo"
              />
              <h2 class="auth-title">Welcome Back 👋</h2>
              <p class="auth-subtitle">Happy to see you again!</p>
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="input-wrapper">
                <label>Email Address</label>
                <div class="input-box">
                  <i class="fa fa-envelope"></i>
                  <input
                    type="email"
                    v-model="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div class="input-wrapper">
                <label>Password</label>
                <div class="input-box">
                  <i
                    v-if="viewPass == 1"
                    @click="set_pass(0)"
                    class="fa fa-lock toggle"
                  ></i>
                  <i
                    v-if="viewPass == 0"
                    @click="set_pass(1)"
                    class="fa fa-unlock toggle"
                  ></i>
                  <input
                    v-model="password"
                    :type="input_type"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div class="auth-options">
                <label class="remember">
                  <input type="checkbox" /> Keep me signed in
                </label>
                <a href="javascript:void(0)" @click="set_page(3)"
                  >Forgot Password?</a
                >
              </div>

              <div
                v-if="msgTxt && msgTxt.length > 0"
                :class="'alert alert-' + msgType"
              >
                {{ msgTxt }}
              </div>

              <button type="submit" class="btn-primary">Login</button>

              <div class="divider"><span>OR</span></div>

              <a :href="api_base_url + 'google/auth/google'" class="btn-google">
                <i class="fa-brands fa-google me-2"></i> Sign in with Google
              </a>

              <p class="auth-footer">
                Don’t have an account?
                <a href="javascript:void(0)" @click="set_page(2)">Create</a>
              </p>
            </form>
          </div>

          <!-- SIGNUP -->
          <div v-if="page_no == 2">
            <div class="auth-header">
              <img
                :src="base_url + 'images/logo-dark.png'"
                alt="logo"
                class="auth-logo"
              />
              <h2 class="auth-title">Create Account ✨</h2>
              <p class="auth-subtitle">Get started with your free account</p>
            </div>

            <form @submit.prevent="handleSubmit1">
              <div class="input-wrapper">
                <label>Email Address</label>
                <div class="input-box">
                  <i class="fa fa-envelope"></i>
                  <input
                    type="email"
                    v-model="email1"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div class="input-wrapper">
                <label>Password</label>
                <div class="input-box">
                  <i
                    v-if="viewPass == 1"
                    @click="set_pass(0)"
                    class="fa fa-lock toggle"
                  ></i>
                  <i
                    v-if="viewPass == 0"
                    @click="set_pass(1)"
                    class="fa fa-unlock toggle"
                  ></i>
                  <input
                    v-model="password1"
                    :type="input_type"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div
                v-if="msgTxt && msgTxt.length > 0"
                :class="'alert alert-' + msgType"
              >
                {{ msgTxt }}
              </div>

              <button type="submit" class="btn-primary">Sign Up</button>

              <div class="divider"><span>OR</span></div>

              <a :href="api_base_url + 'google/auth/google'" class="btn-google">
                <i class="fa-brands fa-google me-2"></i> Sign up with Google
              </a>

              <p class="auth-footer">
                Already have an account?
                <a href="javascript:void(0)" @click="set_page(1)">Sign in</a>
              </p>
            </form>
          </div>

          <!-- FORGOT PASSWORD -->
          <div v-if="page_no == 3">
            <div class="auth-header">
              <img
                :src="base_url + 'images/logo-dark.png'"
                alt="logo"
                class="auth-logo"
              />
              <h2 class="auth-title">Forgot Password 🔐</h2>
              <p class="auth-subtitle">We’ll send you a reset link</p>
            </div>

            <form @submit.prevent="handleSubmit2">
              <div class="input-wrapper">
                <label>Email Address</label>
                <div class="input-box">
                  <i class="fa fa-envelope"></i>
                  <input
                    type="email"
                    v-model="email2"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div
                v-if="msgTxt && msgTxt.length > 0"
                :class="'alert alert-' + msgType"
              >
                {{ msgTxt }}
              </div>

              <button type="submit" class="btn-primary">Submit</button>

              <p class="auth-footer">
                Remember Password?
                <a href="javascript:void(0)" @click="set_page(1)">Sign in</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="auth-right">
        <div class="overlay"></div>
        <!-- <div class="right-content">
          <h1>Welcome to <span>Plausible</span></h1>
          <p>
            Powerful analytics and dashboards to manage all your data — clean,
            fast, and intuitive.
          </p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mainBaseUrl, apiBaseUrl } from "@/apis/appconst";
import { frogotUser, loginUser, regUser } from "@/apis/webapis";

export default {
  name: "AppLogin",
  methods: {
    set_page($pno) {
      this.page_no = $pno;
    },
    set_pass($pno) {
      this.viewPass = $pno;
      this.input_type = this.viewPass == 1 ? "text" : "password";
    },
    valField1(field, msg) {
      if (field.length > 0) return true;
      this.msgType = "danger";
      this.msgTxt = msg;
      return false;
    },
    async handleSubmit() {
      if (
        this.valField1(this.email, "Enter Email Address") &&
        this.valField1(this.password, "Enter Password")
      ) {
        this.msgType = "";
        this.msgTxt = "";
        const response = await loginUser(this.email, this.password);
        if (response.status) {
          sessionStorage.setItem("ldata", JSON.stringify(response.user_dt));
          this.msgType = "success";
          this.msgTxt = "Sign-in successful!";
          window.location.href = "/";
        } else {
          this.msgType = "danger";
          this.msgTxt = response.success;
        }
      }
    },
    async handleSubmit1() {
      if (
        this.valField1(this.name1, "Enter Email Address") &&
        this.valField1(this.email1, "Enter Email Address") &&
        this.valField1(this.password1, "Enter Password")
      ) {
        this.msgType = "";
        this.msgTxt = "";
        const response = await regUser(
          this.name1,
          this.email1,
          "",
          this.password1
        );
        if (response.status) {
          this.msgType = "success";
          this.msgTxt = response.message;
          this.set_page(1);
        } else {
          this.msgType = "danger";
          this.msgTxt = response.message;
        }
      }
    },
    async handleSubmit2() {
      if (this.valField1(this.email2, "Enter Email Address")) {
        this.msgType = "";
        this.msgTxt = "";
        const response = await frogotUser(this.email2);
        if (response.status) {
          this.msgType = "success";
          this.msgTxt = response.message;
          this.set_page(1);
        } else {
          this.msgType = "danger";
          this.msgTxt = response.message;
        }
      }
    },
  },
  data() {
    return {
      base_url: "",
      api_base_url: apiBaseUrl,
      page_no: 1,
      viewPass: 0,
      email: "",
      password: "",
      name1: "",
      email1: "",
      email2: "",
      password1: "",
      input_type: "password",
      msgType: "",
      msgTxt: "",
    };
  },
  mounted() {
    this.base_url = mainBaseUrl;
    if ((window.location.href + "").includes("udata")) {
      var udata = this.$route.query.udata;
      var ldata = atob(udata);
      if (ldata.length > 0) {
        sessionStorage.setItem("ldata", ldata);
        window.location.href = "/";
      }
    }
  },
};
</script>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #0e1622, #1f2d3a, #16232e);
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.auth-container {
  display: flex;
  flex: 1;
}

.auth-left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.auth-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  color: #fff;
  animation: fadeIn 0.6s ease;
}

.auth-logo {
  width: 100px;
  margin-bottom: 1rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-title {
  font-size: 1.6rem;
  font-weight: 700;
}

.auth-subtitle {
  font-size: 0.9rem;
  color: #a3b1c6;
}

.input-wrapper {
  margin-bottom: 1rem;
}

.input-wrapper label {
  font-size: 0.85rem;
  color: #a3b1c6;
  margin-bottom: 0.3rem;
  display: block;
}

.input-box {
  position: relative;
}

.input-box i {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #00b7ff;
}

.input-box input {
  width: 100%;
  padding: 0.7rem 0.75rem 0.7rem 2.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.input-box input:focus {
  border-color: #00b7ff;
  outline: none;
  box-shadow: 0 0 6px rgba(0, 183, 255, 0.3);
}

.toggle {
  cursor: pointer;
}

.auth-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}

.auth-options a {
  color: #00b7ff;
  text-decoration: none;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #00b7ff, #006bff);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  padding: 0.8rem;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0072ff, #00b7ff);
  transform: translateY(-2px);
}

.btn-google {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border-radius: 8px;
  background: #fff;
  color: #000;
  padding: 0.8rem;
  font-weight: 500;
  transition: 0.3s;
}

.btn-google:hover {
  background: #f0f0f0;
}

.divider {
  text-align: center;
  margin: 1rem 0;
  color: #a3b1c6;
  position: relative;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  width: 40%;
  height: 1px;
  top: 50%;
  background: rgba(255, 255, 255, 0.2);
}

.divider::before {
  left: 0;
}
.divider::after {
  right: 0;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #a3b1c6;
}

.auth-footer a {
  color: #00b7ff;
  font-weight: 500;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* RIGHT SECTION */
.auth-right {
  flex: 1.2;
  background: url("../assets/login-bg.jpg") center/cover no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 3rem;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom right,
    rgba(14, 22, 34, 0.7),
    rgba(0, 0, 0, 0.7)
  );
}

.right-content {
  position: relative;
  text-align: center;
  z-index: 1;
  max-width: 400px;
}

.right-content h1 {
  font-size: 2rem;
  font-weight: 700;
}

.right-content span {
  color: #00b7ff;
}

.right-content p {
  margin-top: 0.75rem;
  font-size: 1rem;
  color: #d1d5db;
}

.animate-fade {
  animation: fadeIn 0.7s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 992px) {
  .auth-right {
    display: none;
  }
  .auth-card {
    max-width: 90%;
  }
}
</style>
