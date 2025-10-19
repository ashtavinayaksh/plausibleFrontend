<template>
  <div class="auth-wrapper">
    <div class="auth-container">
      <div class="auth-content">
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
                Don't have an account?
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
              <p class="auth-subtitle">We'll send you a reset link</p>
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
  background: #f8f9fa;
  font-family: "Poppins", sans-serif;
  overflow: hidden;
}

.auth-container {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.auth-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 3.5rem;
  width: 100%;
  width: 450px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease;
}

.auth-logo {
  width: 100px;
  margin-bottom: 1rem;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.auth-subtitle {
  font-size: 0.95rem;
  color: #718096;
}

.input-wrapper {
  margin-bottom: 1.25rem;
}

.input-wrapper label {
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
  font-weight: 500;
}

.input-box {
  position: relative;
}

.input-box i {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
}

.input-box input {
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #2d3748;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.input-box input::placeholder {
  color: #a0aec0;
}

.input-box input:focus {
  border-color: #00b7ff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 183, 255, 0.1);
}

.toggle {
  cursor: pointer;
  right: 14px;
  left: auto !important;
}

.auth-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.auth-options .remember {
  color: #4a5568;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.auth-options a {
  color: #00b7ff;
  text-decoration: none;
  font-weight: 500;
}

.auth-options a:hover {
  text-decoration: underline;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, #00b7ff, #006bff);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  padding: 0.85rem;
  cursor: pointer;
  transition: 0.3s;
  font-size: 1rem;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #0072ff, #00b7ff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 183, 255, 0.3);
}

.btn-google {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  border-radius: 8px;
  background: #ffffff;
  color: #4a5568;
  padding: 0.85rem;
  font-weight: 500;
  transition: 0.3s;
  border: 1px solid #e2e8f0;
  text-decoration: none;
}

.btn-google:hover {
  background: #f7fafc;
  border-color: #cbd5e0;
}

.divider {
  text-align: center;
  margin: 1.5rem 0;
  color: #a0aec0;
  position: relative;
}

.divider span {
  background: #ffffff;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.divider::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  top: 50%;
  left: 0;
  background: #e2e8f0;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: #718096;
}

.auth-footer a {
  color: #00b7ff;
  font-weight: 600;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.alert {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.alert-danger {
  background-color: #fee;
  color: #c53030;
  border: 1px solid #fc8181;
}

.alert-success {
  background-color: #f0fdf4;
  color: #276749;
  border: 1px solid #86efac;
}

.animate-fade {
  animation: fadeIn 0.7s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.5rem;
    width: 100%;
  }

  .auth-title {
    font-size: 1.4rem;
  }
}
</style>
