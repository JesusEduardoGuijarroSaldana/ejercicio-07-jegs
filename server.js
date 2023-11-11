const express = require("express");
const routesUsers = require("./src/routes/user.route");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/partners/v3/users", routesUsers);

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: ", port);
});
