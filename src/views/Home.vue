<template>
<div class="col-xs-12">
  <div v-if="loading" class="min-vh-100 row align-items-center">
    <div class="">
    <strong>Loading...</strong>
    <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
    </div>
  </div>
  <div v-else class="home">
    <h1 class="p-5">Ranking</h1>
    <div  class="row justify-content-center">
      <UserCard v-for="user in usersParse" :key="user._id" :user="user" />
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import UserCard from '@/components/UserCard.vue'
import api from '../services/Api'

export default {
  name: 'Home',
  data () {
    return {
      users: '',
      loading: true,
      usersParse: []
    }
  },
  components: {
    UserCard
  },
  methods: {
    async parseUser (user) {
      const userWorkouts = await api.getUser(user.username)
      const userParsing = this.users.find(user => user.id === userWorkouts.results[0].user)
      userParsing.workouts = userWorkouts.results
      const lastMonthSteps = this.parseWorkouts(userParsing)
      userParsing.avg_last_month = lastMonthSteps.toFixed(2)
      this.usersParse.push(userParsing)
    },
    parseWorkouts (user) {
      const date = new Date()
      var month = date.getMonth() - 1
      if (month < 0) {
        month = 11
      }
      var lastMonthWorkouts = []
      user.workouts.forEach(workout => {
        var workoutDate = new Date(workout.date)
        if (workoutDate.getMonth() === month) {
          console.log('in')
          lastMonthWorkouts.push(workout.steps)
        }
      })
      return lastMonthWorkouts.reduce((a, b) => a + b, 0) / lastMonthWorkouts.length
    }
  },
  async created () {
    const users = await api.getAllUsers()
    this.users = users.results.sort((a, b) => b.avg_steps - a.avg_steps)
    this.users.forEach(user => {
      this.parseUser(user).then(this.loading = false)
    })
  }
}
</script>
