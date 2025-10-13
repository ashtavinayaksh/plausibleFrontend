<template>
      <div class="nk-block nk-block-lg"  style=" width: 100%; padding: 1.5rem;">
            <div class="nk-block-head" style=" width: 100%;">
              <div class="nk-block-head-content" style=" width: 100%;">
                    <div class="row g-gs" style="align-items: center; width: 100%;">
                        <div class="col-2" style="align-items: center;">
                            <a class="btn btn-dim btn-outline-light" @click="set_today()" style="border-radius:0.6rem; font-size: .9rem;"><span>Today</span></a>
                        </div>
                        <div class="col-8" style="text-align: center; align-items: center; ">
                            <h6 class="title nk-block-title">{{months[month]}} {{year}}</h6>
                        </div>
                        <div class="col-2" style="align-items: center; text-align: right;">
                          <a class="btn btn-dim btn-outline-light" v-if="calenderStatus==0" @click="next_month()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-right"></i></span></a>
                          <a class="btn btn-dim btn-outline-light" v-if="calenderStatus==1" @click="back_to_cal()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-calendar"></i></span></a>
                        </div>
                        <div class="col-5">
                          <label class="form-label"><span style="font-size: 1.1rem;"><i class="fas fa-globe-americas"></i></span>&nbsp;&nbsp;Timezone</label>
                          <select class="form-control required" v-model="curr_timezone" @change="fetch_slots()"  style="border-radius: .7rem;" fdprocessedid="z0lfp">
                            <option value="Pacific/Midway">Pacific/Midway</option>
                            <option value="Pacific/Honolulu">Pacific/Honolulu</option>
                            <option value="America/Anchorage">America/Anchorage</option>
                            <option value="America/Los_Angeles">America/Los_Angeles</option>
                            <option value="America/Denver">America/Denver</option>
                            <option value="America/Chicago">America/Chicago</option>
                            <option value="America/New_York">America/New_York</option>
                            <option value="America/Toronto">America/Toronto</option>
                            <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                            <option value="Atlantic/Azores">Atlantic/Azores</option>
                            <option value="Europe/London">Europe/London</option>
                            <option value="Europe/Paris">Europe/Paris</option>
                            <option value="Europe/Berlin">Europe/Berlin</option>
                            <option value="Europe/Moscow">Europe/Moscow</option>
                            <option value="Asia/Dubai">Asia/Dubai</option>
                            <option value="Asia/Kolkata">Asia/Kolkata</option>
                            <option value="Asia/Calcutta">Asia/Calcutta</option>
                            <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                            <option value="Asia/Bangkok">Asia/Bangkok</option>
                            <option value="Asia/Shanghai">Asia/Shanghai</option>
                            <option value="Asia/Tokyo">Asia/Tokyo</option>
                            <option value="Australia/Sydney">Australia/Sydney</option>
                            <option value="Pacific/Auckland">Pacific/Auckland</option>
                            <option value="Pacific/Fiji">Pacific/Fiji</option>
                            <option value="UTC">UTC</option>
                          </select>
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
                  <a class="btn btn-dim btn-outline-light" v-if="ismobile==false" @click="prev_week()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-left"></i></span></a>
                        
                    <div  style="text-align: center; width:14.2%;"
                      v-for="user in days" :key="user">
                        <h7>{{user}}</h7>
                    </div>
                    <a class="btn btn-dim btn-outline-light" v-if="ismobile==false" @click="next_week()" style="border-radius:0.6rem; font-size: .9rem;"><span><i class="fas fa-arrow-right"></i></span></a>
                        
                </div>
                <div :style="'display: flex; '+vies1" >
                    <div v-for="user in day_nos" :key="user">
                      <a :class="'btn '+check_day1(user)+' '+ditem"
                        :style="vies2" @click="on_day_click(user)">
                          <span>{{ user }}</span>
                      </a>
                    </div>
                </div>
                <div id="slots" :style="'text-align: center; margin-top: .4rem; '+slot_width">
                    <div v-for="(user,index) in l1" :key="user">
                      <a  @click="set_slot(index)" :id="'slot'+index" :class="'btn btn-lg '+check_slot(index)" style="border-radius:1rem; width:100%; margin-bottom: .6rem; margin-right: .5rem;">
                        <span>{{ user }}</span>
                      </a>
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

    import { getBookingByUrl } from '@/apis/bookingpageapis';
    import { getAppointmentBySlot } from '@/apis/appointapi';
    import {
      getMyDt
    } from '@/apis/webapis';

    export default {
      name: 'MainHeader',
      methods: {
        async getMyCall() {
        this.msgType = "";
        this.msgTxt = "";
        const timezone1 = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // alert(timezone1+"");
        this.timezone = timezone1.toString();
        const response = await getMyDt(this.page_dt.booking_page_cre_by);
        if (response.status) {
          alert(this.buss_dt.busienss_timezone+"");
          this.ldata = response.user;
          this.buss_dt = response.buss_dt;
          if(this.buss_dt!=null && this.buss_dt!=undefined){
            this.timezone = this.buss_dt.busienss_timezone;
          }
        }
      },
        next_week(){
          var date = new Date(this.selected_date);
          date.setDate(date.getDate() + 7);
          this.selected_date = date.toDateString();
          this.month = date.getMonth();
          this.day = date.getDate();
          // alert(this.day+"");
          this.setup_cal();
        },
        async check_slot(pos){
          var pkg = this.l2[pos];
          if(this.sel_slot1.localeCompare(pkg)==0){
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
            var now = new Date();
            var selectedDate = new Date(now.getFullYear(), this.month, parseInt($day_name));
            var diffInDays = Math.ceil((selectedDate - now) / (1000 * 60 * 60 * 24));
            if(parseInt($day_name)==(this.day+1) && this.isToday){
                return "btn-outline-warning";
            }
            else{
                var day_of_week = selectedDate.getDay();
                var week_day = this.days[day_of_week];
                if(this.avial_days.includes(week_day)){
                  if((selectedDate>=now) && diffInDays<=this.enable_max_limit){
                    return "btn-outline-success";
                  }
                  else if(selectedDate<now){
                    return "btn-dim btn-outline-light";
                  }
                  else {
                    return "btn-outline-light";
                  }
                }
            }
            return "btn-dim btn-outline-light";
        },
        async get_pdt(){
          const response1 = await getBookingByUrl(this.booking_page_url);
              if (response1.status) {
               this.page_dt = response1.page_dt;
               this.getMyCall();
            }
        },
        
        fetch_slots(){
          if(this.page_dt!=null && this.page_dt!=undefined){
            const fromTime = this.page_dt.booking_page_from; // 12:00
            const toTime = this.page_dt.booking_page_to; //  18:00
            const slotDuration = this.page_dt.booking_page_duration.split(" ")[0];
            const bufferTime = this.page_dt.booking_page_buffer_time;
             
            this.l1 = [];
            var now = new Date(); 
            if((this.selected_date+"").length>0){
              now = new Date(this.selected_date+""); 
              var now1 = new Date(); 
              if(now.getFullYear() === now1.getFullYear() &&
                now.getMonth() === now1.getMonth() &&
                now.getDate() === now1.getDate()){
                now = new Date(); 
              }
            }
            
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            let [fromHours, fromMinutes] = fromTime.split(":").map(Number);
            let [toHours, toMinutes] = toTime.split(":").map(Number);

            // Convert Vendor's Time to User's Local Time
            let startTime = new Date(today);
            startTime.setHours(fromHours, fromMinutes, 0, 0);
            startTime = new Date(startTime.toLocaleString("en-US", { timeZone: this.timezone }));

            let endTime = new Date(today);
            endTime.setHours(toHours, toMinutes, 0, 0);
            endTime = new Date(endTime.toLocaleString("en-US", { timeZone: this.timezone }));

            // Convert to user's local time
            startTime = new Date(startTime.toLocaleString("en-US", { timeZone: this.curr_timezone }));
            endTime = new Date(endTime.toLocaleString("en-US", { timeZone: this.curr_timezone }));

            while (startTime.getTime() + slotDuration * 60000 <= endTime.getTime()) {
                let slotEndTime = new Date(startTime.getTime() + slotDuration * 60000);

                if (slotEndTime.getTime() > endTime.getTime()) break;

                if (startTime.getTime() > now.getTime()) {
                    this.l1.push(`${startTime.toTimeString().substring(0, 5)} - ${slotEndTime.toTimeString().substring(0, 5)}`);
                }

                startTime = new Date(slotEndTime.getTime() + bufferTime * 60000);
            }
           
          }
          this.fetch_slots1();
        },
        fetch_slots1(){
          if(this.page_dt!=null && this.page_dt!=undefined){
            const fromTime = this.page_dt.booking_page_from; // 12:00
            const toTime = this.page_dt.booking_page_to; //  18:00
            const slotDuration = this.page_dt.booking_page_duration.split(" ")[0];
            const bufferTime = this.page_dt.booking_page_buffer_time;
             
            this.l2 = [];
            var now = new Date(); 
            if((this.selected_date+"").length>0){
              now = new Date(this.selected_date+""); 
              var now1 = new Date(); 
              if(now.getFullYear() === now1.getFullYear() &&
                now.getMonth() === now1.getMonth() &&
                now.getDate() === now1.getDate()){
                now = new Date(); 
              }
            }
            
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            let [fromHours, fromMinutes] = fromTime.split(":").map(Number);
            let [toHours, toMinutes] = toTime.split(":").map(Number);

            // Convert Vendor's Time to User's Local Time
            let startTime = new Date(today);
            startTime.setHours(fromHours, fromMinutes, 0, 0);

            let endTime = new Date(today);
            endTime.setHours(toHours, toMinutes, 0, 0);

            while (startTime.getTime() + slotDuration * 60000 <= endTime.getTime()) {
                let slotEndTime = new Date(startTime.getTime() + slotDuration * 60000);

                if (slotEndTime.getTime() > endTime.getTime()) break;

                if (startTime.getTime() > now.getTime()) {
                    this.l2.push(`${startTime.toTimeString().substring(0, 5)} - ${slotEndTime.toTimeString().substring(0, 5)}`);
                }

                startTime = new Date(slotEndTime.getTime() + bufferTime * 60000);
            }
           
          }
        },
        check_day1($day_name){
          var now = new Date();
            var selectedDate = new Date(now.getFullYear(), this.month, parseInt($day_name));
            var day_of_week = selectedDate.getDay();
            var week_day = this.days[day_of_week];

            if(parseInt($day_name)==(this.day)){
                return "btn-warning";
            }
            else if((selectedDate<now) || (this.avial_days.includes(week_day)==false)){
                  return "btn-dim btn-outline-light";
            }
            return "btn-outline-light";
        },
        on_day_click($day_name){
          var now = new Date();
          var selectedDate = new Date();
          selectedDate.setMonth(this.month);
          selectedDate.setDate(parseInt($day_name));
            var day_of_week = selectedDate.getDay();
            var week_day = this.days[day_of_week];
            if((this.avial_days.includes(week_day)) && (selectedDate>=now)){
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
            }
           
        },
        async set_slot(index){
          const response = await getAppointmentBySlot(this.selected_date,this.l2[index]);
          if (response.status) {
            console.log("dfed");
          }
          else{
            this.sel_slot = this.l1[index];
            this.sel_slot1 = this.l2[index];

            var tmp = {
              date:this.selected_date,
              slot:this.sel_slot,
              slot1:this.sel_slot1
            };

            this.$emit("day-click",JSON.stringify(tmp));
          }
        },
        check_ditem(){
          this.screen_width = window.innerWidth;
          if(this.screen_width<1200){
            this.ditem = "item2";
            this.ismobile = true;
            this.nitem = "n2";
            this.slot_width = "margin-left: 0%; margin-right: 0%;";
            this.vies1 = "margin-left:2%;";
            this.vies2 = "margin-right: 1.3rem;";
          }
          else{
            this.ditem = "item1";
            this.ismobile = false;
            this.nitem = "n1";
            this.slot_width = "margin-left: 30%; margin-right: 30%;";
            this.vies1 = "margin-left:10%;";
            this.vies2 = "margin-right: 1.6rem;";
          }
      }
      },
      data() {
        return {
          ldata:null,
          buss_dt:null,
          calenderStatus:0,
          timezone:"",
          curr_timezone:"",
          year:"2025",
          month: 2,
          slot_width:"margin-left: 30%; margin-right: 30%;",
          ditem:"item1",
          nitem:"n1",
          ismobile:false,
          day: 10, 
          vies1:"margin-left:10%;",
          vies2:"margin-right: 1.6rem;",
          selected_date:"",
          day_of_week:2, 
          enable_max_limit:45,
          base_url: "",
          page_dt:null,
          l1:[],
          l2:[],
          sel_slot:"",
          sel_slot1:"",
          booking_page_url:"",
          avial_days: ["Mon","Tue","Wed","Thu","Fri"],
          isToday:false,
          day_indexes: [0, 1, 2, 3, 4, 5, 6],
          month_day_count: ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"],
          months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
          day_nos: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
        };
      },
      mounted() {
        this.base_url = mainBaseUrl;
        this.booking_page_url = window.location.pathname.split('/').filter(Boolean).pop();
        this.curr_timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.get_pdt();
        this.set_today();
        this.check_ditem();
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