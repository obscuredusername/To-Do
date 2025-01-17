import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia())

registerPlugins(app)

app.mount('#app')
