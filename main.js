import 'regenerator-runtime/runtime'

const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

const phraseInput = document.querySelector('.js-input');
const speekersSelect = document.querySelector('.js-select');
const playBtn = document.querySelector('.js-play');

// voicerss SDK
"use strict"; var VoiceRSS = { speech: function (e) { this._validate(e), this._request(e) }, _validate: function (e) { if (!e) throw "The settings are undefined"; if (!e.key) throw "The API key is undefined"; if (!e.src) throw "The text is undefined"; if (!e.hl) throw "The language is undefined"; if (e.c && "auto" != e.c.toLowerCase()) { var a = !1; switch (e.c.toLowerCase()) { case "mp3": a = (new Audio).canPlayType("audio/mpeg").replace("no", ""); break; case "wav": a = (new Audio).canPlayType("audio/wav").replace("no", ""); break; case "aac": a = (new Audio).canPlayType("audio/aac").replace("no", ""); break; case "ogg": a = (new Audio).canPlayType("audio/ogg").replace("no", ""); break; case "caf": a = (new Audio).canPlayType("audio/x-caf").replace("no", "") }if (!a) throw "The browser does not support the audio codec " + e.c } }, _request: function (e) { var a = this._buildRequest(e), t = this._getXHR(); t.onreadystatechange = function () { if (4 == t.readyState && 200 == t.status) { if (0 == t.responseText.indexOf("ERROR")) throw t.responseText; audioPlayer.src = t.responseText; } }, t.open("POST", "https://api.voicerss.org/", !0), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), t.send(a) }, _buildRequest: function (e) { var a = e.c && "auto" != e.c.toLowerCase() ? e.c : this._detectCodec(); return "key=" + (e.key || "") + "&src=" + (e.src || "") + "&hl=" + (e.hl || "") + "&v=" + (e.v || "") + "&r=" + (e.r || "") + "&c=" + (a || "") + "&f=" + (e.f || "") + "&ssml=" + (e.ssml || "") + "&b64=true" }, _detectCodec: function () { var e = new Audio; return e.canPlayType("audio/mpeg").replace("no", "") ? "mp3" : e.canPlayType("audio/wav").replace("no", "") ? "wav" : e.canPlayType("audio/aac").replace("no", "") ? "aac" : e.canPlayType("audio/ogg").replace("no", "") ? "ogg" : e.canPlayType("audio/x-caf").replace("no", "") ? "caf" : "" }, _getXHR: function () { try { return new XMLHttpRequest } catch (e) { } try { return new ActiveXObject("Msxml3.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { } try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (e) { } try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { } throw "The browser does not support HTTP request" } };

const audioPlayer = document.querySelector('.js-audio');
const BASE_CONFIG = {
    key: 'af4304ba04804050b7acf50fb347c433',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
}

let USER_CONFIG = {
    src: 'Hello, world!',
    hl: 'en-us',
    v: 'Linda'
}

const speekers = {
    'en-us': ['Linda', 'John', 'Mike'],
    'ru-ru': ['Marina', 'Peter']
}

Object.assign(USER_CONFIG, BASE_CONFIG);

function detectLng(string) {
    let langArrays = lngDetector.detect(string, 2);
    return langArrays.some(lang => lang[0] === 'english')
}

phraseInput.addEventListener('change', (e) => {
    const { value: phrase } = e.target;
    const lang = detectLng(phrase) ? 'en-us' : 'ru-ru';
    USER_CONFIG.src = phrase;
    USER_CONFIG.hl = lang;

    printSpeekers(speekers[lang]);
})

function printSpeekers(speekersList) {
    speekersList.forEach(speeker => {
        const speekerOption = document.createElement('option');
        speekerOption.value = speeker;
        speekerOption.textContent = speeker;
        speekersSelect.appendChild(speekerOption);
    })

    speekersSelect.disabled = false;
    phraseInput.disabled = true;
    speekersSelect.focus();
}

speekersSelect.addEventListener('change', function () {
    USER_CONFIG.v = this.value;

    VoiceRSS.speech(USER_CONFIG);
    playBtn.disabled = false;
})

function resetForms() {
    phraseInput.value = '';
    speekersSelect.innerHTML = '<option selected hidden>Please select your speeker</option>';
    speekersSelect.disabled = true;
    playBtn.disabled = true;
    phraseInput.disabled = false;
    phraseInput.focus();
}

playBtn.addEventListener('click', function () {
    audioPlayer.play();
})

audioPlayer.addEventListener('ended', resetForms)