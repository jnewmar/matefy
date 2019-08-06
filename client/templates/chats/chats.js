/*****************************************************************************/
/* Chats: Event Handlers */
/*****************************************************************************/
Template.Chats.events({
});

/*****************************************************************************/
/* Chats: Helpers */
/*****************************************************************************/
Template.Chats.helpers({
  'getTitle' : function(){
    var out;
    out= { "title" : "Chats"}
    return out;
  
    },



  partner:function (argument) {

    if( Chats.find( { 'user':  Meteor.user()._id  }).count() <=0){
        return false ;
    }else{

      o=Chats.find( { 'user':  Meteor.user()._id  });
      oo=[];
      o.forEach(function (row) {
      
        row.dest=Meteor.users.findOne({_id : row.target} );      
        oo.push(row);

      }); 
      
       return oo;
    }   

    
  },

});

/*****************************************************************************/
/* Chats: Lifecycle Hooks */
/*****************************************************************************/
Template.Chats.onCreated(function () {
});

Template.Chats.onRendered(function () {
});

Template.Chats.onDestroyed(function () {
});
