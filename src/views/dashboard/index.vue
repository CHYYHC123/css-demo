<template>
  <div class="canvas-container">
    <ul>
      <li><Jellyfish></Jellyfish></li>
      <li><NightDayToggle></NightDayToggle></li>
      <li><FallDown></FallDown></li>
      <li><Chessboard></Chessboard></li>
      <li><OutsideCircle></OutsideCircle></li>
      <li><GlitchArt></GlitchArt></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import Jellyfish from "./components/jellyfish.vue";
import NightDayToggle from "./components/nightDayToggle.vue";
import FallDown from "./components/fallDown.vue";
import Chessboard from "./components/chessboard.vue";
import OutsideCircle from "./components/outsideCircle.vue";
import GlitchArt from "./components/glitchArt.vue";
</script>

<style lang="scss" scoped>
.canvas-container {
  position: relative;
  padding: 24px;
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    li {
      margin: 0 10px;
      height: 300px;
      margin-bottom: 20px;
    }
  }
}
</style>
