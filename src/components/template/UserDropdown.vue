<template>
    <div class="user-dropdown">  
        <div class="user-button"> 
            <span class="d-none d-sm-block">{{ user.name }}</span>
            <div class="user-dropdown-img">
                <i class="fa fa-user"></i>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/">
                <a href @click.prevent="logout"> <i class="fa fa-sign-out"></i> Sair </a>
            </router-link>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'

export default {
    name: "UserDropdown",
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 10px;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img {
        margin: 0px 10px;
        font-size: 40px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 133px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover {
        text-decoration: none;
        color: #000;
        background-color: #EDEDED;
    }
</style>