import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' });
  }

  const filePath = path.resolve('./users.json');

  let users = [];

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    users = JSON.parse(fileData);
  } catch (err) {
    return res.status(500).json({ message: 'Gagal membaca data pengguna' });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Login gagal: email atau password salah' });
  }

  return res.status(200).json({ message: 'Login berhasil', email });
}
