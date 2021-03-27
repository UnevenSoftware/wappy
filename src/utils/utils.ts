import { isDark } from './dark'
import html2canvas from 'html2canvas';
import { Ref } from 'vue-demi';

/**
 * Given a string calculates a random color in HSL format, 
 * also checks if current theme is dark adjusting light of the color
 * @param str 
 * @returns 
 */
const stringToHSL = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return hash.toString(); // Todo: .toString() => not sure
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return `hsl(${hash % 360}, 100%, ${isDark.value ? 50 + Math.random() * 50 : 25 + Math.random() * 35}%)`;
}

/**
 * Given an amount of seconds, returns the full time in string with format hh:mm:ss
 * @param s
 * @returns Time in string es:08:12:34  
 */
const formatTime = (s: number): string => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s - (hours * 3600)) / 60);
  const seconds = s - (hours * 3600) - (minutes * 60);
  let res = ''

  if (hours > 0) res += `${hours}h`
  if (minutes > 0) res += `${minutes}min`

  if (!res) res = `${seconds}sec`

  return res

  // return (((hours < 10) ? "0" + hours : hours) + ':' + 
  //   ((minutes < 10) ? "0" + minutes : minutes) + ':' + 
  //   ((seconds < 10) ? "0" + seconds : seconds));
}

/**
 * Given the max value and the current value, return the percentage of the value
 * @param max
 * @param value
 * @returns percentage of value based on max
 */
const getPercentage = (max: number, value: number): string => {
  return value > 0 ? ((value / max) * 100).toFixed(2) : '0'
}

/**
 * @returns A Random profile emoji
 */
const getProfileEmoji = (): any => {
  const emojis = "😀,😃,😄,😁,😆,😅,😂,🤣,😊,😇,🙂,🙃,😉,😌,🥰,😘,😗,😙,😚,😋,😛,😝,😜,🤪,🤨,🧐,🤓,😎,🤩,🥳,😏,😒,😞,😔,😟,😕,😣,😖,😫,😩,🥺,😢,😭,😤,😠,😳,😱,😨,😰,😥,😓,🤗,🤔,🤭,🤫,🤥,😐,😑,😬,🙄,😯,😧,😮,😲,🥱,😴,🤤,😪,😵,🤐,🥴"
    .split(',');
  return emojis[Math.floor(Math.random() * (emojis.length - 1))];
}

/**
 * given an html element ref returns a screenshot of the container
 * @param ref 
 * @returns Image / screenshot of the div
 */
const containerScreenShot = async (ref:HTMLElement) => {
  let options = {
    backgroundColor: "rgba(0, 0, 0, 0)",
    scrollX: 0,
    scrollY: -window.scrollY,
    onclone: function(document: any){
        document.getElementById(ref.id).classList.remove('invisible');
        document.getElementById(ref.id).classList.add('visible');
    }
  }
  let canvas = await html2canvas(ref, options);
  return canvas.toDataURL();
}

const downloadImage = (img) => {
  let link = document.createElement('a');
  link.href = img;
  link.download = 'Download.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export { stringToHSL, formatTime, getPercentage, getProfileEmoji, containerScreenShot, downloadImage };