import fs from 'fs';
const file = 'users.json';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const users = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
    let user = users.find(u => u.email === email);

    if (!user) {
      user = { email, coins: 0 };
      users.push(user);
      fs.writeFileSync(file, JSON.stringify(users, null, 2));
    }

    res.status(200).json({ email: user.email, coins: user.coins });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
