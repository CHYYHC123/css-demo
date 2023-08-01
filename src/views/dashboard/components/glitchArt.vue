<template>
  <div class="glitch-art-contaner"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$img: "@/assets/image/sea.jpeg";
.glitch-art-contaner {
  width: 100%;
  height: 300px;
  background: url($img), #0ff;
  background-blend-mode: lighten;
  &::after {
    content: "";
    position: absolute;
    margin-left: 10px;
    width: 100%;
    height: 300px;
    background: url($img), #f00;
    background-blend-mode: lighten;
    mix-blend-mode: darken;
  }
}
</style>
