<template>
  <div class="card border-secondary m-3" style="max-width: 18rem;">
    <div class="fw-bold text-capitalize card-header bg-transparent border-secondary">{{user.username}}</div>
    <div class="card-body">
      <p>
        <span class="fw-bold">Avg Steps: </span><span>{{user.avg_steps}}</span>
      </p>
      <p>
        <span class="fw-bold">Avg Last Month Steps: </span><span>{{user.avg_last_month}}</span>
      </p>
      <p>
        <span class="fw-bold">Avg Last Week Steps: </span><span>{{user.avg_last_week}}</span>
      </p>
    </div>
    <a @click='showUser()' class="btn btn-primary mb-2">Show</a>
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
      this.$router.push({ name: 'UserView', params: { username: this.user.username } })
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
