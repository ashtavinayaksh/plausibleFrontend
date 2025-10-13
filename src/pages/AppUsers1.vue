<template>
    <div class="content-wrapper">
          <div class="card">
            <div class="card-body">
              
              <div class="row">
                <div class="col-6">
                  <h4 class="card-title">Subscribers</h4>
                </div>
                <div class="col-6" style="text-align: right;">
                  <!-- <button @click="set_page(1)" class="btn btn-primary">Add Your Website</button> -->
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <div class="table-responsive" v-if="l1.length>0">
                    <table id="order-listing" class="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Plan</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="user in l1" :key="user">
                          <td>{{ user.name }}</td>
                          <td>{{ user.email }}</td>
                          <td>{{ user.mobile }}</td>
                          <td>{{ user.user_plan_name }} ({{ user.user_plan_dur }} Days)</td>
                         
                          <td>
                            <!-- <a :href="'/web_report/'+user.web_id">
                              <label class="badge badge-info">View Analytics</label>
                            </a> -->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <br><br>
              <div class="row" style="width: 100%;">
                <div class="col-sm-12 col-md-5">
                  <div class="dataTables_info" id="order-listing_info" role="status" aria-live="polite">
                    Showing {{ page_no+1 }} to <span v-if="totalRecords>10">{{ (page_no*10)+10 }}</span> <span v-if="totalRecords<10">{{ totalRecords }}</span> of {{totalRecords}} entries
                  </div>
                </div>
                <div class="col-sm-12 col-md-7">
                  <div class="dataTables_paginate paging_simple_numbers" id="order-listing_paginate" style="margin-left: 80%;">
                    <ul class="pagination">
                      <li class="paginate_button page-item previous disabled" id="order-listing_previous">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1"
                        v-if="page_no>2" @click="getListNow(page_no-3)" 
                        class="page-link">Previous</a>
                      </li>
                      <li class="paginate_button page-item">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1" class="page-link"  v-if="page_no>1" href="javascript:void(0)" @click="getListNow(page_no-2)">{{ (page_no-1) }}</a>
                      </li>
                       <li class="paginate_button page-item">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1" class="page-link" v-if="page_no>0" href="javascript:void(0)" @click="getListNow(page_no-1)">{{ (page_no) }}</a>
                      </li>
                      <li class="paginate_button page-item active">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1" class="page-link" href="javascript:void(0)">{{ (page_no+1) }}</a>
                      </li>
                       <li class="paginate_button page-item">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1" class="page-link" href="javascript:void(0)"  @click="getListNow(page_no+1)">{{ (page_no+2) }}</a>
                      </li>
                       <li class="paginate_button page-item">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1" class="page-link" href="javascript:void(0)"  @click="getListNow(page_no+2)">{{ (page_no+3) }}</a>
                      </li>
                      <li class="paginate_button page-item next disabled" id="order-listing_next">
                        <a aria-controls="order-listing" aria-disabled="true" role="link" data-dt-idx="next" 
                        tabindex="-1" class="page-link" href="javascript:void(0)" @click="getListNow(page_no+3)">Next</a>
                      </li>
                    </ul>
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
    import { getUsrList } from '@/apis/webapis';

    export default {
      name: 'AppMemPlans',
      methods: {
       
        async getListNow($page_no) {
            // alert("1");
            this.page_no = $page_no;
            const response = await getUsrList(this.page_no,this.count,"user","1");
            if (response.status) {
              this.l1 = response.records;
              this.totalRecords = parseInt(response.total1+"");
            }
        },
       
      },
      data() {
        return {
          base_url: "",
          l1: [],
          page_no:0,
          totalRecords:0,
          count:"10",
          l2: ["0"],
          ldata:null,
          item_id:"",
        };
      },
      created() {
        this.base_url = mainBaseUrl;
        if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
          this.getListNow(0);
        }
      },
    }
  </script>
  <!-- <style scoped></style> -->