import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import './EventBus.ts'

const app = createApp(App)


app.config.globalProperties.loggedIn = false; //{ loggedIn: false, data: null };
app.config.globalProperties.currUser = null;
app.config.globalProperties.error = null;

app.use(router)

app.mount('#app')
