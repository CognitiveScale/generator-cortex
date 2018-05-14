
function main(args) {
    const payload = args.payload || {};
    const leftPad = require("left-pad");
    const text = payload.text || "(silence)";
    return { payload: { text: leftPad(text, 30, ".") } };
}

exports.main = main;
