<template>
  <div class="about">
    <h1 class="p-5">{{userInfo}}</h1>
  </div>
</template>
<script>

export default {
  name: 'UserView',
  data () {
    return {
      userFind: []
    }
  },
  props: {
    userInfo: Object
  },
  async created () {
    console.log(this.userInfo.workouts.sort((a, b) => new Date(a.date).getTime() > new Date(b.date).getTime()))
    console.log(this.userInfo)
  }
}
</script>
