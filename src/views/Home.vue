<template>
  <div class="home">
    <div  class="d-flex flex-wrap mx-auto">
      <HelloWorld v-for="user in users" :key="user._id" :user="user" />
    </div>
    {{users}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import api from '../services/Api'

export default {
  name: 'Home',
  data () {
    return {
      users: []
    }
  },
  components: {
    HelloWorld
  },
  async created () {
    console.log('hola')
    const users = await api.getAllUsers()
    console.log(users)
    this.users = users.results
  }
}
</script>
