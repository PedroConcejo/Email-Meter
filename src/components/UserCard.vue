<template>
  <div class="card border-primary m-2" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{user.username}}</h5>
      <p class="card-text">Avg Steps: {{user.avg_steps}}</p>
      <p class="card-text">Avg Last Month Steps: {{user.avg_last_month}}</p>
      <p class="card-text">Avg Last Week Steps: {{user.avg_last_week}}</p>
      <a @click='showUser()' class="btn btn-primary">Show</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  data () {
    return {
      lastMonth: '',
      lastWeek: ''
    }
  },
  props: {
    user: Object
  },
  methods: {
    showUser () {
      this.$router.push({ name: 'UserView', params: { username: this.user.username, userInfo: this.user } })
    }
  },
  created () {
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
