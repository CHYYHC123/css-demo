import { useTransition, TransitionPresets } from "@vueuse/core";

/**
 * 数字滚动 0 - 2000
 * @param {Number} startNum
 * @param {Number} Number
 */

// const amount = ref(0);
// const amountOutput = useTransition(amount, {
//   duration: duration,
//   transition: TransitionPresets.easeOutExpo,
// });
// amount.value = 2000;
// const amount = ref(0);
// export function numberScroll(startNum:Number = 0, Number:Number,duration:Number = 5000) {
//   const amountOutput = useTransition(startNum, {
//     duration: duration,
//     transition: TransitionPresets.easeOutExpo,
//   });
//   startNum = endNum
// }