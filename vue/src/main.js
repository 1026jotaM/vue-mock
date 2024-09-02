import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

const app = createApp(App);

axios.defaults.baseURL = 'http://127.0.0.1:8082';
axios.defaults.headers.common['api-key'] = "$2y$10$6R793P5zDmQHq/4MampMTOR56Rzt5qwzicfRz3DjT5DIADtsUqID6";

app.use(router)
app.mount('#app')
