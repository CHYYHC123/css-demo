<template>
  <div class="chessboard-contaner">
    <div class="g-grid"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.chessboard-contaner {
  height: 300px;
  // background: #d9deea;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .g-grid {
    width: 300px;
    height: 300px;
    // position: relative;
    // z-index: 1;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    outline: 1px solid #000;
    outline-offset: 5px;
    background: linear-gradient(#fff, #fff),
      repeating-linear-gradient(
        #000,
        #000 1px,
        transparent 1px,
        transparent calc(100% / 8)
      ),
      repeating-linear-gradient(
        90deg,
        #000,
        #000 1px,
        transparent 1px,
        transparent calc(100% / 8)
      );
    background-repeat: no-repeat;
    background-size: calc(100% - 2px) calc(100% / 4 - 1px), 100% 100%, 100% 100%;
    background-position: 1.5px calc(100% / 8 * 4), 0 0, 0 0;
  }
}
</style>
