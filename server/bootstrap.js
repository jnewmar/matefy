Meteor.startup(function () {
//    { $set: { appId: "", secret: "" } }
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    { $set: { appId: "", secret: "" } }
  );


limpar=0;
var ids = [];
ids.push(560498514); //She is my gf!!!!
ids.push(503674580);
ids.push(100003743012797);
ids.push(1428036985);
ids.push(19614945368);
ids.push(309787872509777);
ids.push(1712329320);

ids.push(100000461840895);
ids.push(100007881438763);
ids.push(334272573297217);
ids.push(1136260708);
ids.push(1253321724);
ids.push(1095417037);
ids.push(539479940);
ids.push(1233852119);
ids.push(560202378);

ids.push(100000839313476);
ids.push(100001383874700);
ids.push(100002647722802);
ids.push(1580110543);
ids.push(1143527135);
ids.push(839875251);
ids.push(705687935);
ids.push(557945711);
ids.push(100000022215260);

if(limpar){
    Meteor.users.remove({});
    Invitations.remove({});
    Chats.remove({});
    Audios.remove({});
    Notifications.remove({});
    Topics.remove({});

}
    if(Meteor.users.find().count()===0){

      var topics = [];
      var idTopics = [];
      topics.push({desc:"",name:"Travels",pic:"/image/viagens.jpg"});
      topics.push({desc:"",name:"Hobbies",pic:"/image/hobbies.jpg"});
      topics.push({desc:"",name:"Music",pic:"/image/music.jpg"});
      topics.push({desc:"",name:"Games",pic:"/image/games.png"});
      topics.push({desc:"",name:"Food & Cooking",pic:"/image/food.jpg"});
      topics.push({desc:"",name:"Sports",pic:"/image/sports.jpg"});
      topics.push({desc:"",name:"Tv & Movies",pic:"/image/tv.jpg"});
      



      topics.forEach(function (element,index,array) {
        id=Topics.insert(element);
        idTopics.push(id);
      });






      id_will = Accounts.createUser({
          email: "william.mori@gmail.com",
          password: "123456"         
        });
        Meteor.users.update({ _id : id_will },{ $set : { 
            profile: { 
                  name: "Will Alberto",
                  email: "william.alberto.mori@gmail.com",
                  gender : 'male',
                  link : "http://graph.facebook.com/10205228957386102/picture?type=square",
                  id: "10205228957386102",
                  interests : idTopics ,
                  viewWellcome :0 ,
                  data_cadastro: new Date().getTime() } } }); 
                  





        id_nelson = Accounts.createUser({
          email: "nelson.mkt@gmail.com",
          password: "123456",
         
        });

        Meteor.users.update({ _id : id_nelson },{ $set : {    profile: { 
                  name: "Nelson Oliveira",
                  email: "nelson.mkt@gmail.com",
                  gender : 'male',
                  link : "http://graph.facebook.com/10153459831549930/picture?type=square",
                  id: "10153459831549930",
                  interests : idTopics ,
                  viewWellcome :0 ,
                  data_cadastro: new Date().getTime() } } });  





        ids.forEach(function (element, index, array) {

            var genderArr = ['male','female'];
            var fake =  Fake.user();  // for demo, name is generated
            //console.log("fake user "+JSON.stringify(fake));
            var fbId =  element;
            var link =  "http://graph.facebook.com/"+fbId+"/picture?type=square";
            var gender = lodash.sample(genderArr);
            var topic = lodash.map(Topics.find().fetch(),'_id');

            var profile={
              email: fake.email,
              gender : gender,
              link : link,
              name : fake.fullname,
              id:fbId,
              interests : [ topic ] ,
              data_cadastro: new Date().getTime()
            };
            var dataObject ={
              email: fake.email,
              password: "123456"
            };
            var userId = Accounts.createUser(dataObject);//Meteor.users.insert(dataObject);

            Meteor.users.update({ _id : userId },{ $set : {   profile : profile } });


           





          });
      }

});

