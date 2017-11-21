<template>
  <div class="container">
    <h1 class="header">
      <router-link to="/" class="header__link">{{ title }}</router-link>
    </h1>

    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    computed: {
      title () {
        return this.$route.meta.title
      }
    }
  }
</script>

<style>
  body {
    color: #333;
    font-size: 16px;
    font-family: 'PT Serif', serif;
    margin: 0;
    width: 600px;
    -webkit-font-smoothing: antialiased;
  }

  a:active,
  a:link,
  a:visited {
    color: #2c63ff;
  }

  h1 {
    font-family: Lato, "Droid Serif", Ubuntu, Georgia, sans-serif;
  }

  .btn {
    background-color: #fbf3ce;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    cursor: pointer;
    display: inline-block;
    font-family: "DejaVu Sans", sans-serif;
    font-size: 1rem;
    margin-right: 0.5rem;
    padding: 0.5em 1em;
    text-decoration: none;
    -webkit-border-after: 3px solid #336699;
    -webkit-border-before: 1px solid #336699;
    -webkit-border-end: 3px solid #336699;
    -webkit-border-start: 1px solid #336699;
  }

  .btn:first-child {
    margin-left: 0.5rem;
  }

  .btn:active {
    -webkit-border-after-width: 1px;
    -webkit-border-before-width: 3px;
    -webkit-border-end-width: 1px;
    -webkit-border-start-width: 3px;
  }

  .btn:focus {
    outline: 0;
  }

  .btn:hover {
    background-color: transparent;
  }

  .btn--primary {
    font-weight: bold;
  }

  .btn--primary:hover {
    background-color: lightblue;
  }

  .btn-group {
    display: flex;
    align-items: center;
  }

  .btn-group--split {
    justify-content: space-between;
  }

  .btn-group a {
    display: flex;
    font-size: 1.3rem;
    font-weight: bold;
    justify-content: center;
  }

  .btn-group .btn {
    display: flex;
  }

  .container {
    background-color: #ffeea4;
    padding: 1rem 2.5rem 1rem 2.5rem;
    margin-left: auto;
    margin-right: auto;
  }

  .header {
    display: flex;
    font-size: 1.6em;
    justify-content: center;
    margin: 0 0 0.5rem 0;
  }

  .header__link {
    background: url("/static/img/logo.png") no-repeat;
    align-items: center;
    display: flex;
    font-weight: unset;
    height: 53px; /* The same height as the logo */
    margin: 0;
    padding-left: 90px; /* Width of the logo + 10px */
    text-decoration: unset;
  }

  a.header__link { /* Specify the anchor tag to override default anchor styling above. */
    color: unset;
  }
</style>
