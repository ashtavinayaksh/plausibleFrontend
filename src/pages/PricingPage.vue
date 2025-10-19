<template>
  <div class="nk-content-wrap pricing-page">
    <div class="nk-block-head text-center mb-5">
      <h3 class="nk-block-title page-title">Pricing Plans</h3>
      <p class="subtitle">Choose the plan that fits your needs.</p>
    </div>

    <div class="nk-block">
      <div class="row justify-content-center g-gs">
        <div class="col-md-4" v-for="plan in plans" :key="plan.id">
          <div class="pricing-card">
            <h4 class="plan-title">{{ plan.name }}</h4>
            <div class="plan-price">
              <span class="currency">₹</span>{{ plan.price }}
              <span class="period">/month</span>
            </div>

            <!-- Subscribe button: triggers backend checkout redirect -->
            <button
              class="btn btn-primary w-100 mt-3"
              @click="handleStripe(plan.id)"
            >
              Subscribe
            </button>

            <ul class="plan-features mt-4">
              <li v-for="(feature, i) in plan.features" :key="i">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingPage", // multi-word name
  data() {
    return {
      // Replace these plans with dynamic fetch if you have plans in DB
      plans: [
        {
          id: 1,
          name: "Starter",
          price: 199,
          features: ["1 site", "Basic reports"],
        },
        {
          id: 2,
          name: "Growth",
          price: 399,
          features: ["3 sites", "Team access"],
        },
        {
          id: 3,
          name: "Business",
          price: 799,
          features: ["10 sites", "Priority support"],
        },
      ],
    };
  },
  methods: {
    /**
     * Redirects to backend endpoint that creates a Stripe Checkout session.
     * Backend endpoint (as implemented in api-analytcly-ai-main):
     *   GET /stripe/redirectToPaymentGateway?amount=<plan_id>&uid=<user_id>&curr=<currency>
     *
     * We redirect the browser to the backend URL so the backend can create the Stripe
     * Checkout session and then redirect the user to Stripe Checkout.
     */
    handleStripe(planId) {
      // Ensure user is logged in and we have user id in sessionStorage
      const ldataRaw = sessionStorage.getItem("ldata");
      if (!ldataRaw) {
        // show a friendly message or route to login
        alert("Please login to purchase a plan.");
        return;
      }

      const ldata = JSON.parse(ldataRaw || "{}");
      const uid = ldata.user_id || ldata.id || null; // adapt to how you store id
      if (!uid) {
        alert("Could not detect user ID. Please login again.");
        return;
      }

      // Base backend URL — set in .env (example below)
      const API_BASE = process.env.VUE_APP_API_URL || "http://localhost:8080";

      // Build the backend URL that triggers the Stripe Checkout creation.
      // According to backend implementation it expects:
      //   amount => plan_id (they use this to lookup plan price)
      //   uid => user id
      //   curr => currency (e.g., USD or INR). Backend defaults to uppercase currency.
      //
      // NOTE: The backend will redirect to Stripe directly; we therefore navigate the browser
      // to this endpoint so the server does the redirect.
      const currency = "USD"; // change to INR if your Stripe acct uses INR (or use dynamic)
      const redirectUrl = `${API_BASE.replace(
        /\/$/,
        ""
      )}/stripe/redirectToPaymentGateway?amount=${encodeURIComponent(
        planId
      )}&uid=${encodeURIComponent(uid)}&curr=${encodeURIComponent(currency)}`;

      // Navigate browser to backend endpoint (server will redirect to Stripe Checkout)
      window.location.href = redirectUrl;
    },
  },
};
</script>

<style scoped>
.pricing-page {
  padding: 40px 20px;
  background: #f9fafb;
}

.pricing-card {
  background: #fff;
  border-radius: 10px;
  padding: 22px;
  margin-bottom: 18px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  text-align: center;
}
.plan-price {
  font-size: 26px;
  font-weight: 700;
  margin: 10px 0;
}
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}
.plan-features mt-4 {
  list-style: none;
}
</style>
