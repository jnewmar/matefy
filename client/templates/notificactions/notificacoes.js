Template.Notifications.helpers({
  'getTitle' : function(){
    var out;
    out= { "title" : "Notifications"}
    return out;
  
    },
	getReceivedNotifications: function () {

	console.log("getReceivedNotifications"); 
    o=Notifications.find(  { 'user':  Meteor.user()._id   } ,  {sort: { addedAt: -1}});
    oo=[];
    o.forEach(function (row) {      
    	console.log("tipo "+row.tipo ); 

    	if(row.tipo=="invitation"){      		
	        row.link="/Invitations";
    	}
        if(row.tipo=="chat"){  
			row.link="/chatRoom/"+row.fromId;
		}



    //  console.log("Notifications  "+JSON.stringify(row));
      oo.push(row);
    }); 
    return oo;
  },
});
/*
Template.list.events({
	"click #push": function () {
		Meteor.call("serverNotification",Meteor.user()._id);
	},
	"click #removeHistory": function () {
		Meteor.call("removeHistory",Meteor.user()._id);
	},
	"click input[type=checkbox]": function () {
		Session.set("checked", $("input[type=checkbox]").is(":checked"));
	}
});*/