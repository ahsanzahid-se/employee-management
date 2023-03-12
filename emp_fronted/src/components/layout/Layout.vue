<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    setup() {

        const selectedKey = ['1']
        return { selectedKey };
    }
})

</script>

<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
            <a-menu v-model:selectedKeys="selectedKey" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
                <a-menu-item @click="() => $router.push('/')" key="1">Home</a-menu-item>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ padding: '0 50px', marginTop: '68px' }">
        </a-layout-content>
    </a-layout>
</template>
