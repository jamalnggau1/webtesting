export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const auth = req.headers.authorization || '';
  const token = auth.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  const email = Buffer.from(token, 'base64').toString('utf-8');
  if (!email.includes('@')) return res.status(403).json({ message: 'Token tidak valid' });

  // Simulasi proses mining
  res.status(200).json({ message: `⛏️ Mining berjalan untuk ${email}` });
}