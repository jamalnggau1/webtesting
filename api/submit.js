import fs from 'fs';
const file = 'users.json';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, ref } = req.body;
    const users = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];

    // Buat referral baru untuk email ini
    const newRef = email.split('@')[0] + Math.floor(Math.random() * 1000);
    users.push({ email, referral: newRef, usedRef: ref || null });

    fs.writeFileSync(file, JSON.stringify(users, null, 2));
    res.status(200).json({ referral: newRef, usedRef: ref || null });
  } else {
    res.status(405).json({ error: 'Only POST allowed' });
  }
}