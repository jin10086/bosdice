<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #130a4a;
}
* {
  margin: 0;
  padding: 0;
  user-select: none;
  outline: none;
  border: none;
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
}
</style>
