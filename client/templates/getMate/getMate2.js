


Template.getMate2.events({
  "click #but-get-a-mate " : function(e){
    console.log("clicou but-get-a-mate"); 

        audioId  = $(e.currentTarget).data('audioid');
        console.log(audioId);
        topicId  = $(e.currentTarget).data('topicid');
        console.log(topicId);

        Meteor.call("getMate", topicId ,audioId );   
        Router.go('/getMate3');
  },
  "click #but-back " : function(event){
    console.log("back"); 
    Router.go('getMate');
  },
});

Template.getMate2.helpers({
  'getTitle' : function(){
    var out;
    out= { "title" :"Get a mate!" }
    return out;
  
    },
    'record_conf': function(){
      var out;
      out= { 
        "topicId" :Router.current().params.topicId ,
        "typeRecord" :"PRESENTATION" }
      return out;
    
    },

});

Template.getMate2.onCreated(function () {
});

Template.getMate2.onRendered(function () {

 

});

Template.getMate2.onDestroyed(function () {
});
