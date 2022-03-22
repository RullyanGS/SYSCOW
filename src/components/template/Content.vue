<template>
    <div id="content" :class="{'hide-menu': hide }">
        <router-view></router-view>
        <!--
        <div class="icon" @click="toggleMenu">
            <i class="fa fa-question-circle"></i>
        </div> 
        -->
    </div>
    
</template>

<script>

export default {
    name: 'Content',
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    },
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

    /*.icon {
        font-size: 40px;
        float: right;
        padding-right: 20px;
    }*/
</style>