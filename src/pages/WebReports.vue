<template>
    <div class="nk-content-wrap">
        <div style="width: 100%; height: 100%;"> <!-- parent container -->
            <iframe
              id="myIframe"
              :src="web_url"
              style="width: 100%; height: 100vh; border: none;" 
          
            ></iframe>
        </div>
         <div class="user-avatar sm" 
              @click="clickChatNow()"
              style="
              background-color: #1F3BB3 !important; 
              color: #ffffff!important;
              position: fixed; 
              bottom: 1rem;
              right: 2rem;
              height: 3.5rem;
              width: 3.5rem;
              font-size: 2rem;
              z-index: 9999;
              padding-left: .6rem;
              padding-top: .2rem;
              border-radius: 50%;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);"><SparklesIcon style="height: 2rem; width: 2rem;"/></div>
    </div>
</template>
  <script>
    import {
      
      reportUrl
    } from '@/apis/appconst';

    import { 
  SparklesIcon
} from '@heroicons/vue/24/outline'
  
    export default {
      name: 'WebReports',
      components:{
        SparklesIcon
      },
     methods:{
      clickChatNow(){
          const iframe = document.getElementById("myIframe");
          iframe.contentWindow.postMessage("clickChatButton", "https://api.analytcly.ai");
        }
     },
      data() {
        return {
          ldata:null,
          web_id:"",
          web_url:""
        };
      },
      created(){
        this.web_id = window.location.pathname.split('/').filter(Boolean).pop();
        if (sessionStorage.getItem("ldata") && sessionStorage.getItem("ldata").length > 0) {
          this.ldata = JSON.parse(sessionStorage.getItem("ldata"));

          this.web_url = reportUrl+""+this.ldata.user_id+"/"+this.web_id;
        }
      }
    }
  </script>
  