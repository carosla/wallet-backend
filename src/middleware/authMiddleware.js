const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) return res.status(401).json({ mensagem: "Acesso negado! Token não encontrado." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.usuario_id = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ mensagem: "Token inválido!" });
  }
};

module.exports = verificarToken;
