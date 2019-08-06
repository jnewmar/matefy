Invitations  = new Meteor.Collection('invitations');
Chats  = new Meteor.Collection('chats');

var audioStore = new FS.Store.GridFS("audioStore");
/*,{
    beforeWrite:function(fileObj){
      console.log("fileObj "+JSON.stringify(fileObj));      
    },
    transformWrite:function(fileObj, readStream, writeStream){
      // Aqui la convierte en una imagen segun de 10x10 seguuuun
         //gm(readStream).resize(400).stream('PNG').pipe(writeStream); //resize depends your needs
    }
  });
*/
Audios = new FS.Collection("audioStore", {
  stores: [audioStore]
});

Audios.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
  });

Audios.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

Chats.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }

  });

Chats.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});


Notifications = new Mongo.Collection("notifications");
Notifications.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  }

  });

Notifications.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Topics = new Mongo.Collection('topics');

