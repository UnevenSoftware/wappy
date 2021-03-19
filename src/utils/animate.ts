import anime from 'animejs'
import { Ref } from 'vue'

const animeSlideUp = (ref) => {
  //ref.$el -> for custom components \\ ref -> for html elemntes
  const target = ref.__v_isRef ? ref.value : ref;
  // console.log("animate target:", ref);
  anime({
    targets: target.$el ?? target,
    duration: 1200 + (Math.random() * 200),
    keyframes: [
      {
        translateY: 100 + (Math.random() * 100),
        opacity: 0,
      }, {
        translateY: 0,
        opacity: 1
      }
    ],
  });
}

export { animeSlideUp }