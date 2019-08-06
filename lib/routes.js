Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound',
  yieldTemplates: {
    'footer': {to: 'footer'},
    'header': {to: 'header'}
    }
});  
Router.route('Login',{
  path:"/"
});
Router.route('FirstTime');

Router.route('Home',{
  waitOn:function () {
    return [ Meteor.subscribe('AllTopics')    ];
  }
});

Router.route('Wellcome',{
  waitOn:function () {
    return [ Meteor.subscribe('AllTopics')    ];
  }
});

Router.route('Dashboard',{
  waitOn:function () {
    return [ Meteor.subscribe('AllTopics')    ];
  }
});


Router.route('Chats',{
  waitOn:function () {
    return [      Meteor.subscribe('MyChats'),
    Meteor.subscribe('allUserInChat')];
  }
});

Router.route('Notifications',{
  waitOn:function () {
    return [   Meteor.subscribe('MyNotification')];
  }
});


Router.route('Invitations',{
  waitOn:function () {
    return [    Meteor.subscribe('myInvitations'),
    Meteor.subscribe('allUserInInvitations'),    
    Meteor.subscribe('allAudiosInInvitations'),    
    Meteor.subscribe('AllTopics')];
  }
});


notLogged = ['Login','FirstTime'] ;
withoutHeader = ['Login','FirstTime'] ;

Router.onBeforeAction(function () {

  if(!Meteor.userId()){      
    console.log("Deslogado");
    if(docCookies.hasItem('viewFirstTime')){
        console.log("viewFirstTime");      
        this.redirect('Login');
    }else{
        console.log("not viewFirstTime");            
      this.redirect('FirstTime');
    }  
  }  
  this.next();
}, {except: [ 'FirstTime']});



Router.onBeforeAction(function () {

  if(Meteor.userId()){    

    me=Meteor.user();

    console.log("viewWellcome " +me.profile.viewWellcome);  
    if(me.profile.viewWellcome == 1){
      this.redirect('Dashboard');      
    }else{ 
      this.render('Wellcome');        
    } 
  }else{
      this.render('Login'); 
  }       

}, {only: ['Home','Login']});

Router.route('getMate',{
  waitOn:function () {
    return Meteor.subscribe('AllTopics');
  }
});



Router.route('getMate2',{
  path:'/getMate2/:topicId',
  waitOn:function () {
    return [];
  }

});

Router.route('getMate3',{});

Router.route('chatRoom',{
  path:'/chatRoom/:UserId',
  waitOn:function () {
    return [
    Meteor.subscribe('GetUser',this.params.UserId) ,
    Meteor.subscribe('ChatMessages',this.params.UserId) 
    ];
  }

});



Router.route('logout', {
    path: '/logout',
    template: 'logout',
      waitOn: function() { 
          Meteor.logout();
         this.redirect('Login');
          return true;
      
      },
    
  }); 

/*

Router.onBeforeAction(function () {
  Meteor.call("setRead");
  this.next();

}, {only: ['Chatroom','MatchList']});




Router.route('Chatroom',{
  path:'/Chatroom/:UserId',
  waitOn:function () {
    return [
    Meteor.subscribe('GetUser',this.params.UserId) ,
    Meteor.subscribe('ChatMessages',this.params.UserId) 
    ];
  }

});





Router.route('Home',{
  waitOn:function () {
    return Meteor.subscribe('AllTopics');
  }
});





Router.route('Profile');

Router.route('MatchList',{
  waitOn:function (argument) {
    if(Meteor.user())
      return [Meteor.subscribe('getMyMatchedList'), Meteor.subscribe('allUserWithOutMe',Meteor.user().profile.gender)];
   }
});

Router.route('ChatList',{
  waitOn:function (argument) {
    if(Meteor.user())


      return [ Meteor.subscribe('MyChats'), Meteor.subscribe('allUserInChat')];
   }
});

Router.route('UserList',{
  waitOn:function (argument) {
    if(Meteor.user())
      return [ Meteor.subscribe('allUserWithOutMe')];
   }
});



Router.route('Partner',{
  path:"food/:trackId",
  waitOn:function () {
    return [Meteor.subscribe('AllInterestWithoutMatchedBytrackId',this.params.trackId),Meteor.subscribe('AllUser'),Meteor.subscribe('AllTracks')];
  }
});



  */