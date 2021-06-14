import { createApp } from 'vue'
import { pinia } from './stores'
import App from './App.vue'

const app = createApp(App).use(pinia)

app.mount('#app')
