<template>
  <div class="outside-circle-contaner">
    <div>
      <div class="button"></div>
      <div class="trapezoid"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.outside-circle-contaner {
  height: 300px;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  .button {
    position: relative;
    background: #e91e63;
    border-radius: 20px 20px 0 0;
    width: 200px;
    height: 50px;
    transform: perspective(50px) rotateX(20deg);
    // transform-origin: 50% 100%;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      background: #fff;
      position: absolute;
      left: -20px;
      bottom: 0;
      background: radial-gradient(
        circle at 0 0,
        transparent 20px,
        #e91e63 21px
      );
    }
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      right: -20px;
      bottom: 0;
      background: #000;
      background: radial-gradient(
        circle at 100% 0,
        transparent 20px,
        #e91e63 21px
      );
    }
  }
  .trapezoid {
    margin-top: 80px;
    position: relative;
    width: 200px;
    padding: 60px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: perspective(40px) scaleY(1.3) rotateX(5deg);
      transform-origin: bottom;
      background: deeppink;
    }
  }
}
</style>
