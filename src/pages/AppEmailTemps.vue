<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Email Template</h3>
            <div class="nk-block-des text-soft">
              <p>You have total {{ totalRecords }} templates.</p>
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
                            <a href="javascript:void(0)">
                              <span>Active</span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">
                              <span>Deactive</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="nk-block-tools-opt d-none d-sm-block">
                    <a  href="javascript:void(0)" @click="new_item()" class="btn btn-success" style="border-radius: 0.6rem;">
                      <em class="icon ni ni-plus"></em>
                      <span>New Template</span>
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
                  <h6>No Templetes Avialable</h6>
                  <p>No Templetes currently available for selection or viewing right now.</p>
                </div>
                <br>
                <br>
                <a href="javascript:void(0);" @click="new_item()" class="btn btn-success" style="width:30%; border-radius: .6rem;">
                  <span>Create Templete</span>
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
                          <span class="sub-text">Template Name</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">Body</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span class="sub-text">When</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
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
                          {{ user.mail_tmp_subject }}
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.mail_tmp_body }}</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.mail_tmp_when_it_will_send }} {{ user.mail_tmp_when_it_will_send1 }}</span>
                        </div>
                        <div class="nk-tb-col tb-col-md">
                          <span>{{ user.mail_tmp_status }}</span>
                        </div>
                        <div class="nk-tb-col nk-tb-col-tools">
                          <div class="drodown">
                                <a href="javascript:void(0)" class="btn btn-sm btn-icon btn-trigger dropdown-toggle" data-bs-toggle="dropdown">
                                  <em class="icon ni ni-more-h"></em>
                                </a>
                                <div class="dropdown-menu dropdown-menu-end">
                                  <ul class="link-list-opt no-bdr">
                                <li>
                                  <a href="javascript:void(0)" @click="edit_item(user.mail_tmp_id)">
                                    <em class="icon ni ni-edit"></em>
                                    <span>Edit</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="javascript:void(0)" @click="del_item1(user.mail_tmp_id)">
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
  </template>
  <script>
    import {
      mainBaseUrl
    } from '@/apis/appconst';
    import { getList,delItemById } from '@/apis/emailapis';

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
        set_filed($pos) {
          if (document.getElementById("ftype").value.localeCompare("Options") == 0) {
            document.getElementById("optr"+$pos).style.display = "block";
          } else {
            document.getElementById("optr"+$pos).style.display = "none";
          }
        },
        async getListNow($page_no) {
                this.page_no = $page_no;
                const response = await getList(this.page_no,this.count,this.ldata.user_id);
                if (response.status) {
                  this.l1 = response.records;
                  this.totalRecords = response.pagination.totalRecords;
                }
        },
        edit_item($id){
          sessionStorage.setItem("etemp_id",$id);
          window.location.href = "/new_mail_tmp";
        },
        new_item(){
          sessionStorage.removeItem("etemp_id");
          window.location.href = "/new_mail_tmp";
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
        }
      },
      data() {
        return {
          base_url: "",
          l1: [],
          page_no:1,
          count:"10",
          totalRecords:"0",
          l2: ["0"],
          ldata:null,
          item_id:"",
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