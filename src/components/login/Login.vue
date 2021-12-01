<template>
  <div class="auth-content">
    <div class="auth-modal">
      <div class="logo"><strong>SYSCOW</strong></div>
      <hr>
      <div class="auth-title">Login</div>
      <form @submit.prevent="login">
        <input v-model="email" name="email" type="text" placeholder="E-mail">
        <input v-model="pass" name="password" type="password" placeholder="Senha">
        <b-button block type="submit" variant="primary">Acessar</b-button>
        <p v-if="error" class="error">Informação de login inválida</p>
        <p v-if="$route.query.redirect" class="error">
          Você precisa fazer o login primeiro.
        </p>
      </form>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth'
  
  export default {
    data () {
      return {
        user : {},
        email: '',
        pass: '',
        error: false,
      }
    },
    methods: {
      login () {
        auth.login(this.email, this.pass, loggedIn => {
          if (!loggedIn) {
            this.error = true
          } else {
            this.$router.replace(this.$route.query.redirect || '/home')
          }
        })
      }
    }
  }
</script>

<style>
  .error {
    color: red;
  }
  .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
  .auth-modal {
      background-color: #FFF;
      width: 350px;
      padding: 35px;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 20px;
      border:solid 2px;
      border-color: blue;
  }
  .auth-title {
      padding: 10px;
      font-size: 1.2rem;
      font-weight: 100;
      margin-top: 10px;
      margin-bottom: 15px;
  }
  .auth-modal input {
      border: 1px solid #BBB;
      width: 100%;
      margin-bottom: 15px;
      padding: 3px 8px;
      outline: none;
  }
  .auth-modal button {
      align-self: flex-end;
      background-color: #2460ae;
      color: #FFF;
      padding: 5px 15px;
  }
  .auth-modal a {
      margin-top: 35px;
  }
  .auth-modal p {
      margin-top: 20px;
      text-align: center;
  }
  .auth-modal hr {
      border: 0;
      width: 100%;
      height: 1px;
      background-image: linear-gradient(to right, 
          rgba(120, 120, 120, 0),
          rgba(120, 120, 120, 0.75),
          rgba(120, 120, 120, 0));
  }
  .logo {
    font-size: 50px;
    padding: 35px;
    color: blue;
  }
</style>
