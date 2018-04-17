var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
var request=require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');
var dateTime = require('node-datetime');
var parseInt = require('parse-int');
const Nexmo = require('nexmo');
var async = require("async");

var mongoose = require('mongoose');


const nexmo = new Nexmo({
  apiKey: '..API Key..',
  apiSecret: '..API Key..'
});





var User = require('../models/user');






router.get('/', function(req, res){
	if(req.isAuthenticated()){
			res.render('index');
	}
	else
	res.render('login');
});



// Register
router.get('/register', function(req, res){
	res.render('register');
});

// Details
router.get('/details', function(req, res){
	res.render('details');
});



// Login
router.get('/login', function(req, res){
	if(req.isAuthenticated()){
			res.render('index');
	}
	else
	res.render('login');
});


//fare update

router.post('/fareupdate', function(req, res){
	var content = req.body.fare;

	// Validation
	req.checkBody('fare', 'Fare Matrix is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log("errors");
		res.render('index',{
			errors:errors
		});
		
	} else {
		
		var result="";var f=0;var id;
	
		
		
		function second(callback)
		{
			request.delete('https://api.mlab.com/api/1/databases/cabchain/collections/fare/'+id+'?apiKey=...API Key....',function (error, response, body) {
							if (!error && response.statusCode == 200)
							{
								
									console.log("deleted...");
									result=JSON.parse(result);
											request.post('https://api.mlab.com/api/1/databases/cabchain/collections/fare?apiKey=...API Key....',
											{ json: result },
											function (error, response, body) {
												if (!error && response.statusCode == 200) {
													console.log("----->"+body);
												}
											
												else
												console.log("-----XXXXX>"+error);
											}
											);
									
									req.flash('success_msg', 'Fare Matrix Updated');
									res.redirect('/');
									
									
							}
						});	
		}
		
		function first(callback)
		{
			var a=JSON.parse(content);

			result="{\"farematrix\":[";
			
			request('https://api.mlab.com/api/1/databases/cabchain/collections/fare?apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				//console.log("----->"+body);
				id=o[0]._id.$oid;
				console.log("id="+id);
				
					for(var i=0;i<o[0].farematrix.length;i++)
					{
								if(o[0].farematrix[i].cityname==a.cityname)
								{
										console.log("update this city"+a.cityname);
										f=1;
										
									result=result.concat("{\"cityname\":\"").concat(a.cityname).concat("\",");
									result=result.concat("\"micro\": {");result=result.concat("\"basefare\":\"").concat(a.micro.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.micro.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.micro.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.micro.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.micro.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.micro.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.micro.cancellationafter).concat("\"},");
									result=result.concat("\"mini\": {");result=result.concat("\"basefare\":\"").concat(a.mini.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.mini.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.mini.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.mini.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.mini.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.mini.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.mini.cancellationafter).concat("\"},");
									result=result.concat("\"primesedan\": {");result=result.concat("\"basefare\":\"").concat(a.primesedan.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.primesedan.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.primesedan.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.primesedan.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.primesedan.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.primesedan.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.primesedan.cancellationafter).concat("\"},");
									result=result.concat("\"primesuv\": {");result=result.concat("\"basefare\":\"").concat(a.primesuv.basefare).concat("\",");result=result.concat("\"tillbasedistance\":\"").concat(a.primesuv.tillbasedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.primesuv.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.primesuv.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.primesuv.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.primesuv.cancellationafter).concat("\"},");
									
									result=result.concat("\"primeplay\": {");result=result.concat("\"basefare\":\"").concat(a.primeplay.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.primeplay.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.primeplay.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.primeplay.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.primeplay.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.primeplay.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.primeplay.cancellationafter).concat("\"},");
									result=result.concat("\"lux\": {");result=result.concat("\"basefare\":\"").concat(a.lux.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.lux.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.lux.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.lux.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.lux.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.lux.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.lux.cancellationafter).concat("\"},");
									result=result.concat("\"auto\": {");result=result.concat("\"basefare\":\"").concat(a.auto.basefare).concat("\",");result=result.concat("\"basedistance\":\"").concat(a.auto.basedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.auto.afterperkm).concat("\"}}");
								
								
								}
								else
								{
									console.log("Append this city"+o[0].farematrix[i].cityname);
									
									result=result.concat("{\"cityname\":\"").concat(o[0].farematrix[i].cityname).concat("\",");
									result=result.concat("\"micro\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].micro.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].micro.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].micro.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].micro.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].micro.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].micro.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].micro.cancellationafter).concat("\"},");
									result=result.concat("\"mini\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].mini.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].mini.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].mini.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].mini.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].mini.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].mini.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].mini.cancellationafter).concat("\"},");
									result=result.concat("\"primesedan\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].primesedan.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].primesedan.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].primesedan.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].primesedan.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].primesedan.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].primesedan.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].primesedan.cancellationafter).concat("\"},");
									result=result.concat("\"primesuv\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].primesuv.basefare).concat("\",");result=result.concat("\"tillbasedistance\":\"").concat(o[0].farematrix[i].primesuv.tillbasedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].primesuv.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].primesuv.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].primesuv.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].primesuv.cancellationafter).concat("\"},");
									
									result=result.concat("\"primeplay\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].primeplay.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].primeplay.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].primeplay.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].primeplay.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].primeplay.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].primeplay.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].primeplay.cancellationafter).concat("\"},");
									result=result.concat("\"lux\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].lux.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].lux.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].lux.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].lux.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].lux.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].lux.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].lux.cancellationafter).concat("\"},");
									result=result.concat("\"auto\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].auto.basefare).concat("\",");result=result.concat("\"basedistance\":\"").concat(o[0].farematrix[i].auto.basedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].auto.afterperkm).concat("\"}}");
			
								}
								
								
								if(i>=0 && i<= (o[0].farematrix.length-2))
									result=result.concat(",");
					}
					
				if(f==0)
				{
									console.log("Add new city"+a.cityname);
									result=result.concat(",");
									result=result.concat("{\"cityname\":\"").concat(a.cityname).concat("\",");
									result=result.concat("\"micro\": {");result=result.concat("\"basefare\":\"").concat(a.micro.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.micro.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.micro.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.micro.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.micro.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.micro.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.micro.cancellationafter).concat("\"},");
									result=result.concat("\"mini\": {");result=result.concat("\"basefare\":\"").concat(a.mini.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.mini.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.mini.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.mini.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.mini.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.mini.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.mini.cancellationafter).concat("\"},");
									result=result.concat("\"primesedan\": {");result=result.concat("\"basefare\":\"").concat(a.primesedan.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.primesedan.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.primesedan.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.primesedan.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.primesedan.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.primesedan.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.primesedan.cancellationafter).concat("\"},");
									result=result.concat("\"primesuv\": {");result=result.concat("\"basefare\":\"").concat(a.primesuv.basefare).concat("\",");result=result.concat("\"tillbasedistance\":\"").concat(a.primesuv.tillbasedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.primesuv.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.primesuv.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.primesuv.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.primesuv.cancellationafter).concat("\"},");
									
									result=result.concat("\"primeplay\": {");result=result.concat("\"basefare\":\"").concat(a.primeplay.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.primeplay.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.primeplay.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.primeplay.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.primeplay.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.primeplay.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.primeplay.cancellationafter).concat("\"},");
									result=result.concat("\"lux\": {");result=result.concat("\"basefare\":\"").concat(a.lux.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(a.lux.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(a.lux.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.lux.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(a.lux.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(a.lux.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(a.lux.cancellationafter).concat("\"},");
									result=result.concat("\"auto\": {");result=result.concat("\"basefare\":\"").concat(a.auto.basefare).concat("\",");result=result.concat("\"basedistance\":\"").concat(a.auto.basedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(a.auto.afterperkm).concat("\"}}");
								
				}
					
				result=result.concat("]}");
				
				//console.log("--->"+result);
				callback(second);
				}
			});
			

			
		}
		first(second);
	}
});




//Contact us
router.get('/contact', function(req, res){
	res.render('contact');
});


//Contact us
router.post('/contact', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var query = req.body.query;

	// Validation

	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('query', 'Query is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('contact',{
			errors:errors
		});
	} else {
		
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			user: 'gmail id',
			pass: 'gmail pwd'
			}
			});

			var mailOptions = {
			from: 'gmail id',
			to: 'gmail id',
			subject: 'Customer Query',
			html: name+' has submitted the below query.<br><br>\"'+query + '\"<br><br> Please reply back to Email : '+email+'<br><br><br><br> *This is an auto-generated email.'
			};

			transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			console.log(error);
			} else {
			console.log('Email sent: ' + info.response);
			}
			});

		req.flash('success_msg', 'Response Submitted');

		res.redirect('/users/contact');
	}
});


// Register Driver OTP form
router.post('/details', function(req, res){
	
	var otp = req.body.otp;
	var licensenumber = req.body.license;
	var licenseexpiry	= req.body.expiry;
	var contactnumber = req.body.contact;
	var aadhar = req.body.aadhaar;
	
	var modelname = req.body.modelname;
	var modeltype = req.body.modeltype;
	var modeldescription = req.body.modeldescription;
	
	var dbotp;
	
	var fname;
	var lname;
	var dob;
	var working="1";
	var driverlocation="12.23432356 12.9121324324";
	var capacitypassengers="3";
	var carnumber;
	var chassis;
	var engine;
	
	

	// Validation
	req.checkBody('otp', 'All fields are mandatory').notEmpty();
	req.checkBody('license', 'All fields are mandatory').notEmpty();
	req.checkBody('expiry', 'All fields are mandatory').notEmpty();
	req.checkBody('contact', 'All fields are mandatory').notEmpty();
	req.checkBody('aadhaar', 'All fields are mandatory').notEmpty();
	
	req.checkBody('modelname', 'All fields are mandatory').notEmpty();
	req.checkBody('modeltype', 'All fields are mandatory').notEmpty();
	req.checkBody('modeldescription', 'All fields are mandatory').notEmpty();


	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		

		console.log("in register otp....driver....no errors"+otp+" "+licensenumber+" "+licenseexpiry+" "+contactnumber+" "+aadhar);
		
		function second()
		{
			
					if(dbotp==otp)
					{
					request.post('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?apiKey=...API Key....',
						{ json: { 'driverid': '3','first_name':fname,'last_name':lname,'birth_date':dob, 'driver_license_number': licensenumber,
						'expiry_date':licenseexpiry,'working':working,'driverlocation':driverlocation,'contactno':contactnumber,
						'ratings': {"ridescompleted": "0","avgrating": "5", "ridescancelled": "0","behaviour": "5", "drivingskills": "5","timelypickupdrop": "5", "conditionofvehicle": "5"},
						'vehicleused':{ "carmodelid": engine,"licenseplate": carnumber,"chassisnumber": chassis,"modelname": modelname,"modeltype": modeltype,
						"modeldescription": modeldescription,"capacitypassengers": capacitypassengers}
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
						});
		
			
					req.flash('success_msg', 'Success! You have been added to Cabchain Network');
					res.redirect('/users/details');	
					}
					else
					{
						req.flash('info', 'Failure! The OTP is incorrect');
						res.redirect('/users/details');	
					}
		}	
		
		function first(callback)
		{
			
			request('https://api.mlab.com/api/1/databases/cabchain/collections/authotps?q={"number": "'+aadhar+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var t=JSON.parse(body);
				console.log("----->"+body);
					var name=t[0].name;
					fname=name.substr(0,name.indexOf(' '));
					lname=name.substr(name.indexOf(' ')+1,name.length - name.indexOf(' ') - 1 );
					dob=t[0].dob;
					carnumber=t[0].regnumber;
					chassis=t[0].chassis;
					engine=t[0].engine;
					dbotp=t[0].otp;
				callback(second);
				}
			});
			
			
		}
		first(second);
	
	}
});	

// Register Driver
router.post('/register', function(req, res){
	var number = req.body.uid;
	var name = req.body.name;
	var dob	= req.body.dob;
	var address = req.body.address;
	var gender = req.body.gender;
	
	var numberplate = req.body.regnumber;
	var chassis = req.body.chassis;
	var engine = req.body.engine;
	
	console.log("in register....driver");

	// Validation
	req.checkBody('uid', 'All fields are mandatory').notEmpty();
	req.checkBody('name', 'All fields are mandatory').notEmpty();
	req.checkBody('gender', 'All fields are mandatory').notEmpty();
	req.checkBody('dob', 'All fields are mandatory').notEmpty();
	req.checkBody('address', 'All fields are mandatory').notEmpty();
	
	req.checkBody('regnumber', 'All fields are mandatory').notEmpty();
	req.checkBody('chassis', 'All fields are mandatory').notEmpty();
	req.checkBody('engine', 'All fields are mandatory').notEmpty();


	var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		
		var f1=0;var f2=0;var otp;
		console.log("in register....driver....no errors");
		
		
		
		function third()
		{
			
			if(f1==1 && f2==1)
			{
				console.log("authentication success");

						request.post('https://api.mlab.com/api/1/databases/cabchain/collections/authotps?apiKey=...API Key....',
						{ json: { 'number': number,'name':name,'dob':dob,'gender':gender,'address':address,'regnumber' : numberplate,'chassis'
						: chassis,'engine': engine,'otp':otp } },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
						});
						res.redirect('/users/details');
				
			}
			else
			{
				console.log("authentication failed");
				req.flash('info', 'Failure! Authentication Failed');
				res.redirect('/users/register');
				
			}

		}
		function second(callback)
		{
			
			request('https://serverauth.herokuapp.com/vahaan/'+numberplate+'/'+chassis+'/'+engine, function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("Vahan---->"+body);
				var temp=body.toString();
				if(temp.includes("yes"))
				{	
				f2=1;
				}
				callback(third);
				}
			});
		
		}
		function first(callback)
		{
			
			request('https://serverauth.herokuapp.com/aadhaar/'+number+'/'+name+'/'+gender+'/'+dob+'/'+address, function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("Aadhar---->"+body);
				var temp=body.toString();
				if(temp.includes("yes"))
				{		
				f1=1;
				otp=temp.substr(23,6);
				console.log("otp="+otp);
				}
				callback(second);
				}
			});
		
		}
		first(second);

	}
});



passport.use(new LocalStrategy(
  function(username, password, done) {
	  
  User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
   
  })); 
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});






router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});



/*

=========================================================================APIs===============================================================================
=========================================================================APIs===============================================================================
*/
//APIs
router.get('/apis',function(req,res){
	
	res.render('apis');
});



//user redirection because driver reached pickup
router.get('/userredirection-pickup/:ridetrackingno',function(req,res){
	
	var ridetrackingno=req.params.ridetrackingno;
	
		request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----***>"+body);

				if(o[0].status.length >= 5)
				res.status(200).send("[{\"status\":\"yes\"}]");
				else
				res.status(200).send("[{\"status\":\"no\"}]");
					
				
				}
			});
	
});



//user redirection because ride finished
router.get('/userredirection-finish/:ridetrackingno',function(req,res){
	
	var ridetrackingno=req.params.ridetrackingno;
	
		request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----***>"+body);

				if(o[0].status.length==6)
				res.status(200).send("[{\"status\":\"yes\"}]");
				else
				res.status(200).send("[{\"status\":\"no\"}]");
					
				
				}
			});
	
});


//driver ratings update
router.get('/updatedriverratings/:driverno/:overallrating/:behaviour/:drivingskills/:timelypickupdrop/:conditionofvehicle',function(req,res){
	
	var driverid=req.params.driverno;
	var overallrating=req.params.overallrating;
	var behaviour=req.params.behaviour;
	
	var drivingskills=req.params.drivingskills;
	var timelypickupdrop=req.params.timelypickupdrop;
	var conditionofvehicle=req.params.conditionofvehicle;
	
	var c=0;
	var overall=0;
	var b=0;
	var driving=0;
	var timely=0;
	var condition=0;
	
	
	
	var id="";
	var f1="";
	var f2="";
	var f3="";
	var f4="";
	var f5="";
	var f6="";
	var f7="";
	var f8="";
	
	var f9="";var f10="";var f11="";var f12="";var f13="";var f14="";var f15="";var f16="";var f17="";
	
	
	var newoverall=0;
	var newbehaviour=0;
	var newdriving=0;
	var newtimely=0;
	var newcondition=0;
	
	
	
	
	
	
		function second()
		{
	
			newoverall= ((c*overall + parseInt(overallrating))/(c+1)).toString();
			newbehaviour=((b*c + parseInt(behaviour))/(c+1)).toString();
			
			newdriving=((driving*c + parseInt(drivingskills))/(c+1)).toString();
			newtimely=((timely*c + parseInt(timelypickupdrop))/(c+1)).toString();
			newcondition=((condition*c + parseInt(conditionofvehicle))/(c+1)).toString();
			
			c=c+1;
			c=c.toString();
			
			console.log("Got="+c+" "+newoverall+" "+newbehaviour);
			
			newoverall=newoverall.substr(0,3);
			newbehaviour=newbehaviour.substr(0,3);
			newdriving=newdriving.substr(0,3);
			newtimely=newtimely.substr(0,3);
			newcondition=newcondition.substr(0,3);
			

			
			
			request.delete('https://api.mlab.com/api/1/databases/cabchain/collections/drivers/'+id+'?apiKey=...API Key....',function (error, response, body) {
							if (!error && response.statusCode == 200)
							{
								
									console.log("deleted...");
									
									
									request.post('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?apiKey=...API Key....',
											{ json: { 'driverid': driverid,'first_name':f1,'last_name':f2,'birth_date':f3, 'driver_license_number': f4,
												'expiry_date':f5,'working':f6,'email':f7,'driverlocation':f8,'contactno':f9,
												'ratings': {"ridescompleted": c,"avgrating": newoverall, "ridescancelled":f10 ,"behaviour":newbehaviour, "drivingskills": newdriving,"timelypickupdrop": newtimely, "conditionofvehicle": newcondition},
												'vehicleused':{ "carmodelid": f11,"licenseplate": f12,"chassisnumber": f13,"modelname": f14,"modeltype": f15,
												"modeldescription": f16,"capacitypassengers": f17}
												}  },
											function (error, response, body) {
												if (!error && response.statusCode == 200) {
													console.log("----->Insertion"+body);
												}
											});
											
											
											//blockchain participant-driver update
											request.put('https://31032026.ngrok.io/api/driver/'+driverid,
											{ json: { 

												"first_name":f1 ,
												"last_name": f2,
												"birth_date": f3,
												"expiry_date": f5,
												"working": f6,
												"email": f7,
												"driverlocation": f8,
												"contactno": f9,
												
												"ridescompleted": c,
												"avgrating": newoverall,
												"ridescancelled": f10,
												"behaviour": newbehaviour,
												"drivingskills": newdriving,
												"timelypickupdrop": newtimely,
												"conditionofvehicle": newcondition,

												"carmodelid": f11,
												"licenseplate": f12,
												"chassisnumber": f13,
												"modelname": f14,
												"modeltype": f15,
												"modeldescription": f16,
												"capacitypassengers": f17
											} },
											function (error, response, body) {
												if (!error && response.statusCode == 200) {
													console.log("----->Insertion"+body);
												}
												else
												console.log("error occurred="+JSON.stringify(response));
											});
											
							}
						});	
			


			res.status(200).send("[{\"status\":\"done\"}]");
		}
	
		function first(callback)
		{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+driverid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				
				id=o[0]._id.$oid;
				
				b=parseFloat(o[0].ratings.behaviour);
				c=parseInt(o[0].ratings.ridescompleted);
				overall=parseFloat(o[0].ratings.avgrating);
				timely=parseFloat(o[0].ratings.timelypickupdrop);
				condition=parseFloat(o[0].ratings.conditionofvehicle);
				driving=parseFloat(o[0].ratings.drivingskills);
				
				license_number=o[0].driver_license_number;
				f1=o[0].first_name;
				f2=o[0].last_name;
				f3=o[0].birth_date;
				f4=o[0].driver_license_number;
				f5=o[0].expiry_date;
				f6=o[0].working;
				f7=o[0].email;
				f8=o[0].driverlocation;
				f9=o[0].contactno;
				f10=o[0].ratings.ridescancelled;
				f11=o[0].vehicleused.carmodelid;
				f12=o[0].vehicleused.licenseplate;
				f13=o[0].vehicleused.chassisnumber;
				f14=o[0].vehicleused.modelname;
				f15=o[0].vehicleused.modeltype;
				f16=o[0].vehicleused.modeldescription;
				f17=o[0].vehicleused.capacitypassengers;
			
				
				
				callback(second);
				
				}
			});
			
			
		}	
			
			
			
			first(second);
	
	
});


//user ratings update
router.get('/updateuserratings/:userno/:overallrating/:behaviour/:ridetrackingno',function(req,res){
	
	var userid=req.params.userno;
	var overallrating=req.params.overallrating;
	var behaviour=req.params.behaviour;
	var ridetrackingno=req.params.ridetrackingno;
	
	var mobile;
	
	var c=0;
	var overall=0;
	var b=0;
	var id="";
	var f1="";
	var f2="";
	var f3="";
	var f4="";
	
	var newoverall=0;
	var newbehaviour=0;
	
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted);
	
	var time=formatted.substr(formatted.indexOf(" ")+1,8);
	var hours=parseInt(time.substr(0,2));
	var minutes=parseInt(time.substr(3,2));

	if( (minutes+30)>60)
	{
		hours=hours+6;
		if(hours>24)
		hours=hours-24;
		
		minutes=(minutes+30)-60;
	}
	else
	{
		hours=hours+5;
		if(hours>24)
		hours=hours-24;
	
		minutes=minutes+30;
	}
	
	var time=(hours.toString()).concat(":").concat(minutes.toString());
	
	
	
	
	
		function second()
		{
	
			newoverall= ((c*overall + parseInt(overallrating))/(c+1)).toString();
			newbehaviour=((b*c + parseInt(behaviour))/(c+1)).toString();
			
			c=c+1;
			c=c.toString();
			
			console.log("Got="+c+" "+newoverall+" "+newbehaviour);
			
			newoverall=newoverall.substr(0,3);
			newbehaviour=newbehaviour.substr(0,3);
			
			
								request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
								{ json: { "$set": {"rideendtime": time}
								} },
								function (error, response, body) {
									if (!error && response.statusCode == 200) {
										console.log("----->Insertion"+body);
										
																//blockchain transaction-ride insertion
																request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
																if (!error && response.statusCode == 200) 
																{
																	console.log("----->"+body);
																	var o=JSON.parse(body);
																	
																	var driver=o[0].driverid;
																	var fare="";
																	
																	for(var i=0;i<o[0].quoted.length;i++)
																	{
																		if(o[0].quoted[i].driver==driver)
																		{
																		fare=o[0].quoted[i].fare;	
																		}
																		
																	}
																
																
																	request.post('https://31032026.ngrok.io/api/Ride',
																				{ json: { 'bookingId': o[0].ridetrackingno,'driverid':o[0].driverid,'userid':o[0].userid,'ridetrackingno':o[0].ridetrackingno,
																						'ridestarttime':o[0].ridestarttime,'rideendtime':o[0].rideendtime,'addressstartingpoint':o[0].addressstartingpoint,
																						'GPSstartingpoint':o[0].GPSstartingpoint,'addressendingpoint':o[0].addressendingpoint,'GPSendingpoint':o[0].GPSendingpoint,
																						'otp':parseInt(o[0].otp),'fare':parseInt(fare)
																					}  },
																				function (error, response, body) {
																					if (!error && response.statusCode == 200) {
																						console.log("----->Insertion"+body);
																					}
																					else
																					console.log("error occured"+JSON.stringify(response));
																				});
																
																
																}
															});
															
															//blockchain participant-user update
															request.put('https://31032026.ngrok.io/api/user/'+userid,
															{ json: { 
																"firstname": f1,
																"lastname": f2,
																"mobile": mobile,
																"email": f3,
																	"count": c,
																	"averagerating": newoverall,
																	"behaviour": newbehaviour,
																	"cancelledrides": f4
															
															} },
															function (error, response, body) {
																if (!error && response.statusCode == 200) {
																	console.log("----->Insertion"+body);
																}
																else
																console.log("error occurred="+JSON.stringify(response));
															});

										
										
									}
									else
									{console.log(JSON.stringify(response));}
								});
						
						
							request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
							{ json: { "$push": {"status": "Destination Reached"}
							} },
							function (error, response, body) {
								if (!error && response.statusCode == 200) {
									console.log("----->Insertion1"+body);
								}
								else
								{console.log("Error in f1");}
							});
			
			
						request.delete('https://api.mlab.com/api/1/databases/cabchain/collections/users/'+id+'?apiKey=...API Key....',function (error, response, body) {
							if (!error && response.statusCode == 200)
							{
								
									console.log("deleted...");
									
									
									request.post('https://api.mlab.com/api/1/databases/cabchain/collections/users?apiKey=...API Key....',
											{ json: { 'userid': userid,'firstname':f1,'lastname':f2,'mobile':userid,'email':f3,'ridescompleted':{
												'count':c,
												'averagerating':newoverall,
												'behaviour':newbehaviour,
												'cancelledrides':f4
											}
											} },
											function (error, response, body) {
												if (!error && response.statusCode == 200) {
													console.log("----->Insertion"+body);
												}
											});
											
							}
						});	
						
				
				
											
		

			res.status(200).send("[{\"status\":\"done\"}]");
		}
	
		function first(callback)
		{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"userid": "'+userid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				
				id=o[0]._id.$oid;
				
				c=parseFloat(o[0].ridescompleted.count);
				overall=parseFloat(o[0].ridescompleted.averagerating);
				b=parseFloat(o[0].ridescompleted.behaviour);
				
				console.log("picked="+c+" "+overall+" "+b);
				
				
				f1=o[0].firstname;
				f2=o[0].lastname;
				f3=o[0].email;
				mobile=o[0].mobile;
				f4=o[0].ridescompleted.cancelledrides;

				
				callback(second);
				
				}
			});
			
			
		}	
			
			
			
			first(second);
	
	
});


//Ride Start:Matching the OTP entered by driver
router.get('/matchotp/:ridetrackingno/:otp',function(req,res){
	
	var ridetrackingno=req.params.ridetrackingno;
	var otp=req.params.otp;
	var dbotp="";
	var flag=0;
	var c=0;
	
	var dt = dateTime.create();
	var formatted = dt.format('Y-m-d H:M:S');
	console.log(formatted);
	
	var time=formatted.substr(formatted.indexOf(" ")+1,8);
	var hours=parseInt(time.substr(0,2));
	var minutes=parseInt(time.substr(3,2));

	if( (minutes+30)>60)
	{
		hours=hours+6;
		if(hours>24)
		hours=hours-24;
		
		minutes=(minutes+30)-60;
	}
	else
	{
		hours=hours+5;
		if(hours>24)
		hours=hours-24;
	
		minutes=minutes+30;
	}
	
	var time=(hours.toString()).concat(":").concat(minutes.toString());
	
	
	function second()
	{
	
			if(flag==1)
			{
				
				
				
						request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
						{ json: { "$set": {"ridestarttime": time}
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
							else
							{console.log(JSON.stringify(response));}
						});

							request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
							{ json: { "$push": {"status": "Driver Reached pickup point"}
							} },
							function (error, response, body) {
								if (!error && response.statusCode == 200) {
									console.log("----->Insertion1"+body);
								}
								else
								{console.log("Error in f1");}
							});
						
						
						

								request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
								{ json: { "$push": {"status": "Ride Started"}
								} },
								function (error, response, body) {
									if (!error && response.statusCode == 200) {
										c++;
										console.log("----->Insertion2"+body);
									}
									else
									{console.log("Error in f2");}
								});

						
	
							request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
							{ json: { "$push": {"status": "Ongoing"}
							} },
							function (error, response, body) {
								if (!error && response.statusCode == 200) {
									console.log("----->Insertion"+body);
								}
								else
								{console.log("Error in f3");}
							});
						
						
						
						
						res.status(200).send("[{\"status\":\"match\"}]");
			
			}
			else
			{
						
				res.status(200).send("[{\"status\":\"nomatch\"}]");
			}
			
		
	}
	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----***>"+body);
				dbotp=o[0].otp;

				if(dbotp==otp)
				flag=1;
				else
				flag=0;
					
				callback(second);	
				}
			});
	}
			
			
	first(second);

});

//displaying Quotes to users

router.get('/suggestionstousers/:ridetrackingno/:sortby/:ridetype',function(req,res){
	
	var ridetrackingno=req.params.ridetrackingno;
	var sortby=req.params.sortby;
	var ridetype=req.params.ridetype;
	
	
	var result="";
	var sortby=req.params.sortby;
	var d=0;
	
	
	
	var fare=[];
	var deviation=[]; var dv=0;
	var driver=[];
	var quotes=[];
	var name=[];
	var modelname=[];
	var modeltype=[];
	var ridescompleted=[];
	var avgrating=[];
	var ridescancelled=[];
	var behaviour=[];
	var timelypickupdrop=[];
	var conditionofvehicle=[];
	var a=0;
	
	
				
	
	
	function second(callback)
	{

	
			async.each(driver, function(apiRequest, cb) {
					apicall(apiRequest, cb);
					
			}, function(err) {
				if(err)
				console.log("error...");
				else
				process_arrays();
				
			});
			
	
			function apicall(item, cb){
    
											request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+item+'"}&apiKey=...API Key....', function (error, response, body) {
																if (!error && response.statusCode == 200) 
																{
																	console.log("----->"+body);
																	var o=JSON.parse(body);
																	var tt=0;
							
																			for(var i=0;i<o.length;i++)
																			{

																				name[a]=(o[i].first_name).concat(" ").concat(o[i].last_name);
																				modelname[a]=o[i].vehicleused.modelname;
																				modeltype[a]=o[i].vehicleused.modeltype;
																				ridescompleted[a]=o[i].ratings.ridescompleted;
																				avgrating[a]=o[i].ratings.avgrating;
																				ridescancelled[a]=o[i].ratings.ridescancelled;
																				behaviour[a]=o[i].ratings.behaviour;
																				timelypickupdrop[a]=o[i].ratings.timelypickupdrop;
																				conditionofvehicle[a]=o[i].ratings.conditionofvehicle;
																				
																				
																				if(modeltype[a]=="micro")
																				{
																				tt=0;
																				}
																				else if(modeltype[a]=="mini")
																				{
																				tt=1;
																				}
																				else if(modeltype[a]=="auto")
																				{
																				tt=5;
																				}
																				else if(modeltype[a]=="primesuv")
																				{
																				tt=2;
																				}
																				else if(modeltype[a]=="primesedan")
																				{
																				tt=4;
																				}
																				else if(modeltype[a]=="primeplay")
																				{
																				tt=3;
																				}
																				
																						if(quotes[a]>fare[tt])
																						{
																						console.log("*************"+(((quotes[a]-fare[tt])/fare[tt])*100));
																						deviation[a]=((((quotes[a]-fare[tt])/fare[tt])*100).toString()).substr(0,4).concat(" % more");	
																						}
																						else
																						{
																						console.log("*************"+(((fare[tt]-quotes[a])/fare[tt])*100));
																						deviation[a]=((((fare[tt]-quotes[a])/fare[tt])*100).toString()).substr(0,4).concat(" % less");		
																						}
																				
																				
																				console.log("DRIVER DETAILS---------------------------");
																				console.log(driver);
																				console.log(quotes);
																				console.log(name);
																				console.log(modelname);
																				console.log(modeltype);
																				console.log(ridescompleted);
																				console.log(avgrating);
																				console.log(ridescancelled);
																				console.log(behaviour);
																				console.log(timelypickupdrop);
																				console.log(conditionofvehicle);
																				
																				
																				a++;
																				
																			}
																cb();
																}
																else
																{
																console.log("error....");
																cb(error || new Error(response.statusCode));
																}
											});
	
			}
		
   
			function process_arrays()
			{
					
						console.log(driver);
						console.log(quotes);
						console.log(name);
						console.log(modelname);
						console.log(modeltype);
						console.log(ridescompleted);
						console.log(avgrating);
						console.log(ridescancelled);
						console.log(behaviour);
						console.log(timelypickupdrop);
						console.log(conditionofvehicle);
						console.log(deviation);
						

						var t1;
						var t2;
						
						
						if(sortby=="quotes")
						{
									for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
											if (quotes[j] > quotes[j+1])
											{
												t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
												t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
												t1=name[j];name[j]=name[j+1];name[j+1]=t1;
												t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
												t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
												t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
												t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
												t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
												t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
												t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
												t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
												t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
												
												
												
											}
											
										}
										
										
									}
						}
						else if(sortby=="ridescancelled")
						{
							console.log("rides cancelled.....");
									for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
													if ( parseInt(ridescancelled[j]) > parseInt(ridescancelled[j+1]))
													{
														console.log("swap");
														t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
														t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
														t1=name[j];name[j]=name[j+1];name[j+1]=t1;
														t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
														t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
														t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
														t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
														t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
														t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
														t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
														t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
														t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
											
													}
							
							
									}
							
									}
						}
						else if(sortby=="ridescompleted")
						{
							
							for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
													if ( parseInt(ridescompleted[j]) < parseInt(ridescompleted[j+1]))
													{
											
														t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
														t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
														t1=name[j];name[j]=name[j+1];name[j+1]=t1;
														t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
														t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
														t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
														t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
														t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
														t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
														t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
														t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
														t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
											
													}
							
							
									}
									}
							
							
						}
						else if(sortby=="behaviour")
						{
							
									for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
													if ( parseInt(behaviour[j]) < parseInt(behaviour[j+1]))
													{
											
														t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
														t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
														t1=name[j];name[j]=name[j+1];name[j+1]=t1;
														t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
														t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
														t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
														t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
														t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
														t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
														t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
														t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
														t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
											
													}
							
							
									}
									}
							
							
						}
						else if(sortby=="avgrating")
						{
									for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
													if ( parseInt(avgrating[j]) < parseInt(avgrating[j+1]))
													{
											
														t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
														t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
														t1=name[j];name[j]=name[j+1];name[j+1]=t1;
														t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
														t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
														t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
														t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
														t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
														t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
														t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
														t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
														t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
											
													}
							
							
									}
									}
						}
						else if(sortby=="timelypickupdrop")
						{
									for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
													if ( parseInt(timelypickupdrop[j]) < parseInt(timelypickupdrop[j+1]))
													{
											
														t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
														t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
														t1=name[j];name[j]=name[j+1];name[j+1]=t1;
														t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
														t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
														t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
														t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
														t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
														t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
														t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
														t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
														t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
											
													}
							
							
									}
									}
						}
						else if(sortby=="conditionofvehicle")
						{
						
									for(var i=0;i<(a-1);i++)
									{
										for(var j=0;j<(a-i-1);j++)
										{
											
													if ( parseInt(conditionofvehicle[j]) < parseInt(conditionofvehicle[j+1]))
													{
											
														t1=quotes[j];quotes[j]=quotes[j+1];quotes[j+1]=t1;
														t1=driver[j];driver[j]=driver[j+1];driver[j+1]=t1;
														t1=name[j];name[j]=name[j+1];name[j+1]=t1;
														t1=modelname[j];modelname[j]=modelname[j+1];modelname[j+1]=t1;
														t1=modeltype[j];modeltype[j]=modeltype[j+1];modeltype[j+1]=t1;
														t1=ridescompleted[j];ridescompleted[j]=ridescompleted[j+1];ridescompleted[j+1]=t1;
														t1=avgrating[j];avgrating[j]=avgrating[j+1];avgrating[j+1]=t1;
														t1=ridescancelled[j];ridescancelled[j]=ridescancelled[j+1];ridescancelled[j+1]=t1;
														t1=behaviour[j];behaviour[j]=behaviour[j+1];behaviour[j+1]=t1;
														t1=timelypickupdrop[j];timelypickupdrop[j]=timelypickupdrop[j+1];timelypickupdrop[j+1]=t1;
														t1=conditionofvehicle[j];conditionofvehicle[j]=conditionofvehicle[j+1];conditionofvehicle[j+1]=t1;
														t1=deviation[j];deviation[j]=deviation[j+1];deviation[j+1]=t1;
											
													}
							
							
									}
									}
									
						}
						
						
						result=result.concat("[");
						for(var i=0;i<a;i++)
						{
						
									if(modeltype[i]==ridetype || ridetype=="all")
									{
										
											if(result!="[")
												result=result.concat(",");
											
											result=result.concat("{");
											
											result=result.concat("\"name\":\"").concat(name[i]).concat("\",");
											result=result.concat("\"driver\":\"").concat(driver[i]).concat("\",");
											result=result.concat("\"modelname\":\"").concat(modelname[i]).concat("\",");
											result=result.concat("\"quote\":\"").concat(quotes[i]).concat("\",");
											result=result.concat("\"deviation\":\"").concat(deviation[i]).concat("\"");
											
											
										
											result=result.concat("}");
										
									}
										
									
							
							
						}
						result=result.concat("]");

		
	

			res.status(200).send(result);
					
					
			}

	}
	
	
	function first(callback)
	{
		
			request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
						if (!error && response.statusCode == 200) 
						{
						console.log("----->"+body);
						var o=JSON.parse(body);
						
							for(var i=0;i<o.length;i++)
							{
									
									fare[0]=parseFloat(o[0].fare[0]);
									fare[1]=parseFloat(o[0].fare[1]);
									fare[2]=parseFloat(o[0].fare[2]);
									fare[3]=parseFloat(o[0].fare[3]);
									fare[4]=parseFloat(o[0].fare[4]);
									fare[5]=parseFloat(o[0].fare[5]);
									
									for(var j=0;j<o[i].quoted.length;j++)
									{	
										
										
										if(o[i].quoted[j].rejected=="0")
										{
													
													//console.log("******"+"  "+"driver="+o[i].quoted[j].driver+"   quote="+parseInt(o[i].quoted[j].fare));
													driver[d]=o[i].quoted[j].driver;
													quotes[d]=parseInt(o[i].quoted[j].fare);
													
													
													d++;
													//result=result.concat("{\"driver\":\"").concat(o[i].quoted[j].driver).concat("\",\"fare\":\"").concat(o[i].quoted[j].fare).concat("\"}");
													
										}
										
									}
								
							}
						callback(second);
						}
					});
	}
	first(second);
	
	
	
});


//driver quote rejected by a user
router.get('/ridereject/:ridetrackingno/:driverno',function(req,res){
	
	var ridetrackingno=req.params.ridetrackingno;
	var driverno=req.params.driverno;
	var result="";
	var id="";
	

	
						
	function second()
	{
							request.delete('https://api.mlab.com/api/1/databases/cabchain/collections/rides/'+id+'?apiKey=...API Key....',function (error, response, body) {
							if (!error && response.statusCode == 200)
							{
								
									console.log("deleted...");
									result=JSON.parse(result);
											request.post('https://api.mlab.com/api/1/databases/cabchain/collections/rides?apiKey=...API Key....',
											{ json: result },
											function (error, response, body) {
												if (!error && response.statusCode == 200) {
													console.log("----->"+body);
												}
											
												else
												console.log("-----XXXXX>"+error);
											}
											);
									
									
									
							res.status(200).send("[\"success\"]");		
							}
						});	
		
	}



	function first(callback)
	{
		
		
			request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
						console.log("----->"+body);
						var o=JSON.parse(body);
						id=o[0]._id.$oid;
						
						result=result.concat("{");
						
							for(var i=0;i<o.length;i++)
							{
									result=result.concat("\"driverid\":\"").concat(o[0].driverid).concat("\",");
									result=result.concat("\"userid\":\"").concat(o[0].userid).concat("\",");
									result=result.concat("\"ridetrackingno\":\"").concat(o[0].ridetrackingno).concat("\",");
									result=result.concat("\"ridestarttime\":\"").concat(o[0].ridestarttime).concat("\",");
									result=result.concat("\"rideendtime\":\"").concat(o[0].rideendtime).concat("\",");
									result=result.concat("\"addressstartingpoint\":\"").concat(o[0].addressstartingpoint).concat("\",");
									result=result.concat("\"addressendingpoint\":\"").concat(o[0].addressendingpoint).concat("\",");
									result=result.concat("\"GPSstartingpoint\":\"").concat(o[0].GPSstartingpoint).concat("\",");
									result=result.concat("\"GPSendingpoint\":\"").concat(o[0].GPSendingpoint).concat("\",");
									result=result.concat("\"fare\":\"").concat(o[0].fare).concat("\",");
									result=result.concat("\"distance\":\"").concat(o[0].distance).concat("\",");
									result=result.concat("\"otp\":\"").concat(o[0].otp).concat("\",");
									result=result.concat("\"cancelled\":\"").concat(o[0].cancelled).concat("\",");
									result=result.concat("\"quoted\":[");
									
									for(var j=0;j<o[0].quoted.length;j++)
									{
											result=result.concat("{");
											result=result.concat("\"driver\":\"").concat(o[0].quoted[j].driver).concat("\",");
											result=result.concat("\"fare\":\"").concat(o[0].quoted[j].fare).concat("\",");
											
											console.log("---->"+o[0].quoted[j].driver+"         "+driverno);
											
											if(o[0].quoted[j].driver==driverno)
											{
											console.log("done-1");
											result=result.concat("\"rejected\":\"").concat("1").concat("\"");
											}
											else
											result=result.concat("\"rejected\":\"").concat(o[0].quoted[j].rejected).concat("\"");
											
											
											
											result=result.concat("}");
											if( (o[0].quoted.length-j)>=2)
											result=result.concat(",");
											
									}
								
									result=result.concat("],");
									
									result=result.concat("\"status\":[");
									
									for(var j=0;j<o[0].status.length;j++)
									{
											result=result.concat("\"").concat(o[0].status[j]).concat("\"");
											if( (o[0].status.length-j)>=2)
											result=result.concat(",");
											
									}
									
							result=result.concat("]}");
									
									
							}
							
							
				callback(second);
				}
			});
		
	





	}

	
	first(second);
	
});



//driver quote accepted by a user
router.get('/rideaccept/:ridetrackingno/:driverno',function(req,res){
	
	var ridetrackingno=req.params.ridetrackingno;
	var driverno=req.params.driverno;
	var result="";
	var otp="";
	var fare="";
	var distance="";
	
	
	
			
		function second()
		{
				request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
						{ json: { "$set": {"driverid": driverno}
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
							else
							{console.log(JSON.stringify(response));}
						});
	
				request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
						{ json: { "$push": {"status": "Driver Assigned"}
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
							else
							{console.log(JSON.stringify(response));}
						});
									
			return res.status(200).send(result);	
			
		}
		function first(callback)
		{
			
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+driverno+'"}&apiKey=...API Key....', function (error, response, body) {
																if (!error && response.statusCode == 200) 
																{
																	console.log("----->"+body);
																	var o=JSON.parse(body);
																	result=result.concat("[{");
																	result=result.concat("\"firstname\":\"").concat(o[0].first_name).concat("\",");
																	result=result.concat("\"lastname\":\"").concat(o[0].last_name).concat("\",");
																	result=result.concat("\"otp\":\"").concat(otp).concat("\",");
																	result=result.concat("\"fare\":\"").concat(fare).concat("\",");
																	result=result.concat("\"distance\":\"").concat(distance).concat("\",");
																	result=result.concat("\"contactno\":\"").concat(o[0].contactno).concat("\",");
																	result=result.concat("\"driverlocation\":\"").concat(o[0].driverlocation).concat("\",");
																	result=result.concat("\"licenseplate\":\"").concat(o[0].vehicleused.licenseplate).concat("\",");
																	result=result.concat("\"modelname\":\"").concat(o[0].vehicleused.modelname).concat("\",");
																	result=result.concat("\"modeltype\":\"").concat(o[0].vehicleused.modeltype).concat("\",");
																	
																	result=result.concat("\"modeldescription\":\"").concat(o[0].vehicleused.modeldescription).concat("\"");
																	
																	
																	
																	result=result.concat("}]");
																callback(second);	
																}	
											});
			
		}

		
		
		function prefirst(callback)
		{
		
					request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				otp=o[0].otp;
				distance=o[0].distance;
				
					for(var i=0;i<o[0].quoted.length;i++)
					{
							if(o[0].quoted[i].driver==driverno)
							{
							fare=o[0].quoted[i].fare;
							break;
							}
						
					}
				
				
				
				callback(first);
				}
			});
		
			
		}
		
		
		prefirst(first);
	
	
});


//driver quoting a ride
router.get('/driverquote/:driver/:ridetrackingno/:quote',function(req,res){
	
	var driver=req.params.driver;
	var ridetrackingno=req.params.ridetrackingno;
	var quote=req.params.quote;
	
	
	
			request.put('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+ridetrackingno+'"}&apiKey=...API Key....',
						{ json: { "$push": {"quoted": {"driver": driver, "fare": quote,"rejected":"0"}}
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
								return res.status(200).send("[{\"status\":\"success\"}]");
							}
							else
							{console.log(JSON.stringify(response));}
						});

		
	
});



//giving suggestions to driver
router.get('/newrequests-driversuggestion/:phone',function(req,res){
	
	
	var start="";
	var driverphone=req.params.phone;
	var end="";
	var fare="";
	var phone=""; //userphone
	var result="";
	var flag=0;
	var driverbooked=0;
	var tt=0;
	var time="";
	
	
	
	
	function second()
	{
		
	request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				result=result.concat("[");
				
				console.log("driverphone="+driverphone);
				
					for(var i=0;i<o.length;i++)
					{
						
							flag=0;
							console.log("tuple="+(i+1)+"  length,quoted="+o[i].quoted.length);
							for(var j=0;j<o[i].quoted.length;j++)
							{
									if(o[i].quoted[j].driver==driverphone)
									{
									flag=1;break;	
									}
								
							}
							
							
							if(o[i].status.length==1 && flag==0)
							{
								
									start=o[i].addressstartingpoint;
									end=o[i].addressendingpoint;
									phone=o[i].ridetrackingno;
									
									fare=o[i].fare[tt];
									
									
									if(result!="" && result!="[")
									result=result.concat(",");
								
									result=result.concat("{\"start\":\"").concat(start).concat("\",\"booked\":\"").concat("0").concat("\",\"end\":\"").concat(end).concat("\",\"fare\":\"").concat(fare).concat("\",\"phone\":\"").concat(phone);
									result=result.concat("\"}");
								
								


							}
							if(o[i].status.length==2 && o[i].driverid==driverphone)
							{
							driverbooked=1;
							break;
							}
						
					}
				
				result=result.concat("]");
				
				if(driverbooked==1)
				{
						result="";
						result=result.concat("[{");
						result=result.concat("\"booked\":\"").concat("1").concat("\",");
						result=result.concat("\"userid\":\"").concat(o[i].userid).concat("\",");
						result=result.concat("\"ridetrackingno\":\"").concat(o[i].ridetrackingno).concat("\",");
						result=result.concat("\"addressstartingpoint\":\"").concat(o[i].addressstartingpoint).concat("\",");
						result=result.concat("\"addressendingpoint\":\"").concat(o[i].addressendingpoint).concat("\",");
						result=result.concat("\"GPSstartingpoint\":\"").concat(o[i].GPSstartingpoint).concat("\",");
						result=result.concat("\"GPSendingpoint\":\"").concat(o[i].GPSendingpoint).concat("\",");
						result=result.concat("\"fare\":\"").concat(o[i].fare[tt]).concat("\",");
						result=result.concat("\"time\":\"").concat(time).concat("\",");
						result=result.concat("\"distance\":\"").concat(o[i].distance).concat("\"");
						
						result=result.concat("}]");
					
				}
				
				
				return res.status(200).send(result);
				}
			});
	}




	function first(callback)
	{
		
		request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+driverphone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("------>"+body);
				var o=JSON.parse(body);
				var type=o[0].vehicleused.modeltype;
				
						if(type=="micro")
																				{
																				tt=0;
																				}
																				else if(type=="mini")
																				{
																				tt=1;
																				}
																				else if(type=="auto")
																				{
																				tt=5;
																				}
																				else if(type=="primesuv")
																				{
																				tt=2;
																				}
																				else if(type=="primesedan")
																				{
																				tt=4;
																				}
																				else if(type=="primeplay")
																				{
																				tt=3;
																				}
				
				
				
				console.log("tt====="+tt);
				callback(second);
				}
			});
		
	}
			
			
			
	first(second);	
	
});

//inserting a new Ride Request in DB 
router.get('/riderequestplaced/:userid/:ridetrackingno/:addressSP/:addressEP/:gpsSP/:gpsEP/:fare/:distance/:otp',function(req,res){
	
	
	var userid=req.params.userid;
	var ridetrackingno=req.params.ridetrackingno;
	var addressSP=req.params.addressSP;
	var addressEP=req.params.addressEP;
	var gpsSP=req.params.gpsSP;
	var gpsEP=req.params.gpsEP;
	var fare=req.params.fare;
	var distance=req.params.distance;
	var otp=req.params.otp;
	
	var micro=fare.substr(0,fare.indexOf("*"));
	var mini=fare.substr(fare.indexOf("*")+1,fare.indexOf("**")-(fare.indexOf("*")+1));
	var suv=fare.substr(fare.indexOf("**")+2,fare.indexOf("***")-(fare.indexOf("**")+2));
	var play=fare.substr(fare.indexOf("***")+3,fare.indexOf("****")-(fare.indexOf("***")+3));
	var sedan=fare.substr(fare.indexOf("****")+4,fare.indexOf("*****")-(fare.indexOf("****")+4));
	var auto=fare.substr(fare.indexOf("*****")+5,fare.indexOf("******")-(fare.indexOf("*****")+5));
	
	
	
	
	request.post('https://api.mlab.com/api/1/databases/cabchain/collections/rides?apiKey=...API Key....',
						{ json: { 'driverid': '','userid':userid,'ridetrackingno':ridetrackingno,'ridestarttime':'', 'rideendtime': '',
						'addressstartingpoint':addressSP,'GPSstartingpoint':gpsSP,'addressendingpoint':addressEP,'GPSendingpoint':gpsEP,
						'fare':[micro,mini,suv,play,sedan,auto],'distance':distance,'otp':otp,'cancelled':'0',
						'quoted':[],
						'status': ['Ride Booked']
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
								return res.status(200).send("[{\"status\":\"success\"}]");
							}
						});
	
});


//get driver locations nearby your location for setMarker props
router.get('/getdriverlocations',function(req,res){
	
	var result="[";
	var lat="";
	var lon="";
	var l="";
	var driverid="";
	
		request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				
				for(var i=0;i<o.length;i++)
				{
					if(result != "[")
						result=result.concat(",");
					l=o[i].driverlocation;
					lat=l.substr(0,l.indexOf(' '));
					lon=l.substr(l.indexOf(' ')+1,l.length - l.indexOf(' ')-1);
					driverid=o[i].driverid;
					
					
					
					result=result.concat("{\"latitude\":\"").concat(lat).concat("\",\"longitude\":\"").concat(lon).concat("\",\"driver\":\"").concat(driverid).concat("\",\"type\":\"").concat(o[i].vehicleused.modeltype).concat("\"}");		
				}
				result=result.concat("]");
				
				return res.status(200).send(result);
				}
			});
			
			
	
	
});



//sending promotional message to a user
router.get('/promotionalsms/:name/:phone/:receiverphone',function(req,res){
	var name=req.params.name;
	var phone=req.params.phone;
	var receiverphone=req.params.receiverphone;
	
	nexmo.message.sendSms(
		'919820364381', '91'+receiverphone, 'Hey '+receiverphone+', you are invited to join the fastest growing cab service CabChain based on blockchain by '+name+'('+phone+').',
				(err, responseData) => {
				if (err) {
				console.log(err);
				} else {
				console.dir(responseData);
				}
				}
		);
		
	return res.status(200).send("{\"status\":\"Message Sent\"}");
	
	
	
});



//getting previous rides of a user
router.get('/previousrides/:mobile',function(req,res){
	
	var phone=req.params.mobile;
	var result="";
	var a=0;
	var b=0;
	var distance=[];
	var driverid=[];
	var userid=[];var ridetrackingno=[];
	var ridestarttime=[];
	var rideendtime=[];
	var addressstartingpoint=[];
	var addressendingpoint=[];
	var f1=[];var f2=[];var f3=[];var f4=[];var f5=[];var f6=[];
	var f=[];
	var distance=[];
	
	
	
	
	
	function second()
	{
		
		async.each(driverid, function(apiRequest, cb) {
					apicall(apiRequest, cb);
					
			}, function(err) {
				if(err)
				console.log("error...");
				else
				process_arrays();
				
			});
			
	
			function apicall(item, cb){
    
											request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+item+'"}&apiKey=...API Key....', function (error, response, body) {
																if (!error && response.statusCode == 200) 
																{
																	console.log("----->"+body);
																	var o=JSON.parse(body);
																	var tt=0;
							
																			for(var i=0;i<o.length;i++)
																			{
																				
																				
																				if(o[i].vehicleused.modeltype=="micro")
																				{
																				f[b]=f1[b];
																				}
																				else if(o[i].vehicleused.modeltype=="mini")
																				{
																				f[b]=f2[b];
																				}
																				else if(o[i].vehicleused.modeltype=="auto")
																				{
																				f[b]=f6[b];
																				}
																				else if(o[i].vehicleused.modeltype=="primesuv")
																				{
																				f[b]=f3[b];
																				}
																				else if(o[i].vehicleused.modeltype=="primesedan")
																				{
																				f[b]=f4[b];
																				}
																				else if(o[i].vehicleused.modeltype=="primeplay")
																				{
																				f[b]=f4[b];
																				}
																				
																						
																				b++;
																				
																			}
																cb();
																}
																else
																{
																console.log("error....");
																cb(error || new Error(response.statusCode));
																}
											});
	
			}
		
   
			function process_arrays()
			{
				
			result="";
			result=result.concat("[");
			
			for(var i=0;i<a;i++)
			{
			
									if(result!="[")
									result=result.concat(",");
								
									result=result.concat("{");
									
									result=result.concat("\"driverid\":\"").concat(driverid[i]).concat("\",");
									result=result.concat("\"userid\":\"").concat(userid[i]).concat("\",");
									result=result.concat("\"ridetrackingno\":\"").concat(ridetrackingno[i]).concat("\",");
									result=result.concat("\"ridestarttime\":\"").concat(ridestarttime[i]).concat("\",");
									result=result.concat("\"rideendtime\":\"").concat(rideendtime[i]).concat("\",");
									result=result.concat("\"addressstartingpoint\":\"").concat(addressstartingpoint[i]).concat("\",");
									result=result.concat("\"addressendingpoint\":\"").concat(addressendingpoint[i]).concat("\",");
									result=result.concat("\"fare\":\"").concat(f[i]).concat("\",");
									result=result.concat("\"distance\":\"").concat(distance[i]).concat("\"}");
						
			}			
			result=result.concat("]");
		
	

			res.status(200).send(result);
					
					
			}

	}
		
	
	
	
	
	function first(callback)
	{
				request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"userid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				
					for(var i=0;i<o.length;i++)
					{
							
							if(o[i].status.length==6)
							{
									distance[a]=o[i].distance;
									driverid[a]=o[i].driverid;
									userid[a]=o[i].userid;
									ridetrackingno[a]=o[i].ridetrackingno;
									ridestarttime[a]=o[i].ridestarttime;
									rideendtime[a]=o[i].rideendtime;
									addressstartingpoint[a]=o[i].addressstartingpoint;
									addressendingpoint[a]=o[i].addressendingpoint;
								
									distance[a]=o[i].distance;
									f1[a]=o[i].fare[0];
									f2[a]=o[i].fare[1];
									f3[a]=o[i].fare[2];
									f4[a]=o[i].fare[3];
									f5[a]=o[i].fare[4];
									f6[a]=o[i].fare[5];
									
									console.log("DONE!!!!!!!!!!!");
									
									a++;
							}
						
					}
				console.log("a="+a);
				callback(second);
				}
			});
	}
	
	
	
	first(second);
	
	
});






//getting driver's location

router.get('/driver-location/:mobile',function(req,res){
	
	var phone=req.params.mobile;
	var lat="";
	var result="";
	var lon="";
	
request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				result=result.concat("[{");
				
					for(var i=0;i<o.length;i++)
					{
					lat=(o[0].driverlocation).substr(0,o[0].driverlocation.indexOf(" "));		
					lon=(o[0].driverlocation).substr(o[0].driverlocation.indexOf(" ")+1,o[0].driverlocation.length-o[0].driverlocation.indexOf(" "));	;
						
					}
				
				result=result.concat("\"latitude\":\"").concat(lat).concat("\",").concat("\"longitude\":\"").concat(lon).concat("\"");
				result=result.concat("}]");
				return res.status(200).send(result);
				}
			});


});



//getting previous rides of a driver
router.get('/driver-previousrides/:mobile',function(req,res){
	
	var phone=req.params.mobile;
	var result="";
	var tt=0;
	
	
	function second()
	{
	request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"driverid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				result=result.concat("[");
				
					for(var i=0;i<o.length;i++)
					{
							
							if(o[i].status.length==6)
							{
								
									if(result!="" && result!="[")
									result=result.concat(",");
								
								
									result=result.concat("{\"driverid\":\"").concat(o[i].driverid).concat("\",");
									result=result.concat("\"userid\":\"").concat(o[i].userid).concat("\",");
									result=result.concat("\"ridetrackingno\":\"").concat(o[i].ridetrackingno).concat("\",");
									result=result.concat("\"ridestarttime\":\"").concat(o[i].ridestarttime).concat("\",");
									result=result.concat("\"rideendtime\":\"").concat(o[i].rideendtime).concat("\",");
									result=result.concat("\"addressstartingpoint\":\"").concat(o[i].addressstartingpoint).concat("\",");
									result=result.concat("\"addressendingpoint\":\"").concat(o[i].addressendingpoint).concat("\",");
									result=result.concat("\"fare\":\"").concat(o[i].fare[tt]).concat("\",");
									result=result.concat("\"distance\":\"").concat(o[i].distance).concat("\"}");

							}
						
					}
				
				result=result.concat("]");
				return res.status(200).send(result);
				}
			});
	}
	
	
	function first(callback)
	{
		
		request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
						console.log("------>"+body);
						var o=JSON.parse(body);
						var type=o[0].vehicleused.modeltype;
						
								if(type=="micro")
																						{
																						tt=0;
																						}
																						else if(type=="mini")
																						{
																						tt=1;
																						}
																						else if(type=="auto")
																						{
																						tt=5;
																						}
																						else if(type=="primesuv")
																						{
																						tt=2;
																						}
																						else if(type=="primesedan")
																						{
																						tt=4;
																						}
																						else if(type=="primeplay")
																						{
																						tt=3;
																						}
						
						
						
						console.log("tt====="+tt);
				callback(second);
				}
			});
		
	}
	
	
	first(second);
});



//getting a user details based on his phone number
router.get('/getUsername/:phone',function(req,res){
	
	var phone=req.params.phone;
	var name="";
	var email="";
	var fname="";
	var lname="";
	var result="";
	
	request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"userid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				fname=o[0].firstname;
				lname=o[0].lastname;
				name=fname.concat(" ").concat(lname);
				email=o[0].email;
				
				result=result.concat("{\"name\":\"").concat(name).concat("\",\"email\":\"").concat(email).concat("\"}");
				return res.status(200).send(result);
				
				}
			});
	
});


//getting rate-card for a city
router.get('/ratecard/:city',function(req,res){
	
		var city=req.params.city;
		var result="";
		
		request('https://api.mlab.com/api/1/databases/cabchain/collections/fare?apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);

				
					for(var i=0;i<o[0].farematrix.length;i++)
					{
								if(o[0].farematrix[i].cityname==city)
								{
										console.log("found the city"+city);
									
									result=result.concat("[{\"cityname\":\"").concat(city).concat("\",");
									result=result.concat("\"micro\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].micro.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].micro.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].micro.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].micro.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].micro.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].micro.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].micro.cancellationafter).concat("\"},");
									result=result.concat("\"mini\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].mini.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].mini.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].mini.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].mini.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].mini.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].mini.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].mini.cancellationafter).concat("\"},");
									result=result.concat("\"primesedan\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].primesedan.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].primesedan.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].primesedan.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].primesedan.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].primesedan.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].primesedan.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].primesedan.cancellationafter).concat("\"},");
									result=result.concat("\"primesuv\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].primesuv.basefare).concat("\",");result=result.concat("\"tillbasedistance\":\"").concat(o[0].farematrix[i].primesuv.tillbasedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].primesuv.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].primesuv.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].primesuv.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].primesuv.cancellationafter).concat("\"},");
									
									result=result.concat("\"primeplay\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].primeplay.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].primeplay.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].primeplay.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].primeplay.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].primeplay.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].primeplay.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].primeplay.cancellationafter).concat("\"},");
									result=result.concat("\"lux\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].lux.basefare).concat("\",");result=result.concat("\"tilldistance\":\"").concat(o[0].farematrix[i].lux.tilldistance).concat("\",");result=result.concat("\"tillfareperkm\":\"").concat(o[0].farematrix[i].lux.tillfareperkm).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].lux.afterperkm).concat("\",");result=result.concat("\"faretimepermin\":\"").concat(o[0].farematrix[i].lux.faretimepermin).concat("\",");result=result.concat("\"cancellationnow\":\"").concat(o[0].farematrix[i].lux.cancellationnow).concat("\",");result=result.concat("\"cancellationafter\":\"").concat(o[0].farematrix[i].lux.cancellationafter).concat("\"},");
									result=result.concat("\"auto\": {");result=result.concat("\"basefare\":\"").concat(o[0].farematrix[i].auto.basefare).concat("\",");result=result.concat("\"basedistance\":\"").concat(o[0].farematrix[i].auto.basedistance).concat("\",");result=result.concat("\"afterperkm\":\"").concat(o[0].farematrix[i].auto.afterperkm).concat("\"}}]");
																					
									break;
								
								}
								
					}
					
					
				//result=result.concat("]}");
				
				console.log("--->"+result);
				return res.status(200).send(result);

				}
			});
			

		
	
	
});



//matching OTP for login for registered user and registered driver
//adding new user to database
router.get('/userOTPLogin/:phone/:otp',function(req,res){
	
			var phone=req.params.phone;
			var otp=req.params.otp;
			var dbotp='';

			
			
	function second()
	{
	
	if(dbotp==otp)
	return res.status(200).send(JSON.stringify("match"));
	else
	return res.status(200).send(JSON.stringify("nomatch"));	
	}
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/userloginotps?q={"phone": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("------>"+body);
				var o=JSON.parse(body);
				dbotp=o[0].otp;
				callback(second);
				}
				
			});
	}
	
	first(second);
});



//adding new user to database
router.get('/useradd/:phone/:email/:name',function(req,res){
	
			var phone=req.params.phone;
			var email=req.params.email;
			var name=req.params.name;
			var fname=name.substr(0,name.indexOf(' '));
			var lname=name.substr(name.indexOf(' ')+1,name.length - name.indexOf(' ')-1);
			
			
			request.post('https://api.mlab.com/api/1/databases/cabchain/collections/users?apiKey=...API Key....',
						{ json: { 'userid': phone,'firstname':fname,'lastname':lname,'mobile':phone,'email':email,'ridescompleted':{
							'count':'0',
							'averagerating':'0',
							'behaviour':'0',
							'cancelledrides':'0'
						}
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
						});
	
	return res.status(200).send(JSON.stringify("done"));
});



//On login Checking whether user's number is registered with us or not.
//If yes, just send OTP to him for 2nd page. Json response = Match,name,email
router.get('/userlogin/:phone',function(req,res){
	
	
			var phone=req.params.phone;
			var flag=0;
			var fname='';
			var lname='';
			var email="";
			var name="";
			var result="";

			
			
	function second()
	{
		
		if(flag==1)
		{
		var t=(Math.floor(100000 + Math.random() * 900000)).toString();
		nexmo.message.sendSms(
		'919820364381', '91'+phone, 'Hey '+fname+' '+lname+', The OTP for login is '+t,
				(err, responseData) => {
				if (err) {
				console.log(err);
				} else {
				console.dir(responseData);
				}
				}
		);
		
		
							request.post('https://api.mlab.com/api/1/databases/cabchain/collections/userloginotps?apiKey=...API Key....',
						{ json: { 'phone': phone,'otp':t
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
						});				
						
		}
		
	
	if(flag==0)
	{		
    result=result.concat("{\"status\":\"").concat("nomatch\"}");
	return res.status(200).send(result);
	}
	else
	{
		result=result.concat("{\"status\":\"").concat("match").concat("\",\"name\":\"").concat(name).concat("\",\"email\":\"").concat(email).concat("\"}");
		return res.status(200).send(result);
	}
	}
			
		
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"mobile": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("------>"+body);
				var o=JSON.parse(body);
				if(!(o[0]==undefined))
				{
				flag=1;	
				fname=o[0].firstname;
				lname=o[0].lastname;
				email=o[0].email;
				name=fname.concat(" ").concat(lname);
				}
				
				
				callback(second);
				}
			});
	}
	
	first(second);

});



//ratings of user 
router.get('/userratings/:phone',function(req,res){
	var phone=req.params.phone;
	
	var phone=req.params.phone;
	
	var result="";
	var rc="";
	var rcancelled="";
	var avgrating="";
	var drivingskills="";
	var behaviour="";
	
	function second()
	{
	result=result.concat("[{\"ridescompleted\":\"").concat(rc).concat("\",\"ridescancelled\":\"").concat(rcancelled).concat("\",\"avgrating\":\"").concat(avgrating).concat("\",\"behaviour\":\"").concat(behaviour).concat("\"}]");	
	return res.status(200).send(result);	
	}	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"userid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("------>"+body);
				var o=JSON.parse(body);
				if(!(o[0]==undefined))
				{
				rc=o[0].ridescompleted.count;
				rcancelled=o[0].ridescompleted.cancelledrides;
				avgrating=o[0].ridescompleted.averagerating;
				behaviour=o[0].ridescompleted.behaviour;
				
				}
				
				
				callback(second);
				}
			});
	}
	
	first(second);
	
});





//ratings of driver
router.get('/driverratings/:phone',function(req,res){
	var phone=req.params.phone;
	
	var result="";
	var rc="";
	var rcancelled="";
	var avgrating="";
	var drivingskills="";
	var behaviour="";
	var timelypickupdrop="";
	var conditionofvehicle="";
	
	function second()
	{
	result=result.concat("[{\"ridescompleted\":\"").concat(rc).concat("\",\"ridescancelled\":\"").concat(rcancelled).concat("\",\"avgrating\":\"").concat(avgrating).concat("\",\"drivingskills\":\"").concat(drivingskills).concat("\",\"behaviour\":\"").concat(behaviour).concat("\",\"timelypickupdrop\":\"").concat(timelypickupdrop).concat("\",\"conditionofvehicle\":\"").concat(conditionofvehicle).concat("\"}]");	
	return res.status(200).send(result);	
	}	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("------>"+body);
				var o=JSON.parse(body);
				if(!(o[0]==undefined))
				{
				rc=o[0].ratings.ridescompleted;
				rcancelled=o[0].ratings.ridescancelled;
				avgrating=o[0].ratings.avgrating;
				drivingskills=o[0].ratings.drivingskills;
				behaviour=o[0].ratings.behaviour;
				timelypickupdrop=o[0].ratings.timelypickupdrop;
				conditionofvehicle=o[0].ratings.conditionofvehicle;
				
				}
				
				
				callback(second);
				}
			});
	}
	
	first(second);
	
});



//On login Checking whether driver is registered or not.
//If yes, just send OTP to him for 2nd page. Json response = Match,name,email
router.get('/driverlogin/:phone',function(req,res){
	
	
			var phone=req.params.phone;
			var flag=0;
			var fname='';
			var lname='';
			var email="";
			var name="";
			var result="";

			
			
	function second()
	{
		
		if(flag==1)
		{
		var t=(Math.floor(100000 + Math.random() * 900000)).toString();
		nexmo.message.sendSms(
		'919820364381', '91'+phone, 'Hey '+fname+' '+lname+', The OTP for login is '+t,
				(err, responseData) => {
				if (err) {
				console.log(err);
				} else {
				console.dir(responseData);
				}
				}
		);
		
		
							request.post('https://api.mlab.com/api/1/databases/cabchain/collections/userloginotps?apiKey=...API Key....',
						{ json: { 'phone': phone,'otp':t
						} },
						function (error, response, body) {
							if (!error && response.statusCode == 200) {
								console.log("----->Insertion"+body);
							}
						});				
						
		}
		
	
	if(flag==0)
	{		
    result=result.concat("{\"status\":\"").concat("nomatch\"}");
	return res.status(200).send(result);
	}
	else
	{
		result=result.concat("{\"status\":\"").concat("match").concat("\",\"name\":\"").concat(name).concat("\",\"email\":\"").concat(email).concat("\"}");
		return res.status(200).send(result);
	}
	}
			
		
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+phone+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("------>"+body);
				var o=JSON.parse(body);
				if(!(o[0]==undefined))
				{
				flag=1;	
				fname=o[0].first_name;
				lname=o[0].last_name;
				email=o[0].email;
				name=fname.concat(" ").concat(lname);
				}
				
				
				callback(second);
				}
			});
	}
	
	first(second);

});












var operationalcities=["mumbai","bengaluru"];


//Compute fare as per Government rates as a suggestion to driver to quote his charge for incoming request
//while calling localhost:3000/users/....url....

router.get('/fare-computation-government-rates/:src/:dest',function(req,res){
	
	var source=req.params.src;
	var destination=req.params.dest;
	var result="";
	var micro=0;
	var mini=0;
	var sedan=0;
	var play=0;
	var suv=0;
	var lux=0;
	var auto=0;
	var result;
	var distance=0; var time=0;var city;var f=0;				
	var lat="";
	var lon="";
	var l="";
	var cartype="";
	var start=0;
	var micro=1000000,mini=1000000,primesuv=1000000,primeplay=1000000,primesedan=1000000,auto=1000000;
	var locs=[[0,0,""],[0,0,""],[0,0,""],[0,0,""],[0,0,""],[0,0,""]];
	
	
	function eight()
	{
	
	result=result.concat(",");
	result=result.concat("{\"micro\":\"").concat(micro).concat("\",\"mini\":\"").concat(mini).concat("\",\"primesuv\":\"").concat(primesuv).concat("\",\"primesedan\":\"");
	result=result.concat(primesedan).concat("\",\"primeplay\":\"").concat(primeplay).concat("\",\"auto\":\"").concat(auto);
	result=result.concat("\"}]");
		
	return res.status(200).send(result);	
	}
	
	
	
	
		function seventh(callback)
	{
	
	
				request('https://maps.googleapis.com/maps/api/directions/json?origin='+locs[3][0]+','+locs[3][1]+'&destination='+source+'&mode=driving&key=...API Key....', function (error, response, body) {
											if (!error && response.statusCode == 200) 
											{
											
												start++;
												console.log("----->Fourth="+start);
												body = body.replace('\u003c/b','');	
												body = body.replace('\u003e/','');
												body = body.replace('\u003cb','');
												body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
												body = body.replace('<div>','');
												body = body.replace('</div>','');
												var o2=JSON.parse(body);
												var t1=o2.routes[0].legs[0].duration.text;
												
												
												if(t1.indexOf("hours") != -1)
												{
													
													console.log("came here");
													var t2=t1.substr(0,t1.indexOf(' '));
													t2=(parseInt(t2))*60;
													
													console.log("hours-mins="+t2);
													
													t1=t1.substr(t1.indexOf('hours')+6);
													console.log("only mins="+t1);
													t1=t1.substr(0,t1.indexOf(' '));
													t1=parseInt(t1);
													t1=t1+t2;
													
													
													
												}
												else
												{
												t1=t1.substr(0,t1.indexOf(' '));
												t1=parseInt(t1);
												}
												
												console.log("final t1="+t1);
												
												
												if(locs[3][2]=="micro")
												{

													console.log("micro updated");
													micro=t1;

												}
												else if(locs[3][2]=="mini")
												{
													
														mini=t1;
														console.log("mini updated");
													
												}
												else if(locs[3][2]=="primesuv")
												{
											
														primesuv=t1;
												}
												else if(locs[3][2]=="primeplay")
												{
													
														primeplay=t1;
												}
												else if(locs[3][2]=="primesedan")
												{
													
														primesedan=t1;
												}
												else if(locs[3][2]=="auto")
												{
														
														auto=t1;
														console.log("auto updated"+auto);
												}

											callback(eight);
											}
										});
	
	
	}
	
	
		function sixth(callback)
	{
	
	
				request('https://maps.googleapis.com/maps/api/directions/json?origin='+locs[2][0]+','+locs[2][1]+'&destination='+source+'&mode=driving&key=...API Key....', function (error, response, body) {
											if (!error && response.statusCode == 200) 
											{
											
												start++;
												console.log("----->Fourth="+start);
												body = body.replace('\u003c/b','');	
												body = body.replace('\u003e/','');
												body = body.replace('\u003cb','');
												body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
												body = body.replace('<div>','');
												body = body.replace('</div>','');
												var o2=JSON.parse(body);
												var t1=o2.routes[0].legs[0].duration.text;
												
												if(t1.indexOf("hours") != -1)
												{
													
													console.log("came here");
													var t2=t1.substr(0,t1.indexOf(' '));
													t2=(parseInt(t2))*60;
													
													console.log("hours-mins="+t2);
													
													t1=t1.substr(t1.indexOf('hours')+6);
													console.log("only mins="+t1);
													t1=t1.substr(0,t1.indexOf(' '));
													t1=parseInt(t1);
													t1=t1+t2;
													
													
													
												}
												else
												{
												t1=t1.substr(0,t1.indexOf(' '));
												t1=parseInt(t1);
												}
												
												console.log("final t1="+t1);
												
												
												if(locs[2][2]=="micro")
												{

													console.log("micro updated");
													micro=t1;

												}
												else if(locs[2][2]=="mini")
												{
													
														mini=t1;
														console.log("mini updated");
													
												}
												else if(locs[2][2]=="primesuv")
												{
											
														primesuv=t1;
														console.log("SUV updated"+primesuv);
												}
												else if(locs[2][2]=="primeplay")
												{
													
														primeplay=t1;
												}
												else if(locs[2][2]=="primesedan")
												{
													
														primesedan=t1;
												}
												else if(locs[2][2]=="auto")
												{
													
														auto=t1;
												}

											callback(seventh);
											}
										});
	
	
	}
	
	
	
	function fifth(callback)
	{
	
	
				request('https://maps.googleapis.com/maps/api/directions/json?origin='+locs[1][0]+','+locs[1][1]+'&destination='+source+'&mode=driving&key=...API Key....', function (error, response, body) {
											if (!error && response.statusCode == 200) 
											{
											
												start++;
												console.log("----->Fourth="+start);
												body = body.replace('\u003c/b','');	
												body = body.replace('\u003e/','');
												body = body.replace('\u003cb','');
												body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
												body = body.replace('<div>','');
												body = body.replace('</div>','');
												var o2=JSON.parse(body);
												var t1=o2.routes[0].legs[0].duration.text;
																								if(t1.indexOf("hours") != -1)
												{
													
													console.log("came here");
													var t2=t1.substr(0,t1.indexOf(' '));
													t2=(parseInt(t2))*60;
													
													console.log("hours-mins="+t2);
													
													t1=t1.substr(t1.indexOf('hours')+6);
													console.log("only mins="+t1);
													t1=t1.substr(0,t1.indexOf(' '));
													t1=parseInt(t1);
													t1=t1+t2;
													
													
													
												}
												else
												{
												t1=t1.substr(0,t1.indexOf(' '));
												t1=parseInt(t1);
												}
												
												console.log("final t1="+t1);
												
												
												if(locs[1][2]=="micro")
												{

											
													micro=t1;
													console.log("micro updated"+micro);
													

												}
												else if(locs[1][2]=="mini")
												{
													
														mini=t1;
														console.log("mini updated");
													
												}
												else if(locs[1][2]=="primesuv")
												{
											
														primesuv=t1;
												}
												else if(locs[1][2]=="primeplay")
												{
													
														primeplay=t1;
												}
												else if(locs[1][2]=="primesedan")
												{
													
														primesedan=t1;
												}
												else if(locs[1][2]=="auto")
												{
													
														auto=t1;
												}

											callback(sixth);
											}
										});
	
	
	}
	
	function fourth(callback)
	{
	
	
				request('https://maps.googleapis.com/maps/api/directions/json?origin='+locs[0][0]+','+locs[0][1]+'&destination='+source+'&mode=driving&key=...API Key....', function (error, response, body) {
											if (!error && response.statusCode == 200) 
											{
											
												start++;
												console.log("----->Fourth="+start);
												body = body.replace('\u003c/b','');	
												body = body.replace('\u003e/','');
												body = body.replace('\u003cb','');
												body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
												body = body.replace('<div>','');
												body = body.replace('</div>','');
												var o2=JSON.parse(body);
												var t1=o2.routes[0].legs[0].duration.text;
												
												if(t1.indexOf("hours") != -1)
												{
													
													console.log("came here *****");
													var t2=t1.substr(0,t1.indexOf(' '));
													console.log("t2="+t2);
													t2=(parseInt(t2))*60;
													
													console.log("hours-mins="+t2);
													
													t1=t1.substr(t1.indexOf('hours')+6);
													console.log("only mins="+t1);
													t1=t1.substr(0,t1.indexOf(' '));
													t1=parseInt(t1);
													t1=t1+t2;
													
													
													
												}
												else
												{
												t1=t1.substr(0,t1.indexOf(' '));
												t1=parseInt(t1);
												}
												
												console.log("final t1="+t1);
												
												if(locs[0][2]=="micro")
												{

													console.log("micro updated");
													micro=t1;

												}
												else if(locs[0][2]=="mini")
												{
													
														mini=t1;
														console.log("mini updated="+mini);
													
												}
												else if(locs[0][2]=="primesuv")
												{
											
														primesuv=t1;
												}
												else if(locs[0][2]=="primeplay")
												{
													
														primeplay=t1;
												}
												else if(locs[0][2]=="primesedan")
												{
													
														primesedan=t1;
												}
												else if(locs[0][2]=="auto")
												{
													
														auto=t1;
												}

											callback(fifth);
											}
										});
	
	
	}
	
	
	function third(callback)
	{
	
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?&apiKey=...API Key....', function (error, response, body) {
					if (!error && response.statusCode == 200) 
					{
					var o=JSON.parse(body);
					j=0;
					
					for(var i=start;i<o.length;i++)
					{

						l=o[i].driverlocation;
						cartype=o[i].vehicleused.modeltype;
						
						lat=l.substr(0,l.indexOf(' '));
						lon=l.substr(l.indexOf(' ')+1,l.length - l.indexOf(' ')-1);
						
						locs[j][0]=lat;
						locs[j][1]=lon;
						locs[j][2]=cartype;
										
										
						j++;
							
					}

					
					console.log("----->"+locs[0][0]+" " +locs[0][1]+" "+locs[0][2]);
					console.log("----->"+locs[1][0]+" " +locs[1][1]+" "+locs[1][2]);
					console.log("----->"+locs[2][0]+" " +locs[2][1]+" "+locs[2][2]);
					console.log("----->"+locs[3][0]+" " +locs[3][1]+" "+locs[3][2]);
					callback(fourth);
					}
					
			});
				
	}
	
	
	
	function second(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/fare?apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
					
					if(f==0)
					{
					console.log("---->"+body+"-----");
					result="[{\"TravelDistance\":\""+distance+" km\",\"TravelTime\":\""+time+" mins\",";
					var basefare,td,tdperkm,adperkm,costpermin;
					var total=0;
					
					var o=JSON.parse(body);
					for(var i=0;i<o[0].farematrix.length;i++)
					{
						if(o[0].farematrix[i].cityname==city)
						{
							console.log("city match");
							//micro
							total=0;
							basefare=parseFloat(o[0].farematrix[i].micro.basefare);	
							td=parseFloat(o[0].farematrix[i].micro.tilldistance);
							tdperkm=parseFloat(o[0].farematrix[i].micro.tillfareperkm);
							adperkm=parseFloat(o[0].farematrix[i].micro.afterperkm);
							costpermin=parseFloat(o[0].farematrix[i].micro.faretimepermin);
							
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
							
							result=result.concat("\"micro\":").concat("\""+total.toFixed(2)+"\",");
							console.log("total="+total);
							
							//mini
							total=0;
							basefare=parseFloat(o[0].farematrix[i].mini.basefare);	
							td=parseFloat(o[0].farematrix[i].mini.tilldistance);
							tdperkm=parseFloat(o[0].farematrix[i].mini.tillfareperkm);
							adperkm=parseFloat(o[0].farematrix[i].mini.afterperkm);
							costpermin=parseFloat(o[0].farematrix[i].mini.faretimepermin);
							
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
							console.log("total="+total);
							result=result.concat("\"mini\":").concat("\""+total.toFixed(2)+"\",");
							
							
							//primesedan
							total=0;
							basefare=parseFloat(o[0].farematrix[i].primesedan.basefare);	
							td=parseFloat(o[0].farematrix[i].primesedan.tilldistance);
							tdperkm=parseFloat(o[0].farematrix[i].primesedan.tillfareperkm);
							adperkm=parseFloat(o[0].farematrix[i].primesedan.afterperkm);
							costpermin=parseFloat(o[0].farematrix[i].primesedan.faretimepermin);
							
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
							console.log("total="+total);
							result=result.concat("\"primesedan\":").concat("\""+total.toFixed(2)+"\",");
							
							
							//primesuv
							total=0;
							basefare=parseFloat(o[0].farematrix[i].primesuv.basefare);	
							td=parseFloat(o[0].farematrix[i].primesuv.tillbasedistance);
							adperkm=parseFloat(o[0].farematrix[i].micro.afterperkm);
							costpermin=parseFloat(o[0].farematrix[i].micro.faretimepermin);
							
							total=total+basefare;
							if(distance>td)
							{
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
							console.log("total="+total);
							result=result.concat("\"primesuv\":").concat("\""+total.toFixed(2)+"\",");
							
							
							
							//primeplay
							total=0;
							basefare=parseFloat(o[0].farematrix[i].primeplay.basefare);	
							td=parseFloat(o[0].farematrix[i].primeplay.tilldistance);
							tdperkm=parseFloat(o[0].farematrix[i].primeplay.tillfareperkm);
							adperkm=parseFloat(o[0].farematrix[i].primeplay.afterperkm);
							costpermin=parseFloat(o[0].farematrix[i].primeplay.faretimepermin);
							
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
							console.log("total="+total);
							result=result.concat("\"primeplay\":").concat("\""+total.toFixed(2)+"\",");
							
							
							
							//lux
							total=0;
							basefare=parseFloat(o[0].farematrix[i].lux.basefare);	
							td=parseFloat(o[0].farematrix[i].lux.tilldistance);
							tdperkm=parseFloat(o[0].farematrix[i].lux.tillfareperkm);
							adperkm=parseFloat(o[0].farematrix[i].lux.afterperkm);
							costpermin=parseFloat(o[0].farematrix[i].lux.faretimepermin);
							
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
							console.log("total="+total);
							result=result.concat("\"lux\":").concat("\""+total.toFixed(2)+"\",");
							
							
							
							//auto
							total=0;
							basefare=parseFloat(o[0].farematrix[i].auto.basefare);	
							td=parseFloat(o[0].farematrix[i].auto.basedistance);
							adperkm=parseFloat(o[0].farematrix[i].auto.afterperkm);
							
							total=total+basefare;
							if(distance>td)
							{
								total=total+(distance-td)*adperkm;
							}
						console.log("total="+total);	
						result=result.concat("\"auto\":").concat("\""+total.toFixed(2)+"\"}");
							
						break;	
						}

					}
					
					
					console.log("third....");
					f=1;
					}
					callback(third);
				}
				});
	}
	
	
	function first(callback)
	{
			request('https://maps.googleapis.com/maps/api/directions/json?origin='+source+'&destination='+destination+'&mode=driving&key=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				
					body = body.replace('\u003c/b','');	
					body = body.replace('\u003e/','');
					body = body.replace('\u003cb','');
					body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
					body = body.replace('<div>','');
					body = body.replace('</div>','');
					var o=JSON.parse(body);
					
					//console.log("------>*****"+body+"********");
					var t1=o.routes[0].legs[0].duration.text;
					var t2=o.routes[0].legs[0].distance.text;
					var t3=o.routes[0].legs[0].start_address;t3=t3.toLowerCase();
					console.log("t3="+t3);
					
					t1=t1.replace("hours", "");t1=t1.replace("mins", "");t1=t1.replace(" ", "");t1=t1.replace(" ", "");t1=t1.replace(" ", "");
					t2=t2.replace("km", "");t2=t2.replace(" ", "");t1=t1.replace(",", "");
					
					for(var i=0;i<operationalcities.length;i++)
					{
						if(t3.indexOf(operationalcities[i])!=-1)
						{
							city=operationalcities[i];
							break;
						}
					}
					
					console.log("t1="+t1+"   t2="+t2);
					if(t1.length==4)
					{
						var h=parseInt(t1.substr(0,2));
						var m=parseInt(t1.substr(2,2));
						var h=h*60;
						time=h+m;
						
					}
					else
					time=parseInt(t1.substr(0,2));
					
					distance=t2;
					
				console.log("time="+time+"   distance="+distance+"  city="+city);	
				console.log("calling second......");
				callback(second);
				}
			});
	}
	

	first(second);
	

});


//Price comparison API to find what OLA is charging for the same ride as against Government Charges

router.get('/olafare/:src/:dest/:type',function(req,res){
	
	
	var result="";
	var source=req.params.src;
	var destination=req.params.dest;
	var category=req.params.type;
	var city;var time;var distance;
	var total=0;var f=0;
	
	
	function third()
	{
	return res.status(200).send(result);
	}
	var basefare,td,tdperkm,adperkm,costpermin;
	
	function second(callback)
	{
		var url="https://www.olacabs.com/fares/"+city;
		console.log("url="+url);

			request(url, function (err, body) {
				if(!err)
				{
					
					if(f==0)
					{
					var str=JSON.stringify(body);
					console.log("here....");
					
					
					if(category=="micro")
					{
						str=str.substr(str.indexOf('Ride Later Cancellation Fee'),2000);
						str=str.substr(str.indexOf('Micro')+10,200);
						console.log("-----"+str);
						
							var c=0;
							for(i=0;i<str.length;i++)
							{
									if(c==0 && str.charAt(i)==';')
									{
										basefare=parseFloat(str.substr(i+1,2));c=1;
										c=1;
									}
									else if(c==1 && str.charAt(i)==';')
									{
										tdperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=2;
									}
									else if(c==2 && str.substr(i,4)=='till')
									{
										td=parseFloat(str.substr(i+5,2).replace(" ",""));	
										c=3;
									}
									else if(c==3 && str.charAt(i)==';')
									{
										adperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=4;
									}
									else if(c==4 && str.charAt(i)==';')
									{
											costpermin=parseFloat(str.substr(i+1,4).replace(" ",""));	
											break;
									}
								
								
							}
							console.log(basefare+" "+tdperkm+" "+td+" "+adperkm+" "+costpermin);
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;

					}
					
					
					if(category=="mini")
					{
						str=str.substr(str.indexOf('Ride Later Cancellation Fee'),2000);
						str=str.substr(str.indexOf('Mini')+10,200);
						console.log("-----"+str);
						
						var c=0;
							for(i=0;i<str.length;i++)
							{
									if(c==0 && str.charAt(i)==';')
									{
										basefare=parseFloat(str.substr(i+1,2));c=1;
										c=1;
									}
									else if(c==1 && str.charAt(i)==';')
									{
										tdperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=2;
									}
									else if(c==2 && str.substr(i,4)=='till')
									{
										td=parseFloat(str.substr(i+5,2).replace(" ",""));	
										c=3;
									}
									else if(c==3 && str.charAt(i)==';')
									{
										adperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=4;
									}
									else if(c==4 && str.charAt(i)==';')
									{
											costpermin=parseFloat(str.substr(i+1,4).replace(" ",""));	
											break;
									}
								
								
							}
							console.log(basefare+" "+tdperkm+" "+td+" "+adperkm+" "+costpermin);
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
					}
					
					
					if(category=="primesuv")
					{
						str=str.substr(str.indexOf('Ride Later Cancellation Fee'),2000);
						str=str.substr(str.indexOf('Prime SUV')+10,200);
						console.log("-----"+str);
						
						var c=0;
						for(i=0;i<str.length;i++)
							{
									if(c==0 && str.charAt(i)==';')
									{
										basefare=parseFloat(str.substr(i+1,3));c=1;
										c=1;
									}
									else if(c==1 && str.substr(i,5)=='first')
									{
										td=parseFloat(str.substr(i+6,2).replace(" ",""));	
										c=2;
									}
									else if(c==2 && str.charAt(i)==';')
									{
										adperkm=parseFloat(str.substr(i+1,3).replace(" ",""));
										c=3;
									}
									else if(c==3 && str.charAt(i)==';')
									{
										costpermin=parseFloat(str.substr(i+1,2).replace(" ",""));
										break;
									}
								
								
							}
							console.log(basefare+" "+td+" "+adperkm+" "+costpermin);
							total=total+basefare;
							if(distance>td)
							{
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
					}
					
					
					if(category=="primeplay")
					{
						str=str.substr(str.indexOf('Ride Later Cancellation Fee'),2000);
						str=str.substr(str.indexOf('Prime Play')+10,200);
						console.log("-----"+str);
						
						var c=0;
						for(i=0;i<str.length;i++)
							{
									if(c==0 && str.charAt(i)==';')
									{
										basefare=parseFloat(str.substr(i+1,2));c=1;
										c=1;
									}
									else if(c==1 && str.charAt(i)==';')
									{
										tdperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=2;
									}
									else if(c==2 && str.substr(i,4)=='till')
									{
										td=parseFloat(str.substr(i+5,2).replace(" ",""));	
										c=3;
									}
									else if(c==3 && str.charAt(i)==';')
									{
										adperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=4;
									}
									else if(c==4 && str.charAt(i)==';')
									{
											costpermin=parseFloat(str.substr(i+1,4).replace(" ",""));	
											break;
									}
								
								
							}
							console.log(basefare+" "+tdperkm+" "+td+" "+adperkm+" "+costpermin);
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
					}
					
					
					if(category=="primesedan")
					{	
						str=str.substr(str.indexOf('Ride Later Cancellation Fee'),2000);
						str=str.substr(str.indexOf('Prime Sedan')+10,200);
						console.log("-----"+str);
						
						var c=0;
						for(i=0;i<str.length;i++)
							{
									if(c==0 && str.charAt(i)==';')
									{
										basefare=parseFloat(str.substr(i+1,2));c=1;
										c=1;
									}
									else if(c==1 && str.charAt(i)==';')
									{
										tdperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=2;
									}
									else if(c==2 && str.substr(i,4)=='till')
									{
										td=parseFloat(str.substr(i+5,2).replace(" ",""));	
										c=3;
									}
									else if(c==3 && str.charAt(i)==';')
									{
										adperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=4;
									}
									else if(c==4 && str.charAt(i)==';')
									{
											costpermin=parseFloat(str.substr(i+1,4).replace(" ",""));	
											break;
									}
								
								
							}
							console.log(basefare+" "+tdperkm+" "+td+" "+adperkm+" "+costpermin);
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
						
					}
					
					
					if(category=="lux")
					{
						str=str.substr(str.indexOf('Ride Later Cancellation Fee'),2000);
						str=str.substr(str.indexOf('Lux')+10,200);
						console.log("-----"+str);
						
						var c=0;
						for(i=0;i<str.length;i++)
							{
									if(c==0 && str.charAt(i)==';')
									{
										basefare=parseFloat(str.substr(i+1,3));c=1;
										c=1;
									}
									else if(c==1 && str.charAt(i)==';')
									{
										tdperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=2;
									}
									else if(c==2 && str.substr(i,4)=='till')
									{
										td=parseFloat(str.substr(i+5,2).replace(" ",""));	
										c=3;
									}
									else if(c==3 && str.charAt(i)==';')
									{
										adperkm=parseFloat(str.substr(i+1,2).replace(" ",""));	
										c=4;
									}
									else if(c==4 && str.charAt(i)==';')
									{
											costpermin=parseFloat(str.substr(i+1,4).replace(" ",""));	
											break;
									}
								
								
							}
							console.log(basefare+" "+tdperkm+" "+td+" "+adperkm+" "+costpermin);
							total=total+basefare;
							if(distance<td)
							{
								total=total+distance*tdperkm;
							}
							else
							{
								total=total+td*tdperkm;
								total=total+(distance-td)*adperkm;
							}
							total=total+time*costpermin;
						
					}
					
					result="{\"value\":\""+total+"\"}";	
					f=1;
					}
				callback(third);	
				}
				else
				console.log("error trapped");
			});
						
	}
	
	
	function first(callback)
	{
			request('https://maps.googleapis.com/maps/api/directions/json?origin='+source+'&destination='+destination+'&mode=driving&key=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				
					body = body.replace('\u003c/b','');	
					body = body.replace('\u003e/','');
					body = body.replace('\u003cb','');
					body = body.replace('\u003e','');body = body.replace('<b>','');body = body.replace('</b>','');
					body = body.replace('<div>','');
					body = body.replace('</div>','');
					var o=JSON.parse(body);
					
					//console.log("------>*****"+body+"********");
					var t1=o.routes[0].legs[0].duration.text;
					var t2=o.routes[0].legs[0].distance.text;
					var t3=o.routes[0].legs[0].start_address;t3=t3.toLowerCase();
					console.log("t3="+t3);
					
					t1=t1.replace("hours", "");t1=t1.replace("mins", "");t1=t1.replace(" ", "");t1=t1.replace(" ", "");t1=t1.replace(" ", "");
					t2=t2.replace("km", "");t2=t2.replace(" ", "");t1=t1.replace(",", "");
					
					for(var i=0;i<operationalcities.length;i++)
					{
						if(t3.indexOf(operationalcities[i])!=-1)
						{
							city=operationalcities[i];
							break;
						}
					}
					
					console.log("t1="+t1+"   t2="+t2);
					if(t1.length==4)
					{
						var h=parseInt(t1.substr(0,2));
						var m=parseInt(t1.substr(2,2));
						var h=h*60;
						time=h+m;
						
					}
					else
					time=parseInt(t1.substr(0,2));
					
					distance=t2;
				if(city=="bengaluru")
				city="bangalore";
				console.log("time="+time+"   distance="+distance+"  city="+city);	
				console.log("calling second......");
				callback(second);
				}
			});
	}
	
	first(second);
});


router.get('/otpgeneration',function(req,res){
	
	return res.status(200).send("{\"otp\":\""+(Math.floor(100000 + Math.random() * 900000)).toString()+"\"}");
	
});


router.get('/support/:email/:name/:query',function(req,res){
	
	var email=req.params.email;
	var name=req.params.name;
	var query=req.params.query;
	
	
			var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			user: 'gmail id',
			pass: 'gmail password'
			}
			});

			var mailOptions = {
			from: 'gmail id',
			to: 'gmail id',
			subject: 'Query from User',
			html: '<html><head></head><body>'+name+' has submitted the below query.<br><br>\"'+query + '\"<br><br> Please reply back to Email : '+email+'<br><br><br><br> *This is an auto-generated email.</body></html>'
			};

			transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			return res.status(200).send("{\"status\":\"Email Not Sent\"}");
			console.log(error);
			} else {
			console.log('Email sent: ' + info.response);
			}
			});
			
			return res.status(200).send("{\"status\":\"Email Sent\"}");
	
	
	
});



//sending Ride OTP to user
router.get('/rideotp/:requestID',function(req,res){

			var reqid=req.params.requestID;
			var fare;
			var driverfname;var driverid;
			var userfname;var userlname;var userid;var usercontactno;
			var otp="";
			
			
	function third()
	{
		nexmo.message.sendSms(
		'919820364381', '91'+usercontactno, 'Hey '+userfname+' '+userlname+', Your OTP for initiating ride is '+otp+'.',
				(err, responseData) => {
				if (err) {
				console.log(err);
				} else {
				console.dir(responseData);
				}
				}
		);
		
	return res.status(200).send("[{\"status\":\"OTP Sent\"}]");
	}
			
	
	
	
	function second(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"userid": "'+userid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				userfname=o[0].firstname;
				userlname=o[0].lastname;
				usercontactno=o[0].mobile;
				callback(third);
				}
			});

	}
	
	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+reqid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----***>"+body);
				userid=o[0].userid;
				driverid=o[0].driverid;
				otp=o[0].otp;
				
				callback(second);
				}
			});
	}
	
	first(second);
	
});


router.get('/sendinvoice/:requestID',function(req,res){
	
	
			var reqid=req.params.requestID;
			var ridestarttime;
			var rideendtime;
			var startpoint;
			var stoppoint;
			var fare;
			var farray=[];
			var distance;
			var cabcategory;var modelname;var carnumber;
			var driverfname;var driverlname;var drivercontactno;var driverid;
			var userfname;var userlname;var useremail;var userid;
			
			
	function fourth()
	{
		
		//console.log(reqid+" "+ridestarttime+" "+rideendtime+" "+startpoint+" "+stoppoint+" "+fare+" "+distance+" "+cabcategory+" "+modelname+" "+carnumber);
		//console.log(driverfname+" "+driverlname+" "+drivercontactno+" "+driverid+" "+userfname+" "+userlname+" "+useremail+" "+userid);

		console.log("fare--->"+fare);																		
		
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			user: 'gmail id',
			pass: 'gmail password'
			}
			});

			var mailOptions = {
			from: 'gmail id',
			to: useremail,
			subject: 'Invoice from Cabchain',
			html: '<html><head><style>table {    font-family: arial, sans-serif;border-collapse: collapse;width: 80%}td, th { border: 2px solid #dddddd; text-align: left; padding: 10px;}tr:nth-child(even) {background-color: #dddddd;}</style></head><body>Thank You for travelling with us,'+userfname+' '+userlname+'<br>'+'<b>Here is your Invoice!</b><br><br>'+'<table><tr><th>Ride Details</th></tr><tr><td>Request ID</td><td>'+reqid+'</td></tr><tr><td>Ride Starting Time</td><td>'+ridestarttime+' hrs</td></tr><tr><td>Ride Ending Time</td><td>'+rideendtime+' hrs</td></tr><tr><td>Ride Startpoint</td><td>'+startpoint+'</td></tr><tr><td>Ride Endpoint</td><td>'+stoppoint+'</td></tr><tr><td>Ride fare</td><td>'+fare+' Rs</td> </tr><tr><td>Ride Distance</td><td>'+distance+' KM</td> </tr></table><br><br><table><tr><th>Cab Details</th></tr><tr><td>Cab Type</td><td>'+cabcategory+'</td></tr><tr><td>Cab Model</td><td>'+modelname+'</td></tr><tr><td>Cab Number</td><td>'+carnumber+'</td> </tr></table><br><br><table><tr><th>Driver Details</th></tr><tr><td>Driver Name</td><td>'+driverfname+' '+driverlname+'</td> </tr><tr><td>Driver Contact Number</td><td>'+drivercontactno+'</td></tr></table><br><br> *This is a auto-generated mail. Please do not reply to this.'
			};

			transporter.sendMail(mailOptions, function(error, info){
			if (error) {
			console.log(error);
			} else {
			console.log('Email sent: ' + info.response);
			}
			});
			
	return res.status(200).send("[{\"status\":\"Email Sent\"}]");
	}
			
	
	function third(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+driverid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				driverfname=o[0].first_name;
				driverlname=o[0].last_name;
				drivercontactno=o[0].contactno;
				cabcategory=o[0].vehicleused.modeltype;
				carnumber=o[0].vehicleused.licenseplate;
				modelname=o[0].vehicleused.modelname;
				
			
				callback(fourth);
				}
			});

	}
	
	
	function second(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"userid": "'+userid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				userfname=o[0].firstname;
				userlname=o[0].lastname;
				useremail=o[0].email;	
			
				callback(third);
				}
			});

	}
	
	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+reqid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				userid=o[0].userid;
				driverid=o[0].driverid;
				ridestarttime=o[0].ridestarttime;
				rideendtime=o[0].rideendtime;
				startpoint=o[0].addressstartingpoint;
				stoppoint=o[0].addressendingpoint;
				farray=o[0].fare;
				distance=o[0].distance;
				
				
					for(var i=0;i<o[0].quoted.length;i++)
					{
							if(o[0].quoted[i].driver==driverid)
							{
							fare=o[0].quoted[i].fare;
							break;
							}
						
					}
				
				callback(second);
				}
			});
	}
	
	
	
	first(second);
});



router.get('/smsinvoice/:requestID',function(req,res){
	
	
			var reqid=req.params.requestID;
			var fare;
			var farray=[];
			var cabcategory="";
			var driverfname;var driverid;
			var userfname;var userlname;var userid;var usercontactno;
			
			
	function fourth()
	{
		
		
		
																				
																				
		nexmo.message.sendSms(
		'919820364381', '91'+usercontactno, 'Hey '+userfname+' '+userlname+', Please pay bill amount of Rs '+fare+' for your Cabchain ride served by '+driverfname+'.',
				(err, responseData) => {
				if (err) {
				console.log(err);
				} else {
				console.dir(responseData);
				}
				}
		);
		
	return res.status(200).send("[{\"status\":\"Invoice Sent\"}]");
	}
			
	
	function third(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/drivers?q={"driverid": "'+driverid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				console.log("----->"+body);
				var o=JSON.parse(body);
				driverfname=o[0].first_name;
				cabcategory=o[0].vehicleused.modeltype;
				callback(fourth);
				}
			});

	}
	
	
	function second(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/users?q={"userid": "'+userid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				userfname=o[0].firstname;
				userlname=o[0].lastname;
				usercontactno=o[0].mobile;
				callback(third);
				}
			});

	}
	
	
	
	function first(callback)
	{
			request('https://api.mlab.com/api/1/databases/cabchain/collections/rides?q={"ridetrackingno": "'+reqid+'"}&apiKey=...API Key....', function (error, response, body) {
				if (!error && response.statusCode == 200) 
				{
				var o=JSON.parse(body);
				console.log("----->"+body);
				userid=o[0].userid;
				driverid=o[0].driverid;
				farray=o[0].fare;
				
					for(var i=0;i<o[0].quoted.length;i++)
					{
							if(o[0].quoted[i].driver==driverid)
							{
							fare=o[0].quoted[i].fare;
							break;
							}
						
					}
				
				
				callback(second);
				}
			});
	}
	
	
	
	first(second);
});

module.exports = router;