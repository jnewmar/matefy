 Template.header.rendered = function(){
	this.autorun(function () {

		
		$('.button-collapse').sideNav({
		//  menuWidth: 300, // Default is 240
		  edge: 'left', // Choose the horizontal origin
		  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
		});



 	});
}
Template.header.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});