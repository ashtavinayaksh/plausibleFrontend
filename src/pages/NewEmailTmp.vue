<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">New Email Template</h3>
            <div class="nk-block-des text-soft">
              <p>Please Enter Details.</p>
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
                      <label class="form-label" for="full-name">Subject</label>
                      &nbsp;
                      <a href="#" @click="add_var1('email')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ email</span>
                      </a>
                      <a href="#" @click="add_var1('name')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ name</span>
                      </a>
                      <a href="#" @click="add_var1('mobile')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ mobile</span>
                      </a>
                      <a href="#" @click="add_var1('link')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ link</span>
                      </a>
                      <div class="form-control-wrap">
                        <input type="text" v-model="subject" class="form-control" id="Details" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Body</label>
                      &nbsp;
                      <a href="#" @click="add_var2('email')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ email</span>
                      </a>
                      <a href="#" @click="add_var2('name')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ name</span>
                      </a>
                      <a href="#" @click="add_var2('mobile')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ mobile</span>
                      </a>
                      <a href="#" @click="add_var2('link')" style="padding: .5rem; font-weight: 600; color:#7f8dff;">
                        <span class="clipboard-text">+ link</span>
                      </a>
                      <div class="form-control-wrap">
                        <textarea class="form-control" v-model="body" id="Details" required></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="email-address">When it will be send?</label>
                      <div class="row g-gs">
                        <div class="col-sm-8">
                            <div class="form-control-wrap">
                              <select class="form-control"  v-model="when" id="ftype">
                                <option value="15 Min">15 Min</option>
                                <option value="30 Min">30 Min</option>
                                <option value="45 Min">45 Min</option>
                                <option value="60 Min">60 Min</option>
                              </select>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-control-wrap">
                              <select class="form-control"  v-model="when1" id="ftype">
                                <option value="Before">Before</option>
                                <option value="After">After</option>
                              </select>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="email-address">Status</label>
                      <div class="form-control-wrap">
                        <select class="form-control" v-model="status" id="ftype">
                          <option value="Active">Active</option>
                          <option value="Deactive">Deactive</option>
                        </select>
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

    import { addItem,getItemById } from '@/apis/emailapis';

    export default {
      name: 'NewEmailTmp',
      methods: {
        add_var1($typ){
          if(($typ+"").localeCompare("link")==0){
            this.subject = this.subject+" "+"<a href=\"url\">Your Text</a>";
          }
          else{
            this.subject = this.subject+" "+"{{"+$typ+"}}";
          }
        },
        add_var2($typ){
          if(($typ+"").localeCompare("link")==0){
            this.body = this.body+" "+"<a href=\"url\">Your Text</a>";
          }
          else{
            this.body = this.body+" "+"{{"+$typ+"}}";
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
        async handleSubmit() {
            if (this.valField1(this.subject, 'Enter Subject') &&
            this.valField1(this.body, 'Enter Body') &&
            this.valField1(this.when, 'Select When') &&
            this.valField1(this.when1, 'Select When') &&
            this.valField1(this.status, 'Select Status')
            ) {
                this.msgType = "";
                this.msgTxt = "";
               
                const response = await addItem(
                  this.mail_tmp_id,
                  this.subject, this.body, this.when, this.when1, this.status, this.ldata.user_id
                );
                if (response.status) {
                   
                    this.msgType = "success";
                    this.msgTxt = response.message;
                    window.location.href = "/email_templetes";
                } else {
                    this.msgType = "danger";
                    this.msgTxt = response.message;
                }
            }
        },
        async tmp_init() {
                this.msgType = "";
                this.msgTxt = "";
               
                const response = await getItemById(this.mail_tmp_id);
                if (response.status) {
                   var tmp = response.record;
                   this.mail_tmp_id = tmp.mail_tmp_id;
                   this.subject = tmp.mail_tmp_subject;
                   this.body = tmp.mail_tmp_body;
                   this.status = tmp.mail_tmp_status;
                   this.when = tmp.mail_tmp_when_it_will_send;
                }
            
        }
      },
      data() {
        return {
          base_url: "",
          subject:"",
          body:"",
          when:"15 Min",
          when1:"Before",
          status:"Active",
          mail_tmp_id:"",
          button_label:"Create",
          ldata:null
        };
      },
      created() {
        this.base_url = mainBaseUrl;
        if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
        }
        if(sessionStorage.getItem("etemp_id") && sessionStorage.getItem("etemp_id").length>0){
          this.mail_tmp_id = sessionStorage.getItem("etemp_id")+""; 
          this.button_label = "Update";
          this.tmp_init();
        }
      },
    }
  </script>
  <!-- <style scoped></style> -->