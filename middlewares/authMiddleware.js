const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    // Verifica se o token está presente e válido
    if (!token) {
        return res.redirect('/login'); // Redireciona para a tela de login se o token estiver ausente
    }

    try {
        const decoded = jwt.verify(token, 'sua_chave_secreta');
        req.user = decoded.user;
        next();
    } catch (error) {
        // Verifica se o token está expirado
        if (error.name === 'TokenExpiredError') {
            return res.redirect('/login'); // Redireciona para a tela de login se o token estiver expirado
        }
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
};

module.exports = authMiddleware;
