<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat @click="$router.push('/')" label="Widget" />
          <q-btn flat @click="$router.push('/portocv')" label="PortoCv" />
          <q-btn flat @click="$router.push('/tugas2')" label="Tugas 2" />
          <q-btn flat @click="$router.push('/tugas3')" label="Tugas 3" />
          <q-btn flat @click="$router.push('/tugas4')" label="Tugas 4" />
          <q-btn flat @click="$router.push('/tugas5')" label="Tugas 5" />
          <q-btn flat @click="$router.push('/tugas6')" label="Tugas 6" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App'
}
</script>
