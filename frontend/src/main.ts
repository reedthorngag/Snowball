import './assets/main.css'

import { createApp, reactive } from 'vue'

import App from './App.vue'
import router from './router'

import './EventBus.ts'

const app = createApp(App)


app.config.globalProperties.loggedIn = false; //{ loggedIn: false, data: null };
app.config.globalProperties.currUser = null;
app.config.globalProperties.error = null;
app.config.globalProperties.showLogin = false;

app.use(router)

app.mount('#app')
