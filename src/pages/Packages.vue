<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">Packages</h3>
            <div class="nk-block-des text-soft">
              <p>You have total {{totalRecords}} packages.</p>
            </div>
          </div>
          <div class="nk-block-head-content">
            <div class="toggle-wrap nk-block-tools-toggle">
              <a href="#" class="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu">
                <em class="icon ni ni-menu-alt-r"></em>
              </a>
              <div class="toggle-expand-content" data-content="pageMenu">
                <ul class="nk-block-tools g-3">
                  <li>
                    <div class="drodown">
                      <a href="#" class="dropdown-toggle btn btn-white btn-dim btn-outline-light" data-bs-toggle="dropdown" style="border-radius: 0.6rem;">
                        <em class="d-none d-sm-inline icon ni ni-filter-alt"></em>
                        <span>Filtered By</span>
                        <em class="dd-indc icon ni ni-chevron-right"></em>
                      </a>
                      <div class="dropdown-menu dropdown-menu-end">
                        <ul class="link-list-opt no-bdr">
                          <li>
                            <a href="#">
                              <span>Active</span>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <span>Deactive</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="nk-block-tools-opt d-none d-sm-block">
                    <a href="javascript:void(0)"  @click="new_item()" class="btn btn-success" style="border-radius: 0.6rem;">
                      <em class="icon ni ni-plus"></em>
                      <span>New Package</span>
                    </a>
                  </li>
                  <li class="nk-block-tools-opt d-block d-sm-none">
                    <a href="#" class="btn btn-icon btn-primary">
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
                  <h6>No Packages Avialable</h6>
                  <p>No Packages currently available for selection or viewing right now.</p>
                </div>
                <br>
                <br>
                <a href="javascript:void(0);" @click="new_item()" class="btn btn-success" style="width:30%; border-radius: .6rem;">
                  <span>Create Package</span>
                </a>
              </div>
            </div>
            </div>
      <div class="nk-block" v-if="l1.length>0 || page_no>1">
        <div class="card card-bordered card-stretch" style="border-radius: 1.2rem;">
          <div class="card-inner-group">
            <div class="card-inner p-0">
              <table class="nk-tb-list nk-tb-ulist">
                <thead>
                  <tr class="nk-tb-item nk-tb-head">
                    <th class="nk-tb-col nk-tb-col-check">
                      <div class="custom-control custom-control-sm custom-checkbox notext">
                        <input type="checkbox" class="custom-control-input" id="pid-all">
                        <label class="custom-control-label" for="pid-all"></label>
                      </div>
                    </th>
                    <th class="nk-tb-col">
                      <span class="sub-text">Package Name</span>
                    </th>
                    <th class="nk-tb-col">
                      <span class="sub-text">Package Price ($)</span>
                    </th>
                    <th class="nk-tb-col">
                      <span class="sub-text">Package Duration (Minutes)</span>
                    </th>
                    <th class="nk-tb-col">
                      <span class="sub-text">Status</span>
                    </th>
                    <th class="nk-tb-col nk-tb-col-tools text-end"> Action </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="nk-tb-item" v-for="user in l1" :key="user">
                    <td class="nk-tb-col nk-tb-col-check">
                      <div class="custom-control custom-control-sm custom-checkbox notext">
                        <input type="checkbox" class="custom-control-input" id="pid-01">
                        <label class="custom-control-label" for="pid-01"></label>
                      </div>
                    </td>
                    <td class="nk-tb-col">
                      <a href="#" class="project-title">
                        <div class="project-info">
                          <h6 class="title">{{ user.package_name }}</h6>
                        </div>
                      </a>
                    </td>
                    <td class="nk-tb-col">
                      <a href="#" class="project-title">
                        <div class="project-info">
                          <h6 class="title">$ {{ user.package_amount }}</h6>
                        </div>
                      </a>
                    </td>
                    <td class="nk-tb-col">
                      <a href="#" class="project-title">
                        <div class="project-info">
                          <h6 class="title">{{ user.package_desc }}</h6>
                        </div>
                      </a>
                    </td>
                    <td class="nk-tb-col">
                      <span class="badge badge-dim bg-success">
                        <em class="icon ni ni-clock"></em>
                        <span>{{ user.package_status }}</span>
                      </span>
                    </td>
                    <td class="nk-tb-col nk-tb-col-tools">
                      <ul class="nk-tb-actions gx-1">
                        <li>
                          <div class="drodown">
                            <a href="#" class="dropdown-toggle btn btn-sm btn-icon btn-trigger" data-bs-toggle="dropdown">
                              <em class="icon ni ni-more-h"></em>
                            </a>
                            <div class="dropdown-menu dropdown-menu-end">
                              <ul class="link-list-opt no-bdr">
                                
                                <li>
                                  <a href="javascript:void(0)" @click="edit_item(user.package_id)">
                                    <em class="icon ni ni-edit"></em>
                                    <span>Edit</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="javascript:void(0)" @click="del_item1(user.package_id)">
                                    <em class="icon ni ni-check-round-cut"></em>
                                    <span>Delete</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
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

    import { getList,delItemById } from '@/apis/pkgapis';

    export default {
      name: 'AppTemps',
      methods: {
        async getListNow($page_no) {
                this.page_no = $page_no;
                const response = await getList(this.page_no,this.count,this.ldata.user_id);
                if (response.status) {
                  this.l1 = response.records;
                  this.totalRecords = response.pagination.totalRecords;
                }
        },
        edit_item($id){
          sessionStorage.setItem("package_id",$id);
          window.location.href = "/new_packages";
        },
        new_item(){
          sessionStorage.removeItem("package_id");
          window.location.href = "/new_packages";
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
      mounted() {
        this.base_url = mainBaseUrl;
        if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
          this.getListNow(1);
        }
      },
    }
  </script>
  <!-- <style scoped></style> -->