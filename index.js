const AudioContext = require("web-audio-api").AudioContext;
const audioMetaData = require('audio-metadata')
const MusicTempo = require("music-tempo");
const fs = require("fs");

const calcTempo = function (buffer) {
    const audioData = [];
    // Take the average of the two channels
    if (buffer.numberOfChannels == 2) {
        const channel1Data = buffer.getChannelData(0);
        const channel2Data = buffer.getChannelData(1);
        const length = channel1Data.length;
        for (let i = 0; i < length; i++) {
            audioData.push((channel1Data[i] + channel2Data[i]) / 2);
        }
    } else {
        audioData = buffer.getChannelData(0);
    }
    const mt = new MusicTempo(audioData);
    console.log("Tempo", mt.tempo);
}

var data = fs.readFileSync("songname.mp3");

const context = new AudioContext();
var metadata = audioMetaData.id3v2(data);
console.log(metadata);
context.decodeAudioData(data, calcTempo);