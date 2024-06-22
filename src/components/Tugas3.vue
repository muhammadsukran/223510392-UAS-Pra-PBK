<template>
    <q-page>
      <div class="animated-text">
        BEBAS TUGAS
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'Tugas3'
  }
  </script>
  
  <style scoped>
  .animated-text {
    position: fixed;
    top: 30%;
    left: 40%;
    font-size: 3rem;
    text-align: center;
    animation: colorPulse 2s infinite;
  }
  
  @keyframes colorPulse {
    0% { color: red; }
    50% { color: blue; }
    100% { color: green; }
  }
  </style>
  