import fs from 'fs';
const file = 'users.json';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const users = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    user.coins = (user.coins || 0) + 1;
    fs.writeFileSync(file, JSON.stringify(users, null, 2));

    res.status(200).json({ coins: user.coins });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}