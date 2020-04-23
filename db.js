var express=require('express');
var app =express();
var mysql = require('mysql');
    //链接数据库 导入文件 vue_.sql
var connection = mysql.createConnection({
 host: '127.0.0.1',
 user: 'root',
 password : '1q2w3e4r',
 database : 'test_vue'
});

connection.connect();
//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

var result = {
    "status": "200",
    "message": "success", 
}

let sql = 'select * from vue_ where flag="0" ';
connection.query(sql,(err, rows, fields) => {
    if (err) throw err;
    console.log(rows);
    return result.data=rows;
});

function getData(){
    let sql = 'select * from vue_ where flag="0" ';
    connection.query(sql,(err, rows, fields) => {
        if (err) throw err;
        console.log(rows);
        return result.data=rows;
    });
   
}

function addData(obj){
    let sql = 'insert into vue_(id,name) values(?,?)';
    let params = [];
    params.push(obj.id);
    params.push(obj.name);
    connection.query(sql,params,(err, rows, fields) => {
    if (err) throw err;
    });
}

function update(obj){
    let sql = 'update vue_ set name=?,checkstate=?,flag=? where id=? and flag!="2"';
    let params = [];
    params.push(obj.name);
    params.push(obj.checkstate);
    params.push(obj.flag);
    params.push(obj.id);
    connection.query(sql,params,(err, rows, fields) => {
    if (err) throw err;
    });

}

//接口123
app.post('/123',(req,res) => {
    req.on('data',function(data){
        obj=JSON.parse(data);
        console.log(obj,'obj',obj.length);
        if(typeof(obj.length)=="undefined"){
            if(obj.id != "0"){
                if(obj.flag=='1'){
                addData(obj);
                getData()}
                else{
                update(obj);
                getData()}
            }
        }else{
            obj.forEach(Item => {
            let flag = Item.flag;
            if(flag=='1'){
                addData(Item);
                getData();
            };
            if(flag=='2'){
                update(Item);
                getData();
            }
            console.log(Item);
        })
        }
        
       
        
    });
   
    res.status(200);
    res.json(result);
});


//配置服务端口
var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})