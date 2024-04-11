const jwt = require('jsonwebtoken');

const predefinedUser = {
    username: 'admin',
    password: 'admin123' // Senha deve ser criptografada em um ambiente de produção
};

const authController = {
    login: (req, res) => {
        console.log(req.body); // Verifique se está recebendo os dados corretamente
        const { username, password } = req.body;

        if (username === predefinedUser.username && password === predefinedUser.password) {
            // Credenciais válidas, gera token JWT
            const token = jwt.sign({ user: username }, 'sua_chave_secreta', { expiresIn: '1m' }); // Token expira em 1 minuto
            res.cookie('token', token); // Armazena o token em um cookie
            res.redirect('/criar-produto'); // Redireciona para a página de criar produto após o login bem-sucedido
        } else {
            // Credenciais inválidas
            res.status(401).json({ error: 'Credenciais inválidas' });
        }
    }
};

module.exports = authController;
