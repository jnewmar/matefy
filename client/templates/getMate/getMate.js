

/*****************************************************************************/
/* getMate: Event Handlers */
/*****************************************************************************/
Template.getMate.events({


});

/*****************************************************************************/
/* getMate: Helpers */
/*****************************************************************************/
Template.getMate.helpers({
  'topics':function () {
    return Topics.find();
  },
  'getTitle' : function(){
    var out;
    out= { "title" :"Get a mate!" }
    return out;
  
    },
});

/*****************************************************************************/
/* getMate: Lifecycle Hooks */
/*****************************************************************************/
Template.getMate.onCreated(function () {
});

Template.getMate.onRendered(function () {

 $('.parallax').parallax();

});

Template.getMate.onDestroyed(function () {
});
