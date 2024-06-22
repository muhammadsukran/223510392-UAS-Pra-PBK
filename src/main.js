import 'quasar/src/css/index.sass'
import { createApp } from 'vue'
import { Quasar } from 'quasar'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const app = createApp(App)

app.use(Quasar)
app.use(router)
app.config.globalProperties.$axios = axios

app.mount('#app')
