<script lang="ts">
import { defineComponent } from 'vue';
import Layout from './components/layout/Layout.vue';


export default defineComponent({
  setup() {
    const selectedKey = ["1"];
    return { selectedKey };
  },
  components: { Layout }
})

</script>

<template>
  <Layout />
  <RouterView :key="$route.path" />
</template>
