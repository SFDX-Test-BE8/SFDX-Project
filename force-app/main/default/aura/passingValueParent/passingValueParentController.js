({
	getValueFromLwc : function(component, event, helper) {
		console.log('event : ',event);
		component.set("v.inputValue",event.getParam('value'));
	}
})