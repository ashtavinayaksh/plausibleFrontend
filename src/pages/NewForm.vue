<template>
    <div class="nk-content-wrap">
      <div class="nk-block-head nk-block-head-sm">
        <div class="nk-block-between">
          <div class="nk-block-head-content">
            <h3 class="nk-block-title page-title">New Routing Form</h3>
            <div class="nk-block-des text-soft">
              <p>Please Enter Details.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="nk-block">
        <div class="row g-gs">
          <div class="col-sm-5">
            <div class="card card-bordered card-stretch" style="border-radius: 1.5rem;">
              <div class="card-inner-group" style="padding: 2rem;">
                <div class="card-inner p-0">
                  <form  @submit.prevent="handleSubmit" class="form-validate is-alter">
                    <div class="form-group">
                      <label class="form-label" for="full-name">Image</label>
                      <div class="form-control-wrap">
                        <input type="file" class="form-control" id="form_image"  @change="set_img()" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Form Name</label>
                      <div class="form-control-wrap">
                        <input type="text" class="form-control" id="title" v-model="form_name" required>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="full-name">Form Description</label>
                      <div class="form-control-wrap">
                        <input type="text" class="form-control" id="Details" v-model="form_desc" required>
                      </div>
                    </div>
                    <div class="row g-gs" style="margin-bottom: 1rem;">
                      <div class="col-sm-10"></div>
                      <div class="col-sm-2" style="text-align: right;">
                        <button type="button" class="btn btn-success" @click="add_item()" style="border-radius: 0.6rem;"> Add </button>
                      </div>
                    </div>
                    <br>
                    <div class="row g-gs" v-for="(user, index) in l2" :key="index" style="margin-bottom: 1rem;">
                      <div class="col-sm-4">
                        <div class="form-group">
                          <label class="form-label" :for="'field'+index">Filed Name</label>
                          <div class="form-control-wrap">
                            <input type="text" v-model="user.title" class="form-control" :id="'field'+index" required>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-5">
                        <div class="form-group">
                          <label class="form-label" :for="'ftype'+index">Type</label>
                          <div class="form-control-wrap">
                            <select class="form-control" v-model="user.type" :id="'ftype'+index" @change="set_filed(index)">
                              <option value="Textfiled">Textfiled</option>
                              <option value="Number">Number</option>
                              <option value="Email">Email</option>
                              <option value="Mobile">Mobile</option>
                              <option value="Options">Options</option>
                              <option value="File">File</option>
                              <option value="Textarea">Text Container</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-3" style="text-align: right;">
                        <div class="form-group">
                          <label class="form-label">Action</label>
                          <br>
                          <button type="button" :id="'btg'+index" class="btn btn-danger" @click="rem_item(index)" style="border-radius: 0.6rem;"> Remove </button>
                        </div>
                      </div>
                      <div class="col-sm-12" :id="'optr' + index" style="display:none; margin-bottom: 1rem;">
                        <div class="form-group">
                          <label class="form-label" :id="'page_desc'+index">Options (Comma Seperated)</label>
                          <div class="form-control-wrap">
                            <textarea class="form-control no-resize" v-model="user.options" :id="'page_desc'+index">Option 1, Option 2</textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br>
                    <div class="form-group">
                      <label class="form-label" for="email-address">Status</label>
                      <div class="form-control-wrap">
                        <select class="form-control" v-model="form_status">
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
          <div class="col-sm-7">
            <div class="card card-bordered card-stretch" style="border-radius: 1.5rem;">
              <div class="card-inner-group" style="padding: 2rem;">
                <div class="card-inner p-0">
                  <h4 class="nk-block-title page-title">{{ form_name }}</h4>
                  <div class="nk-block-des text-soft">
                    <p>{{ form_desc }}</p>
                  </div>
                  <br>
                  <div class="form-group" v-for="(user, index) in l2" :key="index" style="margin-bottom: 1rem;">
                    <label class="form-label" :for="'dfwefwe' + index">{{ user.title }}</label>
                    <div class="form-control-wrap" v-if="user.type.toLowerCase() !== 'options' && user.type.toLowerCase() !== 'textarea'">
                      <input type="text" class="form-control" :id="'dfwefwe' + index" required />
                    </div>
                    <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'textarea'">
                      <textarea class="form-control" :id="'dfwefwe' + index" required ></textarea>
                    </div>
                    <div class="form-control-wrap" v-if="user.type.toLowerCase() === 'options' && user.type.toLowerCase() !== 'textarea'">
                      <select :id="'fiedl' + index" class="form-control">
                        <option v-for="(option, idx) in (user.options || '').split(',')" :key="idx" :value="option.trim()">
                          {{ option.trim() }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <br>
                    <div class="form-group">
                      <button type="submit" class="btn btn-success" style="border-radius: 0.6rem;"> Book Appointment </button>
                    </div>
                </div>
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

    import { addItem,getItemById } from '@/apis/tmpapis';
    import { uploadImg } from '@/apis/bookingpageapis';

    export default {
      name: 'NewForm',
      methods: {
        add_item() {
          this.l2.push({
            key: "" + this.l2.length,
            title: "Title "+(this.l2.length+1),
            type: "Textfiled",
            options: "Option 1, Option 2"
          });
        },
        async set_img(){
          if( document.getElementById("form_image").files.length>0){
            const response = await uploadImg(document.getElementById('form_image').files[0]);
            if (response.status) {
              this.form_temp_image = response.data;
             
            }
            else{
                alert(response.message);
            }
          }
        },
        rem_item($index) {
          if ($index > -1) {
            this.l2.splice($index, 1);
          }
        },
        set_filed($pos) {
          if (document.getElementById("ftype"+$pos).value.localeCompare("Options") == 0) {
            document.getElementById("optr" + $pos).style.display = "block";
          } else {
            document.getElementById("optr" + $pos).style.display = "none";
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
            if (this.valField1(this.form_name, 'Enter Template Name') &&
            this.valField1(this.form_desc, 'Enter Template Description') &&
            this.valField1(this.form_status, 'Select Status')
            ) {
              if(document.getElementById("form_image").files.length<=0){
                this.msgType = "danger";
                this.msgTxt = "Select Image";
                return;
              }
                this.msgType = "";
                this.msgTxt = "";
               
                const response = await addItem(
                  this.form_temp_id,
                  this.form_temp_image,
                  this.form_name,
                  this.form_desc, 
                  JSON.stringify(this.l2),
                  this.form_status, 
                  this.ldata.user_id
                );
                if (response.status) {
                   
                    this.msgType = "success";
                    this.msgTxt = response.message;
                    window.location.href = "/templetes";
                } else {
                    this.msgType = "danger";
                    this.msgTxt = response.message;
                }
            }
        },
        async tmp_init() {
                this.msgType = "";
                this.msgTxt = "";
               
                const response = await getItemById(this.form_temp_id);
                if (response.status) {
                   var tmp = response.user;
                   this.form_temp_id = tmp.form_temp_id;
                   this.form_name = tmp.form_temp_title;
                   this.form_desc = tmp.form_temp_desc;
                   this.form_status = tmp.form_temp_status;
                   this.l2 = JSON.parse(tmp.form_temp_fields+"");
                }
            
        }
      },
      data() {
        return {
          base_url: "",
          ldata:null,
          l2: [{
            key: "0",
            title: "Title 1",
            type: "Textfiled",
            options: "Option 1, Option 2"
          }],
          ftype: "Textfield",
          form_desc: "Please Enter Details",
          form_name: "Basic Booking Form",
          form_status:"Active",
          form_temp_id:"",
          form_temp_image:"",
          button_label:"Create",
          forms: ["Basic Booking Form", "Standard Meeting Intake Form", "Sales & Client Discovery Form", "Customer Support Request Form", "Demo or Consultation Request Form", "Event or Webinar Registration Form"]
        };
      },
      mounted() {
        this.base_url = mainBaseUrl;
        if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
        }
        if(sessionStorage.getItem("temp_id") && sessionStorage.getItem("temp_id").length>0){
          this.form_temp_id = sessionStorage.getItem("temp_id")+""; 
          this.button_label = "Update";
          this.tmp_init();
        }
      },
    }
  </script>
  <!-- <style scoped></style> -->