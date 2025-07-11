export default async function handler(req, res) {
  if (req.method === 'POST') {
    const attempt = req.body;

    try {
      // 🔁 Replace this with your actual ngrok HTTPS URL
      const r = await fetch("https://0448da896fce.ngrok-free.app/log_attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attempt)
      });

      const result = await r.text();
      return res.status(200).json({ message: "✅ Forwarded to GENDEF", result });
    } catch (err) {
      return res.status(500).json({ error: "Forwarding failed", detail: err.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
