<template>
  <div class="nk-content-wrap" :style="'padding-top: 4%; '+screen_padding+' background-color: #f7f7f7;'">
    <div class="nk-block-head nk-block-head-md">
      <div class="nk-block-between">
        <div class="nk-block-head-content">
          <!-- <h6 :style="'background-color: white; border: 1px solid #ddd; '+screen_padding1+' padding-top: .7rem; padding-bottom: .7rem; border-radius: 1rem;'">Troubleshoot</h6> -->
        </div>
        <div class="nk-block-head-content">
          <a class="btn btn-success" @click="share_now()" style="border-radius: 0.6rem;">
            <em class="icon ni ni-share"></em>
            <span>Share</span>
          </a>
        </div>
      </div>
    </div>
    <div class="nk-block">
      <div class="card card-bordered" style="border-radius: 1.5rem;">
        <div class="card-inner" style="padding:0px; padding-top: 1rem;">
          <p style="text-align: center; width: 100%;">Powered By: Analytcly AI</p>
          <div v-if="page_dt!=null && page_dt!=undefined" :style="'width: 100%; height: .5rem;  background-color: '+page_dt.booking_page_color+'; border-radius: 1rem;'"></div>
          <div class="row g-gs">
            <div class="col-sm-4" style="padding-top: 1rem; padding-left: 3rem; padding-right: 1rem;">
              <div class="user-avatar lg"
              v-if="page_dt==null || page_dt==undefined || page_dt.booking_page_img==null ||
               page_dt.booking_page_img==undefined || page_dt.booking_page_img.length<=0" style="margin-left:1rem; margin-bottom:1rem; background-color: #efeeee; color:#9b9a9a;">
                <i class="mdi mdi-account-outline"></i>
              </div>
              <div style="margin-bottom: 1rem;" v-if="page_dt!=null && page_dt!=undefined && page_dt.booking_page_img!=null 
              && page_dt.booking_page_img!=undefined && page_dt.booking_page_img.length>0">
                <img :src="img_url" style="height: 4.7rem; width: 4.9rem; border-radius: 100%; object-fit: cover; object-position: center;" />
              </div>
              <h5 style="color: #000;" v-if="page_dt!=null && page_dt!=undefined">{{ page_dt.booking_page_title }}</h5>
              <p  v-if="page_dt!=null && page_dt!=undefined && page_dt.booking_page_recurring=='1'">This booking will be recurring</p>
              <p style="background-color: white; border: 1px solid #ddd; padding-left: 1rem; padding-right: 1rem;
                    margin-top: 1rem; margin-bottom: .7rem; width: 7.5rem; height: 2.8rem; font-weight: 600;
                    padding-top: .7rem; padding-bottom: .7rem; border-radius: 1rem;">
                <i class="fas fa-clock"></i> &nbsp;&nbsp; <span v-if="page_dt!=null && page_dt!=undefined">{{ get_dur(page_dt.booking_page_duration) }}</span>
              </p>
              <p style="color: #000;" v-if="page_dt!=null && page_dt!=undefined">{{ page_dt.booking_page_intro }}</p>
              <p style="color: #000;" v-if="sel_date!=null && sel_date!=undefined && sel_date.length>0">Date: {{ sel_date }}</p>
              <p style="color: #000;" v-if="sel_slot!=null && sel_slot!=undefined && sel_date.length>0">Time: {{ sel_slot }}</p>
              <p style="color: #000;" v-if="sel_pkg!=null && sel_pkg!=undefined">{{ sel_pkg.package_name }} (${{ sel_pkg.package_amount }})&nbsp;&nbsp;&nbsp; <a class="btn btn-sm btn-success" @click="sel_pkg1()" style="border-radius:0.6rem;">
                  <span>Change</span>
                </a>
              </p>
              <br>
              <div class="form-group" v-if="sel_pkg!=null && sel_pkg!=undefined && sel_slot!=null && sel_slot!=undefined && sel_date.length>0 && page_dt!=null && page_dt!=undefined && sel_date!=null && sel_date!=undefined && sel_date.length>0">
                <button type="button" style="margin-left: 20%; border-radius: 0.6rem;" @click="next_step()" class="btn btn-success"> Book Appointment </button>
              </div>
            </div>
            <div class="col-sm-8" style="border: 0px solid #ddd;">
              <MyCalender 
              @day-click="handleDayClick"
              :selected_date="sel_date"
              :sel_slot="sel_slot"
              :sel_slot1="sel_slot"
              :calenderStatus="calenderStatus1"
              :day="day1"
              :month="month1"
              :day_of_week="day_of_week1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <a class="btn btn-lg btn-success" id="selPkgBt" data-bs-toggle="modal" data-bs-target="#modalForm" style="display: none;"></a>
  <div class="modal fade" id="modalForm" style="border-radius: 1rem;">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select Package</h5>
          <a href="#" class="close" id="closePkg" data-bs-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
        </div>
        <div class="modal-body">
          <div class="row g-gs">
            <div class="col-md-4" v-if="packages.length<3"></div>
            <div class="col-md-4" v-for="user in packages" :key="user">
              <div class="price-plan card card-bordered text-center" style="border-radius: 1rem;">
                <div class="card-inner">
                  <div class="price-plan-info">
                    <h5 class="title">{{ user.package_name }}</h5>
                    <span>{{ user.package_desc }}</span>
                  </div>
                  <div class="price-plan-amount">
                    <div class="amount">${{ user.package_amount }}
                      <span></span>
                    </div>
                    <!-- <span class="bill">Select this</span> -->
                  </div>
                  <div class="price-plan-action">
                    <a href="javascript:void(0)" v-if="sel_pkg==null || sel_pkg.package_id!=user.package_id" @click="set_pkg(user)" class="btn btn-success" style="border-radius: .7rem;">Select Plan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <a class="btn btn-lg btn-success" id="selFrmBt" data-bs-toggle="modal" data-bs-target="#modalForm1" style="display: none;"></a>
  <div class="modal fade" id="modalForm1" style="border-radius: 1rem;">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <h5 class="modal-title" v-if="tmp_dt!=null && tmp_dt!=undefined">{{ tmp_dt.form_temp_title }}</h5>
            <p v-if="tmp_dt!=null && tmp_dt!=undefined">{{ tmp_dt.form_temp_desc }}</p>
          </div>
          <a href="#" class="close" id="closePkg1" data-bs-dismiss="modal" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit" class="form-validate is-alter">
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Full Name</label>
            <div class="form-control-wrap">
              <input type="text" class="form-control" v-model="appointDt.appointment_customer_name" required />
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Email</label>
            <div class="form-control-wrap">
              <input type="email" class="form-control" v-model="appointDt.appointment_customer_email" required />
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Mobile</label>
            <div class="form-control-wrap">
              <input type="phone" class="form-control" v-model="appointDt.appointment_customer_contact" required />
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Guest Invite <small>(asd@gmail.com,abc@gmail.com)</small></label>
            <div class="form-control-wrap">
              <input type="text" class="form-control" v-model="appointDt.appointment_guests" required />
            </div>
          </div>
          <div  v-if="tmp_fields!=null && tmp_fields!=undefined">
          <div class="form-group" v-for="(user, index) in tmp_fields" :key="index" style="margin-bottom: 1rem;">
            <label class="form-label" :for="'dfwefwe' + index">{{ user.title }}</label>
            <div class="form-control-wrap" v-if="user.type.toLowerCase() !== 'file' && user.type.toLowerCase() !== 'options' && user.type.toLowerCase() !== 'textarea'">
              <input type="text" class="form-control" :id="'dfwefwe' + index" required />
            </div>
            <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'file'">
              <input type="file" class="form-control" :id="'dfwefwe' + index" required />
            </div>
            <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'email'">
              <input type="email" class="form-control" :id="'dfwefwe' + index" required />
            </div>
            <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'mobile'">
              <input type="phone" class="form-control" :id="'dfwefwe' + index" required />
            </div>
            <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'textarea'">
              <textarea class="form-control" :id="'dfwefwe' + index" required></textarea>
            </div>
            <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'options' && user.type.toLowerCase() !== 'textarea'">
              <select :id="'fiedl' + index" class="form-control">
                <option v-for="(option, idx) in (user.options || '').split(',')" :key="idx" :value="option.trim()">
                  {{ option.trim() }}
                </option>
              </select>
            </div>
            </div>
          </div>
          <br>
                  <div :class="'alert alert-' + msgType + ' mb-xl-0'" role="alert" v-if="msgTxt">
                    {{ msgTxt }}
                  </div>
                  <br>
          <div class="form-group">
            <button type="submit" class="btn btn-success" style="border-radius: 0.6rem;"> Book Appointment </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <button style="display: none;" id="bty56" data-bs-toggle="modal"
  data-bs-target="#logoutForm"></button>
  <div class="modal fade" id="logoutForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-radius:1rem;">
            <div class="modal-header">
                <h6 class="modal-title">Your Meeting is Booked!</h6>
            </div>
            <div class="modal-body">
                <div class="form-validate is-alter">
                   <p>Details shared, see you at the scheduled time.</p>
                    <div class="form-group">
                      <div class="row g-gs">
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label class="form-label" for="full-name">Location</label>
                            <div class="form-control-wrap">
                              <p v-if="appointDt!=null">{{ appointDt.appointment_mode }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label class="form-label" for="full-name">Date</label>
                            <div class="form-control-wrap">
                              <p v-if="appointDt!=null">{{ appointDt.appointment_date }}</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-4">
                          <div class="form-group">
                            <label class="form-label" for="full-name">Slot</label>
                            <div class="form-control-wrap">
                              <p v-if="appointDt!=null">{{ appointDt.appointment_slot }}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br><br>
                        <button type="button" @click="rload_now()" data-bs-dismiss="modal"
                        aria-label="Close" class="btn btn-success" style="border-radius: 0.6rem;">
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
  import {
    mainBaseUrl,
    apiBaseUrl
  } from '@/apis/appconst';
  import MyCalender from "../comps/MyCalender.vue";
  import {
    getBookingByUrl
  } from '@/apis/bookingpageapis';
  import {
    getMyDt
  } from '@/apis/webapis';

  import {
    createMeetOnGoogle
  } from '@/apis/calapis';
  
  import {
    getList
  } from '@/apis/pkgapis';
  import {
    getItemById as getTmpById
  } from '@/apis/tmpapis';
  import {
    addAppointment,
    getAppointmentById
  } from '@/apis/appointapi';
  export default {
    name: 'BookingPage',
    components: {
      MyCalender
    },
    methods: {
      get_dur($duration) {
        return $duration.split(" ")[0] + " Min.";
      },
      async getMyCall() {
        this.msgType = "";
        this.msgTxt = "";
        const response = await getMyDt(this.page_dt.booking_page_cre_by);
        if (response.status) {
          this.ldata = response.user;
          this.buss_dt = response.buss_dt;
        }
      },
      async getApptNow() {
        const response = await getAppointmentById(this.appointDt.appointment_id);
        if (response.status) {
          this.appointDt = response.appointment;
          
          this.sel_date = this.appointDt.appointment_date;
          this.sel_slot = this.appointDt.appointment_slot;
          this.sel_slot1 = this.appointDt.appointment_slot;
          var now = new Date(this.sel_date);
          this.month1 = now.getMonth();
          this.day1 = now.getDate()-1;
          this.day_of_week1 = now.getDay();

        

          this.calenderStatus1  = 1;
          this.get_pdt();
        }
      },
      async get_pdt() {
        const response1 = await getBookingByUrl(this.booking_page_url);
        if (response1.status) {
          this.page_dt = response1.page_dt;
          this.img_url = apiBaseUrl+this.page_dt.booking_page_img;
          this.appointDt.appointment_page = this.page_dt.booking_page_id;
          this.appointDt.appointment_page_title = this.page_dt.booking_page_title;
          this.appointDt.appointment_mode = this.page_dt.booking_page_meet_mode;
          this.appointDt.appointment_vendor = this.page_dt.booking_page_cre_by;
          this.getMyCall();
          this.getPkgs(1);
          this.get_tmp_dt();
        }
      },
      async get_tmp_dt() {
        const response1 = await getTmpById(this.page_dt.booking_page_form_layout);
        if (response1.status) {
          this.tmp_dt = response1.user;
          this.tmp_fields = JSON.parse(this.tmp_dt.form_temp_fields);
        }
      },
      check_pkg(pkg) {
        if (this.sel_pkg.localeCompare(pkg.package_id) == 0) {
          return true;
        }
        return false;
      },
      check_slot(pkg) {
        if (this.sel_slot.localeCompare(pkg) == 0) {
          return true;
        }
        return false;
      },
      set_slot(pkg) {
        this.sel_slot = pkg;
        this.next_step();
      },
      set_pkg(pkg) {
        this.sel_pkg = pkg;
        this.appointDt.appointment_amt = this.sel_pkg.package_amount;
        document.getElementById("closePkg").click();
        document.getElementById("selFrmBt").click();
      },
      sel_pkg1() {
        if(this.packages!=null && this.packages!=undefined && this.packages.length>0){
          document.getElementById("selPkgBt").click();
        }
        else{
          this.appointDt.appointment_amt = "0";
          document.getElementById("selFrmBt").click();
        }
      },
      get_pkg_name(pkg_dt) {
        if (pkg_dt != null && pkg_dt != undefined) {
          return pkg_dt.package_name + " ($" + pkg_dt.package_amount + ")";
        }
      },
      async getPkgs($page_no) {
        const response = await getList($page_no, 20, this.page_dt.booking_page_cre_by);
        if (response.status) {
          this.packages = response.records;
          if(this.appointDt.appointment_amt!=null &&
            this.appointDt.appointment_amt!=undefined &&
            this.appointDt.appointment_amt.length>0
          ){
            for(var x=0;x<this.packages.length;x++){
              var pkgDt = this.packages[x];
              if(pkgDt!=null && pkgDt!=undefined){
                if(pkgDt.package_amount.localeCompare(this.appointDt.appointment_amt)==0){
                  this.sel_pkg = pkgDt;

                }
              }
            }
          }
        }
      },
      next_step() {
        // this.curr_page++;
        if (this.sel_pkg == null || this.sel_pkg == undefined) {
          this.sel_pkg1()
        } else {
          document.getElementById("selFrmBt").click();
        }
      },
      handleDayClick($day_name) {
        var tmp = JSON.parse($day_name);
        this.sel_date = tmp.date;
        this.sel_slot = tmp.slot;
        this.sel_slot1 = tmp.slot1;
        this.appointDt.appointment_date = this.sel_date;
        this.appointDt.appointment_slot = this.sel_slot1;
        this.next_step();
      },
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
        if (this.validateField(this.appointDt.appointment_customer_name, 'Enter Your Name') && 
        this.validateField(this.appointDt.appointment_customer_email, 'Enter Your Email') && 
        this.validateField(this.appointDt.appointment_customer_contact, 'Enter Your Contact Number')) {
          this.msgType = "";
          this.msgTxt = "";
          var now = new Date();
          const response = await addAppointment(this.appointDt.appointment_id, this.appointDt.appointment_page, this.appointDt.appointment_page_title, this.appointDt.appointment_mode, this.appointDt.appointment_vendor, this.appointDt.appointment_customer_name, this.appointDt.appointment_customer_email, this.appointDt.appointment_customer_contact, this.appointDt.appointment_slot, this.appointDt.appointment_date, this.appointDt.appointment_meet, this.appointDt.appointment_status, this.appointDt.appointment_payment_status, this.appointDt.appointment_amt
          , this.appointDt.appointment_pay_type, this.appointDt.appointment_guests, now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear() + ", " + now.getHours() + ":" + now.getMinutes(), );
          if (response.status) {
            this.msgType = "success";
            this.msgTxt = response.message;
            if(this.appointDt.appointment_mode.localeCompare("Google Meet")==0){
              var slots = this.appointDt.appointment_slot.split(" - ");
              var start = this.appointDt.appointment_date+"T"+(slots[0]+"").trim()+ ":00";
              var end = this.appointDt.appointment_date+"T"+(slots[1]+"").trim()+ ":00";
              const response1 = await createMeetOnGoogle(this.ldata.user_id,response.appointment_id,
               this.appointDt.appointment_customer_name,
               this.appointDt.appointment_customer_email,
               this.appointDt.appointment_customer_contact,
               this.appointDt.appointment_page_title,
               start,end,
               this.buss_dt.busienss_timezone);
              if (response1.status) {
                // alert("Appointment Booked Successfully");
                document.getElementById("bty56").click();
              }
              document.getElementById("closePkg1").click();
              // window.location.reload();
            }
            else{
              document.getElementById("closePkg1").click();
              // alert("Appointment Booked Successfully");
              document.getElementById("bty56").click();
              // window.location.reload();
            }
            // window.location.href = "/packages";
          } else {
            this.msgType = "danger";
            this.msgTxt = response.message;
          }
        }
      },
      check_mobile(){
        this.screen_width = window.innerWidth;
        if(this.screen_width<1200){
          this.screen_padding = "padding-left: 0%; padding-right: 0%;";
          this.screen_padding1 = "padding-left: 0rem; padding-right: 0rem;";
        }
        else{
          this.screen_padding = "padding-left: 15%; padding-right: 15%;";
          this.screen_padding1 = "padding-left: 2rem; padding-right: 2rem;";
        }
        // alert(this.screen_width+"");
      },
      share_now(){
        if (navigator.share) {
        navigator.share({
          title: "Share!!",
          text: 'Check this out!',
          url: this.booking_page_url
        })
        .then(() => console.log('Thanks for sharing!'))
        .catch(err => console.error('Error sharing:', err));
      } else {
        alert('Web Share API is not supported in your browser.');
      }
      }
    },
    data() {
      return {
        base_url: mainBaseUrl,
        booking_page_url: "",
        page_dt: null,
        buss_dt: null,
        ldata: null,
        tmp_dt: null,
        tmp_fields: null,
        packages: [],
        screen_padding:"padding-left: 15%; padding-right: 15%;",
        screen_padding1:"padding-left: 2rem; padding-right: 2rem;",
        curr_page: 0,
        sel_slot: "",
        sel_slot1: "",
        img_url:"",
        calenderStatus1:0,
        sel_date: "",
        month1: 2,
        day1: 10,
        day_of_week1:2, 
        sel_pkg: null,
        screen_width:0,
        appointDt: {
          appointment_id: "",
          appointment_page: "",
          appointment_page_title: "",
          appointment_mode: "",
          appointment_vendor: "",
          appointment_customer_name: "",
          appointment_customer_email: "",
          appointment_customer_contact: "",
          appointment_slot: "",
          appointment_date: "",
          appointment_meet: "none",
          appointment_status: "Pending",
          appointment_payment_status: "Paid",
          appointment_amt: "0",
          appointment_pay_type: "Cash",
          appointment_datetime: "",
          appointment_guests: "",
        },
        set_today(){
            var now = new Date();
            this.month1 = now.getMonth();
            this.day1 = now.getDate()-1;
            this.day_of_week1 = now.getDay();
        },
        rload_now(){
          window.location.reload();
        }
      };
    },
    mounted() {
      this.check_mobile();
      this.base_url = mainBaseUrl;
      this.booking_page_url = window.location.pathname.split('/').filter(Boolean).pop();
      
      this.set_today();
      const params = {};
      const queryString = window.location.search.substring(1);
      const urlParams = new URLSearchParams(queryString);
      
        for (const [key, value] of urlParams.entries()) {
          params[key] = value;
        }
        var appoint_id = params.appoint_id;
        if(appoint_id!=null && appoint_id!=undefined){
         
          this.appointDt.appointment_id = appoint_id;
          this.getApptNow();
        }
        else{
          this.get_pdt();
        }
    }
  };
</script>
<style>
  .grid-container {
    display: grid;
    overflow-x: auto;
    overflow-y: auto;
    height: 13rem;
    grid-template-columns: repeat(3, 1fr);
    /* 3 equal columns */
    justify-items: center;
    /* Align items horizontally */
    align-items: center;
    /* Align items vertically */
  }

  .grid-container1 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 3 equal columns */
    justify-items: center;
    /* Align items horizontally */
    align-items: center;
    /* Align items vertically */
  }

  .myslot {
    background-color: #6576ff;
    color: white;
    padding-left: .4rem;
    padding-right: .4rem;
    padding-top: .3rem;
    font-size: .7rem;
    margin-right: .4rem;
    margin-bottom: .4rem;
    padding-bottom: .3rem;
    border-radius: .6rem;
  }

  .myslot1 {
    background-color: #ddd;
    color: black;
    padding-left: .4rem;
    padding-right: .4rem;
    padding-top: .3rem;
    font-size: .7rem;
    margin-right: .4rem;
    margin-bottom: .4rem;
    padding-bottom: .3rem;
    border-radius: .6rem;
  }
</style>