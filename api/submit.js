let users = {};
let referralToUser = {};
let referralStats = {};

function generateReferral(email) {
  return email.split('@')[0] + Math.floor(100 + Math.random() * 900); // contoh: jamal423
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, ref } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi' });
    }

    // Jika belum pernah daftar
    if (!users[email]) {
      const newRef = generateReferral(email);
      users[email] = { referral: newRef };
      referralToUser[newRef] = email;

      // Kalau mendaftar dengan referral orang lain
      if (ref && referralToUser[ref]) {
        referralStats[ref] = (referralStats[ref] || 0) + 1;
      }

      return res.status(200).json({ 
        message: 'Pendaftaran berhasil',
        yourReferral: newRef,
        usedRef: ref || null
      });
    }

    return res.status(200).json({ message: 'Email sudah terdaftar', yourReferral: users[email].referral });
  }

  // GET: kirim statistik semua referral
  const stats = Object.entries(referralStats).map(([ref, count]) => {
    const owner = referralToUser[ref] || 'Tidak diketahui';
    return { owner, referral: ref, count };
  });

  res.status(200).json({ stats });
}
