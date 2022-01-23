<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <img src="https://uploads-ssl.webflow.com/5d8a317520d8ba54fcd1dfeb/5fd0c5020a7e8635c21b9ad5_EM__logo__wordmark--light.svg" alt="" height="50" class="d-inline-block align-text-top" @click="home">
            <button type="button" class="btn btn-outline-secondary" @click="home">
                <img src="@/assets/img/house-door.svg" width="25" height="25" alt="Home">
            </button>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  methods: {
    home () {
      this.$router.push({ name: 'Ranking' })
    }
  }
}
</script>
