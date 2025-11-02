import './assets/main.css'

import { createApp, reactive } from 'vue'

import App from './App.vue'
import router from './router'

import axios from 'axios'
import { ref } from 'vue'

axios.defaults.validateStatus = status => true;

const app = createApp(App)


app.config.globalProperties.loggedIn = ref(false); //{ loggedIn: false, data: null };
app.config.globalProperties.currUser = ref(null);
app.config.globalProperties.error = ref(null);
app.config.globalProperties.showLogin = ref(false);
app.config.globalProperties.showSignup = ref(false);

app.use(router)

app.mount('#app')
