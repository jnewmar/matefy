window.URL = window.URL ||window.webkitURL;
var my_media = {};

Template.Invitations.events({
  "click #but-get-a-mate " : function(e){
    console.log("clicou but-get-a-mate"); 

        audioId  = $(e.currentTarget).data('audioid');
        console.log(audioId);
        topicId  = $(e.currentTarget).data('topicid');
        console.log(topicId);

        Meteor.call("getMate", topicId ,audioId );   
        Router.go('/Home#dashboard');
  },
  "click #but-back " : function(event){
    console.log("back"); 
    Router.go('getMate');
  },

  "click .play " : function(e){ 

      audioId  = $(e.currentTarget).data('audioid');
      console.log(audioId);
      $('#load-'+audioId).show();  
      $('#play-'+audioId).hide();



      objAudio=Audios.findOne( { _id : audioId });
     // console.log("objAudio");
     // console.log(objAudio);
      
      if (window.sessionStorage.getItem("audiosGravados["+audioId+"]") === null) {
          window.sessionStorage.setItem("audiosGravados["+audioId+"]",  objAudio.url() );              
          
      }
      my_media[audioId] = new Audio();
      my_media[audioId].id="audio-"+audioId;
      my_media[audioId].src=window.sessionStorage.getItem("audiosGravados["+audioId+"]");            
      my_media[audioId].play();

    //  console.log(my_media[audioId]);
      $('#stop-'+audioId).show();  
      $('#load-'+audioId).hide(); 

      interv =setInterval(function(){
          try {
             if(my_media[audioId].ended){
              $('#play-'+audioId).show();            
              $('#stop-'+audioId).hide();  
            }    
          }finally {
              clearInterval(interv);        
          }                         
        }, 1000);
        


  }    ,
    "click .stop " : function(e){ 

      audioId  = $(e.currentTarget).data('audioid');
      console.log("stop "+audioId);      

      my_media[audioId].pause();
      
      $('#play-'+audioId).show();            
      $('#stop-'+audioId).hide();  
      
  },
    "click .accept " : function(e){ 

      invitationId  = $(e.currentTarget).data('invitationid');
      console.log("invitationId "+invitationId);      
      to  = $(e.currentTarget).data('to');
      Meteor.call("initChat", to);  
      Router.go('/chatRoom/'+to);   
  },




});

Template.Invitations.helpers({
    'getTitle' : function(){
    var out;
    out= { "title" :"Invitations" }
    return out;
  
    },
  'getReceivedInvitations' : function(){
    console.log("getReceivedInvitations"); 
    o=Invitations.find(  { 'to':  Meteor.user()._id   } ,  {sort: { data_invitation: -1}});
    oo=[];
    o.forEach(function (row) {      
    console.log("from "+row.from ); 
      row.objTo=Meteor.users.findOne( { _id : row.from });

      row.objTopic=Topics.findOne( { _id : row.topicId });

      row.objAudio=Audios.findOne( { _id : row.audioId });

      if (window.sessionStorage.getItem("audiosGravados["+row.audioId+"]") === null) {
  //        window.sessionStorage.setItem("audiosGravados["+row.audioId+"]",  row.objAudio.url() );              
  
       }else{
            row.urlAudio=window.sessionStorage.getItem("audiosGravados["+row.audioId+"]"); 

       }
       row.urlAudioGravado=window.sessionStorage.getItem("audiosGravados["+row.audioId+"]"); 



    //  console.log("invitation  "+JSON.stringify(row));
      oo.push(row);
    }); 
    return oo;
  },
  

});

Template.Invitations.onCreated(function () {
//    this.subscribe("MyInvitations");

});

Template.Invitations.onRendered(function () {

 

});

Template.Invitations.onDestroyed(function () {
});




