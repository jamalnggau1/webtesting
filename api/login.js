import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email dan password wajib diisi' });

  const filePath = path.resolve('./users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: 'Login gagal: email atau password salah' });

  // Simulasi token
  const token = Buffer.from(email).toString('base64');
  res.status(200).json({ message: 'Login berhasil', token });
}