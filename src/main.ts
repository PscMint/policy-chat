import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupAssets, setupScrollbarStyle } from './plugins'
import { setupStore } from './store'
import { setupRouter } from './router'
import { mockXHR } from "./mock";

async function bootstrap() {
  const app = createApp(App)
  //判断当前的环境，启动mock拦截器或者api
  if(process.env.NODE_ENV=="mock"){
    mockXHR();
  }
  setupAssets()

  setupScrollbarStyle()

  setupStore(app)

  setupI18n(app)

  await setupRouter(app)


  app.mount('#app')
}

bootstrap()
