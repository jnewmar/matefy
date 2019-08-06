

/*****************************************************************************/
/* myInterests: Event Handlers */
/*****************************************************************************/
Template.myInterests.events({
	"change .check-topics": function (event) {

    var elArray = $(".check-topics:checked");
//    console.log(elArray);
    myInterests=[];
    for (var a = 0; a< elArray.length;a++)
    {      
      myInterests.push(elArray[a].id.replace('topic-', ''));
    }

 		//console.log("myInterests "+JSON.stringify(myInterests));
    Meteor.users.update({_id : Meteor.userId()}, { 
        $set : {
            "profile.interests" : myInterests 
        }
    } );
  }

});

/*****************************************************************************/
/* myInterests: Helpers */
/*****************************************************************************/
Template.myInterests.helpers({

    'isChecked': function(tem) {
	//  console.log('isChecked '+tem);  
	  if (tem) {
	    return "checked='checked'";
	  }
	},
   'myTopics':function () {
   		t=Topics.find();
   		me=Meteor.user();
   		arrMytopics=me.profile.interests;
  		tt=[];
  //		console.log("my topics "+JSON.stringify(arrMytopics));
	    t.forEach(function (row) {	   
			
			if(lodash.includes(arrMytopics,row._id) ){
				row.hasTopic=true;
			}else{
				row.hasTopic=false;
			}
		//	console.log("row "+JSON.stringify(row));
    		tt.push(row);
	    }); 
    	return tt;
  	},
});

/*****************************************************************************/
/* myInterests: Lifecycle Hooks */
/*****************************************************************************/
Template.myInterests.onCreated(function () {
});

Template.myInterests.onRendered(function () {


});

Template.myInterests.onDestroyed(function () {
});
function getCheckbox(prefix){

    return o;
};