/*****************************************************************************/
/* chatRoom: Event Handlers */
/*****************************************************************************/


window.URL = window.URL ||window.webkitURL;



var my_media = {};


Template.chatRoom.events({


});

/*****************************************************************************/
/* chatRoom: Helpers */
/*****************************************************************************/
Template.chatRoom.helpers({

  'getTitle' : function(){
    var out;
    to= Meteor.users.findOne({_id:Router.current().params.UserId});
    out= { "title" :to.profile.name}
    return out;
  
    },
    'record_conf': function(){
      var out;
      out= { 
        "to" :Router.current().params.UserId ,
        "typeRecord" :"CHAT" }
      return out;
    
    },

 
  getListaAudios: function() {  



    o=Audios.find({  $or:[  
    { 'metadata.from':  Meteor.user()._id , 'metadata.to':  Router.current().params.UserId   } ,
    { 'metadata.to':  Meteor.user()._id   , 'metadata.from':  Router.current().params.UserId   } 
        ] } , { sort: { 'metadata.sendAt': -1 }  });
        



    oo=[];
    o.forEach(function (row) {
   // console.log("AUDIO"+JSON.stringify(row));
      //console.log("row "+JSON.stringify(row));
      row.dest=Meteor.users.findOne({_id : row.metadata.to} );
      row.autor=Meteor.users.findOne({_id : row.metadata.from} );

    
      if (window.sessionStorage.getItem("audiosGravados["+row._id+"]") === null) {


  
       }else{
            row.url=window.sessionStorage.getItem("audiosGravados["+row._id+"]"); 

       }      


        row.urlAudioGravado=window.sessionStorage.getItem("audiosGravados["+row._id+"]"); 

      

//      var blob = new Blob([audio_tmp.file], {type: audio_tmp.type});
  //    row.url_blob=window.URL.createObjectURL(blob);
      //url_base = window.location.protocol + "//" + window.location.host ;
        //row.full_url="http://matefy.meteor.com/cfs/files/audioStore/" + row._id ;

      
      
      oo.push(row);
      //console.log("orc "+JSON.stringify(oo));



    }); 
    
     return oo;

  },


});
Template.chatMessage.helpers({
  Chat:function (argument) {
 //   return Matching.findOne().chat;
  },
  isMind:function () {
  //  console.log(this);
   // return Meteor.userId()===this.from ? "mine" : "notmine";
  },
});

/*****************************************************************************/
/* chatRoom: Lifecycle Hooks */
/*****************************************************************************/
Template.chatRoom.onCreated(function () {



    

});

Template.chatRoom.onRendered(function () {
  Session.set('ionTab.current','/MatchList');



    $(".play").on('click', function(e) {
        console.log("PLAY "+this.id.replace('play-','')+" "+this.value);
        playAudio(this.id.replace('play-',''),this.value);
       
    });


    $(".stop").on('click', function(e) {
        console.log("STOP "+this.id.replace('stop-',''));
        stopAudio(this.id.replace('stop-',''));        

    });


});

Template.chatRoom.onDestroyed(function () {
});


    function playAudio(id,url) {

        console.log("playAudio() "+id+" "+url);
        // Play the audio file at url
        if (window.sessionStorage.getItem("audiosGravados["+id+"]") === null) {
         /*   my_media[id] = new Media(url,
        // success callback        
                function () {
                     
                    console.log("playAudio():Audio Success");
                },
                // error callback
                function (err) {
                    console.log("playAudio():Audio Error: ");
                    console.log(err);
                }
            );*/
            my_media[id] = new Audio();
            my_media[id].src=url;            

        }else{
            my_media[id] = new Audio();
            my_media[id].src=window.sessionStorage.getItem("audiosGravados["+id+"]");            
        }        

 

        
       
    // Play audio
    my_media[id].play();

/*    // Get duration
    var counter = 0;
    var timerDur = setInterval(function() {
        counter = counter + 100;
        if (counter > 2000) {
            clearInterval(timerDur);
        }
        var dur = my_media[id].getDuration();
        if (dur > 0) {
            clearInterval(timerDur);
            document.getElementById('duration-'+id).innerHTML = (dur) + " sec";
        }
    }, 100);
    */
}

function stopAudio(id) {
     console.log("stopAudio()"+id);
    my_media[id].stop();
}    
