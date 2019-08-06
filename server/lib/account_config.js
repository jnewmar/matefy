// _.pick(object, 'user');



Accounts.onCreateUser(function(options, user) {

  user.profile = options.profile ? options.profile : {};
  user.profile.name = user.name ;
  var profile = lodash.pick(lodash.get(user,'services.facebook'),lodash.keys(schema.profile));
  
  user.profile = profile;

	t=Topics.find();
	tt=[];
	t.forEach(function (row) {	   			
		tt.push(row._id);
	});
	user.profile.interests=tt;
	user.profile.viewWellcome=0;

  return user;
});
