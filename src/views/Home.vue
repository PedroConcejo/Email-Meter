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
    <FilterButtons  v-on:filterUsers='filterUsers' />
    <div  class="row justify-content-center">
      <UserCard v-for="user in usersParse" :key="user._id" :user="user" />
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import UserCard from '@/components/UserCard.vue'
import FilterButtons from '@/components/FilterButtons.vue'
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
    UserCard,
    FilterButtons
  },
  methods: {
    async parseUser (user) {
      const userWorkouts = await api.getUser(user.username)
      const userParsing = this.users.find(user => user.id === userWorkouts.results[0].user)
      userParsing.workouts = userWorkouts.results
      const lastMonthSteps = this.parselastMonthSteps(userParsing)
      userParsing.avg_last_month = isNaN(Math.trunc(lastMonthSteps)) ? 0 : Math.trunc(lastMonthSteps)
      const lastWeekSteps = this.parselastWeekteps(userParsing)
      userParsing.avg_last_week = isNaN(Math.trunc(lastWeekSteps)) ? 0 : Math.trunc(lastWeekSteps)
      this.usersParse.push(userParsing)
      this.filterUsers('avg_steps')
    },
    parselastMonthSteps (user) {
      const date = new Date()
      var currentYear = date.getFullYear()
      var month = date.getMonth()
      if (month < 0) {
        month = 11
      }
      if (month === 0) {
        currentYear += -1
      }
      var lastMonthWorkouts = []
      user.workouts.forEach(workout => {
        var workoutDate = new Date(workout.date)
        if (workoutDate.getFullYear() === currentYear && workoutDate.getMonth() === month) {
          lastMonthWorkouts.push(workout.steps)
        }
      })
      return lastMonthWorkouts.reduce((a, b) => a + b, 0) / lastMonthWorkouts.length
    },
    parselastWeekteps (user) {
      const today = new Date()
      const startOfWeeks = new Date('01/02/2022')
      const diff = today - startOfWeeks
      const oneDay = 1000 * 60 * 60 * 24
      const lastWeek = Math.ceil((diff / oneDay) / 7) - 1
      var lastWeekWorkouts = []
      user.workouts.forEach(workout => {
        var workoutDate = new Date(workout.date)
        const diffWorkout = workoutDate - startOfWeeks
        const workoutWeek = Math.ceil((diffWorkout / oneDay) / 7)
        if (lastWeek === workoutWeek) {
          lastWeekWorkouts.push(workout.steps)
        }
      })
      return lastWeekWorkouts.reduce((a, b) => a + b, 0) / lastWeekWorkouts.length
    },
    filterUsers (filter) {
      this.usersParse = this.usersParse.sort(function (a, b) {
        return b[filter] - a[filter]
      })
    }
  },
  async created () {
    const users = await api.getAllUsers()
    this.users = users.results
    this.users.forEach(user => {
      this.parseUser(user).then(this.loading = false)
    })
  }
}
</script>
