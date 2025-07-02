let users = {};
let referralToUser = {};
let referralStats = {};

function generateReferral(email) {
  return email.split('@')[0] + Math.floor(100 + Math.random() * 900);
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

      // Tambah referral count hanya jika ref valid (sudah ada di referralToUser)
      if (ref && referralToUser[ref]) {
        referralStats[ref] = (referralStats[ref] || 0) + 1;
      }

      return res.status(200).json({
        message: 'Pendaftaran berhasil',
        yourReferral: newRef,
        usedRef: referralToUser[ref] ? ref : null
      });
    }

    return res.status(200).json({
      message: 'Email sudah terdaftar',
      yourReferral: users[email].referral
    });
  }

  // GET: tampilkan statistik referral
  const stats = Object.entries(referralStats).map(([ref, count]) => {
    const owner = referralToUser[ref] || 'Tidak diketahui';
    return { owner, referral: ref, count };
  });

  res.status(200).json({ stats });
}
