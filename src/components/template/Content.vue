<template>
    <div id="content" :class="{'hide-menu': hide }">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'Content',
    computed: {
    hide () {
      return this.$route.path === '/login' || this.$route.path === '/'; 
    }
  }
}
</script>

<style>
    #content{

        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }

    #content.hide-menu {
        background-image: url("../../assets/background.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        
        grid-area: content;
        background-color: #efefef;
        padding: 20px;
    }
</style>