// express setup
const express = require("express");
const { json } = require("express/lib/response");
const bodyParser = require("body-parser");

// app setup
const app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

// prueba db
let db = {
  usuarios: [
    {
      id: "1",
      name: "Juan",
      email: "juan@gmail.com",
      password: "1234abcd",
      actividades: [
        {
          tipo: "natación",
          hora: "16:20",
          duracion: "40 minutos",
          calorias: "150",
        },
        {
          tipo: "esgrima",
          hora: "10:00",
          duracion: "30 minutos",
          calorias: "80",
        },
      ],
    },
    {
      id: "2",
      name: "Laura",
      email: "laura@gmail.com",
      password: "abcd1234",
      actividades: [
        {
          tipo: "box",
          hora: "20:10",
          duracion: "1 hora 15 minutos",
          calorias: "200",
        },
        {
          tipo: "equitación",
          hora: "8:30",
          duracion: "20 minutos",
          calorias: "40",
        },
      ],
    },
  ],
};

// rutas
app.get("/", (req, res) => {
  res.send("Página principal");
});

// usuarios get
app.get("/usuarios", (req, res) => {
  // CAMBIAR: A BASE DE DATOS     !!!!!!!!
  res.send(db.usuarios);
});

// login post
app.post("/login", (req, res) => {
  if (
    // CAMBIAR: COMPARAR CON LA BASE DE DATOS EN MONGO    !!!!!!!!
    req.body.email === db.usuarios[0].email &&
    req.body.password === db.usuarios[0].password
  ) {
    res.json("Login success");
  } else {
    res.status(400), json("Login error");
  }
});

// registro post
app.post("/register", (req, res) => {
  let usr = req.body;
  //   CAMBIAR: A BASE DE DATOS   !!!!!!!!
  usr["id"] = db.usuarios.length + 1;
  usr["actividades"] = [];
  db.usuarios.push(usr);
  res.json(usr);
});

// perfil get
app.get("/usuarios/:id", (req, res) => {
  let { id } = req.params;
  let found = false;
  //   CAMBIAR: BUSCAR EN BASE DE DATOS   !!!!!!!!
  db.usuarios.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(404).json("Usuario no encontrado");
  }
});

// actividades get
app.get("/actividades/:id", (req, res) => {
  let { id } = req.params;
  let found = false;
  //   CAMBIAR: BUSCAR EN BASE DE DATOS   !!!!!!!!
  db.usuarios.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user.actividades);
    }
  });
  if (!found) {
    res.status(404).json("Usuario no encontrado");
  }
});

// actividades post
app.post("/actividades/:id", (req, res) => {
  let { id } = req.params;
  let actividad = req.body;
  let found = false;
  //   CAMBIAR: A BASE DE DATOS   !!!!!!!!
  db.usuarios.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.actividades.push(actividad);
      return res.json(user.actividades);
    }
  });
  if (!found) {
    res.status(404).json("Usuario no encontrado");
  }
});

// Listen
app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
