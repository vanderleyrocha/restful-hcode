let neDB = require('nedb');
let db = new neDB({
    filename: 'users.db',
    autoload: true
});


module.exports = app=>{

    let routeUsr = app.route('/users');

    routeUsr.get((req, res)=>{
        db.find({}, (err, users)=>{
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.json({
                    users
                });
            }
        });

    });
    
    
    routeUsr.post((req, res)=>{
        if (app.utils.validator.user(app, req, res)) {
            db.insert(req.body, (err, user)=>{
                if (err) {
                    app.utils.error.send(err, req, res);
                } else {
                    res.status(200).json(user);
                }
            });
        }
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res)=>{
        db.findOne({_id:req.params.id}).exec((err, user)=>{
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.json({
                    user
                });
            }
        });
    
    });

    routeId.put((req, res)=>{
        if (app.utils.validator.user(app, req, res)) {
            db.update({_id:req.params.id}, req.body, err=>{
                if (err) {
                    app.utils.error.send(err, req, res);
                } else {
                    res.status(200).json(Object.assign(req.params, req.body));
                }
            });
        }
    });

    routeId.delete((req, res)=>{
        
        db.remove({_id:req.params.id}, {}, err=>{
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).end(`Usuário: ${req.params.id} excluido com sucesso!`);
            }
        });
    });

}