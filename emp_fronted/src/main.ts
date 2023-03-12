import { createApp, provide, h, markRaw, watch } from "vue";
import { createPinia } from "pinia";
import { DefaultApolloClient ,provideApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import router from "./router";
import { apolloClient } from "./config/ApolloClient.Config";
import 'ant-design-vue/dist/antd.css';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient),
    provideApolloClient(apolloClient)
  },
  render: () => h(App),
});
app.use(router);

const pinia = createPinia()
pinia.use(({ store }) => {
    store.$router = markRaw(router)
  });
app.use(pinia);

app.mount("#app");
