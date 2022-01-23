<template>
  <div class="about">
    <div class="btn-toolbar m-3 center" role="toolbar" aria-label="Toolbar with button groups">
      <div class="row align-items-center">
        <span class="fw-bold">Chart Options: </span>
      </div>
      <div class="btn-group m-2" role="group" aria-label="First group">
        <button type="button" class="btn btn-outline-primary" v-for="(filter, idx) in visual" :key='idx' id="filter"
            @click="changeChart(filter)" :class="{active: defaultVisual===filter}"
            >
          {{filter}}
        </button>
      </div>
      <div class="row align-items-center">
        <span class="fw-bold">Info Options: </span>
      </div>
      <div class="btn-group m-2" role="group" aria-label="First group">
        <button ctype="button" class="btn btn-outline-primary" v-for="(filter, idx) in filters" :key='idx' id="filter"
            @click="changeFilter(filter)" :class="{active: filterBy===filter}"
            >
          {{filter}}
        </button>
      </div>
      <div class="row align-items-center">
        <span class="fw-bold">Year Options: </span>
      </div>
      <div class="btn-group m-2" role="group" aria-label="First group">
        <button ctype="button" class="btn btn-outline-primary" v-for="(year, idx) in years" :key='idx' id="year"
          @click="updateData(year)" :class="{active: selection===year}"
          >
        {{year}}
      </button>
      </div>
    </div>
    <div ref='chart' class='chart'>
    </div>
  </div>
</template>
<script>
import api from '../services/Api'
import ApexCharts from 'apexcharts/dist/apexcharts.js'

export default {
  name: 'UserView',
  data () {
    return {
      user: false,
      visual: ['Bar', 'Heatmap'],
      defaultVisual: 'Bar',
      chart: null,
      years: [2022, 2021],
      selection: 2022,
      stepsByWeeks: [],
      arrayOfWeeks: [],
      stepsByMonths: [],
      arrayOfMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      filters: ['By Months', 'By Weeks'],
      filterBy: 'By Months',
      options: {
        toolbar: {
          show: true
        },
        dataLabels: {
          enabled: false
        },
        chart: {
          type: 'bar',
          height: 350
        },
        series: [
          {
            name: 'Avg. steps',
            data: []
          }
        ],
        xaxis: {
          categories: []
        },
        yaxis: {
          labels: {
            offsetY: 0
          }
        },
        plotOptions: {
          heatmap: {
            colorScale: {
              ranges: [{
                from: 0,
                to: 2499,
                color: '#BCD2E8',
                name: 'low'
              },
              {
                from: 2500,
                to: 4999,
                color: '#91BAD6',
                name: 'low-medium'
              },
              {
                from: 5000,
                to: 7499,
                color: '#73A5C6',
                name: 'medium'
              },
              {
                from: 7500,
                to: 9999,
                color: '#528AAE',
                name: 'medium-high'
              },
              {
                from: 10000,
                to: 12499,
                color: '#2E5984',
                name: 'high'
              },
              {
                from: 12500,
                to: 99999,
                color: '#1E3F66',
                name: 'extreme'
              }
              ]
            }
          }
        }
      }
    }
  },
  methods: {
    parseWorkoutsByMonths () {
      if (this.stepsByMonths.length !== 0) {
        this.stepsByMonths.length = []
      }
      const workouts = this.user.workouts
      var stepsByMonths = {
      }
      for (var i = 0; i <= 11; i++) {
        stepsByMonths[i] = []
      }
      workouts.forEach(workout => {
        var workoutYear = new Date(workout.date).getFullYear()
        var workoutMonth = new Date(workout.date).getMonth()
        if (this.selection === workoutYear) {
          stepsByMonths[workoutMonth].push(workout.steps)
        }
      })
      for (var x = 0; x <= 11; x++) {
        var avgSteps = stepsByMonths[x].reduce((a, b) => a + b, 0) / stepsByMonths[x].length
        this.stepsByMonths.push(isNaN(Math.trunc(avgSteps)) ? 0 : Math.trunc(avgSteps))
      }
    },
    parseWorkoutsByWeeks () {
      this.stepsByWeeks = []
      this.arrayOfWeeks = []
      const workouts = this.user.workouts
      var date = (this.selection === 2022) ? '01/03/2022' : '01/04/2021'
      const startOfWeeks = new Date(date)
      const oneDay = 1000 * 60 * 60 * 24
      var stepsByWeeks = {
      }
      for (var i = 0; i <= 51; i++) {
        stepsByWeeks[i] = []
        this.arrayOfWeeks.push(i + 1)
      }
      workouts.forEach(workout => {
        var workoutYear = new Date(workout.date).getFullYear()
        var workoutDate = new Date(workout.date)
        if (this.selection === workoutYear) {
          const diffWorkout = workoutDate - startOfWeeks
          const workoutWeek = Math.ceil((diffWorkout / oneDay) / 7) - 1
          if (workoutWeek >= 0) {
            stepsByWeeks[workoutWeek].push(workout.steps)
          }
        }
      })
      for (var x = 0; x <= 51; x++) {
        var avgSteps = stepsByWeeks[x].reduce((a, b) => a + b, 0) / stepsByWeeks[x].length
        this.stepsByWeeks.push(isNaN(Math.trunc(avgSteps)) ? 0 : Math.trunc(avgSteps))
      }
    },
    updateData (year) {
      this.selection = year
      this.options.series[0].data = []
      this.parseWorkoutsByMonths()
      this.parseWorkoutsByWeeks()
      this.renderChart()
    },
    changeFilter (filter) {
      this.filterBy = filter
      this.options.xaxis.categories = this.arrayOfWeeks
      this.options.series[0].data = this.stepsByWeeks
      this.renderChart()
    },
    renderChart () {
      if (this.filterBy === 'By Months') {
        this.options.series[0].data = this.stepsByMonths
        this.options.xaxis.categories = this.arrayOfMonths
      } else {
        this.options.series[0].data = this.stepsByWeeks
        this.options.xaxis.categories = this.arrayOfWeeks
      }
      this.chart.updateOptions(this.options, true)
    },
    changeChart (filter) {
      this.defaultVisual = filter
      this.options.chart.type = filter.toLowerCase()
      this.options.yaxis[0].labels.offsetY = 0
      this.renderChart()
    }
  },
  props: {
    username: String
  },
  async created () {
    const users = await api.getAllUsers()
    const user = users.results.find(user => user.username === this.username)
    const userWorkouts = await api.getUser(this.username)
    user.workouts = userWorkouts.results
    this.user = user
    this.parseWorkoutsByMonths()
    this.parseWorkoutsByWeeks()
    this.options.series[0].data = this.stepsByMonths
    this.options.xaxis.categories = this.arrayOfMonths
    this.chart = new ApexCharts(this.$refs.chart, this.options)
    this.chart.render()
  }
}
</script>

<style>
.chart {
  width: 100%;
}
.active {
  color: white;
  background-color: #2e72f3;
}
.center {
  justify-content: center !important;
}
</style>
