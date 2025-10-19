<template>
  <footer class="footer"></footer>
</template>

<script>
import { mainBaseUrl } from "@/apis/appconst";
export default {
  name: "MainFooter",
  methods: {
    async getMyDtCall() {},
  },
  data() {
    return {
      base_url: "",
    };
  },
  mounted() {
    this.base_url = mainBaseUrl;
  },
};
</script>

<style scoped></style>
