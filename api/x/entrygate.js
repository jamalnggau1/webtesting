let dataStore = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { u, k } = req.body;

    const newRef = u.split('@')[0] + Math.floor(Math.random() * 1000);
    dataStore[u] = {
      r: newRef,
      ur: k || null
    };

    return res.status(200).json({ r: "ok", id: newRef, ur: k || null });
  }

  // Untuk GET
  const summary = {};
  for (const u in dataStore) {
    const { ur } = dataStore[u];
    if (!summary[ur]) summary[ur] = 0;
    summary[ur]++;
  }

  res.status(200).json({ data: summary });
}
