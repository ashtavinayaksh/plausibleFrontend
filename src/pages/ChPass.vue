<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Change Password</h3>
            <div class="nk-block-des text-soft">
              <p>Update your password here.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nk-block">
        <div class="row g-gs">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="card card-bordered card-stretch" style="border-radius: 1.5rem;">
              <div class="card-inner-group" style="padding: 2rem;">
                <div class="card-inner p-0">
                  <form @submit.prevent="handleSubmit" class="form-validate is-alter">
                    <div class="form-group">
                      <label class="form-label">Old Password</label>
                      <div class="form-control-wrap">
                        <input type="password" v-model="old_pass" class="form-control" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">New Password</label>
                      <div class="form-control-wrap">
                        <input type="password" v-model="new_pass" class="form-control" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Re-Enter New Password</label>
                      <div class="form-control-wrap">
                        <input type="password" v-model="new_pass1" class="form-control" required>
                      </div>
                    </div>
                    
                    <br>
                    <div :class="'alert alert-' + msgType + ' mb-xl-0'" role="alert" v-if="msgTxt">
                      {{ msgTxt }}
                    </div>
                    <br>
                    <div class="form-group">
                      <button type="submit" class="btn btn-success" style="border-radius: 0.6rem;">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mainBaseUrl } from '@/apis/appconst';
  import { chPassNow } from '@/apis/webapis';
  
  export default {
    name: 'ChPass',
    data() {
      return {
        package_id: "",
        old_pass: "",
        new_pass: "",
        new_pass1: "",
        msgType: "",
        msgTxt: "",
        button_label: "Create",
        ldata: null
      };
    },
    methods: {
      validateField(field, msg) {
        if ((field+"").length > 0) {
  
          return true;
        } else {
          this.msgType = "danger";
          this.msgTxt = msg;
          return false;
        }
      },
      async handleSubmit() {
       
        if (this.validateField(this.old_pass, 'Enter Old Password') &&
          this.validateField(this.new_pass, 'Enter New Password') &&
          this.validateField(this.new_pass1, 'Enter New Password')
        ) {
            if(this.new_pass.localeCompare(this.new_pass1)!=0){
                this.msgType = "danger";
                this.msgTxt = "Enter Same New Passwords";
                return;
            }
          this.msgType = "";
          this.msgTxt = "";
          const response = await chPassNow(
            this.old_pass,
            this.new_pass,
            this.ldata.user_id
          );
          if (response.status) {
            this.old_pass = "";
            this.new_pass = "";
            this.new_pass1 = "";
            this.msgType = "success";
            this.msgTxt = response.message;
          } else {
            this.msgType = "danger";
            this.msgTxt = response.message;
          }
        }
      },
     
    },
    mounted() {
      this.base_url = mainBaseUrl;
  
      if (sessionStorage.getItem("ldata")) {
        this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
      }
    }
  };
  </script>
  