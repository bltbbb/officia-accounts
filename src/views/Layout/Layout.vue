<template>
    <div class="app-wrapper">
      <headbar></headbar>
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
      </div>
    </div>
</template>

<script>
    import { Navbar, Sidebar, AppMain,Headbar } from './components'
    export default {
      name: 'layout',
      components: {
        Headbar,
        Navbar,
        Sidebar,
        AppMain,
      },
      mounted(){
        console.log(this.$route)
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
