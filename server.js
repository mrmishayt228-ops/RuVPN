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
  res.send('<!doctype html><html><head><meta charset="utf-8"><title>...</title></head><body style="background:#000;color:#f22;font-family:monospace;text-align:center;padding-top:32vh"><h1 style="font-size:42px;letter-spacing:2px">ТЕБЯ ЗАСКИМИЛИ</h1><p style="font-size:22px;line-height:1.6">наебали.<br>у нас твой айпи.<br><b>дальше пробивка...</b></p></body></html>');
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
