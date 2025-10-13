<template>
     <footer class="footer">
                    <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        Made with love
                    </div>
                </footer>
</template>

<script>
import { mainBaseUrl } from '@/apis/appconst';
export default {
    name: 'MainFooter',
    methods: {
        async getMyDtCall() {


        }
    },
    data() {
        return {
            base_url: ""
        };
    },
    mounted() {

        this.base_url = mainBaseUrl;
    },
}
</script>

<style scoped></style>
