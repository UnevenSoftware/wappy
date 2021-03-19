onmessage = async function (e) {
  try {
    const stats = await heavyStats(e.data);
    postMessage(["SUCCESS", stats]);
  } catch (e2) {
    postMessage(["ERROR", e2]);
  }
}

const loadStopWords = async () => {
  const res = await fetch("https://raw.githubusercontent.com/stopwords-iso/stopwords-iso/master/stopwords-iso.json");
  const body = await res.json();
  const stopWordLists = Object.values(body);
  return stopWordLists.reduce((ret, list) => [...ret, ...list], []).join("|");
}

const normalizeTime = (time) => {
  const t = time.match(/(\d+)(?::(\d\d))?\s*([pP]?)/);
  if (t)
    return parseInt(t[1]) + (t[3] ? 12 : 0);
  return NaN;
}

const rangeBetweenDates = (startDate, stopDate) => {
  return (stopDate.getTime() - startDate.getTime()) / 1e3;
}

const getThresold = (matches) => {
  console.log("weee");
  let i = 0;
  const MIN = 60 * 60 * 1
    , MAX = 60 * 60 * 7;
  const diffs = [];
  const getDate = (index) => {
    const [_, date, time] = matches[index];
    return new Date(`${date} ${time}`);
  }
    ;
  while (i < matches.length - 2) {
    const diff = rangeBetweenDates(getDate(i), getDate(i + 1));
    if (diff > MIN && diff < MAX)
      diffs.push(diff);
    i++;
  }
  const n = diffs.length;
  const mean = diffs.reduce((a, b) => a + b) / n;
  const standardDeviation = Math.sqrt(diffs.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
  return standardDeviation || MIN;
}
const getMessageType = (message) => {
  if (message.match(/(.*?)\s(omitted|omessi)>?$/gm))
    return "media";
  if (message.match(/^(?=.*\bend-to-end\b)(?=.*\bWhatsApp\b).*$/gm))
    return "system";
  return "message";
}
const heavyStats = async (content) => {
  const re = /\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(.*?)\]?[-\]]\s(.*?):\s(.+[^\/]+\n)/gm;
  const matches = [...content.matchAll(re)];
  const userCounters = {};
  const incrementCounter = (user, prop, amount = 1) => {
    if (!userCounters[user])
      userCounters[user] = {};
    if (!userCounters[user][prop])
      userCounters[user][prop] = 0;
    userCounters[user][prop] += amount;
  }
    ;
  const hours = Array.from({
    length: 24
  }).reduce((map, value, i) => ({
    ...map,
    [i]: 0
  }), {});
  const wordsCount = {};
  const emojiCount = {};
  const stopWords = await loadStopWords();
  const countWords = (message) => {
    if (message.match(/<Media\s(.*?)>/gm))
      return void 0;
    const words2 = message.toLowerCase().split(" ").map((w) => w.trim()).filter((w) => w.length > 2);
    const emojis = message.match(/\p{Emoji_Presentation}/gu);
    emojis?.forEach((w) => {
      emojiCount[w] = (emojiCount[w] ?? 0) + 1;
    }
    );
    words2.forEach((w) => {
      if (stopWords.includes(w) || w.match(/\p{Emoji_Presentation}/gu))
        return void 0;
      wordsCount[w] = (wordsCount[w] ?? 0) + 1;
    }
    );
  }
    ;
  let lastMessage;
  const THRESHOLD = getThresold(matches);
  console.log("THRESHOLD", THRESHOLD / (60 * 60));
  for (const match of matches) {
    const [_, date, time, username, message] = match;
    switch (getMessageType(message)) {
      case "media":
        incrementCounter(username, "media");
        break;
      case "message":
        incrementCounter(username, "text");
        countWords(message);
        break;
      case "system":
      default:
        continue;
    }
    const t = normalizeTime(time);
    hours[t]++;
    const datetime = new Date([date, time].join(" "));
    if (!lastMessage) {
      incrementCounter(username, "startedConversations");
    } else {
      const differentPerson = lastMessage.username.toLowerCase() != username.toLowerCase();
      const diffTime = rangeBetweenDates(new Date(lastMessage.datetime), datetime);
      if (diffTime > THRESHOLD) {
        incrementCounter(username, "startedConversations");
      } else if (differentPerson) {
        incrementCounter(username, "gloabalResponseTime", diffTime);
        incrementCounter(username, "numberOfResponses");
      }
    }
    lastMessage = {
      username,
      datetime
    };
  }
  const users = Object.entries(userCounters).map((entry) => {
    const [username, counters] = entry;
    const { media, text, gloabalResponseTime, numberOfResponses, startedConversations = 0 } = counters;
    return {
      username,
      messagesCount: text,
      mediaCount: media,
      responseTime: (gloabalResponseTime / numberOfResponses).toFixed(),
      startedConversations
    };
  }
  );
  const words = Object.entries(wordsCount).sort(([wa, a], [wb, b]) => b - a).slice(0, 10).map(([word, count]) => ({
    word,
    count
  }));
  const emoji = Object.entries(emojiCount).sort(([wa, a], [wb, b]) => b - a).slice(0, 10).map(([word, count]) => ({
    word,
    count
  }));
  return {
    count: matches.length,
    messages: users.reduce((amount, el) => amount + (el.messagesCount || 0), 0),
    medias: users.reduce((amount, el) => amount + (el.mediaCount || 0), 0),
    users,
    hours,
    words,
    emoji
  };
}