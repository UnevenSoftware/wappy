var e=Object.assign;onmessage=async function(e){try{const s=await n(e.data);postMessage(["SUCCESS",s])}catch(s){postMessage(["ERROR",s])}};const s=e=>{const s=e.match(/(\d+)(?::(\d\d))?\s*([pP]?)/);return s?parseInt(s[1])+(s[3]?12:0):NaN},t=(e,s)=>(s.getTime()-e.getTime())/1e3,o=e=>e.match(/(.*?)\s(omitted|omessi)>?$/gm)?"media":e.match(/^(?=.*\bend-to-end\b)(?=.*\bWhatsApp\b).*$/gm)?"system":"message",n=async n=>{const a=[...n.matchAll(/\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(.*?)\]?[-\]]\s(.*?):\s(.+[^\/]+\n)/gm)],r={},c=(e,s,t=1)=>{r[e]||(r[e]={}),r[e][s]||(r[e][s]=0),r[e][s]+=t},i=Array.from({length:24}).reduce(((s,t,o)=>e(e({},s),{[o]:0})),{}),m={},u={},d=await(async()=>{const e=await fetch("https://raw.githubusercontent.com/stopwords-iso/stopwords-iso/master/stopwords-iso.json"),s=await e.json();return Object.values(s).reduce(((e,s)=>[...e,...s]),[]).join("|")})(),l=e=>{if(e.match(/<Media\s(.*?)>/gm))return;const s=e.toLowerCase().split(" ").map((e=>e.trim())).filter((e=>e.length>2)),t=e.match(/\p{Emoji_Presentation}/gu);null==t||t.forEach((e=>{var s;u[e]=(null!=(s=u[e])?s:0)+1})),s.forEach((e=>{var s;d.includes(e)||e.match(/\p{Emoji_Presentation}/gu)||(m[e]=(null!=(s=m[e])?s:0)+1)}))};let g;const p=(e=>{console.log("weee");let s=0;const o=[],n=s=>{const[t,o,n]=e[s];return new Date(`${o} ${n}`)};for(;s<e.length-2;){const e=t(n(s),n(s+1));e>3600&&e<25200&&o.push(e),s++}const a=o.length,r=o.reduce(((e,s)=>e+s))/a;return Math.sqrt(o.map((e=>Math.pow(e-r,2))).reduce(((e,s)=>e+s))/a)||3600})(a);console.log("THRESHOLD",p/3600);for(const e of a){const[n,a,r,m,u]=e;switch(o(u)){case"media":c(m,"media");break;case"message":c(m,"text"),l(u);break;case"system":default:continue}i[s(r)]++;const d=new Date([a,r].join(" "));if(g){const e=g.username.toLowerCase()!=m.toLowerCase(),s=t(new Date(g.datetime),d);s>p?c(m,"startedConversations"):e&&(c(m,"gloabalResponseTime",s),c(m,"numberOfResponses"))}else c(m,"startedConversations");g={username:m,datetime:d}}const h=Object.entries(r).map((e=>{const[s,t]=e,{media:o,text:n,gloabalResponseTime:a,numberOfResponses:r,startedConversations:c=0}=t;return{username:s,messagesCount:n,mediaCount:o,responseTime:(a/r).toFixed(),startedConversations:c}})),w=Object.entries(m).sort((([e,s],[t,o])=>o-s)).slice(0,10).map((([e,s])=>({word:e,count:s}))),b=Object.entries(u).sort((([e,s],[t,o])=>o-s)).slice(0,10).map((([e,s])=>({word:e,count:s})));return{count:a.length,messages:h.reduce(((e,s)=>e+(s.messagesCount||0)),0),medias:h.reduce(((e,s)=>e+(s.mediaCount||0)),0),users:h,hours:i,words:w,emoji:b}};