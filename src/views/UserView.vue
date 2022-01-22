<template>
  <div class="about">
    <h1 class="p-5">{{userFind}}</h1>
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
    this.userFind = this.userInfo
  }
}
</script>
