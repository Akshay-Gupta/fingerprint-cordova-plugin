 function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	btnClick = "init";
	mfs100sample.init("init", success, failed);
}

//Initialize view
document.getElementById("btnInit").addEventListener("click", onInit, false);
document.getElementById("btnUnInit").addEventListener("click", onUninit, false);
document.getElementById("btnStartCapture").addEventListener("click", onStartCapture, false);
document.getElementById("btnStopCapture").addEventListener("click", onStopCapture, false);
document.getElementById("btnAutoCapture").addEventListener("click", onAutoStartCapture, false);
document.getElementById("btnMatchISO").addEventListener("click", onMatchISO, false);

var lblstatus = document.getElementById("lblstatus");
var serialNo = document.getElementById("lblserialno");
var width = document.getElementById("lblwidth");
var height = document.getElementById("lblheight");
var make = document.getElementById("lblmake");
var model = document.getElementById("lblmodel");
var cert = document.getElementById("lblcert");
var quality = document.getElementById("lblquality");
var nfiq = document.getElementById("lblnfiq");
var score = document.getElementById("lblscore");

var imgFinger = document.getElementById("imgFinger");

var btnClick = "";

var isoTemplate = "";

//Called Functions
function onInit() {
	btnClick = "init";
	unInit();
	clearScreen();
    mfs100sample.init("init", success, failed);
}

function onUninit() {
	btnClick = "uninit";
	unInit();
	clearScreen();
    mfs100sample.uninit("uninit", success, failed);
}

function onStartCapture() {
	btnClick = "startcapture";
	clearScreen();
    mfs100sample.startcapture("startcapture", success, failed);
}

function onStopCapture() {
	btnClick = "stopcapture";
	clearScreen();
    mfs100sample.stopcapture("stopcapture", success, failed);
}

function onAutoStartCapture() {
	btnClick = "autocapture";
	clearScreen();
    mfs100sample.autocapture("autocapture", success, failed);
}

function onMatchISO() {
	if (isoTemplate.length > 0) {
		btnClick = "matchiso";
		clearScreen();
	    mfs100sample.matchiso(isoTemplate, success, failed);
	} else {
		failed("Iso template not found.");
	}
}

//Response Data
function success(response) {
	switch (btnClick) {
	case "init":
		lblstatus.innerHTML = response.errormsg;
		make.innerHTML = response.make;
		model.innerHTML = response.model;
		serialNo.innerHTML = response.serialno;
		width.innerHTML = response.width;
		height.innerHTML = response.height;
		cert.innerHTML = response.certificate;
		break;
	case "uninit":
		lblstatus.innerHTML = response.errormsg;
		break;
	case "startcapture":
		lblstatus.innerHTML = response.errormsg;
		if (response.errormsg == "Preview") {
			quality.innerHTML = response.quality;
			var img = response.fingerimage;
			imgFinger.setAttribute('src', 'data:image/png;base64,' + img);
		} else {
			quality.innerHTML = response.quality;
			nfiq.innerHTML = response.nfiq;
			isoTemplate = response.isotemplate;
			imgFinger.setAttribute('src', 'data:image/png;base64,' + response.fingerimage);
		}
		break;
	case "stopcapture":
		lblstatus.innerHTML = response.errormsg;
		break;
	case "autocapture":
		lblstatus.innerHTML = response.errormsg;
		if (response.errormsg == "Preview") {
			quality.innerHTML = response.quality;
			imgFinger.setAttribute('src', 'data:image/png;base64,' + response.fingerimage);
		} else {
			quality.innerHTML = response.quality;
			nfiq.innerHTML = response.nfiq;
			isoTemplate = response.isotemplate;
			imgFinger.setAttribute('src', 'data:image/png;base64,' + response.fingerimage);
		}
		break;
	case "matchiso":
		lblstatus.innerHTML = response.errormsg;
		if (response.errormsg == "Preview") {
			quality.innerHTML = response.quality;
			imgFinger.setAttribute('src', 'data:image/png;base64,' + response.fingerimage);
		} else {
			lblscore.innerHTML = response.matchscore;
			isoTemplate = response.isotemplate;
		}
		break;
	default:
		break;
	}
}

function failed(error) {
	lblstatus.innerHTML = error;
	unInit();
	clearScreen();
}

function unInit() {
	serialNo.innerHTML = "";
	width.innerHTML = "";
	height.innerHTML = "";
	make.innerHTML = "";
	model.innerHTML = "";
	cert.innerHTML = "";
}

function clearScreen() {
	quality.innerHTML = "";
	nfiq.innerHTML = "";
	score.innerHTML = "";
}

