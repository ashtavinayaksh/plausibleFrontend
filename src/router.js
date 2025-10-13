// router.js
import { createRouter, createWebHistory } from 'vue-router';

// import AppDash from './pages/AppDash.vue';
import AppTodo from './pages/AppTodo.vue';
import AppLogin from './pages/AppLogin.vue';
import AppTemps from './pages/AppTemps.vue';
import AppEmailTemps from './pages/AppEmailTemps.vue';
import AppReports from './pages/AppReports.vue';
import AppBookings from './pages/AppBookings.vue';
import AppBookingPages from './pages/AppBookingPages.vue';
import WebReports from './pages/WebReports.vue';

import AppSettings from './pages/AppSettings.vue';
import AppCalender from './pages/AppCalender.vue';
import NewForm from './pages/NewForm.vue';
import NewEmailTmp from './pages/NewEmailTmp.vue';
import Packages from './pages/Packages.vue';
import NewPkg from './pages/NewPkg.vue';
import BookingPage from './pages/BookingPage.vue';
import AppMembership from './pages/AppMembership.vue';
import ChPass from './pages/ChPass.vue';
import AppMeetReport from './pages/AppMeetReport.vue';
import AppMemPlans from './pages/AppMemPlans.vue';
import AddMemPlans from './pages/AddMemPlans.vue';
import AppUsers from './pages/AppUsers.vue';
import AppUsers1 from './pages/AppUsers1.vue';
import AppDash from './pages/AppDash.vue';
import PricingPage from './pages/PricingPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AppDash
  },
  {
    path: '/new_form',
    name: 'NewForm',
    component: NewForm
  },
  {
    path: '/packages',
    name: 'Packages',
    component: Packages
  },
  {
    path: '/change_password',
    name: 'ChPass',
    component: ChPass
  },
  {
    path: '/membership',
    name: 'AppMembership',
    component: AppMembership
  },
  {
    path: '/new_packages',
    name: 'NewPkg',
    component: NewPkg
  },
  {
    path: '/new_mail_tmp',
    name: 'NewEmailTmp',
    component: NewEmailTmp
  },
  {
    path: '/bookings',
    name: 'Bookings',
    component: AppBookings
  },
  {
    path: '/web_report/:web_id',
    name: 'WeReport',
    component: WebReports
  },
  {
    path: '/my_websites',
    name: 'MyWebsites',
    component: AppBookingPages
  },
  {
    path: '/pricing_page',
    name: 'PricingPage',
    component: PricingPage
  },
  {
    path: '/calender1',
    name: 'Calendar',
    component: AppCalender
  },
  {
    path: '/todo',
    name: 'Todo',
    component: AppTodo
  },
  {
    path: '/templetes',
    name: 'Templetes',
    component: AppTemps
  },
  {
    path: '/email_templetes',
    name: 'EmailTempletes',
    component: AppEmailTemps
  },
  {
    path: '/ai_reports',
    name: 'AiReports',
    component: AppReports
  },
  {
    path: '/settings',
    name: 'Settings',
    component: AppSettings
  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin
  },
  {
    path: '/all_users',
    name: 'all_users',
    component: AppUsers
  },
  {
    path: '/subscribers',
    name: 'subscribers',
    component: AppUsers1
  },
  {
    path: '/mem_plans',
    name: 'mem_plans',
    component: AppMemPlans
  },
  {
    path: '/new_mem_plan',
    name: 'new_mem_plan',
    component: AddMemPlans
  },
  {
    path: '/booking/:id', // Route with parameter
    name: 'BookingPage',
    component: BookingPage,
    props: true // Enables passing route params as props
  },
  {
    path: '/appoint_report/:id', // Route with parameter
    name: 'AppMeetReport',
    component: AppMeetReport,
    props: true // Enables passing route params as props
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const ldata = sessionStorage.getItem('ldata');
  if (to.path.toString().includes("login")==false &&
  to.path.toString().includes("booking/")==false &&
  to.path.toString().includes("appoint_report/")==false &&
  (ldata==null || ldata==undefined)) {
    window.location.href = "/login";
   
  }
  next();
});


export default router;
