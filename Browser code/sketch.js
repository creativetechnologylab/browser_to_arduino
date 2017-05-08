var serial;
var usbPort = "";

var r = 0;
var g = 0;
var b = 0;

var rSlider, gSlider, bSlider;

function setup() {
	// Instantiate our SerialPort object
	serial = new p5.SerialPort();

	// Add handlers
	serial.on( 'list', gotList );
	serial.on( 'error', gotError );
	serial.on( 'open', gotOpen );

	createCanvas( 800, 600 );

	rSlider = createSlider( 0, 255, 100 );
	rSlider.position( 20, 20 );
	gSlider = createSlider( 0, 255, 0 );
	gSlider.position( 20, 50 );
	bSlider = createSlider( 0, 255, 255 );
	bSlider.position( 20, 80 );
}

function gotList( ports ) {
	for ( var i = 0; i < ports.length; i++ ) {
		if ( ports[i].indexOf( "cu.usb" ) != -1 ) {
			usbPort = ports[i];
		}
	}
	serial.open( usbPort );
}

function gotOpen() {
	console.log( "Serial Port is open!" );

	setInterval( function() {

	}, 25 );
}

function gotError( error ) {
	console.log( error );
}

function draw() {
	var r = rSlider.value();
	var g = gSlider.value();
	var b = bSlider.value();

	background( r, g, b );

	if ( serial.isConnected() ) {
		var str = r + ',' + g + ',' + b + "\n";
		serial.write( str );
	}
}
