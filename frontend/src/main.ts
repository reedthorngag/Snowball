import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.loggedIn = false; //{ loggedIn: false, data: null };
app.config.globalProperties.currUser = null;

app.use(createPinia())
app.use(router)

app.mount('#app')
