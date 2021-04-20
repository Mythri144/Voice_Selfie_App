var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function listen(){
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event){
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    if(Content == "take my selfie"){
        console.log("taking your selfie --- ")
        speak();
    }
}

function speak(){
    var declare = window.speechSynthesis;
    var speak_data = "Taking your selfie in 5 seconds. ";
    var say = new SpeechSynthesisUtterance(speak_data);
    declare.speak(say);
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    },5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("display").innerHTML = '<img src = '+data_uri+' id = "selfie_image">';
    });
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}