<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="btn">

    <router-link v-bind:to="{ name: 'Posts' }" class="">Go to the Post page</router-link>
    <router-link v-bind:to="{ name: 'ToDo' }" class="">Go to the ToDo list page</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'This is your homepage of Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn {
  display: flex;
  flex-direction: column;
}
</style>
