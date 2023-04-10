video="";
snapshot="";
resultObtaned="";


var SpeeRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeeRecognition();

//  <button class="btn btn-warning" onclick="take_snapshot()">Take Snap</button>
//  <button class="btn btn-danger">Identify</button>

Webcam.set({
    width:350,
    height:350,
    img_format:"jpg",
    jpg_quality:90
    });

    cameraVariable = document.getElementById("camera");

    Webcam.attach(cameraVariable);

    function take_snapshot(){
        Webcam.snap(function(data_uri){
         document.getElementById("snaps").innerHTML='<img id="snapshot" src="'+data_uri+'"/>';
         //snapshot=data_uri;
        })
    }
alert("Please wait for few seconds.");
    function setup(){
        console.log("ml5 = ", ml5.version);
        synth = window.speechSynthesis;
        textspeech= new SpeechSynthesisUtterance("This app is made by various codes. The app is made by Aayush Kumar");
    synth.speak(textspeech)

        model1 = ml5.imageClassifier('MobileNet',modelLoaded);
        
;
    }
    
  
function modelLoaded(){
    console.log("Model loaded!!!!!!!!!!!");
    alert("Model Loaded!! Please speak.");
    recognition.start();
      
}

recognition.onresult= function(event){
    take_snapshot();
content = event.results[0][0].transcript;
console.log(content);
if(content == "what is this"){
    video = document.getElementById("snapshot");
alert("Classified!!");  
    model1.classify(video, gotResult);
    
}
else{
alert("We heard: "+content+" from you. Please speak 'what is this' whenever you are ready by restarting the page.");
}

}

function gotResult(error, results){
if(error){
console.error(error);
}
else{
    console.log(results);
    
    document.getElementById("result").innerHTML="Result: " +results[0].label;
    document.getElementById("anchor").innerHTML="Click me for more information"
    textspeech= new SpeechSynthesisUtterance("The result is "+results[0].label);
    synth.speak(textspeech);
   // link = document.getElementById("anchor");
   resultObtaned=results;
    //link.href = "https://en.wikipedia.org/wiki/"+results[0].label;
    recognition.start();

}
}

function searchGoogle(){
    var searchTerm = resultObtaned[0].label;
    var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchTerm);
    window.open(searchUrl, "_blank");
   
}