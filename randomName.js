//
//  randomName.js
//  - Generate a random name that sounds halfway ok for the specified language.
//
//  John D. Allen
//  July 2015
//
//----------------------------------------------------------------------------------
//  Version:
//  0.3  --  Modifed to support an REST API to get name.
//  0.2  --  Modifed for better name generation
//  0.1  --  Initial code.
//
//----------------------------------------------------------------------------------

var express = require('express');
var app = express();

var constants = ["b","c","c","d","f","g","h","j","k","k","l","m","n","p","q","r","s","s","t","t","v","w","x","y","z"];
var vowels = ["a","i","e","o","u"];
var endings = ["ith", "ton", "on", "fled", "man", "ar","ge","dile", "in", "ax", "ing", "port"];

var patterns = [
	"CVCE",
	"CVCVCE",
	"CVCVE",
	"CVCVCVCE"
];

//-------------------------------------------------
// Function: rand()
//-------------------------------------------------
function rand(n) {
	return Math.floor(Math.random()*n);
}

var conlen = constants.length;
var volen = vowels.length;
var endlen = endings.length;
var patlen = patterns.length;

//-------------------------------------------------
// Export:  name()
//-------------------------------------------------
function nameEN() {
	var out = "";
	// pick a pattern
	var pat = patterns[rand(patlen)];
	// process pattern
	for (var i = 0; i < pat.length; i++) {
		switch(pat[i]) {
			case "C":
				out += constants[rand(conlen)];
				break;
			case "V":
				out += vowels[rand(volen)];
				break;
			case "E":
				out += endings[rand(endlen)];
				break;
		}
		if (i  === pat.length - 1) {
            return out;
		}
	}
};

// //-----------[  Test Code ]-----------------
// function Main() {
// 	console.log("12345678901234>");
// 	for (var i = 1; i < 30; i++) {
// 		exports.name(function(err, data) {
// 		console.log(data);
// 		});
// 	}
// }

// if (require.main === module) {
//  Main();
// }

app.get("/name", (req, res, next) => {
	var lang = req.query.lang;
	if (lang == undefined) { lang = "EN"; }
	switch(lang) {
		case "EN":
			var out = '{"name": "' + nameEN() + '"}';
			break;
		default:
			var out = '{"err": "Unsupported Language"}'
	}
    res.setHeader('Content-Type', 'application/json')
    res.send(out);
});

app.listen(80, () => {
	//console.log("Server running on port 80")
});
