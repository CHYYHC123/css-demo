<template>
  <div class="jellyfish-contaner"></div>
</template>

<script setup lang="ts" name="jellyfish">
interface InitDAta {
  arms: Array<any>;
  armsPop: number;
  ctx: any;
  width: number;
  height: number;
  stepCount: number;
  hasUserClicked: boolean;
  xC: number;
  yC: number;
  target: any;
  gravity: number;
  springStiffness: number;
  viscosity: number;
  isElastic: boolean;
}
const initData: InitDAta = reactive({
  arms: [],
  armsPop: 20,
  ctx: "",
  width: 0,
  height: 0,
  stepCount: 0,
  hasUserClicked: false,
  xC: 0,
  yC: 0,
  target: {},
  gravity: -1,
  springStiffness: 0.5,
  viscosity: 0.1,
  isElastic: false,
});

onMounted(() => {
  initCanvas();
  initFrame();
  nextTick(() => {
    handleClick();
  });
});

const handleClick = () => {
  const canvasEle = document.querySelector("canvas#ourCanvas");
  canvasEle?.addEventListener("click", () => {
    initData.hasUserClicked = !initData.hasUserClicked;
  });
  canvasEle?.addEventListener("mousemove", (event: any) => {
    initData.target.x = event.pageX;
    initData.target.y = event.pageY;
  });
};

const initCanvas = () => {
  // 获取展示容器
  const jellyfishContaner: Element = document.querySelector(
    ".jellyfish-contaner"
  )!;
  // 创建 canvas
  var canvas = document.createElement("canvas");
  canvas.width = jellyfishContaner.clientWidth;
  canvas.height = jellyfishContaner.clientHeight;
  canvas.id = "ourCanvas";
  jellyfishContaner.appendChild(canvas);

  initData.ctx = canvas.getContext("2d");
  initData.width = canvas.width;
  initData.height = canvas.height;

  initData.xC = canvas.width / 2;
  initData.yC = canvas.height / 2;

  initData.target = {
    x: initData.xC,
    y: initData.yC,
    radius: 20,
  };

  for (var i = 0; i < initData.armsPop; i++) {
    initData.arms.push([]);
  }

  // 初始化
  initialBirth();
};

// 初始化粒子
const initialBirth = () => {
  for (var armIndex = 0; armIndex < initData.arms.length; armIndex++) {
    let particlesNb = 20 + Math.ceil(20 * Math.random());
    let arm = initData.arms[armIndex];
    for (var i = 0; i < particlesNb; i++) {
      var x = initData.width * Math.random();
      var y = initData.height * Math.random();
      let particle = {
        x: x,
        y: y,
        xLast: x,
        yLast: y,
        xSpeed: 0,
        ySpeed: 0,
        stickLength: 10,
        name: "seed" + initData.stepCount,
      };
      arm.push(particle);
    }
  }
  // console.log("initData.arms", JSON.stringify(initData.arms));
};

// 初始化框架
const initFrame = () => {
  update();
  window.requestAnimationFrame(initFrame);
};

//
const update = () => {
  evolve();
  move();
  draw();
};
const evolve = () => {
  initData.stepCount++;
  initData.target.radius = 50 + 30 * Math.sin(initData.stepCount / 10);
};
const move = () => {
  // 初始化粒子产生的点
  if (!initData.hasUserClicked) {
    initData.target.x = initData.xC + 150 * Math.cos(initData.stepCount / 50);
    initData.target.y = initData.yC + 150 * Math.sin(initData.stepCount / 20);
  }

  for (var armIndex = 0; armIndex < initData.arms.length; armIndex++) {
    var arm = initData.arms[armIndex];
    // console.log("arm", JSON.stringify(arm));
    var ownTargetAngle = (2 * Math.PI * armIndex) / initData.arms.length;
    var ownTarget = {
      x: initData.target.x + initData.target.radius * Math.cos(ownTargetAngle),
      y: initData.target.y + initData.target.radius * Math.sin(ownTargetAngle),
    };
    for (var i = 0; i < arm.length; i++) {
      var p = arm[i];
      // Leading particle (particle bound to head at first, then the preceding particle)
      var pLead = i == 0 ? ownTarget : arm[i - 1];
      var angle = segmentAngleRad(p.x, p.y, pLead.x, pLead.y, false);
      var dist = Math.sqrt(
        Math.pow(p.x - pLead.x, 2) + Math.pow(p.y - pLead.y, 2)
      );
      var translationDist = dist - p.stickLength;
      if (translationDist < 0) {
        angle += Math.PI;
        translationDist = Math.abs(translationDist);
      }
      /* Kinetic binding */
      // Rotation, then translation for each particle/stick from head to tail
      var dx = translationDist * Math.cos(angle);
      var dy = translationDist * Math.sin(angle);
      if (!initData.isElastic) {
        p.x += dx;
        p.y -= dy;
      }
      /* Forces */
      var xAcc = initData.springStiffness * dx - initData.viscosity * p.xSpeed;
      var yAcc =
        initData.springStiffness * dy +
        initData.gravity -
        initData.viscosity * p.ySpeed;
      p.xSpeed += xAcc;
      p.ySpeed += yAcc;
      p.x += 0.1 * p.xSpeed;
      p.y -= 0.1 * p.ySpeed;
    }
  }
};

const draw = () => {
  // Add transparent layer for trace effect
  initData.ctx.beginPath();
  initData.ctx.rect(0, 0, initData.width, initData.height);
  initData.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  initData.ctx.fill();

  // Draw target
  initData.ctx.beginPath();
  initData.ctx.arc(
    initData.target.x,
    initData.target.y,
    15,
    0,
    2 * Math.PI,
    false
  );
  initData.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  initData.ctx.fill();

  // Draw particles
  for (var armIndex = 0; armIndex < initData.arms.length; armIndex++) {
    var arm = initData.arms[armIndex];
    for (var i = 0; i < arm.length; i++) {
      var particle = arm[i];
      if (i != 0) {
        var particleLead = arm[i - 1];
      }

      // Draw particle
      initData.ctx.beginPath();
      initData.ctx.arc(
        particle.x,
        particle.y,
        0.3 * (arm.length - i),
        0,
        2 * Math.PI,
        false
      );
      initData.ctx.strokeStyle = "hsla(" + (200 + i * 4) + ", 90%, 50%, 0.7)";
      initData.ctx.stroke();
      // Draw its stick
      initData.ctx.beginPath();
      initData.ctx.lineWidth = 1;
      initData.ctx.strokeStyle = "hsla(" + (180 + i * 4) + ", 80%, 50%, 0.7)";
      if (i == 0) initData.ctx.moveTo(initData.target.x, initData.target.y);
      else initData.ctx.moveTo(particleLead.x, particleLead.y);
      initData.ctx.lineTo(particle.x, particle.y);
      initData.ctx.stroke();
    }
  }
};

const segmentAngleRad = (
  Xstart: number,
  Ystart: number,
  Xtarget: number,
  Ytarget: number,
  realOrWeb: boolean
) => {
  let result: number = 0; // Will range between 0 and 2PI
  if (Xstart == Xtarget) {
    if (Ystart == Ytarget) {
      result = 0;
    } else if (Ystart < Ytarget) {
      result = Math.PI / 2;
    } else if (Ystart > Ytarget) {
      result = (3 * Math.PI) / 2;
    } else {
    }
  } else if (Xstart < Xtarget) {
    result = Math.atan((Ytarget - Ystart) / (Xtarget - Xstart));
  } else if (Xstart > Xtarget) {
    result = Math.PI + Math.atan((Ytarget - Ystart) / (Xtarget - Xstart));
  }

  result = (result + 2 * Math.PI) % (2 * Math.PI);

  if (!realOrWeb) {
    result = 2 * Math.PI - result;
  }

  return result;
};
</script>

<style lang="scss" scoped>
.jellyfish-contaner {
  background: #333;
  margin: 0;
  overflow: hidden;
  height: 300px;
  canvas {
    background: red;
  }
}
</style>
