({
	doInit : function(component, event, helper) {
		var action = component.get("c.getData");
        action.setParams({ 
            AccountId : component.get("v.recordId") 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValues = response.getReturnValue();
                component.set("v.Value1",returnValues[0].Name);
                component.set("v.Value2",returnValues[0].Favorite__c);
            }            
        });
        $A.enqueueAction(action);
        
	},
    handleComponentEvent : function(component, event, helper) {
        var v1 = event.getParam("cName");
        var v2 = event.getParam("cFav");
        console.log(v1);
        
        component.set("v.Value1",v1);
        component.set("v.Value2",v2);
    }
})