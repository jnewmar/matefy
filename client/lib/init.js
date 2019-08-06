Meteor.startup(function () {
	Meteor.defer(function () {
		Session.setDefault("checked", $("input[type=checkbox]").is(":checked"));
	});

	if (Meteor.isCordova) {
		//window.alert = navigator.notification.alert;
	}

	Push.addListener('message', function(notification) {
		// Called on every message
		console.log("Mensagem recebida");
		console.log(JSON.stringify(notification))

		function alertDismissed() {
			console.log("Atualizando hora de recebimento");
			
		}
		Notifications.update({_id: notification.payload.historyId}, {
				$set: {
					"recievedAt": new Date()
				}
			});
		alert(notification.message, alertDismissed, notification.payload.title, "Ok");


	});
})