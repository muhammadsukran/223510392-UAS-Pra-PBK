<template>
  <q-page>
    <q-toolbar>
      <q-btn
        flat
        label="Cari"
        @click="showInput = true; showHistory = false"
        :class="{ 'active': showInput }"
        style="background-color: wheat;"
      />
      <q-btn
        flat
        label="History"
        @click="showHistory = true; showInput = false"
        :class="{ 'active': showHistory }"
        style="background-color: wheat;"
      />
    </q-toolbar>

    <q-card v-if="showInput" class="input-card">
      <q-card-section class="no-border-top inputan">
        <q-input v-model="location" label="Masukkan Nama Daerah" />
        <q-btn @click="getWeather" label="Cari" style="margin-top: 2px; background-color: skyblue;" />
      </q-card-section>
      <div class="custom-shape-divider-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
    </q-card>

    <q-card v-if="showHistory" class="history-title-card">
      <q-card-section class="no-border-top">
        <h2 class="text-center">Histori</h2>
      </q-card-section>
      <div class="custom-shape-divider-bottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
        </svg>
      </div>
    </q-card>

    <div v-if="showHistory" class="history-list">
      <q-card v-for="(item, index) in history" :key="index" class="history-card">
        <q-card-section>
          <div class="history-item">
            <div>Lokasi: {{ item.location }}</div>
            <div>Waktu: {{ item.time }}</div>
            <div>Suhu: {{ item.temperature }}°C</div>
            <div>Cuaca: {{ item.weather }}</div>
          </div>
          <q-btn @click="deleteHistory(index)" label="Delete" class="delete-btn" text-color="white" />
        </q-card-section>
      </q-card>
    </div>

    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="svg">
      <path fill="#0F62FE" d="M29.9,-53C36.9,-47.7,39.6,-36.1,42,-26.2C44.3,-16.3,46.4,-8.1,46,-0.2C45.7,7.8,43,15.5,40.2,24.6C37.4,33.7,34.5,44.1,27.7,53.6C21,63.2,10.5,71.8,-2.5,76.1C-15.5,80.5,-31.1,80.6,-36.6,70.4C-42.1,60.1,-37.5,39.6,-44.8,26.1C-52.1,12.7,-71.2,6.4,-76.1,-2.8C-81,-12,-71.7,-24,-62.7,-34.5C-53.7,-44.9,-45,-53.9,-34.6,-57.3C-24.2,-60.7,-12.1,-58.6,-0.3,-58.1C11.4,-57.5,22.8,-58.4,29.9,-53Z" transform="translate(100 100)" />
    </svg>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="svg2">
      <path fill="#08BDBA" d="M21.8,-30C23.1,-20.5,15.5,-10.3,14.3,-1.2C13.1,7.9,18.3,15.7,17,27.7C15.7,39.6,7.9,55.7,-2.3,58C-12.4,60.3,-24.8,48.8,-37,36.8C-49.1,24.8,-61,12.4,-55.7,5.3C-50.4,-1.9,-28,-3.7,-15.9,-13.2C-3.7,-22.6,-1.9,-39.7,4.2,-43.9C10.3,-48.1,20.5,-39.4,21.8,-30Z" transform="translate(100 100)" />
    </svg>
  </q-page>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      location: '',
      showInput: true,
      showHistory: false,
      history: JSON.parse(localStorage.getItem('weatherHistory')) || []
    }
  },
  methods: {
    async getWeather() {
      const apiKey = 'e6cdf6e8e4191928c1ca1dce33282002'
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.location}&appid=${apiKey}&units=metric`
      try {
        const response = await axios.get(url)
        const data = response.data
        const weatherInfo = {
          location: data.name,
          time: new Date(new Date().getTime() + data.timezone * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temperature: data.main.temp,
          weather: data.weather[0].description
        }

        Swal.fire({
          title: 'Cuaca',
          html: `
            <div>Lokasi: ${weatherInfo.location}</div>
            <div>Waktu: ${weatherInfo.time}</div>
            <div>Suhu: ${weatherInfo.temperature}°C</div>
            <div>Cuaca: ${weatherInfo.weather}</div>
          `,
          showCancelButton: true,
          confirmButtonText: 'Simpan',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            this.history.push(weatherInfo)
            localStorage.setItem('weatherHistory', JSON.stringify(this.history))
            Swal.fire('Tersimpan!', '', 'success')
          }
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Gagal mendapatkan data cuaca. Silakan coba lagi.',
        })
        console.error(error)
      }
    },
    deleteHistory(index) {
      Swal.fire({
        title: 'Hapus Histori',
        text: 'Apakah Anda yakin ingin menghapus histori ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          this.history.splice(index, 1)
          localStorage.setItem('weatherHistory', JSON.stringify(this.history))
          Swal.fire('Terhapus!', '', 'success')
        }
      })
    }
  }
}
</script>

<style scoped>
.svg{
  position: fixed;
  width: 50%;
  top: -40%;
  left: 70%;
  z-index: -1;
}
.svg2{
  position: fixed;
  width: 50%;
  top: 18%;
  left: -10%;
  z-index: -1;
}
.q-toolbar {
  justify-content: center;
  position: fixed;
  top: 10%;
  width: 100%;
  z-index: 1000;
  left: -1%;
}

.q-btn{
  width: 100px;
  margin-left: 10px;
}

.q-btn.active {
  color: white;
  background-color: #4CAF50; 
}

.input-card, .history-title-card {
  max-width: 400px;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.input-card {
  position: fixed;
  width: 30%;
  height: 25%;
  top: 30%;
  left: 36%;
}
.inputan {
  margin-top: 30px;
}

.history-title-card {
  position: fixed;
  width: 30%;
  height: 25%;
  top: 20%;
  left: 36%;
  color: white;
  text-shadow: 0 0 10px black;
}

.history-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15%;
  padding-top: 80px; 
  position: fixed;
}

.history-card {
  width: 250px;
  margin: 10px;
  border-radius: 12px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.history-item {
  margin-bottom: 10px;
}

.delete-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 80px;
  background-color: red;
}

.text-center {
  text-align: center;
}

.custom-shape-divider-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: -1;
}

.custom-shape-divider-bottom svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
}

.custom-shape-divider-bottom .shape-fill {
  fill: rgb(83, 175, 232);
}

.no-border-top {
  border-top: none;
  border-color: white;
}
</style>
