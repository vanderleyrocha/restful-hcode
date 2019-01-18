module.exports = {
    user: (app, req, res) => {
        req.assert('_name', 'O nome é obrigatório.').notEmpty();
        req.assert('_email', 'E-mail inválido.').isEmail();
        if (req.validationErrors()) {
            app.utils.error.send(req.validationErrors(), req, res);
            return false;
        } else {
            return true;
        }
    }
}