<template>
  <div class="fall-down-contaner">
    <div v-for="item in 20" :key="item"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$count: 31;
@function randomNum($max, $min: 0, $u: 1) {
  @return ($min + random($max)) * $u;
}
@function randomColor() {
  @return rgb(randomNum(255), randomNum(255), randomNum(255));
}
.fall-down-contaner {
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  background-color: #333;
  overflow: hidden;
  div {
    flex-shrink: 0;
    // height: 0px;
    border-radius: 30px;
    margin-bottom: 10px;
    opacity: 0;
  }
  @for $i from 1 to $count {
    div:nth-child(#{$i}) {
      width: #{randomNum(110, 90)}px;
      background: randomColor();
    }
  }
}
.fall-down-contaner:hover {
  div {
    opacity: 0;
  }
  @for $i from 1 to $count {
    div:nth-child(#{$i}) {
      animation: falldown
        0.3s
        cubic-bezier(0.44, 0.02, 0.65, 1.3)
        #{50 *
        ($count - $i) +
        (random(150) - random(300))}ms
        forwards;
    }
  }
}
@keyframes falldown {
  0% {
    transform: translateY(-180px) scaleX(0.1) scaleY(0.3);
    opacity: 1;
  }
  20% {
    transform: translateY(-200px) scaleX(0.6) scaleY(0.3);
  }
  75% {
    transform: translateY(0) scaleX(0.6) scaleY(0.3);
  }
  100% {
    transform: translateY(0) scaleX(1) scaleY(1);
    opacity: 1;
  }
}
</style>
