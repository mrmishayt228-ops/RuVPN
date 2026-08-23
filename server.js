const express = require('express');

const app = express();
const STATS_KEY = process.env.STATS_KEY || 'change-me';
const visits = [];

app.get('/', (req, res) => {
  const ip = (req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
  visits.push({
    ip,
    ua: req.headers['user-agent'] || '-',
    lang: req.headers['accept-language'] || '-',
    ref: req.headers['referer'] || '-',
    time: new Date().toISOString()
  });
  console.log(`[${visits.length}] ${ip} ${req.headers['user-agent'] || ''}`);
  res.send('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>...</title><style>html,body{margin:0;min-height:100%;background:#000;font-family:monospace;overflow-x:hidden}#txt{position:relative;z-index:5;text-align:center;padding:14vh 10px 60px;color:#f22}h1{font-size:min(9vw,64px);letter-spacing:3px;margin:0 0 20px;animation:flk 1.7s infinite}#txt p{font-size:min(4.5vw,26px);line-height:1.7;margin:0 0 34px}.mon{position:fixed;z-index:2;pointer-events:auto;cursor:pointer;filter:drop-shadow(0 0 16px rgba(255,0,0,.65));transition:transform .15s}.tl{top:-18px;left:-18px;width:min(24vw,190px);transform:rotate(-12deg);animation:a1 3.1s ease-in-out infinite}.tr{top:-15px;right:-15px;width:min(22vw,175px);animation:a2 2.3s ease-in-out infinite}.bl{bottom:-15px;left:-15px;width:min(23vw,185px);transform:rotate(8deg);animation:a3 2.7s ease-in-out infinite}.br{bottom:-12px;right:-12px;animation:a2 1.9s ease-in-out infinite}.tl:hover,.tr:hover,.bl:hover,.br:hover{transform:scale(1.12)}@keyframes a1{0%,100%{transform:rotate(-12deg)}30%{transform:rotate(-8deg) scale(1.06)}70%{transform:rotate(-17deg)}}@keyframes a2{0%,100%{transform:scale(1)}50%{transform:scale(1.13)}}@keyframes a3{0%,100%{transform:rotate(8deg)}40%{transform:rotate(3deg) translateY(-10px)}80%{transform:rotate(13deg)}}@keyframes flk{0%,100%{opacity:1;text-shadow:0 0 10px #f00}45%{opacity:.92;text-shadow:4px 0 8px #700,-4px 0 8px #fff}55%{opacity:1;text-shadow:-3px 0 6px #fff,3px 0 6px #f00}}#btn{background:#1a0000;color:#f44;border:2px solid #800;font-family:inherit;font-size:19px;padding:13px 26px;border-radius:8px;cursor:pointer;animation:a2 1.4s ease-in-out infinite}video{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;background:#000;z-index:50;display:none}</style></head><body><img class="mon tl" alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg/250px-Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg"><img class="mon tr" alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vincent_van_Gogh_-_Head_of_a_skeleton_with_a_burning_cigarette_-_Google_Art_Project.jpg/500px-Vincent_van_Gogh_-_Head_of_a_skeleton_with_a_burning_cigarette_-_Google_Art_Project.jpg"><img class="mon bl" alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/John_Henry_Fuseli_-_The_Nightmare.JPG/500px-John_Henry_Fuseli_-_The_Nightmare.JPG"><svg class="mon br" viewBox="0 0 100 100" width="150" height="150"><path d="M50 6 C21 6 13 29 13 51 C13 78 29 95 50 95 C71 95 87 78 87 51 C87 29 79 6 50 6 Z" fill="#050505" stroke="#e11" stroke-width="3"/><ellipse cx="34" cy="44" rx="9" ry="13" fill="#f22"><animate attributeName="opacity" values="1;.15;1" dur="1.6s" repeatCount="indefinite"/></ellipse><ellipse cx="66" cy="44" rx="9" ry="13" fill="#f22"><animate attributeName="opacity" values=".15;1;.15" dur="1.6s" repeatCount="indefinite"/></ellipse><path d="M31 74 L37 65 L43 74 L50 63 L57 74 L63 65 L69 74" stroke="#e11" stroke-width="4" fill="none" stroke-linejoin="round"/></svg><div id="txt"><h1>ТЕБЯ ЗАСКИМИЛИ</h1><p>наебали.<br>у нас твой айпи.<br><b>дальше пробивка...</b></p><button id="btn">&#128065; включи звук и жми</button></div><video id="sc" preload="auto" playsinline></video><script>var srcs=["https://archive.org/download/clideo_editor_e3a8ff54d36745a6aa2eb4424444173f/clideo_editor_e3a8ff54d36745a6aa2eb4424444173f.mp4","https://archive.org/download/k-fee-police-chase/K-fee%20Police%20Chase.mp4","https://archive.org/download/ghost-car-kfee/Ghost%20Car_360P.mp4"];var si=Math.floor(Math.random()*srcs.length);var sc=document.getElementById("sc");sc.src=srcs[si];function go(){if(sc.style.display==="block"){return}document.getElementById("txt").style.display="none";var m=document.querySelectorAll(".mon");for(var i=0;i<m.length;i++){m[i].style.display="none"}sc.style.display="block";sc.volume=1;if(document.documentElement.requestFullscreen){document.documentElement.requestFullscreen().catch(function(){})}sc.play();}sc.onerror=function(){si=(si+1)%srcs.length;if(sc.src!==srcs[si]){sc.src=srcs[si];}};sc.onended=function(){sc.style.display="none";document.getElementById("txt").style.display="block";var m=document.querySelectorAll(".mon");for(var i=0;i<m.length;i++){m[i].style.display=""};};document.body.addEventListener("click",go);</script></body></html>');
});

app.get('/stats', (req, res) => {
  if (req.query.key !== STATS_KEY) return res.status(403).send('forbidden');
  const rows = visits.map(v =>
    `<tr><td>${v.time}</td><td><b>${esc(v.ip)}</b></td><td>${esc(v.ua)}</td><td>${esc(v.lang)}</td><td>${esc(v.ref)}</td></tr>`
  ).join('');
  res.send(`<!doctype html>
<html><head><meta charset="utf-8"><title>stats</title>
<style>body{font-family:monospace;background:#111;color:#ddd;padding:20px}
table{border-collapse:collapse;width:100%}td,th{border:1px solid #444;padding:6px;text-align:left;font-size:13px}
th{background:#222}tr:hover{background:#1c1c1c}</style></head>
<body><h2>visits: ${visits.length}</h2>
<table><tr><th>time</th><th>ip</th><th>user-agent</th><th>language</th><th>referer</th></tr>${rows}</table>
</body></html>`);
});

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

app.listen(process.env.PORT || 3000, () => {
  console.log(`running on port ${process.env.PORT || 3000}`);
});
