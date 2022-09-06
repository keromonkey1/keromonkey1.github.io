
// Shortcut for looking for dom elements 
$ = (queryString) => document.querySelector(queryString);

//hue const that increments but never goes over 360
const shiftHue = (hue) => (hue+1) % 360;
// const shiftSat = (sat) => (sat+1) % 360;
// const shiftLight = (light) => (light+2) % 100;
const shiftAlpha = (alpha) => Math.sin(Date.now() / 1000); //three.js color does not support alpha, but materials do!
let color ='';
let colorShift='';
let hue = 0;
let sat = 100;
let light = 50;
let alpha = 1;

var cTurn = 0;
var debug=false; //only set to true, for debug console logs.
var circleRotation;
var crystalRotation; 
var spherePosition;
var sphereY;
var sphereX=0;
var sphereZ=-2;

const animate = () => {
	
	//Animation in js can be done via requestAnimationFrame();
	//This will fire the callback when the browser's ready
	//And it can do this up to 60x per second 
	requestAnimationFrame(animate);
};

//Call it the first time, so it runs.
//After that, we have it call itself recursively. 
requestAnimationFrame(animate);
