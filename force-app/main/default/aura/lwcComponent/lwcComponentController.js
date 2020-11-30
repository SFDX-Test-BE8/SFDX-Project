({
	doInit : function(component, event, helper) {
		var recordId = component.get("v.recordId");
	},

	closeAction : function(component, event, helper) {
		$A.get("e.force:closeQuickAction").fire();
	},

	submitRecord: function(component, event, helper) {
		const cName = event.getParam('nValue');

		console.log('check event: ',event.detail);
		console.log('check name: ',cName);
		console.log('component : ',component);
		console.log('event : ',event);

		let cmpEvent = $A.get("e.c:callEvent");
        cmpEvent.setParams({
            "cName" : 'change from event'/*component.get('v.cmpName')*/,
            "cFav" : component.get('v.cmpName')
        });
        cmpEvent.fire();
	}
})