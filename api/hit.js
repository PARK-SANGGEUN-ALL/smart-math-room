// 방문자 수 : GET /api/hit → 오늘·누적 1씩 증가 (중복 포함), GET /api/hit?peek=1 → 증가 없이 보기
const { redis, kst, send } = require('./_redis');
module.exports = async (req, res) => {
  try {
    const { day } = kst();
    const peek = req.query && req.query.peek;
    const out = peek
      ? await redis([['GET', 'kn:visits:total'], ['GET', 'kn:visits:' + day]])
      : await redis([['INCR', 'kn:visits:total'], ['INCR', 'kn:visits:' + day], ['EXPIRE', 'kn:visits:' + day, 60 * 60 * 24 * 40]]);
    send(res, 200, { total: Number(out[0] || 0), today: Number(out[1] || 0), day });
  } catch (e) { send(res, e.code === 'NO_DB' ? 503 : 500, { error: e.message }); }
};
