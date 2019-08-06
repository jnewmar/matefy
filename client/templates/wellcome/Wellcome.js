/*****************************************************************************/
/* Wellcome: Event Handlers */
/*****************************************************************************/
Template.Wellcome.events({

    'click #goHome': function(e) {
	    e.preventDefault();

	     Meteor.users.update({_id : Meteor.userId()}, { 
	        $set : {
	            "profile.viewWellcome" : 1 
	        }
	    } );
   	    Router.go('Home');
  }

});
/*****************************************************************************/
/* Wellcome: Helpers */
/*****************************************************************************/
Template.Wellcome.helpers({
});

/*****************************************************************************/
/* Wellcome: Lifecycle Hooks */
/*****************************************************************************/
Template.Wellcome.onCreated(function () {
});

Template.Wellcome.onRendered(function () {




});

Template.Login.onDestroyed(function () {
});
