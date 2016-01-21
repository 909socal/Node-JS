'use strict';

// require other JS files 
var math = require('./math.js');
//var wordCount = require('./wordcount.js');

// create server
var http = require('http');

var md5 = require('md5');

var server = http.createServer(function(req, res){
	console.log('req is', req);
	console.log('res is', res);
	console.log('req url', req.url);

	var urlParts = req.url.match(/[^/]+/g);
	console.log('urlParts', urlParts);
   
	// curl localhost:4000/time
	// curl localhost:4000/math/add/5/50
	// curl localhost:4000/sentence/this%20is%20a%20string
	// curl localhost:4000/gravatar/samer.buna@gmail.com

	switch(urlParts[0]){
		case 'time':
			var timestamp = Date.now();
			res.end(timestamp + '\n'); 
			break; 
		case 'math':
			if(urlParts[1] === 'add'){
				// Method 1 
				var grabNumbers = req.url.match(/\d+/g)
				var sum = grabNumbers.reduce(function(prev, curr)
				{
				  return parseFloat(prev) + parseFloat(curr);
				}, 0);
				var sumStr = sum.toString();
				res.end(sumStr + '\n');
			}
			else if(urlParts[1] === 'square'){
				var grabNumbers = req.url.match(/\d+/g);
				//res.end('grab numbers' + grabNumbers);
				var square = parseFloat(grabNumbers[0]) * parseFloat(grabNumbers[0]);
				var squareStr = square.toString();
				res.end(squareStr + '\n');
			}
			break;
		case 'sentence':
			var sentence = decodeURI(urlParts[1]);
			console.log(sentence);
			var words = 0;
			var letters=0;
			var spaces =0;
			sentence.split(' ').forEach(function(word){
				words++;
				word.split('').forEach(function(letter){
				letters++;
				})
			});
			spaces = words - 1; 
			res.end('words: '+ words + '  letters: ' + letters + '  spaces: ' + spaces);
			break;
		case 'gravatar':
			var emailAddress = urlParts[1];
				var md5Hash = md5(emailAddress);
				var gravatarURL = 'http://www.gravatar.com/avatar/' + md5Hash + '\n';
				res.end(gravatarURL);


		default:
			res.end('nothing');
	}
});

// list for requests
server.listen(4000);