var sentiment = require('sentiment');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
mongoose.connect("mongodb://highsents:justtest@ds129600.mlab.com:29600/high_sents_db");
var db = mongoose.connection;
db.once('open',function(){
	console.log('huh');
})
var dbSchema = mongoose.Schema({inputStatement:String,result:String})
var db = mongoose.model('saveAct',dbSchema)
var app = express()
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
       // Score: -2, Comparative: -0.666 
app.set('port',(process.env.PORT || 5000))
//console.log(app.get('port'))
app.listen(app.get('port'), function(){
	console.log('API is running on port', app.get('port'))
})
app.post('/analysis',function(req,res){

var r1 = sentiment(req.body.state);
var result
if(r1.comparative > 0.3)
	result = 'positive'
else if(r1.comparative < -0.3)
	result = 'negative'
else
	result = 'neutral'
res.send(result)
console.log(r1)

var saveData = new db({inputStatement:req.body.state,
						result:result
					});
saveData.save(function(error,info){
	})
});
app.get('/analysis', function(req, res){
	if(req.query.state){
		var r1 = sentiment(req.query.state);
		var result;
		if(r1.comparative > 0.3)
			result = 'positive'
		else if(r1.comparative < -0.3)
			result = 'negative'
		else
			result = 'neutral'
		res.send(result)
		var saveData = new db({inputStatement:req.query.state,
						result:result
					});
		saveData.save(function(error,info){})
	}else{
		console.log('fail');
	}
});
app.get('/',function(req,res){
	res.send("Welcome to Gaurav's Sentiment analysis API")
})

