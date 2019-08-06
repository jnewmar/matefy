/*****************************************************************************/
/* FirstTime: Event Handlers */
/*****************************************************************************/
Template.FirstTime.events({

    'click #next': function(e) {
            e.preventDefault();
            var now = new Date().getTime() ;
            docCookies.setItem("viewFirstTime", now , Infinity);
            Router.go('Login');
                   
               
         
        
    }

});
/*****************************************************************************/
/* FirstTime: Helpers */
/*****************************************************************************/
Template.FirstTime.helpers({
});

/*****************************************************************************/
/* FirstTime: Lifecycle Hooks */
/*****************************************************************************/
Template.FirstTime.onCreated(function () {
});

Template.FirstTime.onRendered(function () {




});

Template.Login.onDestroyed(function () {
});
