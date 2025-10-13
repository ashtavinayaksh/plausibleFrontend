<template>
    <div class="nk-block nk-block-lg"  style=" width: 100%; padding: 1.5rem;">
          <div class="nk-block-head" style=" width: 100%;">
            <div class="nk-block-head-content" style=" width: 100%;">
                  <div class="row g-gs" style="align-items: center; width: 100%;">
                      <div class="col-2" style="align-items: center;">
                          <a class="btn btn-dim btn-outline-light" @click="set_today()" style="border-radius:0.6rem; font-size: .9rem;"><span>Today</span></a>
                      </div>
                      <div class="col-8" style="text-align: center; align-items: center;">
                          <h6 class="title nk-block-title">{{months[month]}} {{year}}</h6>
                      </div>
                      <div class="col-2" style="align-items: center; text-align: end;">
                        <a class="btn btn-dim btn-outline-light" v-if="calenderStatus==0" @click="next_month()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-right"></i></span></a>
                        <a class="btn btn-dim btn-outline-light" v-if="calenderStatus==1" @click="back_to_cal()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-calendar"></i></span></a>
                      </div>
                      
                  </div> 
                  
              </div>
          </div>
          <div class="card card-bordered card-preview" style="border-radius: 1rem;">
            <div class="card-inner" v-if="calenderStatus==0">
              <div style="width: 100%; display: flex; margin-bottom: 2rem;">
                  <div  style="text-align: center; width:14.2%;"
                  v-for="user in days" :key="user">
                      <h7>{{user}}</h7>
                  </div>
              </div>
              <div class="grid1" >
                  <div v-for="user in day_nos" :key="user">
                  <a v-if="user!=='N'" :class="'btn '+check_day(user)+' '+ditem" @click="on_day_click(user)">
                      <span>{{ user }}</span>
                  </a>
                  <div v-if="user==='N'" :class="nitem"></div>
                  </div>
              </div>
            </div>
            <div class="card-inner" v-if="calenderStatus==1">
              <div v-if="ismobile" style="width: 100%; display: flex; align-items: center; margin-bottom: 1rem;">
                  <a class="btn btn-dim btn-outline-light" @click="prev_week()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-left"></i></span></a>
                  <div  style="text-align: center; width:70%;"></div>
                    <a class="btn btn-dim btn-outline-light" @click="next_week()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-right"></i></span></a>
                        
                </div>
              <div style="width: 100%; display: flex; align-items: center; margin-bottom: 2rem;">
                <a class="btn btn-dim btn-outline-light"  v-if="ismobile==false" @click="prev_week()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-left"></i></span></a>         
                  <div  style="text-align: center; width:14.2%;"
                    v-for="user in days" :key="user">
                      <h7>{{user}}</h7>
                  </div>
                  <a class="btn btn-dim btn-outline-light"  v-if="ismobile==false" @click="next_week()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-right"></i></span></a>   
              </div>
              <div :style="'display: flex; margin-left: 9%;'+vies1" >
                  <div v-for="user in day_nos" :key="user" :style="vies2">
                  <a :class="'btn '+check_day1(user)+' '+ditem"
                   
                  style="margin-right: 1.6rem;" @click="on_day_click(user)">
                      <span>{{ user }}</span>
                  </a>
                  </div>
              </div>
              <div id="slots" :style="'text-align: start; margin-top: .4rem; '+slot_width">
                  <ul class="nk-support">
                    <li class="nk-support-item" v-for="(user) in l1" :key="user" style="background-color: white; border: 1px solid #ddd; border-radius: 1rem; padding:1rem;">
                      <div class="user-avatar">{{user.appointment_customer_name.charAt(0)}}</div>
                      <div class="nk-support-content">
                        
                        <div class="title">
                          <span>{{user.appointment_customer_name}}</span>
                          <a class="btn btn-sm btn-dark" style="border-radius:0.6rem;">
                          <span>{{user.appointment_slot}}</span>
                        </a>
                        </div>
                        <p><strong>Contact:</strong> {{user.appointment_customer_contact}}</p>
                        <br>
                        <div style="display: flex;">
                          <a :href="user.appointment_meet" target="_blank" v-if="user.appointment_meet!=='none' && user.appointment_status==='Pending'" class="btn btn-sm btn-success"  style="border-radius:0.6rem;">
                            <span>Start</span>
                          </a>
                          &nbsp;&nbsp;
                          <a v-if="user.appointment_status==='Pending'" @click="update_st('Canceled',user.appointment_id)" class="btn btn-sm btn-danger" style="border-radius:0.6rem;">
                            <span>Cancel</span>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
              </div>
            </div>
            
          </div>
        
          
        </div>
</template>
<script>
  import {
    mainBaseUrl
  } from '@/apis/appconst';

  import { getAppointmentBySlot,getAppointmentList1,upAppStatus } from '@/apis/appointapi';

  export default {
    name: 'BookCalender',
    methods: {
      next_week(){
        var date = new Date(this.selected_date);
        date.setDate(date.getDate() + 7);
        this.selected_date = date.toDateString();
        this.month = date.getMonth();
        this.day = date.getDate();
        // alert(this.day+"");
        this.setup_cal();
      },
      async update_st(app_status,appointment_id){
        const response = await upAppStatus(appointment_id,app_status);
        if (response.status) {
          this.fetch_slots();
        }
      },
      async check_slot(pkg,pos){
        if(this.sel_slot.localeCompare(pkg)==0){
          document.getElementById("slot"+pos).className = "btn btn-lg btn-success";
          return;
        }
        const response = await getAppointmentBySlot(this.selected_date,pkg);
        if (response.status) {
          document.getElementById("slot"+pos).className = "btn btn-lg btn-danger";
          return;
        }
          document.getElementById("slot"+pos).className = "btn btn-lg btn-outline-success";
          return;
      },
      prev_week(){
        var date = new Date(this.selected_date);
        date.setDate(date.getDate() - 7);
        if(date.getMonth()>=this.month){
          this.selected_date = date.toDateString();
          this.month = date.getMonth();
          this.day = date.getDate();
          this.setup_cal();
        }
      },
      setup_cal(){
        this.day_nos = [];
         if(this.calenderStatus==1){
          var date = new Date(this.selected_date);
          var dayOfWeek = date.getDay();
  
          var startOfWeek = new Date(date);
          startOfWeek.setDate(date.getDate() - dayOfWeek);
          
          for (let i = 0; i < 7; i++) {
              let weekDate = new Date(startOfWeek);
              weekDate.setDate(startOfWeek.getDate() + i);
              this.day_nos.push(weekDate.getDate()+"");
          }
         }
         else{
          var days = parseInt(this.month_day_count[this.month]);
          

          var now = new Date();
          now.setMonth(this.month);
          now.setDate(1);
          var day_index = now.getDay();
            if(day_index>0){
              for(var x=0;x<day_index;x++){
                  this.day_nos.push("N");
              }
            }
            for(var y=0;y<days;y++){
              this.day_nos.push((y+1)+"");
            } 
        }
      },
      back_to_cal(){
        this.set_today();
        this.calenderStatus = 0;
        this.setup_cal();
      }
      ,
      next_month(){
         if(this.month<11){
          this.month++;
         }
         this.isToday = false;
         this.setup_cal();
      },
      set_today(){
          var now = new Date();
          this.year = now.getFullYear();
          this.month = now.getMonth();
          this.day = now.getDate()-1;
          this.day_of_week = now.getDay();
          this.isToday = true;

          this.setup_cal();
          
      },
      check_day($day_name){
          if(parseInt($day_name)==(this.day+1) && this.isToday){
              return "btn-outline-warning";
          }
          return "btn-outline-light";
      },
      check_ditem(){
          this.screen_width = window.innerWidth;
          if(this.screen_width<1400){
            this.ditem = "item2";
            this.ismobile = true;
            this.nitem = "n2";
            this.vies1 = "margin-left:0%;",
            this.vies2 = "width:15%;",
            this.slot_width = "margin-left: 0%; margin-right: 0%;";
          }
          else{
            this.ditem = "item1";
            this.ismobile = false;
            this.nitem = "n1";
            this.vies1 = "margin-left:9%;",
            this.vies2 = "width:20%;",
            this.slot_width = "margin-left: 30%; margin-right: 30%;";
          }
      },
      async fetch_slots(){
        const response = await getAppointmentList1(this.ldata.user_id,this.selected_date,"Pending");
          if (response.status) {
            this.l1 = response.records;
          }
      },
      check_day1($day_name){

          if(parseInt($day_name)==(this.day)){
              return "btn-warning";
          }
          return "btn-outline-light";
      },
      on_day_click($day_name){
        var selectedDate = new Date();
        selectedDate.setMonth(this.month);
        selectedDate.setDate(parseInt($day_name));
          // alert($day_name+"");
          this.month = selectedDate.getMonth();
              this.day = selectedDate.getDate();
              
              
              var mnth = (this.month+1)+"";
              var dy = $day_name+"";
              if(mnth.length==1){
                mnth = "0"+mnth;
              }
              if(dy.length==1){
                dy = "0"+dy;
              }
              this.selected_date = this.year+"-"+mnth+"-"+dy;
              
              this.calenderStatus = 1;
              this.setup_cal();
              this.fetch_slots();
         
      },
      async set_slot(pkg){
        this.sel_slot = pkg;

          var tmp = {
            date:this.selected_date,
            slot:this.sel_slot
          };

          this.$emit("day-click",JSON.stringify(tmp));
      }
    },
    data() {
      return {
        calenderStatus:0,
        year:"2025",
        month: 2,
        ldata:null,
        day: 10, 
        selected_date:"",
        day_of_week:2, 
        enable_max_limit:45,
        base_url: "",
        vies1:"margin-left:9%;",
        vies2:"width:20%;",
        page_dt:null,
        slot_width:"margin-left: 30%; margin-right: 30%;",
          ditem:"item1",
          nitem:"n1",
          ismobile:false,
        l1:[],
        sel_slot:"",
        booking_page_url:"",
        isToday:false,
        day_indexes: [0, 1, 2, 3, 4, 5, 6],
        month_day_count: ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
        day_nos: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
      };
    },
    mounted() {
      this.check_ditem();
      this.base_url = mainBaseUrl;
      this.booking_page_url = window.location.pathname.split('/').filter(Boolean).pop();
      if(sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length>0){
          this.ldata = JSON.parse(sessionStorage.getItem("ldata")); 
          this.set_today();
        }
      
    },
  }
</script>
<style>
.grid1 {
  display: grid;
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  align-items: center;
}
.item1{
  height: 3rem;
  width: 3rem;
  padding: 0px;
  border-radius: 2rem;
  margin-bottom: 2rem;
  font-size: 1rem;
}
.item2{
    height: 1.5rem;
    width: 1.5rem;
    padding: 0px;
    border-radius: 2rem;
    margin-bottom: 2rem;
    font-size: .6rem;
  }
  .n1{
    height: 3rem;
    width: 3rem;
  }
  .n2{
    height: 1.5rem;
    width: 1.5rem;
  }
</style>