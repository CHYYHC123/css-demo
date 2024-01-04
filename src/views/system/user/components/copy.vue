<template>
  <div>
    <button @click="drawer = !drawer">显示弹窗</button>
    <el-drawer
      v-model="drawer"
      title="复制文本"
      :direction="direction"
      :before-close="handleClose"
      :append-to-body="false"
    >
      <button @click="copy(source)">复制内容到此处</button>
      <input type="text" name="" id="" />
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="copy">
import { Ref, ref } from "vue";
const drawer: Ref<boolean> = ref(false);
import { useClipboard } from "@vueuse/core";

const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });
const direction = ref("btt");
const handleClose = () => {};
</script>

<style scoped></style>
