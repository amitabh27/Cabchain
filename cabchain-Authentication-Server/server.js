var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var request=require('request');
var nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '8a6bfcae',
  apiSecret: 'a89478b86e4fad4b'
});


//444123235666/steve smith/male/27091993/603-6,max towers,lalbagh road,banashankari,bangalore-560001,karnataka,india
//MH06 KA 4562/FR3456712/GC Maruti4512

var err="No information available: Please check the details that you have provided";

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

var port = process.env.PORT || 5000;


var server=app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });

app.get('/',function(req,res){
	return res.status(200).send("Welcome to Authentication Server");
});



//validate aadhaar
app.get('/aadhaar/:number/:name/:gender/:dob/:address',function(req,res){
	
	
			var number=req.params.number;
			var name=req.params.name;
			var gender=req.params.gender;
			var dob=req.params.dob;
			var address=req.params.address;
			var result;
			var otp="";
			
	function second()
	{		
	return res.status(200).send(JSON.parse("{\"status\":\""+result+"\",\"otp\":\""+otp+"\"}"));
	}
	
	
	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/authserver/collections/aadhar?q={"uid": "'+number+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				if(o[0].name==name && o[0].dob==dob && o[0].gender==gender && o[0].address==address)
				{
					
					otp=(Math.floor(100000 + Math.random() * 900000)).toString();
					
					nexmo.message.sendSms(
					'919820364381',o[0].number, 'The OTP for verification is '+otp,
						(err, responseData) => {
						if (err) {
						console.log(err);
						} else {
						console.dir(responseData);
						}
						}
					);
					result="yes";
				}
				else
				result="no";
				
				callback(second);
				}
			});
	}
	
	
	
	first(second);
});


//validate vahan
app.get('/vahaan/:number/:chassis/:enginenumber',function(req,res){
	
	
			var number=req.params.number;
			var chassis=req.params.chassis;
			var enginenumber=req.params.enginenumber;
			var result;

			
	function second()
	{		
	return res.status(200).send(JSON.parse("{\"status\":\""+result+"\"}"));
	}
	
	
	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/authserver/collections/vahaan?q={"number": "'+number+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				if(o[0].chassis==chassis && o[0].enginenumber==enginenumber)
				{
					result="yes";
				}
				else
				result="no";
				
				callback(second);
				}
			});
	}
	
	
	
	first(second);
});




