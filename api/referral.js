import fs from 'fs';
const file = 'users.json';

export default function handler(req, res) {
  const { query } = req;
  const users = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];

  const count = users.filter(u => u.usedRef === query.code).length;
  res.status(200).json({ code: query.code, refCount: count });
}