
function main(args) {
    const payload = args.payload || {};
    return { payload: <%= functionName %>(payload) };
}

function <%= functionName %>(payload) {
    const leftPad = require("left-pad")
    const text = payload.text || "(silence)";
    return { text: leftPad(text, 30, ".") };
}

exports.main = main;
