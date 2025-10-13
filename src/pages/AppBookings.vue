<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">All bookings</h3>
           
          </div>
          <div class="nk-block-head-content" v-if="booking_page_status == 0">
            <div class="toggle-wrap nk-block-tools-toggle">
              <a href="javascript:void(0)" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
                <em class="icon ni ni-menu-alt-r"></em>
              </a>
             
            </div>
          </div>
        </div>
      </div>
      <div class="nk-block">
        <div class="row g-gs">
          <div class="col-sm-12" v-if="booking_page_status == 0">
          
            <div class="nk-block">
              <div class="card card-bordered card-stretch">
                <div class="card-inner-group">
                  <div class="card-inner position-relative card-tools-toggle">
                    <div class="card-title-group">
                      <div class="card-tools">
                        <div class="form-inline flex-nowrap gx-3">
                          <div class="form-wrap w-150px" style="border-radius: .6rem;">
                            <select class="form-select js-select2" v-model="appointment_status" @change="getListNow(1)" data-placeholder="Any Status" style="border-radius: .6rem;">
                              <option value="" data-select2-id="3">Any Status</option>
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                              <option value="Canceled">Canceled</option>
                            </select>
                          </div>
                          <div class="form-wrap w-150px" style="border-radius: .6rem;">
                            <select class="form-select js-select2" v-model="appointment_mode" @change="getListNow(1)" data-placeholder="All Location" style="border-radius: .6rem;">
                              <option value="" data-select2-id="3">All Location</option>
                              <option value="Zoom Call">Zoom Call</option>
                              <option value="Google Meet">Google Meet</option>
                              <option value="In-Person Meeting">In-Person Meeting</option>
                              <option value="Phone Call">Phone Call</option>
                              <option value="Request Location">Request Location</option>
                              <option value="Custom Location">Custom Location</option>
                              <option value="No Location">No Location</option>
                            </select>
                           
                          </div>
                          <!-- <div class="btn-wrap">
                            <span class="d-md-block"  style="border-radius: .6rem;">
                              <button class="btn btn-dim btn-outline-success" style="border-radius: .6rem;">Apply</button>
                            </span>
                          </div> -->
                        </div>
                      </div>
                      <!-- <div class="card-tools me-n1">
                        <ul class="btn-toolbar gx-1">
                          <li>
                            <a href="javascript:void(0)" class="btn btn-icon search-toggle toggle-search" data-target="search">
                              <em class="icon ni ni-search"></em>
                            </a>
                          </li>
                          <li class="btn-toolbar-sep"></li>
                          
                        </ul>
                      </div> -->
                    </div>
                    <!-- <div class="card-search search-wrap" data-search="search">
                      <div class="card-body">
                        <div class="search-content">
                          <a href="javascript:void(0)" class="search-back btn btn-icon toggle-search" data-target="search">
                            <em class="icon ni ni-arrow-left"></em>
                          </a>
                          <input type="text" class="form-control border-transparent form-focus-none" placeholder="Search by user or email">
                          <button class="search-submit btn btn-icon">
                            <em class="icon ni ni-search"></em>
                          </button>
                        </div>
                      </div>
                    </div> -->
                  </div>
                  <div class="card-inner p-0">
                    <div class="nk-tb-list nk-tb-ulist is-compact">
                      <div class="nk-tb-item nk-tb-head">
                        <div class="nk-tb-col nk-tb-col-check">
                          <div class="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" class="custom-control-input" id="uid">
                            <label class="custom-control-label" for="uid"></label>
                          </div>
                        </div>
                        <div class="nk-tb-col">
                          <span class="sub-text">Date</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">Time</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">Person</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">Location</span>
                        </div>
                        <div class="nk-tb-col tb-col-xxl">
                          <span class="sub-text">Meeting Destination</span>
                        </div>
                        <div class="nk-tb-col tb-col-lg">
                          <span class="sub-text">Reschedule</span>
                        </div>
                        <div class="nk-tb-col tb-col-lg">
                          <span class="sub-text">Payment Status</span>
                        </div>
                        <div class="nk-tb-col tb-col-lg">
                          <span class="sub-text">Booking Status</span>
                        </div>
                        <div class="nk-tb-col tb-col-lg">
                          <span class="sub-text">Action</span>
                        </div>
                        
                      </div>
                      <div class="nk-tb-item" v-for="user in bookings" :key="user">
                        <div class="nk-tb-col nk-tb-col-check">
                          <div class="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" class="custom-control-input" id="uid1">
                            <label class="custom-control-label" for="uid1"></label>
                          </div>
                        </div>
                        <div class="nk-tb-col">
                          {{ user.appointment_date }}
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.appointment_slot }}</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.appointment_customer_name }}</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.appointment_mode }}</span>
                        </div>
                        
                        <div class="nk-tb-col">
                          <!-- <a href="javascript:void(0)" @click="reche_now(user)" class="btn btn-sm btn-success" style="border-radius: 0.6rem;">
                            <span >Reschedule</span>
                          </a>
                          <br> -->
                          <a :href="'/appoint_report/'+user.appointment_id" target="_blank" class="btn btn-sm btn-dark" style="border-radius: 0.6rem; margin-top: .4rem;">
                            <span >AI Report</span>
                          </a>
                        </div>
                        <div class="nk-tb-col">
                          <span class="tb-status text-dark">{{ user.appointment_payment_status }}</span>
                        </div>
                        
                        <div class="nk-tb-col">
                          <span class="tb-status text-dark">{{ user.appointment_status }}</span>
                        </div>
                        <div class="nk-tb-col nk-tb-col-tools">
                          <div class="drodown">
                                <a href="javascript:void(0)" class="btn btn-sm btn-icon btn-trigger dropdown-toggle" data-bs-toggle="dropdown">
                                  <em class="icon ni ni-more-h"></em>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <ul class="link-list-opt no-bdr">
                                    <li>
                                      <a :href="user.appointment_meet" target="_blank" v-if="user.appointment_meet!=='none'">
                                        <em class="icon ni ni-video"></em>
                                        <span>Start Meeting</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0)" @click="appoint_view(user)">
                                        <em class="icon ni ni-calendar-check"></em>
                                        <span>View Meeting</span>
                                      </a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                      <a href="javascript:void(0)">
                                        <em class="icon ni ni-bell"></em>
                                        <span>Send Reminders</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0)" @click="update_st('Canceled',user.appointment_id)">
                                        <em class="icon ni ni-cross-circle"></em>
                                        <span>Cancel</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0)" @click="reche_now(user)">
                                        <em class="icon ni ni-clock"></em>
                                        <span>Reschedule</span>
                                      </a>
                                    </li>
                                  </ul>

                                </div>
                              </div>
                        </div>
                        <!-- <div class="nk-tb-col nk-tb-col-tools" style="text-align: center;">
                          <ul class="nk-tb-actions" style="text-align: center;">
                            
                            <li>
                              <div class="drodown">
                                <a href="javascript:void(0)" class="btn btn-sm btn-icon btn-trigger dropdown-toggle" data-bs-toggle="dropdown">
                                  <em class="icon ni ni-more-h"></em>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <ul class="link-list-opt no-bdr">
                                    <li>
                                      <a :href="user.appointment_meet" target="_blank" v-if="user.appointment_meet!=='none'">
                                        <em class="icon ni ni-video"></em>
                                        <span>Start Meeting</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0)" @click="appoint_view(user)">
                                        <em class="icon ni ni-calendar-check"></em>
                                        <span>View Meeting</span>
                                      </a>
                                    </li>
                                    <li class="divider"></li>
                                    <li>
                                      <a href="javascript:void(0)">
                                        <em class="icon ni ni-bell"></em>
                                        <span>Send Reminders</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0)" @click="update_st('Canceled',user.appointment_id)">
                                        <em class="icon ni ni-cross-circle"></em>
                                        <span>Cancel</span>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="javascript:void(0)" @click="reche_now(user)">
                                        <em class="icon ni ni-clock"></em>
                                        <span>Reschedule</span>
                                      </a>
                                    </li>
                                  </ul>

                                </div>
                              </div>
                            </li>
                          </ul>
                        </div> -->
                      </div>
                    </div>
                  </div>
                  <div class="card-inner">
                    <div class="nk-block-between-md g-3">
                      <div class="g">
                        <ul class="pagination justify-content-center justify-content-md-start">
                          <li class="page-item">
                            <a class="page-link" v-if="page_no>3" @click="getListNow(page_no-3)" href="javascript:void(0)">Prev</a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" v-if="page_no>2" @click="getListNow(page_no-2)" href="javascript:void(0)">{{ (page_no-2) }}</a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" v-if="page_no>1" @click="getListNow(page_no-1)" href="javascript:void(0)">{{ (page_no-1) }}</a>
                          </li>
                          <li class="page-item">
                            <span class="page-link">
                              <em class="icon ni ni-more-h"></em>
                            </span>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="javascript:void(0)" @click="getListNow(page_no+1)">{{ (page_no+1) }}</a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="javascript:void(0)" @click="getListNow(page_no+2)">{{ (page_no+2) }}</a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="javascript:void(0)" @click="getListNow(page_no+3)">Next</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0)"  data-bs-toggle="modal" id="bt2"
                          data-bs-target="#modalTask" style="display: none;"></a>
    <div class="modal fade" id="modalTask">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Appointment Details</h5>
          <a href="#" class="close" data-bs-dismiss="modal" id="closeBt1" aria-label="Close">
            <em class="icon ni ni-cross"></em>
          </a>
        </div>
        <div class="modal-body">
          <div class="form-validate is-alter">
            <div class="row g-gs">
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="form-label" for="full-name">Customer</label>
                  <div class="form-control-wrap">
                    <p v-if="appoint_dt!=null">{{ appoint_dt.appointment_customer_name }}</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="form-label" for="full-name">Email Address</label>
                  <div class="form-control-wrap">
                    <p v-if="appoint_dt!=null">{{ appoint_dt.appointment_customer_email }}</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="form-label" for="full-name">Contact</label>
                  <div class="form-control-wrap">
                    <p v-if="appoint_dt!=null">{{ appoint_dt.appointment_customer_contact }}</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="form-label" for="full-name">Date</label>
                  <div class="form-control-wrap">
                    <p v-if="appoint_dt!=null">{{ appoint_dt.appointment_date }}</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="form-label" for="full-name">Slot</label>
                  <div class="form-control-wrap">
                    <p v-if="appoint_dt!=null">{{ appoint_dt.appointment_slot }}</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="form-group">
                  <label class="form-label" for="full-name">Status</label>
                  <div class="form-control-wrap">
                    <p v-if="appoint_dt!=null">{{ appoint_dt.appointment_status }}</p>
                  </div>
                </div>
              </div>
            </div>
            <br><br>
            <div class="form-group">
              <a :href="appoint_dt.appointment_meet" target="_blank" v-if="appoint_dt!=null && appoint_dt.appointment_meet!=='none'">
              <button type="button" class="btn btn-success" style="border-radius: 0.6rem;"> Start </button>
              &nbsp;&nbsp;
            </a>
              <button type="button" @click="closeNow()" class="btn btn-dark" style="border-radius: 0.6rem;"> Cancel </button>
              
            </div>
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

    import { getAppointmentList,upAppStatus } from '@/apis/appointapi';
    import { getBookingById } from '@/apis/bookingpageapis';

    export default {
      name: 'AppBookings',
      methods: {
        async update_st(app_status,appointment_id){
          const response = await upAppStatus(appointment_id,app_status);
          if (response.status) {
            this.getListNow(1);
          }
        },
        async reche_now(appoint_dt){
          const response = await getBookingById(appoint_dt.appointment_page);
          if (response.status) {
            sessionStorage.setItem("is_update","1");
            window.location.href = "booking/"+response.package.booking_page_url+"?appoint_id="+appoint_dt.appointment_id;
          }
        },
        appoint_view(appoint_dt){
          this.appoint_dt = appoint_dt;
          document.getElementById("bt2").click();
        }
        ,
        closeNow(){
          document.getElementById("closeBt1").click();
        },
        async getListNow($page_no) {
          this.page_no = $page_no;
          const response = await getAppointmentList(this.page_no,this.count,this.ldata.user_id,this.appointment_mode,this.appointment_status);
          if (response.status) {
            this.bookings = response.records;
            this.totalRecords = response.pagination.totalRecords;
          }
        },
       
      },
      data() {
        return {
          appoint_dt:null,
          base_url: "",
          bookings: [],
          page_no:1,
          count:"10",
          totalRecords:"0",
          booking_page_status: 0,
          appointment_mode:"",
          appointment_status:""
        };
      },
      created() {
        this.base_url = mainBaseUrl;
        if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
          this.getListNow(1);
        }
      },
    }
  </script>
  <style scoped>
    .inline-list {
      margin-bottom: 1rem;
      list-style: none;
      padding: 0;
      display: flex;
      margin-left: 1rem;
      justify-content: center;
    }
  
    .inline-list li {
      display: inline-block;
      margin-right: 0px;
    }
  </style>