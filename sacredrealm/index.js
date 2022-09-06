
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
	if (debug) debugFunc();
	
	hue = shiftHue(hue); //update hue value 
	colorShift = 'hsla('+hue+','+sat+'%,'+light+'%)'; //update color value of orb, using hue  //update the sphere color programatically, using color value. // $('a-sphere').setAttribute('color',color); 
	color = 'gold';
	alpha = Math.abs(shiftAlpha(alpha));
	// sat = shiftSat(sat);
	// light = shiftLight(light);
	cTurn += .01; //Updates the position/color of circle // var pY = Math.sin(Date.now() / 1000);
	
	//Updates the position of the sphere
	triAuraUpdate();	//update sphere
	circleUpdate(); //update circle
	crystalUpdate(); //update crystal
	skyUpdate();
	medUpdate();
	blackhole();
	// pulseField('.med1');
	pulseField('#triaura',.5); 
	
	//Animation in js can be done via requestAnimationFrame();
	//This will fire the callback when the browser's ready
	//And it can do this up to 60x per second 
	requestAnimationFrame(animate);
};

function blackhole(){
	$('#bhole0').setAttribute('rotation', '90 '+ cTurn*(-270) +' 0'); 
	$('#bhole').setAttribute('rotation', '90 '+ cTurn*(-270) +' 0'); 
	$('#bhole2').setAttribute('rotation', '90 '+ cTurn*(-180) +' 0'); 
	$('#bhole3').setAttribute('rotation', '90 '+ cTurn*(180) +' 0'); 
}

var pulseScale = .1;
var pulseDown=false;

//make it pulse outwards
function pulseField(x,limitH)
{
	$(''+x).setAttribute('scale',''+(1+pulseScale)+' '+(1+pulseScale)+' '+(1+pulseScale)); 
	if(!pulseDown)
		pulseScale+=.01;
	else 
		pulseScale-=.01;
	
	if(pulseScale>=limitH)
		pulseDown=true;
	else if(pulseScale<=0)
		pulseDown=false;
}

function medUpdate()
{
	// Medallion Spheres
	
	//light
	$('.med1').setAttribute('rotation','45 '+ cTurn*90 +' -90'); 
	$('.med2').setAttribute('rotation','45 '+ cTurn*90 +' 90'); 
	$('.med3').setAttribute('rotation','0 '+ cTurn*(-360) +' 0'); 
	$('.med4').setAttribute('rotation',circleRotation); 
	$('.med5').setAttribute('rotation','0 '+ cTurn*(-60) +' 0'); //fire
	
	//accessories
	$('#lava1').setAttribute('rotation','0 '+ cTurn*(-60) +' 0');
	$('#lava2').setAttribute('rotation','0 '+ cTurn*(60) +' 0');
	
	$('#tet1').setAttribute('rotation','0 '+ cTurn*(10) +' 0');
	$('#tet2').setAttribute('rotation','0 '+ cTurn*(90) +' 0');
	$('#tet3').setAttribute('rotation','0 '+ cTurn*(180) +' 0');
	$('#tet4').setAttribute('rotation','0 '+ cTurn*(360) +' 0');
	$('#tet5').setAttribute('rotation','0 '+ cTurn*(-90) +' 0');
	$('#tet6').setAttribute('rotation','0 '+ cTurn*(-180) +' 0');
	// $('.med6').setAttribute('rotation',circleRotation); //water
	
	//Medallions
	$('#lightmedal').setAttribute('rotation','0 '+ cTurn*(-90) +' -90'); 
	$('#shadowmedal').setAttribute('rotation','0 '+ cTurn*(-90) +' -90'); 
	$('#forestmedal').setAttribute('rotation','0 '+ cTurn*(-90) +' -90'); 
	$('#spiritmedal').setAttribute('rotation','0 '+ cTurn*(-90) +' -90'); 
	$('#firemedal').setAttribute('rotation','-45 '+ cTurn*(-90) +' 90'); // $('#firemedal').setAttribute('rotation','0 '+ cTurn*(-90) +' -90'); 
	$('#watermedal').setAttribute('rotation','0 '+ cTurn*(-90) +' -90');
}

//update triAura orb 
function triAuraUpdate()
{
	// sphereX = '0';
	sphereY = .5 * Math.sin(Date.now() / 1000);
	sphereY = Math.abs(sphereY)+2.85;
	// sphereZ = '-2';
	
	//BOTTOM OF DIP >> Maybe a ripple effect
	// if(sphereY<2.4)
		// console.log('sphereY: ',sphereY);
	
	spherePosition = ''+sphereX + ' ' + sphereY +' ' + sphereZ;
	// console.log('spherePosition: ',spherePosition);
	$('a-sphere').setAttribute('position', spherePosition);
	$('a-sphere').setAttribute('material',"color: "+color+"; transparent: true; opacity: "+alpha); //This updates the color and transparency on the sphere material, rather than the sphere itself. 
}


// var hue1 = 'hsl(196,100%,65%)'; //cerulean
// var hue2 = 'hsl(209,91%,71%)'; //green-blue
// var hue3 = 'hsl(175,40%,75%)'; //light sea green
var baseHue = 175;
var maxHue = 34; //range = 175 + 34
var minSat = 40;
var maxSat = 60; //range = 40 + 60
var minLight = 25;
var maxLight = 10; //range = 65 + 10
var currentHue = 0;
var currentSat = 0;
var currentLight = 0;
var which2update = 0;
var pcolor;
var skyColor;

function circleUpdate() 
{
	circleRotation = '-90 '+ cTurn*90 +' 0'; //const circleRotation = '-90 '+ 90 * pY +' 0'; //original #back&forth
	crystalRotation = circleRotation;
	$('a-circle').setAttribute('rotation', circleRotation);
	
	//update hue values to be injected
	phue =  baseHue + currentHue;
	psat = 	minSat + currentSat;
	plight = minLight + currentLight;
	//update color value, using new hue vals
	pcolor = 'hsl('+phue+','+psat+'%,'+plight+'%)';
	//update the sphere color programatically, using color value.
	$('a-circle').setAttribute('color',pcolor); 
	// $('a-circle').setAttribute('position',pcolor); 
	
	which2update = (which2update>=2) ? 0 : (which2update+1);
	//alters the 'current' values which are added to the hue, one change per loop.
	currentValUpdate(which2update); 
}

function skyUpdate()
{
	if($('#sky0')) //this was for the scintillating blue background, not the sun's rotation one
	{
		skyColor = 'hsl('+phue+','+40+'%,'+10+'%)';
		//update the sphere color programatically, using color value.
		$('#sky0').setAttribute('color',skyColor); 
	}
}

function crystalUpdate() {
	var offset = 0.5;
	var sP1 = ''+(sphereX)+' '+(sphereY+0.7)+' '+sphereZ;
	var sP2 = ''+(sphereX-offset)+' '+(sphereY)+' '+sphereZ;
	var sP3 = ''+(sphereX+offset)+' '+(sphereY)+' '+sphereZ;
	// console.log('new spherePosition: ',sP2,'--------',sP3);
	
	$('#crystal').setAttribute('position',sP1); //follows the sphere's positioning
	$('#crystal2').setAttribute('position',sP2); //follows the sphere's positioning
	$('#crystal3').setAttribute('position',sP3); //follows the sphere's positioning
	
	$('#crystal').setAttribute('rotation',crystalRotation); //follows the circle's rotation
	$('#crystal2').setAttribute('rotation',crystalRotation); //follows the circle's rotation
	$('#crystal3').setAttribute('rotation',crystalRotation); //follows the circle's rotation
	
	$('#crystal').setAttribute('material',"color: gold; transparent: false;");
	$('#crystal2').setAttribute('material',"color: gold; transparent: false;");
	$('#crystal3').setAttribute('material',"color: gold; transparent: false;");
}

var decreaseHue = false;
var decreaseSat = false;
var decreaseLight = false;
function currentValUpdate(x)
{
	//update current values for next cycle
	//currentHue ranges from 0 -  34;
	
	if(x==0)
	{
		if(!decreaseHue) //if hue is incrementing
		{
			//if current hue is less than max hue, keep incrementing
			//else set it to 0, but it should never actually be set
			//to 0 directly, because we want to start decrementing it JUST before that point.
			currentHue = (currentHue>maxHue) ? 0 : (currentHue+1);	
			//if current hue is equal or greater than max hue, start decrementing
			if(currentHue>=maxHue)
				decreaseHue=true;
		}
		else 
		{
			//if current hue is greater than 0, keep decreasing
			currentHue = (currentHue<=0) ? 0 : (currentHue-1);	
			if(currentHue<=0)
				decreaseHue=false;
		}
	}
	else if (x==1)
	{		
		if(!decreaseSat) 
		{
			currentSat = (currentSat>maxSat) ? 0 : (currentSat+1);
			if(currentSat>=maxSat)
				decreaseSat=true;
		}
		else 
		{	
			currentSat = (currentSat<=0) ? 0 : (currentSat-1);
			if(currentSat<=0)
				decreaseSat=false;
		}
	}
	else 
	{
		// currentLight = (currentLight>=maxLight) ? 0 : (currentLight+=1);
		
		if(!decreaseLight) 
		{
			currentLight = (currentLight>maxLight) ? 0 : (currentLight+1);
			if(currentLight>=maxLight)
				decreaseLight=true;
		}
		else 
		{	
			currentLight = (currentLight<=0) ? 0 : (currentLight-1);
			if(currentLight<=0)
				decreaseLight=false;
		}
	}
}


function debugFunc()
{
	console.log('cTurn: ',cTurn);
	console.log('circle hue > ',pcolor);
}

//Call it the first time, so it runs.
//After that, we have it call itself recursively. 
requestAnimationFrame(animate);
