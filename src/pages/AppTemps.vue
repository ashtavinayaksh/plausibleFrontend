<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Routing Forms</h3>
            <div class="nk-block-des text-soft">
              <p>You have total {{ totalRecords }} forms.</p>
            </div>
          </div>
          <div class="nk-block-head-content">
            <div class="toggle-wrap nk-block-tools-toggle">
              <a href="javascript:void(0)" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
                <em class="icon ni ni-menu-alt-r"></em>
              </a>
              <div class="toggle-expand-content" data-content="pageMenu">
                <ul class="nk-block-tools g-3">
                  <li>
                    <div class="drodown">
                      <a href="javascript:void(0)" class="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown" style="border-radius: 0.6rem;">
                        <em class="d-none d-sm-inline icon ni ni-filter-alt"></em>
                        <span>Filtered By</span>
                        <em class="dd-indc icon ni ni-chevron-right"></em>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <ul class="link-list-opt no-bdr">
                          <li>
                            <a href="javascript:void(0)" @click="search_now('Active')">
                              <span>Active</span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)"  @click="search_now('Deactive')">
                              <span>Deactive</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="nk-block-tools-opt d-none d-sm-block">
                    <a href="javascript:void(0)" @click="new_item()" class="btn btn-success" style="border-radius: 0.6rem;">
                      <em class="icon ni ni-plus"></em>
                      <span>New Form</span>
                    </a>
                  </li>
                  <li class="nk-block-tools-opt d-block d-sm-none">
                    <a href="javascript:void(0)" class="btn btn-icon btn-primary">
                      <em class="icon ni ni-plus"></em>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nk-block" v-if="l1.length<=0 && page_no<2">
    <div class="card card-bordered" style="border-radius: 1rem; height:100%;">
              <div class="card-inner" style="text-align: center; width:100%; padding: 1rem;">
                <br>
                <div style="text-align: center; height:15rem; width:100%; padding: 1rem; margin-top: 3rem;">
                  <em style="font-size: 5rem;" class="icon ni ni-calendar-booking"></em>
                  <br>
                  <br>
                  <h6>No Forms Avialable</h6>
                  <p>No Forms currently available for selection or viewing right now.</p>
                </div>
                <br>
                <br>
                <a href="javascript:void(0);" @click="new_item()" class="btn btn-success" style="width:30%; border-radius: .6rem;">
                  <span>Create Form</span>
                </a>
              </div>
            </div>
            </div>
      <div class="nk-block"  v-if="l1.length>0 || page_no>1">
        <div class="card card-bordered card-stretch" style="border-radius: 1.2rem;">
          <div class="card-inner-group">
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
                          <span class="sub-text">Image</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">Form Name</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">Elements</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">No of Elements</span>
                        </div>
                        <div class="nk-tb-col">
                          <span class="sub-text">Status</span>
                        </div>
                        <div class="nk-tb-col tb-col-lg">
                          <span class="sub-text">Action</span>
                        </div>
                        
                      </div>
                      <div class="nk-tb-item" v-for="user in l1" :key="user">
                        <div class="nk-tb-col nk-tb-col-check">
                          <div class="custom-control custom-control-sm custom-checkbox notext">
                            <input type="checkbox" class="custom-control-input" id="uid1">
                            <label class="custom-control-label" for="uid1"></label>
                          </div>
                        </div>
                        <div class="nk-tb-col">
                          <img v-if="user.form_temp_image!=null && user.form_temp_image!=undefined &&
                         user.form_temp_image.length>0 && user.form_temp_image!=='none'" :src="imgBaseUrl1+user.form_temp_image" style="height:2rem; width:auto;"/>
                        <img v-if="user.form_temp_image==null || user.form_temp_image==undefined ||
                         user.form_temp_image.length<=0 ||
                          user.form_temp_image==='none'" src="images/p3.png" style="height:2rem; width:auto;"/>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.form_temp_title }}</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ get_elements_title(user.form_temp_fields) }}</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ get_elements_cnt(user.form_temp_fields) }}</span>
                        </div>
                        
                        <div class="nk-tb-col">
                          <span class="badge badge-dim bg-success">
                            <em class="icon ni ni-clock"></em>
                            <span>{{ user.form_temp_status }}</span>
                          </span>
                        </div>
                        <div class="nk-tb-col nk-tb-col-tools">
                          <div class="drodown">
                                <a href="javascript:void(0)" class="btn btn-sm btn-icon btn-trigger dropdown-toggle" data-bs-toggle="dropdown">
                                  <em class="icon ni ni-more-h"></em>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <ul class="link-list-opt no-bdr">
                                <li>
                                  <a href="javascript:void(0)" @click="edit_item(user.form_temp_id)">
                                    <em class="icon ni ni-edit"></em>
                                    <span>Edit</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="javascript:void(0)" @click="del_item1(user.form_temp_id)">
                                    <em class="icon ni ni-check-round-cut"></em>
                                    <span>Delete</span>
                                  </a>
                                </li>
                              </ul>

                                </div>
                              </div>
                        </div>
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
    <button style="display: none;" id="delBt45" data-bs-toggle="modal"
    data-bs-target="#delForm" ></button>
    <div class="modal fade" id="delForm">
    <div class="modal-dialog" role="document">
        <div class="modal-content" style="border-radius:1rem;">
            <div class="modal-header">
                <h6 class="modal-title">Delete</h6>
            </div>
            <div class="modal-body">
                <div class="form-validate is-alter">
                   <p>Are you sure, you want to Delete?</p>
                    <div class="form-group">
                        <button type="button" @click="del_item()" class="btn btn-success" style="border-radius: 0.6rem;">
                            Yes
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button id="btclose45" type="button" data-bs-dismiss="modal"
                        aria-label="Close" class="btn btn-outline-success" style="border-radius: 0.6rem;">
                            No
                        </button>
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
      mainBaseUrl,
      imgBaseUrl
    } from '@/apis/appconst';

    
    import { getList,delItemById } from '@/apis/tmpapis';

    export default {
      name: 'AppTemps',
      methods: {
        add_item() {
          this.l2.push(this.l2.length + "");
        },

        rem_item($index) {
          if ($index > -1) {
            this.l2.splice($index, 1);
          }
        },
        get_elements_cnt($elements){
          if($elements!=null && $elements!=undefined && $elements.length>0){
            var arr = JSON.parse($elements+"");
            return arr.length+"";
          }
          else{
            return "0";
          }
        },
        get_elements_title($elements){
          if($elements!=null && $elements!=undefined && $elements.length>0){
            var arr = JSON.parse($elements+"");
            var titles = [];
            for(var x=0;x<arr.length;x++){
              titles.push(arr[x].title+"");
            }
            return titles.join(", ");
          }
          else{
            return "None";
          }
        },
        set_filed($pos) {
          if (document.getElementById("ftype").value.localeCompare("Options") == 0) {
            document.getElementById("optr"+$pos).style.display = "block";
          } else {
            document.getElementById("optr"+$pos).style.display = "none";
          }
        },
        async getListNow($page_no) {
                this.page_no = $page_no;
                const response = await getList(this.page_no,this.count,this.ldata.user_id,this.status1);
                if (response.status) {
                  this.l1 = response.records;
                  this.totalRecords = response.pagination.totalRecords;
                }
        },
        edit_item($id){
          sessionStorage.setItem("temp_id",$id);
          window.location.href = "/new_form";
        },
        new_item(){
          sessionStorage.removeItem("temp_id");
          window.location.href = "/new_form";
        },
        del_item1($id){
          this.item_id = $id;
        
          document.getElementById("delBt45").click();
        },
        async del_item() {
                const response = await delItemById(this.item_id);
                if (response.status) {
                  document.getElementById("btclose45").click()
                  this.getListNow(1);
                }
        },
        search_now($status){
          this.status1 = $status;
          this.getListNow(1);
        }
      },
      data() {
        return {
          base_url: "",
          l1: [],
          page_no:1,
          status1:"",
          count:"10",
          totalRecords:"0",
          l2: ["0"],
          ldata:null,
          item_id:"",
          imgBaseUrl1:imgBaseUrl,
          ftype: "Textfield"
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
  <!-- <style scoped></style> -->