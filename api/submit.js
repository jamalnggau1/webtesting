let referrals = {}; // Data referral disimpan di memori

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, ref } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email wajib diisi' });
    }

    if (ref) {
      if (!referrals[ref]) referrals[ref] = 0;
      referrals[ref]++;
    }

    return res.status(200).json({ message: 'Pendaftaran berhasil', usedRef: ref });
  }

  // GET → kirim data statistik referral
  res.status(200).json({ referrals });
}
