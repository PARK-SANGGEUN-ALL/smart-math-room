// Upstash Redis(REST) 연결 : Vercel → Storage에서 Upstash Redis를 연결하면 환경 변수가 자동으로 들어갑니다.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
async function redis(cmds) {
  if (!URL_ || !TOKEN) { const e = new Error('데이터베이스가 연결되지 않았습니다 (README 4단계).'); e.code = 'NO_DB'; throw e; }
  const r = await fetch(URL_.replace(/\/$/, '') + '/pipeline', { method: 'POST', headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(cmds) });
  const j = await r.json();
  if (!Array.isArray(j)) throw new Error(j.error || 'Redis 오류');
  return j.map(x => { if (x.error) throw new Error(x.error); return x.result; });
}
function kst(d = new Date()) {
  const k = new Date(d.getTime() + 9 * 3600 * 1000);
  return { day: k.toISOString().slice(0, 10), time: k.toISOString().slice(0, 16).replace('T', ' ') };
}
function send(res, code, obj) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // GitHub Pages 주소에서도 방문자 수를 불러올 수 있게
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(code).send(JSON.stringify(obj));
}
module.exports = { redis, kst, send };
