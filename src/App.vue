<template>
  <div id="app">
    <NavBar class="nav-main"/>
    <transition name="page">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import router from './router';
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: { router, NavBar }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-main{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  z-index: 1;
}
.page-enter-active, .page-leave-active {
  transition: all .2s ease;
  opacity: 0;
  transform: translate(0, -5%);
}
</style>
