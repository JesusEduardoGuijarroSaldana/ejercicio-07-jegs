const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 1,
      message: "Usuarios encontrados.",
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Ocurrió un error desconocido.",
      users: [],
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      res.status(200).json({
        status: 1,
        message: "Usuario encontrado",
        users: [user],
      });
    } else {
      res.status(404).json({
        status: 0,
        message: "Usuario no encontrado.",
        users: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Ocurrió un error desconocido..",
      users: [],
    });
  }
};

exports.createUser = async (req, res) => {
  const { username, names, lastNames, email, password } = req.body;
  const salt = await bcrypt.genSalt(8);
  try {
    if (!username | !names | !lastNames | !email | !password) {
      res.status(400).json({
        status: 0,
        message: "Faltan parámetros.",
        users: [],
      });
    } else {
      const userFound = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (userFound) {
        res.status(200).json({
          status: 1,
          message: "El username y/o correo ya existen.",
          users: [],
        });
      } else {
        const user = await User.create({
          username,
          names,
          lastNames,
          email,
          password: await bcrypt.hash(password, salt),
        });
        res.status(200).json({
          status: 1,
          message: "Usuario creado correctamente.",
          users: [user],
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Ocurrió un error desconocido.",
      user: null,
    });
  }
};

exports.updateUserByEmail = async (req, res) => {
  try {
    // Qué datos actualizamos
    const { email } = req.params;
    const { names, lastNames, password } = req.body;
    if (!names | !lastNames | !password) {
      res.status(400).json({
        status: 0,
        message: "Faltan parámetros.",
        users: [],
      });
    } else {
      // Se requiere encriptar la contraseña
      const salt = await bcrypt.genSalt(8);
      const user = await User.findOneAndUpdate(
        { email },
        { names, lastNames, password: await bcrypt.hash(password, salt) }
      );
      res.status(200).json({
        status: 1,
        message: "Usuario actualizado correctamente.",
        users: [user],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Ocurrió un error desconocido.",
      users: [],
    });
  }
};

exports.deleteUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      await user.deleteOne();
      res.status(200).json({
        status: 1,
        message: "Usuario eliminado correctamente.",
        users: [],
      });
    } else {
      res.status(404).json({
        status: 0,
        message: "Usuario no encontrado.",
        users: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: "Ocurrió un error desconocido.",
      users: [],
    });
  }
};
