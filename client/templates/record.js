
var fileDir;
var fileTransferDir;

var audio_context;
var recorder;
var recorderWeb;
var mediaRec;


var startValue = 60000; //Number of milliseconds
var time = new Date(startValue);
var interv;

var lastAudioId;

function displayTime(divId){
    $("#"+divId).text(fillZeroes(time.getMinutes()) + ":" + fillZeroes(time.getSeconds()));
}

function fillZeroes(t){
    t = t+"";
    if(t.length==1)
        return "0" + t;
    else
        return t;
}
  function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.' );
    console.log("input sample rate " +input.context.sampleRate);

    // Feedback!
    //input.connect(audio_context.destination);
    console.log('Input connected to audio context destination.');

    recorderWeb = new Recorder(input, { numChannels: 1 });
    console.log('Recorder initialised.');
  }


  function startRecording() {
    console.log('Recording ');
    if (Meteor.isCordova) {
        recorder.record();
    }else{  
        recorderWeb && recorderWeb.record();
    }  
  }

  function stopRecording() {
    console.log('Stopped recording.');
    preStop();
    if (Meteor.isCordova) {
        recorder.stop();     
    }else{  
        recorderWeb && recorderWeb.stop();
        return createDownloadLink();
       
    }    
  }

  function playRecording() {
    console.log('Play recording.');

    if (Meteor.isCordova) {        
        recorder.playback();       
        

    }else{  
        lastAudio = new Audio();
        lastAudio.src=window.sessionStorage.getItem("lastAudioGravados"); 
        lastAudio.play();
        
    }    
  }

  function createDownloadLink() {
    console.log('createDownloadLink');
    recorderWeb && recorderWeb.exportWAV(function(mp3Blob) {
          console.log("createDownloadLink");
        fileId=uploadBLob(mp3Blob);
        console.log('Limpando');
        recorderWeb.clear();
        return fileId;
    });

  }

function uploadBLob(mp3Blob) {

  console.log("uploadBLob");
  console.log('typeRecord '+typeRecord);
  if(typeRecord=="PRESENTATION"){
        console.log('topicId '+topicId);
       fileObj=Audios.insert(mp3Blob);
          Audios.update( { "_id" : fileObj._id },
              { 
                $set : { "metadata" : { 

                  "from" : Meteor.userId() ,
                  "sendAt" : new Date().getTime(),
                  "typeRecord" : typeRecord,
                  "topicId" : topicId
                  
                } }

               });
  }else if(typeRecord=="CHAT"){
          fileObj=Audios.insert(mp3Blob);
          Audios.update( { "_id" : fileObj._id },
              { 
                $set : { "metadata" : { 

                  "from" : Meteor.userId() ,
                  "to" : Router.current().params.UserId ,
                  "sendAt" : new Date().getTime(),
                  "typeRecord" : typeRecord                  
                } }

               });
          Meteor.users.update({_id:Router.current().params.UserId},{$inc:{'profile.unRead':1}});

          Meteor.call("setChat", Router.current().params.UserId);   

          me=Meteor.user();
          obj ={
            user : Router.current().params.UserId ,
            fromId: Meteor.userId(),
            fromName: me.profile.name,
            fromFid: me.profile.id,
            fromPush: "Matefy",
            title: "New message from "+me.profile.name,
            text: "New message from "+me.profile.name,       
            tipo : "chat",
            addedAt: new Date()
          };

       //   Meteor.call("SendNotification",obj);
  }
  lastAudioId=fileObj._id;
  console.log("Audio uploaded");  
  posUpload(true);
  return fileObj._id ;
     


}








  var BinaryFileUrlReader = {
    read: function (file, callback) {
        var reader = new FileReader;

        var fileInfo = {
            name: file.name,
            type: file.type,
            size: file.size,
            file: null
        }

        reader.onload = function () {
            fileInfo.file = new Uint8Array(reader.result);
            callback(null, fileInfo);
        }
        reader.onerror = function () {
            callback(reader.error);
        }

        reader.readAsArrayBuffer(file);
    }
}




var errorHandler = function (fileName, e) {  
    var msg = '';

    switch (e.code) {
        case FileError.QUOTA_EXCEEDED_ERR:
            msg = 'Storage quota exceeded';
            break;
        case FileError.NOT_FOUND_ERR:
            msg = 'File not found';
            break;
        case FileError.SECURITY_ERR:
            msg = 'Security error';
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            msg = 'Invalid modification';
            break;
        case FileError.INVALID_STATE_ERR:
            msg = 'Invalid state';
            break;
        default:
            msg = 'Unknown error';
            break;
    };

    console.log('Error (' + fileName + '): ' + msg);
}
  function encode64(buffer) {
    var binary = '',
      bytes = new Uint8Array( buffer ),
      len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }


Template.record.onRendered(function () {

    if (Meteor.isCordova) {

        recorder = new Object;
        recorder.stop = function() {
          window.plugins.audioRecorderAPI.stop(function(msg) {
            // success 
            //alert('STOP ok: ' + msg);
            window.resolveLocalFileSystemURL("file://"+msg, f1, function(err2) {
                    console.log("Lendo arquivo Error:  "+ err2.code);
            });    
            
          }, function(msg) {
            // failed 
            console.log("Erro stop "+msg);
            posUpload(false);
            alert('Error: try again');

          });
        }
        recorder.record = function() {              

              window.plugins.audioRecorderAPI.record(function(msg) {
                console.log('arquivo '+msg);    
                
                window.resolveLocalFileSystemURL("file://"+msg, f1, function(err2) {
                    console.log("Lendo arquivo  Error:  "+ err2.code);
                });    
               
               
                // complete 
              //  alert('ok: ' + msg);
              }, function(msg) {
                // failed 
                console.log("Erro ao gravar "+msg);
                posUpload(false);
                alert('Error: try again');
             //   alert('NOK record: ' + msg);
              }, 1000000); // record 60 seconds 
        }
        recorder.playback = function() {
          window.plugins.audioRecorderAPI.playback(function(msg) {
            // complete 
           // alert('ok: ' + msg);
          }, function(msg) {
            // failed 
          //  alert('ko: ' + msg);
          });
        }
       
     

        function f1(fileEntry) {
        console.log("file entry");
            console.log(fileEntry);
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function (e) {
                  fileid=uploadBLob(this.result);

                  window.sessionStorage.setItem("lastAudioGravados",  this.result); 
                  window.sessionStorage.setItem("audiosGravados["+fileid+"]",  this.result );   

                  console.log ("The Mp3 data " );
                  console.log ( this.result );

                };                    
            }, function(err1) {
                console.log("File Entry Error: "+ err1.code);
            } );
        }


    }else{        
         try {
              // webkit shim
              window.AudioContext = window.AudioContext || window.webkitAudioContext;
              navigator.getUserMedia = ( navigator.getUserMedia ||
                               navigator.webkitGetUserMedia ||
                               navigator.mozGetUserMedia ||
                               navigator.msGetUserMedia);
              window.URL = window.URL || window.webkitURL;

              audio_context = new AudioContext;
              console.log('Audio context set up.');
              console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
        } catch (e) {
          alert('No web audio support in this browser!');
        }

        navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
          console.log('No live audio input: ');
          console.log(e);
        });
            
    }    




});

// template event handlers
Template.record.events = {
  //  'click #start-recording': function (e) {
     "mousedown #but-start-record, touchstart #but-start-record" : function(e){
        console.log("clicando"); 

        typeRecord  = $(e.currentTarget).data('typerecord');
        console.log(typeRecord);
        if(typeRecord=="PRESENTATION"){
            topicId  = $(e.currentTarget).data('topicid');
            console.log(topicId);
        }
        


      //  alert("click #start-recording");
        console.log("click #start-recording");
        e.preventDefault();

        if (!Meteor.user()) {
            // must be the logged in user
            console.log("\tNO USER LOGGED IN");
            return;
        }
         $('#box-timer').show()
     /*
        divId="box-timer";
        displayTime(divId);
       
        interv = setInterval(function(){
          try {             
            time = new Date(time - 1000);
            if(time<=0){
              //  done();
                clearInterval(interv);
            }
            displayTime(divId);    
          }finally {
              clearInterval(interv);        
          }   
      }, 1000);*/
        startRecording();


    },
"mouseup #but-start-record, touchend #but-start-record" : function(e){
     console.log("soltando");     
//    'click #stop-recording': function (e) {
    //    alert("click #stop-recording");        
        console.log("click #stop-recording");
        e.preventDefault();

        
        id_audio=stopRecording();
        

    },
  'click #but-play-record': function (e) {
    //    alert("click #stop-recording");        
        console.log("click #stop-recording");
        e.preventDefault();

        

        playRecording();
    }

};


function preStop(){
  $('#but-start-record').hide();
  $('#box-timer').text("Sending ...");
  $('#box-load').show();



}

function posUpload(ok){

  console.log("pos-Upload");    
  $('#box-load').hide();  
  $('#box-timer').hide();
  $('#box-timer').text("Recording ...");  


  console.log("typeRecord "+typeRecord);
  if(typeRecord=="PRESENTATION"){
    $('#but-play-record').show();  
    if(ok){    
      $('#but-get-a-mate').data('topicid',Router.current().params.topicId) ;
      $('#but-get-a-mate').data('audioid',lastAudioId);
      $('#but-get-a-mate').show();
    } 
  } 
  if(typeRecord=="CHAT"){

      $('#but-start-record').show();
    //  clearInterval(interv);
    //  time = new Date(startValue);

  }
}

