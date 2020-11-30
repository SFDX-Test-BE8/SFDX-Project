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
                component.set("v.accounts",returnValues);
            }            
        });
        $A.enqueueAction(action);
        
    },
    
    handleUpdate : function(component, event, helper) {
        var name = component.get("v.Value1");
        var fav = component.get("v.Value2");
        
        var action = component.get("c.updateData");
        action.setParams({ 
            AccountId : component.get("v.recordId"),
            name : component.get("v.Value1"),
            fav : component.get("v.Value2")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValues = response.getReturnValue();
                var cmpEvent = $A.get("e.c:callEvent");
                cmpEvent.setParams({
                    "cName" : returnValues[0].Name,
                    "cFav" : returnValues[0].Favorite__c
                });
                cmpEvent.fire();
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "type": "success",
                    "message": "The record has been updated successfully."
                });
                toastEvent.fire();
                
                var dismissActionPanel = $A.get("e.force:closeQuickAction");
                dismissActionPanel.fire();
                
            }            
        });
        
        $A.enqueueAction(action);
        
    },
    
    handleCancel : function(component, event, helper){
        var dismissActionPanel = $A.get("e.force:closeQuickAction");
        dismissActionPanel.fire();
    }
})