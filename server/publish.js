Meteor.publish('allUserWithOutMe', function () {
  // console.log("me "+this.userId);
  return Meteor.users.find( { _id : { $ne : this.userId } });
});


Meteor.publish("MyNotification", function(){
  //console.log(this.userId);
  return Notifications.find(  { 'user':  this.userId   }  );
});

Meteor.publish("myInvitations", function(){
 // console.log("myInvitations ");
  /*
  console.log(this.userId);
   topicId : topicId ,
  audioId : audioId ,
  from :  Meteor.userId() ,
  to :  row._id ,
  data_solic : new Date()  
  */
  o=Invitations.find(  { 'to':  this.userId   } ,  {sort: { data_invitation: -1}});
  return o;
});

Meteor.publish("allUserInInvitations", function(){
    o=Invitations.find(  { 'to':  this.userId   } ,  {sort: { data_invitation: -1}});
    oo=[];
    o.forEach(function (row) {      
      oo.push(row.from);
    }); 
  return Meteor.users.find( { _id : { $in : oo } });

});

Meteor.publish("allAudiosInInvitations", function(){
    o=Invitations.find(  { 'to':  this.userId   } ,  {sort: { data_invitation: -1}});
    oo=[];
    o.forEach(function (row) {      
      oo.push(row.audioId);
    }); 
  return Audios.find( { _id : { $in : oo } });

});



Meteor.publish("MyChats", function(){
  //console.log(this.userId);
  return Chats.find(  { 'user':  this.userId   }  );
});
Meteor.publish("allUserInChat", function(){
    o=Chats.find(  { 'user':  this.userId   }  );
    oo=[];
    o.forEach(function (row) {      
      oo.push(row.target);
    }); 
  return Meteor.users.find( { _id : { $in : oo } });

});


Meteor.publish("ChatMessages", function(id){
//  console.log(this.userId);
//  console.log(id);
  return Audios.find({  $or:[  
    { 'metadata.from':  this.userId  , 'metadata.to':  id   } ,
    { 'metadata.to':  this.userId  , 'metadata.from':  id   } ,
        ] ,"metadata.typeRecord" : "CHAT" } );
});


Meteor.publish('GetUser', function (id) {
  return Meteor.users.find({ "_id" : id });
});

Meteor.publish('AllInterest', function () {
  return Interest.find();
});

Meteor.publish('AllTracks', function () {
  return Tracks.find();
});
Meteor.publish('AllTopics', function () {
  return Topics.find();
});

Meteor.publish('AllInterestWithoutMatched', function () {
  var MatchingList = Matching.find({$or:[ {Male:this.userId},{Female:this.userId}  ],Status:2}).fetch();
  var boylist = lodash.map(MatchingList,'Male');
  var girllist = lodash.map(MatchingList,'Female');
  var Arr = lodash.union(boylist,girllist);
  console.log(Arr);
  return Interest.find({_id:{$nin:Arr}});
});
Meteor.publish('AllInterestWithoutMatchedBytrackId', function (trackId) {
  var MatchingList = Matching.find({$or:[ {Male:this.userId},{Female:this.userId}  ],Status:2}).fetch();
  var boylist = lodash.map(MatchingList,'Male');
  var girllist = lodash.map(MatchingList,'Female');
  var Arr = lodash.union(boylist,girllist);

  console.log(Arr);
  return Interest.find({userId:{$nin:Arr},trackId:trackId});
});
Meteor.publish('AllUser', function () {
  return Meteor.users.find();
});
Meteor.publish('AllMovie', function () {
  return Movies.find();
});
Meteor.publish('getChatroomById', function (id) {
  return Matching.find(id);
});
Meteor.publish('getMyMatchedList', function () {
  // console.log(this.userId());
  return Matching.find({$or:[ {Male:this.userId},{Female:this.userId}  ],Status:2});
});


