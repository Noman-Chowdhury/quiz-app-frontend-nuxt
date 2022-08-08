<template>
<div>11</div>
</template>

<script>
export default {
  name: "DetailPage",
  data(){
    return{

    }
  },
  created() {
    this.getWeekResult()
  },
  methods:{
    getWeekResult(){
      this.$store.dispatch('user/result/getWeeklyResult', {slug:this.$route.params.slug})
    }
  }
}
</script>

<style scoped>

</style>
