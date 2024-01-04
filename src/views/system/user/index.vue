<template>
  <div class="app-container">
    <ul>
      <li>
        <Copy></Copy>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import Copy from "./components/copy.vue";
import { useClipboard } from "@vueuse/core";
const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });
</script>
<style lang="scss" scoped>
.app-container {
  position: relative;
  padding: 24px;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    li {
      margin: 0 10px;
      height: 300px;
      background: #333;
    }
  }
}
</style>
