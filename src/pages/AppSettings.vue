<template>
  <div class="nk-content-wrap">
    <div class="components-preview wide-md mx-auto">
      <div class="nk-block nk-block-lg">
        <div class="nk-block-head">
          <div class="nk-block-head-content">
            <h4 class="title nk-block-title">Select Plan</h4>
            <div class="nk-block-des">
              <p>View our plans here.</p>
            </div>
          </div>
        </div>
        <div class="card card-bordered" style="border-radius: 1.2rem;">
          <div class="card-inner">
            <form class="nk-wizard nk-wizard-simple is-alter wizard clearfix" role="application" novalidate="novalidate">
              <div class="content clearfix">
                <div style="text-align: left; width: 100%;">
                  <h5>Plan & Billing Management</h5>
                  <p style="width:100%;text-align:left;"> Manage plans, subscriptions, billing cycles, payments, and invoices with seamless automation and tracking. </p>
                  <div class="nk-block">
                    <div class="row g-gs">
                      <div class="col-md-4"  v-for="user in plans" :key="user">
                        <div class="price-plan card card-bordered text-center">
                          <div class="card-inner">
                            <div class="price-plan-media">
                              <img v-if="user.plan_img==null || apiBaseUrl==null || apiBaseUrl==undefined" :src="base_url+'images/icons/plan-s1.svg'" alt="">
                              <img v-if="user.plan_img!=null && apiBaseUrl!=null && apiBaseUrl!=undefined" :src="base_url+'images/icons/plan-s1.svg'" alt="">
                            </div>
                            <div class="price-plan-info">
                              <h5 class="title">{{user.plan_title}}</h5>
                              <span>{{user.plan_desc}}</span>
                            </div>
                            <ul>
                              <li  v-for="user1 in user.frt" :key="user1" style="margin-bottom: .5rem;">{{ user1.title }}</li>
                          </ul>
                          <br>
                            <div class="price-plan-amount">
                              <div class="amount">${{user.plan_price}} <span v-if="user.plan_type==='Month'">/mo</span> <span v-if="user.plan_type!=='Month'">/yr</span>
                              </div>
                              <span class="bill" v-if="user.plan_type==='Month'">1 User, Billed Monthly</span>
                              <span class="bill" v-if="user.plan_type!=='Month'">1 User, Billed Yearly</span>
                            </div>
                            <div class="price-plan-action" v-if="user.plan_title!=ldata.user_plan_name">
                              <a href="javascript:void(0)" @click="purPlanNow(user)" class="btn btn-success" style="border-radius: .6rem;">Select Plan</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
 
</template>
<script>
  import {
    mainBaseUrl
  } from '@/apis/appconst';
  import {
    getMyDt,
    purPlan
  } from '@/apis/webapis';
  export default {
    name: 'AppSettings',
    methods: {
     
      set_page($pos) {
        // alert(this.page_no+"");
        this.page_no = $pos;
        if(this.page_no==3){
          this.setup_perm();
        }
      },
      check_pos($pos) {
        if (this.page_no == $pos) {
          return "btn btn-success";
        }
        return "btn btn-secondary";
      },
      close_acc(){
        document.getElementById("delBt45").click();
      },
      
      
      async getMyCall() {
        this.msgType = "";
        this.msgTxt = "";
        const response = await getMyDt(this.ldata.user_id);
        if (response.status) {
          this.ldata = response.user_dt;
          this.plans = response.plans;
          sessionStorage.setItem('ldata', JSON.stringify(response.user_dt));
         }
      },
      async purPlanNow(plan_dt){
        
        const response = await purPlan(
          plan_dt.plan_id,
          this.ldata.user_id
        );
        alert(response.success+"");
          if (response.status) {
           
            this.getMyCall();

          }
      },
      valField1(field, msg) {
        if (field.length > 0) {
          return true;
        } else {
          this.msgType = "danger";
          this.msgTxt = msg;
          return false;
        }
      },
      
    },
    data() {
      return {
        base_url: "",
        page_no: 1,
        ldata: null,
        plans:[],
        msgType: "",
        msgTxt: ""
      };
    },
    created() {
      this.base_url = mainBaseUrl;
      this.busienss_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length > 0) {
        this.ldata = JSON.parse(sessionStorage.getItem("ldata"));
        this.busienss_user = this.ldata.user_id;
        this.getMyCall();
       
      }
    },
  }
</script>
<style scoped></style>