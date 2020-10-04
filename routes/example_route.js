const ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db){
    app.get('/example/:id',(req,res) => {
        const data = {_id: new ObjectID(req.params.id)};
        console.log("data", data)
        db.collection('bookdata').findOne(data,(err, result)=>{
            if(err) {
                return res.send(err);
            }
            res.send(result);
        })
        
    })

    app.post('/example', (req,res) => {
        const data = req.body;
        console.log("data", data)
        db.collection('bookdata').insertOne(data, (err,result) => {
            if(err) {
                return res.send(err);
            }
            res.send(result.ops[0]);
        })
    })

    app.put('/example/:id', (req,res) => {
        const data = {_id: new ObjectID(req.params.id)};
        const updateData = {$set:req.body};
        db.collection('bookdata').updateOne(data, updateData, (err,result)=>{
            if(err) {
                return res.send(err);
            }
            res.send(result);
        })
    })

    app.delete('/example/:id',(req,res) => {
        const data = {_id: new ObjectID(req.params.id)};
        db.collection('bookdata').remove(data, err => {
            if(err) {
                return res.send(err);
            }
            res.send('Removed entry');
        })
    })
}