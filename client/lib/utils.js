
getMyGender = function () {
  return Meteor.user().profile.gender.toUpperCase();
};

getTargetGender = function () {
  return Meteor.user().profile.gender.toUpperCase()==="MALE"?"female":"male";
};

isMale = function () {
  return Meteor.user().profile.gender.toUpperCase()==="MALE";
};
