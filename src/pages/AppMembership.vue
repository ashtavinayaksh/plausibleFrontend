<template>
    + <div class="nk-content-wrap">
  <div class="nk-block-head nk-block-head-lg wide-md">
    <div class="nk-block-head-content">
      <div class="nk-block-head-sub">
        <span>Pricing</span>
      </div>
      <h2 class="nk-block-title fw-normal">Choose Suitable Plan</h2>
      <div class="nk-block-des">
        <p class="lead">You can change your plan any time by upgrade your plan.</p>
      </div>
    </div>
  </div>
  <div class="nk-block">
    <div class="row g-gs">
      <div class="col-md-4">
        <div class="price-plan card card-bordered text-center">
          <div class="card-inner">
            <div class="price-plan-media">
              <img :src="base_url+'images/icons/plan-s1.svg'" alt="">
            </div>
            <div class="price-plan-info">
              <h5 class="title">Starter</h5>
              <span>If you are a small business amn please select this plan</span>
            </div>
            <div class="price-plan-amount">
              <div class="amount">$99 <span>/yr</span>
              </div>
              <span class="bill">1 User, Billed Yearly</span>
            </div>
            <div class="price-plan-action">
              <a href="#" class="btn btn-primary">Select Plan</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="price-item card card-bordered text-center">
          <div class="card-inner">
            <div class="price-plan-media">
              <img :src="base_url+'images/icons/plan-s2.svg'" alt="">
            </div>
            <div class="price-plan-info">
              <h5 class="title">Pro</h5>
              <span>If you are a small business amn please select this plan</span>
            </div>
            <div class="price-plan-amount">
              <div class="amount">$299 <span>/yr</span>
              </div>
              <span class="bill">5 User, Billed Yearly</span>
            </div>
            <div class="price-plan-action">
              <a href="#" class="btn btn-primary">Select Plan</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="price-item card card-bordered text-center">
          <div class="card-inner">
            <div class="price-plan-media">
              <img :src="base_url+'images/icons/plan-s3.svg'" alt="">
            </div>
            <div class="price-plan-info">
              <h5 class="title">Enterprise</h5>
              <span>If you are a small business amn please select this plan</span>
            </div>
            <div class="price-plan-amount">
              <div class="amount">$599 <span>/yr</span>
              </div>
              <span class="bill">20 User, Billed Yearly</span>
            </div>
            <div class="price-plan-action">
              <a href="#" class="btn btn-primary">Select Plan</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nk-block">
    <div class="card card-bordered">
      <table class="table table-features">
        <thead class="tb-ftr-head table-light">
          <tr class="tb-ftr-item">
            <th class="tb-ftr-info">Features</th>
            <th class="tb-ftr-plan">Starter</th>
            <th class="tb-ftr-plan">Pro</th>
            <th class="tb-ftr-plan">Enterprise</th>
          </tr>
        </thead>
        <tbody class="tb-ftr-body">
          <tr class="tb-ftr-item">
            <td class="tb-ftr-info">Alias record</td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Starter</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Pro</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Enterprise</span>
            </td>
          </tr>
          <tr class="tb-ftr-item">
            <td class="tb-ftr-info">Anycast DNS</td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Starter</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Pro</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Enterprise</span>
            </td>
          </tr>
          <tr class="tb-ftr-item">
            <td class="tb-ftr-info">Full API access</td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-cross"></em>
              <span class="plan-name">Starter</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Pro</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Enterprise</span>
            </td>
          </tr>
          <tr class="tb-ftr-item">
            <td class="tb-ftr-info">Multiple-layered DoS defense</td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-cross"></em>
              <span class="plan-name">Starter</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-cross"></em>
              <span class="plan-name">Pro</span>
            </td>
            <td class="tb-ftr-plan">
              <em class="icon ni ni-check-thick"></em>
              <span class="plan-name">Enterprise</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import { mainBaseUrl } from '@/apis/appconst';
export default {
    name: 'AppMembership',
    methods: {
        async getMyDtCall() {


        }
    },
    data() {
        return {
            base_url: "",
            l1: ["1", "2", "3", "4", "5"]
        };
    },
    mounted() {

        this.base_url = mainBaseUrl;
    },
}
</script>

