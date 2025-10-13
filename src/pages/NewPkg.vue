<template>
  <div class="nk-content-wrap">
    <div class="nk-block-head nk-block-head-sm">
      <div class="nk-block-between">
        <div class="nk-block-head-content">
          <h3 class="nk-block-title page-title">New Package</h3>
          <div class="nk-block-des text-soft">
            <p>Please Enter Package Details.</p>
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
                    <label class="form-label">Package Name</label>
                    <div class="form-control-wrap">
                      <input type="text" v-model="package_name" class="form-control" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Package Amount ($)</label>
                    <div class="form-control-wrap">
                      <input type="number" v-model="package_amount" class="form-control" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <div class="form-control-wrap">
                      <textarea class="form-control" v-model="package_desc" required></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Status</label>
                    <div class="form-control-wrap">
                      <select class="form-control" v-model="package_status">
                        <option value="Active">Active</option>
                        <option value="Deactive">Deactive</option>
                      </select>
                    </div>
                  </div>
                  <br>
                  <div :class="'alert alert-' + msgType + ' mb-xl-0'" role="alert" v-if="msgTxt">
                    {{ msgTxt }}
                  </div>
                  <br>
                  <div class="form-group">
                    <button type="submit" class="btn btn-success" style="border-radius: 0.6rem;">
                      {{ button_label }}
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
import { addItem, getItemById } from '@/apis/pkgapis';

export default {
  name: 'NewPackage',
  data() {
    return {
      package_id: "",
      package_name: "",
      package_amount: "",
      package_desc: "",
      package_status: "Active",
      package_by: "",
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
     
      if (this.validateField(this.package_name, 'Enter Package Name') &&
        this.validateField(this.package_amount, 'Enter Package Amount') &&
        this.validateField(this.package_desc, 'Enter Description') &&
        this.validateField(this.package_status, 'Select Status')
      ) {
        this.msgType = "";
        this.msgTxt = "";
        
        const response = await addItem(
          this.package_id,
          this.package_name,
          this.package_amount,
          this.package_desc,
          this.package_status,
          this.ldata.user_id
        );

        if (response.status) {
          this.msgType = "success";
          this.msgTxt = response.message;
          window.location.href = "/packages";
        } else {
          this.msgType = "danger";
          this.msgTxt = response.message;
        }
      }
    },
    async fetchPackageDetails() {
      this.msgType = "";
      this.msgTxt = "";

      const response = await getItemById(this.package_id);
      if (response.status) {
        let pkg = response.package;
        this.package_id = pkg.package_id;
        this.package_name = pkg.package_name;
        this.package_amount = pkg.package_amount;
        this.package_desc = pkg.package_desc;
        this.package_status = pkg.package_status;
        this.button_label = "Update";
      }
    }
  },
  mounted() {
    this.base_url = mainBaseUrl;

    if (sessionStorage.getItem("ldata")) {
      this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
    }

    if (sessionStorage.getItem("package_id") && sessionStorage.getItem("package_id").length>0) {
      this.package_id = sessionStorage.getItem("package_id");
      this.button_label = "Update";
      this.fetchPackageDetails();
    }
  }
};
</script>
