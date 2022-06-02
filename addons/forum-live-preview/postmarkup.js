// The worst bbcode parser ever™
const CDN_URL = "https://cdn.scratch.mit.edu";

// tags & friends
const tags = {
    "b": "<b>{text}</b>",
    "u": "<u>{text}</u>",
    "i": "<i>{text}</i>",
    "color": "<span style=\"color:{arg};\">{text}</span>",
    "url": "<a href=\"{arg}\">{text}</a>",
    "img": "<img src=\"{arg}\" alt=\"\" />",
};
const emojis = {
    ":)": "smile",
    "=)": "smile",
    ":(": "sad",
    "=(": "sad",
    ":o": "yikes",
    ":/": "hmm",
    ":lol:": "lol",
    ":rolleyes:": "roll",
    ":|": "neutral",
    "=|": "neutral",
    ":P": "tongue",
    ":mad:": "mad",
    ":cool:": "cool"
};


// my javascript hand sanitizer, i could make a business out of this /j
const sanitize = (str) => {
    const div = document.createElement("div");
    div.innerText = str;

    return div.innerHTML; // safe html
}

/**
 * Parse Scratch-flavored BBCode into HTML
 * @param {string} bbcode The bbcode to parse into HTML5
 */
export function html(bbcode) {
    // apply sanitizer
    bbcode = sanitize(bbcode);

    for (const tag of Object.keys(tags)) {
        const regex = new RegExp(`\\[${tag}(?:=([^\\]]+))?\\]([^\\[]*)\\[\\/${tag}\\]`);
        bbcode = bbcode.replace(regex, (match, arg, text) => {
            return tags[tag].replace("{arg}", arg || text).replace("{text}", text);
        });
    }

    for (const emoji of Object.keys(emojis)) {
        if (bbcode.indexOf(emoji) !== -1) {
            const regex = new RegExp(emoji.replace(/(\)|\()/, "\\$0"));
            bbcode = bbcode.replace(regex, (match) => {
                return `<img src="${CDN_URL}/scratchr2/static/djangobb_forum/img/smilies/${emojis[match]}.png" alt="" />`;
            });
        }
    }

    console.log(bbcode);

    return bbcode;
}