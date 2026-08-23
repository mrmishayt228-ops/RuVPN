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
  res.send('<!doctype html><html><head><meta charset="utf-8"><title>...</title><style>body{background:#000;color:#f22;font-family:monospace;text-align:center;padding-top:32vh}.sc{position:fixed;z-index:9;pointer-events:none;filter:drop-shadow(0 0 18px rgba(255,0,0,.7))}.tl{top:-25px;left:-25px;width:190px;transform:rotate(-13deg);animation:shk 3s ease-in-out infinite}.br{bottom:-20px;right:-20px;animation:pls 2.2s ease-in-out infinite}@keyframes shk{0%,100%{transform:rotate(-13deg)}25%{transform:rotate(-10deg) scale(1.07)}75%{transform:rotate(-16deg) scale(.96)}}@keyframes pls{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}</style></head><body><img class="sc tl" alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg/250px-Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg"><svg class="sc br" viewBox="0 0 100 100" width="160" height="160"><path d="M50 6 C21 6 13 29 13 51 C13 78 29 95 50 95 C71 95 87 78 87 51 C87 29 79 6 50 6 Z" fill="#050505" stroke="#e11" stroke-width="3"/><ellipse cx="34" cy="44" rx="9" ry="13" fill="#f22"><animate attributeName="opacity" values="1;.15;1" dur="1.6s" repeatCount="indefinite"/></ellipse><ellipse cx="66" cy="44" rx="9" ry="13" fill="#f22"><animate attributeName="opacity" values=".15;1;.15" dur="1.6s" repeatCount="indefinite"/></ellipse><path d="M31 74 L37 65 L43 74 L50 63 L57 74 L63 65 L69 74" stroke="#e11" stroke-width="4" fill="none" stroke-linejoin="round"/></svg><h1 style="font-size:42px;letter-spacing:2px">ТЕБЯ ЗАСКИМИЛИ</h1><p style="font-size:22px;line-height:1.6">наебали.<br>у нас твой айпи.<br><b>дальше пробивка...</b></p></body></html>');
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
