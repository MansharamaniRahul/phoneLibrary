var express=require('express');
var app=express();
var mongojs=require('mongojs');
var db=mongojs('contactList',['contactList','phoneList']);
var bodyParser=require('body-parser');
/*var path = require('path');*/
app.use(bodyParser.json());

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/css'));
app.use(express.static(__dirname+ '/app/img'));
/*app.use(express.static(path.join(__dirname, '/bower_components')));*/
app.use(express.static(__dirname + '/bower_components'));

//app.listen(3000);


// var per1={name:'a',number:123,email:'a@exp.com'};
// 	var per2={name:'b',number:1234,email:'b@exp.com'};
// 	var per3={name:'c',number:12345,email:'c@exp.com'};
// 	var contactList=[per1,per2,per3];



app.get('/home',function(req,res){
    console.log("Request for Phonelist from Home Screen received");
    db.phoneList.find(function(error,phoneList){        
        if(error)
            {
            res.write('error occured while getting phone list, Check DB');
            console.log("Callback from DB in Home Completed with error");
            }
        else
            {
            res.json(phoneList);
            console.log("Callback from DB in Home Completed with Sucess...");
            }
    })
});


var getContactListFromDB=function(res){
	db.contactList.find(function(error,updatedContactList){
	res.json(updatedContactList);

		
	});
};

app.get('/getContactList',function(req,res){
	db.contactList.find(function(error,updatedContactList){
	console.log("get request received ");
	res.json(updatedContactList);	
	});	
});

app.post('/postContactData',function(req,res){
	console.log("post request received ");
	db.contactList.insert(req.body);
	db.contactList.find(function(error,updatedContactList){
		
			console.log('error at post is ..' +error);
		
	res.json(updatedContactList);		
	getContactListFromDB(res);

});
});

app.delete('/deleteThisContact/:deleteContactID',function(req,res){
	console.log("delete request received ");
	var id=req.params.deleteContactID;	
	db.contactList.remove({ _id: mongojs.ObjectId(id)},function(err,data){
	db.contactList.find(function(error,updatedContactList){
	res.json(updatedContactList);	
	});
	});
});

app.get('/editThisContactID/:editThisContactID',function(req,res){	
	console.log("get with param request received ");
	var thisID=req.params.editThisContactID;
	db.contactList.findOne({_id: mongojs.ObjectId(thisID)},function(error,data){		
		res.json(data);
	});
});


app.put('/updatedContact/:IdofContactToBeUpdated',function(req,res){
	console.log("put request received ");
	var id=req.params.IdofContactToBeUpdated;
	db.contactList.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
		new:true},function(error,doc){
		db.contactList.find(function(error,updatedContactList){
		res.json(updatedContactList);	
		});	
		});
});

app.listen(8080);
console.log('server started...');

/*var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});
*/
// WebSocket server
/*wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        // close user connection
    });
});*/