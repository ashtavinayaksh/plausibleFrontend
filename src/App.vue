<template>

  <div id="app" v-if="isMenu==0"  class="container-scroller">
        <router-view></router-view>
    </div>
  <div id="app" v-if="isMenu==1"  class="container-scroller">
        <MainHeader/>
        <div class="container-fluid page-body-wrapper">
            <MainMenu />
            <div class="main-panel">
              <router-view></router-view>
                <MainFooter />
            </div>
        </div>
    </div>
</template>
<script>
import { mainBaseUrl } from '@/apis/appconst';
import MainHeader from "./comps/MainHeader.vue";
import MainFooter from "./comps/MainFooter.vue";
import MainMenu from "./comps/MainMenu.vue";

export default {
  name: 'App',
  components: {
    MainHeader,
    MainMenu,
    MainFooter
  },
  methods: {
    async getMyDtCall() {


    }
  },
  data() {
    return {
      base_url: "",
      isMenu:1
    };
  },
  created() {

    this.base_url = mainBaseUrl;
    const lastSegment = window.location.pathname.split('/');
   
        if(lastSegment[lastSegment.length-1].localeCompare("login")==0){
            this.isMenu = 0;
        }
        else {
            this.isMenu = 1;
        }
  },
}
</script>

