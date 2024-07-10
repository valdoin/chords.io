<template>
  <div id="app">
    <h1>
      <img src="./assets/logo.png" alt="Logo" class="logo" />
      chords<span>.io</span>
    </h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #121212;
}

h1 {
  color: #FFFFFF;
  margin-top: 1em; 
  margin-bottom: 0.5em; 
  display: flex;
  align-items: center;
}

h1 img {
  margin-right: 0.5em;
}

span {
  color: #246A73;
}

.logo {
  height: 2em; 
  width: auto;
}
</style>
