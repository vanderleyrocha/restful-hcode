module.exports = app=>{

    app.get('/', (req, res)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end('<h1>Olá!</h1>');
    });
    
};