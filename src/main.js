/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import router from './router'; // Import Vue Router instance
import store from './store'; // Import Vuex store

// Composables
import { createApp } from 'vue'

const app = createApp(App)

app.use(store); // Use Vuex store
app.use(router); // Use Vue Router

registerPlugins(app)

app.mount('#app')
