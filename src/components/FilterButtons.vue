<template>
  <div>
    <div class="form-check form-check-inline">
      <h5>Filter By:</h5>
    </div>
    <div class="form-check form-check-inline">
      <input @click="filterUsers('avg_steps')" class="form-check-input" type="radio" name="inlineRadioOptions" checked="" id="inlineRadio1">
      <label class="form-check-label" for="inlineRadio1">Avg Steps</label>
    </div>
    <div class="form-check form-check-inline">
      <input @click="filterUsers('avg_last_month')" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2">
      <label class="form-check-label" for="inlineRadio2">Last Month Steps</label>
    </div>
    <div class="form-check form-check-inline">
      <input @click="filterUsers('avg_last_week')" class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3">
      <label class="form-check-label" for="inlineRadio3">Last Week Steps</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterButtons',
  data () {
    return {
    }
  },
  methods: {
    filterUsers (filter) {
      this.$emit('filterUsers', filter)
    }
  }
}
</script>

<style scoped>
</style>
