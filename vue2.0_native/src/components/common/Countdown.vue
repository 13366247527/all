<template>
   <span>{{minutes}}:{{seconds}}</span>
</template>

<script>
export default {
    name: "countdown",
    data(){
        return{
            minutes: '',
            seconds: ''
        }
    },
    mounted(){
        this.timer()
    },
    watch: {
        second: {
            handler (newVal) {
                this.num(newVal)
            }
        },
        minute: {
            handler (newVal) {
                this.num(newVal)
            }
        }
    },
    methods:{
        num(n) {
            return n < 10 ? '0' + n : '' + n
        },
        timer () {
            let _this = this;
            let time = window.setInterval(function () {
                if (_this.seconds === 0 && _this.minutes !== 0) {
                    _this.seconds = 59
                    _this.minutes -= 1
                } else if (_this.minutes === 0 && _this.seconds === 0) {
                    _this.seconds = 0
                    window.clearInterval(time)
                } else {
                    _this.seconds -= 1
                }
            }, 1000)
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
