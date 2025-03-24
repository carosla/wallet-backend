const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

// Função para gerar token JWT
const gerarToken = (id) => {
  if (!process.env.JWT_SECRET) {
    console.error("❌ ERRO: JWT_SECRET não definido no .env");
    throw new Error("JWT_SECRET não configurado no servidor.");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Cadastro de usuário
const registrar = async (req, res) => {
  try {
    console.log("🔹 Dados recebidos:", req.body);
    const email = req.body.email;
    const login = req.body.login || req.body.name; 
    const senha = req.body.senha || req.body.password;

    if (!email || !login || !senha) {
      console.error("❌ Campos obrigatórios faltando!");
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      console.warn("⚠️ E-mail já cadastrado:", email);
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await Usuario.create({ email, login, senha: senhaHash });

    console.log("✅ Usuário cadastrado:", novoUsuario);

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      usuario: { id: novoUsuario.usuario_id, email: novoUsuario.email, login: novoUsuario.login },
    });
  } catch (error) {
    console.error("🔥 Erro ao registrar usuário:", error);
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    console.log("🔹 Tentativa de login:", req.body);
    const email = req.body.email;
    const senha = req.body.senha || req.body.password;

    if (!email || !senha) {
      console.error("❌ Campos de login faltando!");
      return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
    }

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      console.warn("⚠️ Usuário não encontrado:", email);
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    console.log("✅ Usuário encontrado:", usuario);

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      console.warn("❌ Senha inválida para:", email);
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const token = gerarToken(usuario.usuario_id);
    console.log("✅ Token gerado:", token);

    res.json({
      mensagem: "Login bem-sucedido",
      token,
      usuario: { id: usuario.usuario_id, email: usuario.email, login: usuario.login }
    });

  } catch (error) {
    console.error("🔥 Erro ao fazer login:", error);
    res.status(500).json({ mensagem: "Erro no servidor", erro: error.message });
  }
};

module.exports = { registrar, login };
