<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <img src="./assets/logo.png">
    <a href="https://meiriyiwen.com/" class="officialLink">个人学习用，更多请点此访问每日一文</a>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img {
  position: fixed;
  top: 1rem;
  left: 1rem;
  height: 1rem;
  transform: translate(-50%,-50%);
}
.officialLink {
  font-size: 0.7rem;
  color: #2c3e50;
  text-decoration: none;
}
.fade-enter-active, .fade-leave-active {
transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
