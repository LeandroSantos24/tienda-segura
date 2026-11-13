const express = require("express");
// API de solo lectura (GET, sin cookies ni sesion): CSRF no aplica.
const app = express(); // nosemgrep: javascript.express.security.audit.express-check-csurf-middleware-usage.express-check-csurf-middleware-usage
app.disable("x-powered-by");
const total = (precio, cant, desc) =>
  precio * cant * (1 - desc);
app.get("/total", (req, res) => {
  const { p, c } = req.query;
  res.json({ total: total(p, c, 0) });
});
app.get("/calcular", (req, res) => {
  const resultado = Number(req.query.a) + Number(req.query.b);
  res.json({ resultado });
});
// Solo escucha si se ejecuta "node app.js". Si lo importa el test
// (require("./app")), no abre el puerto y "node --test" termina.
if (require.main === module) {
  app.listen(3000, () => console.log("tienda-segura en http://localhost:3000"));
}
module.exports = { app, total };
