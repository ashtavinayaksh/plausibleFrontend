<template>
    <div class="nk-content-wrap">
      
      <div class="nk-block">
        <div class="row g-gs">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <div class="card card-bordered card-stretch" style="border-radius: 1.5rem;">
              <div class="card-inner-group" style="padding: 2rem;">
                <div class="card-inner p-0">
                  <form @submit.prevent="handleSubmit" class="form-validate is-alter">
                    <div class="form-group">
                      <label class="form-label" for="full-name">Plan Image</label>
                     
                      <div class="form-control-wrap">
                        <input type="file" class="form-control" id="plan_img"  @change="set_img()">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Plan Name</label>
                     
                      <div class="form-control-wrap">
                        <input type="text" v-model="plan_title" class="form-control" id="Details" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="email-address">Plan Type</label>
                      <div class="form-control-wrap">
                              <select class="form-control"  v-model="plan_type" id="ftype">
                                <option value="Month">Month</option>
                                <option value="Year">Year</option>
                              </select>
                            </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Plan Amount</label>
                     
                      <div class="form-control-wrap">
                        <input type="text" v-model="plan_price" class="form-control" id="Details" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Plan Duration (Days)</label>
                     
                      <div class="form-control-wrap">
                        <input type="number" v-model="plan_duration" class="form-control" id="Details" required>
                      </div>
                    </div>
                    <br>
                    <div class="row g-gs" style="margin-bottom: 1rem;">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label class="form-label">Plan Features</label>
                          
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                            <div class="form-control-wrap" style="text-align: right;">
                              <button type="button" @click="add_fet()" class="btn btn-success" style="border-radius: 0.6rem;"> Add </button>
                            </div>
                        </div>
                      </div>
                     
                    </div>
                    <div class="row g-gs" v-for="(user, index) in plan_features" :key="index" style="margin-bottom: 1rem;">
                      <div class="col-sm-8">
                        <div class="form-group">
                          <label class="form-label" :for="'field'+index">Feature {{ (index+1) }}</label>
                          <div class="form-control-wrap">
                            <input type="text" v-model="user.title" class="form-control" :id="'field'+index" required>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="form-group">
                            <label class="form-label"></label>
                            <div class="form-control-wrap"  style="text-align: right; display: flex;">
                              <button type="button" @click="set_status(index,false)" class="btn btn-success" v-if="user.status" style="border-radius: 0.6rem;"> Active </button>
                              <button type="button" @click="set_status(index,true)" class="btn btn-dark" v-if="user.status===false" style="border-radius: 0.6rem;"> Active </button>
                              &nbsp;&nbsp;
                              <button type="button" @click="rem_item(index)" class="btn btn-danger" style="border-radius: 0.6rem;"> Remove </button>
                            </div>
                        </div>
                      </div>
                     
                    </div>
                    <br>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Details</label>
                     
                      <div class="form-control-wrap">
                        <textarea class="form-control" v-model="plan_desc" id="Details" required></textarea>
                      </div>
                    </div>
                    <br>
                    <div :class="'alert alert-' + msgType + ' mb-xl-0'" role="alert"
                                            v-if="msgTxt && msgTxt.length > 0">
                                            {{ msgTxt }}
                                        </div>
                                        <br>
                    <div class="form-group">
                      <button type="submit" class="btn btn-success" style="border-radius: 0.6rem;"> {{button_label}} </button>
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
    import {
      mainBaseUrl
    } from '@/apis/appconst';

    import { addPlan,getPlanById } from '@/apis/memplanapis';
    import { uploadImg } from '@/apis/bookingpageapis';

    export default {
      name: 'NewEmailTmp',
      methods: {
        add_var1(){
          this.var1++;
          this.subject = this.subject+" "+"{{var"+this.var1+"}}"
        },
        add_var2(){
          this.var2++;
          this.body = this.body+" "+"{{var"+this.var2+"}}"
        },
        set_status(pos,value){
          this.plan_features[pos].status = value;
        },
        rem_item(index){
          if(this.plan_features.length>1){
            this.plan_features.splice(index, 1);
          }
        },
        async set_img(){
          if( document.getElementById("plan_img").files.length>0){
            const response = await uploadImg(document.getElementById('plan_img').files[0]);
            if (response.status) {
              this.plan_img = response.data;
             
            }
            else{
                alert(response.message);
            }
          }
        },
        valField1(field, msg) {
            if ((field+"").length > 0) {
              
              return true;
            } else {
                this.msgType = "danger";
                this.msgTxt = msg;
                return false;
            }
        },
        async handleSubmit() {
            if (this.valField1(this.plan_title, 'Enter Name') &&
            this.valField1(this.plan_price, 'Enter Price') &&
            this.valField1(this.plan_duration, 'Enter Duration') &&
            this.valField1(this.plan_desc, 'Enter Details') &&
            this.valField1(this.plan_type, 'Select Type')
            ) {
              this.msgType = "";
                this.msgTxt = "";
               var plan_img = "";
               const response = await addPlan(this.plan_id, this.plan_title, this.plan_price, this.plan_duration, this.plan_desc, plan_img, this.plan_type,
                  "", "", "INR", JSON.stringify(this.plan_features));
                  if (response.status) {
                   
                    this.msgType = "success";
                    this.msgTxt = response.message;
                    window.location.href = "/mem_plans";
                } else {
                    this.msgType = "danger";
                    this.msgTxt = response.message;
                }
            }
        },
        add_fet(){
          this.plan_features.push(
            {
            id:this.plan_features.length,
            title:"",
            status:true
          }
          );
        },
        async tmp_init() {
                this.msgType = "";
                this.msgTxt = "";
               
                const response = await getPlanById(this.plan_id);
                if (response.status) {
                   var tmp = response.plan_dt;
                   this.plan_id = tmp.plan_id;
                   this.plan_title = tmp.plan_title;
                   this.plan_price = tmp.plan_price;
                   this.plan_duration = tmp.plan_duration;
                   this.plan_desc = tmp.plan_desc;
                   this.plan_type = tmp.plan_type;
                   this.plan_img = tmp.plan_img;
                   this.plan_client = tmp.plan_client;
                   this.plan_features = JSON.parse(tmp.plan_features);
                }
            
        }
      },
      data() {
        return {
          base_url: "",
          plan_id:"",
          plan_title:"",
          plan_price:"",
          plan_duration:"",
          plan_desc:"",
          plan_type:"Month",
          plan_img:"",
          plan_client:"",
          plan_features:[{
            id:0,
            title:"",
            status:true
          }],
          button_label:"Create",
          ldata:null
        };
      },
      created() {
       
        this.base_url = mainBaseUrl;
         if(sessionStorage.getItem("plan_id") && sessionStorage.getItem("plan_id").length>0){
          this.plan_id = sessionStorage.getItem("plan_id")+""; 
          this.button_label = "Update";
          this.tmp_init();
        }
        if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
        }
       
      },
    }
  </script>
  <!-- <style scoped></style> -->