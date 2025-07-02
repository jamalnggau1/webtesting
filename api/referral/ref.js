import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { ref } = req.query;  // Ambil kode referral dari URL

  const filePath = path.resolve('./data.json'); // Baca data dari file JSON
  let users = [];

  try {
    const fileData = fs.readFileSync(filePath);
    users = JSON.parse(fileData);
  } catch (err) {
    return res.status(500).json({ message: 'Gagal membaca data pengguna' });
  }

  // Cari user yang memiliki kode referral tersebut
  const user = users.find(u => u.referral === ref);
  if (!user) {
    return res.status(404).json({ message: 'Referral tidak ditemukan' });
  }

  // Hitung berapa orang yang mendaftar pakai referral ini
  const refCount = users.filter(u => u.usedRef === ref).length;

  // Kirim balasan berupa JSON
  return res.status(200).json({
    email: user.email,
    referral: user.referral,
    refCount: refCount
  });
}
