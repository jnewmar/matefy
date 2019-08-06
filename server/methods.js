/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
  'server/method_name': function () {
    // server method logic
  },
  'updateMovie':function (trackId) {
    Interest.upsert({userId:Meteor.userId()}, {$set:{
      fbID:Meteor.user().profile.id,
      trackId:trackId,
      Gender:Meteor.user().profile.gender
    }});
  },
  'createMatching':function (dataObject) {
    Matching.upsert(lodash.omit(dataObject,'Status'),{$inc:{Status:1}});
    // Matching.upsert(lodash.omit(dataObject,'Status'),{$inc:{Status:2}});


    var matchingObj = Matching.findOne(lodash.omit(dataObject,'Status'));

    if(matchingObj.Status===2){
      // var ids = [];
      // ids.push(matchingObj.Male);
      // ids.push(matchingObj.Female);
      // Meteor.users.update({_id:{$in:ids}},{$inc:{'profile.unRead':1}});

      var modalMatchObj = schema.modalMatch;

      // modalMatchObj.targetId = Meteor.userId()=== matchingObj.Male? matchingObj.Female : matchingObj.Male;
      // modalMatchObj.partner = Meteor.users.findOne(modalMatchObj.targetId).profile.name;
      modalMatchObj.chatroomId = matchingObj._id;
      modalMatchObj.maleName = Meteor.users.findOne(matchingObj.Male).profile.name;
      modalMatchObj.malefbId = Meteor.users.findOne(matchingObj.Male).profile.id;
      modalMatchObj.femaleName =  Meteor.users.findOne(matchingObj.Female).profile.name;
      modalMatchObj.femalefbId =  Meteor.users.findOne(matchingObj.Female).profile.id;


   //   em.emit('newMatch',modalMatchObj);


    }

    return matchingObj.Status===2 ? matchingObj._id : false;




  },
  'sendMsg':function (dataObject) {
    console.log('start sendMsg');
   //  console.log(dataObject);
    var modifier = {};
    var chatObj = {};
    chatObj.from = Meteor.userId();
    chatObj.to = Meteor.userId() === dataObject.Male ? dataObject.Female : dataObject.Male;
    chatObj.sendAt = new Date().getTime();
    chatObj.text = dataObject.text;
  //  chatObj.audio = dataObject.audio;
    modifier.$push = {chat:chatObj};
    Matching.update(dataObject._id,modifier);

    Meteor.users.update({_id:chatObj.to},{$inc:{'profile.unRead':1}});
    chatObj.id_audio = dataObject.id_audio;
    chatObj.audio = dataObject.audio;
    Mensagens.insert(chatObj);


  },
  'initChat':function (id) {

    console.log("init chat "+ Meteor.userId()+ " "+id);
    Chats.insert(  { "user" : Meteor.userId() , "target" :  id  });
    Chats.insert(  { "target" : Meteor.userId() , "user" :  id });


          me=Meteor.user();

          obj ={
            user : id ,
            fromId: Meteor.userId(),
            fromName: me.profile.name,
            fromFid: me.profile.id,
            fromPush: "Matefy",
            title: me.profile.name+' accept your invitetion to talk',
            text: me.profile.name+' accept your invitetion to talk ',            
            tipo : "chat",
            addedAt: new Date()
          };

          console.log("SendNotification "+JSON.stringify(obj));
          SendNotification(obj);


  },        


  'setChat':function (id) {

        console.log("set chat "+ Meteor.userId()+ " "+id);
          Chats.update(  { "user" : Meteor.userId() , "target" :  id  }, 
                        { $set: { lastMessage : new Date().getTime() } ,
                          $setOnInsert : { lastMessage : new Date().getTime() } },
            { upsert : true}
           );

          Chats.update(  { "target" : Meteor.userId() , "user" :  id }, 
                        { $set: { lastMessage : new Date().getTime() } ,
                         $setOnInsert : { lastMessage : new Date().getTime() } },
            { upsert : true}
           );

  },        
  'getMate':function (topicId ,audioId) {
          // falta fazer o filtro por topic
          o=Invitations.find(  { 
            'from':  Meteor.userId()  ,
            'topicId' : topicId ,
           } ,
             {sort: { data_invitation: -1}});
          oo=[];
          o.forEach(function (row) {      
            oo.push(row.to);
          });
        oo.push(Meteor.userId());
          console.log("getMate "+ Meteor.userId()+ " "+topicId+" "+audioId);
          console.log("not in users "+JSON.stringify(oo));
          u=Meteor.users.find( { 
            _id : { $nin : oo } ,
            "profile.interests" : { $in : [ topicId ] } ,
           },{  limit : 5 });
          u.forEach(function (row) {

          console.log("Inviting  "+row._id+" "+row.profile.name);

          invitation = { 
            topicId : topicId ,
            audioId : audioId ,
            from :  Meteor.userId() ,
            to :  row._id ,
            data_invitation : new Date()  
          };
          id_invitation = Invitations.insert(invitation);
          invitation.id_invitation=id_invitation;
          me=Meteor.user();

          obj ={
            user : row._id    ,
            fromId: Meteor.userId(),
            fromName: me.profile.name,
            fromFid: me.profile.id,
            fromPush: "Matefy",
            title: me.profile.name+' invite you to talk',
            text: me.profile.name+' invite you to talk ',
            id_invitation : id_invitation ,
            tipo : "invitation",
            invitation : invitation ,
            addedAt: new Date()
          };

          console.log("SendNotification "+JSON.stringify(obj));
          SendNotification(obj);





        });       

  },      
  'setbadge':function (arr) {
    console.log(arr);
    Meteor.users.update({_id:{$in:arr}},{$set:{notice:true}});

  },
  'setNoticeFalse':function (argument) {
    Meteor.users.update(Meteor.userId(),{$set:{notice:false}});
  },
  'setRead':function (argument) {
    Meteor.users.update(Meteor.userId(),{$set:{'profile.unRead':0}});
  },
  'urlBase':function () {   
    var u=process.env.ROOT_URL;
   // console.log('url '+u);
    return u;
  },
  'SendNotification': function(obj) {
        console.log("SendNotification "+JSON.stringify(obj));
        SendNotification(obj);

  },

serverNotification: function (user) {
    var last = NotificationHistory.findOne({ 'user':  user   }, {sort: {addedAt: -1}});
    var badge = 1
    if (last != null) {
      badge = last.badge + 1;
    }

    NotificationHistory.insert({
      user : user ,
      badge: badge,
      title: 'Hello World',
      text: 'This notification has been sent from the SERVER',      
      addedAt: new Date()
    }, function (error, result) {
      if (!error) {
        Push.send({
          from: 'push',

          badge: badge,
          payload: {
            title: 'Hello World',
            historyId: result
          },
          query: {}
        });
      }
    });
  },
  removeHistory: function (user) {
    NotificationHistory.remove({ 'user':  user   }, function (error) {
      if (!error) {
        console.log("All history removed");
      }
    });
  }


});

function SendNotification(obj){
            Notifications.insert(obj, function (error, result) {
            if (!error) {
              Push.send({
                from: obj.fromPush,
                title: obj.title,
                text:  obj.text,
                payload: {
                  title: obj.text,
                  historyId: result,                
                  tipo : obj.tipo,
                  obj : obj
                },
                query: {
                  userId: obj.to 
                }
              });
            }
          });
}