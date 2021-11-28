<template>
  <div id="app" :class="{'hide-menu': hide }">
    <Header title="SYSCOW" v-if="!hide "/>
    <Menu v-if="!hide " />
    <Content />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"

export default {
  name: "App",
  components: { Header, Menu, Content, Footer},
  computed: {
    hide () {
      return this.$route.path === '/login' || this.$route.path === '/'; 
    }
  }
}
</script>

<style>
  * {
    font-family: "Lato", sans-serif;
  }

  body {
    margin: 0;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: grid;
    grid-template-rows: 60px 1fr 40px;
    grid-template-columns: 300px 1fr;
    grid-template-areas: 
      "header header"
      "menu content"
      "menu footer";
  }

  #app.hide-menu {
    background-image: url("assets/background.png");
    
    grid-template-areas: 
      "content content"
      "content content"
      "footer footer";
  }
</style>
