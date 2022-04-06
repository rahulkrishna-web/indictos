export default function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        msg: body,
      })
    );
  }
}
