({
    doInit : function(component, event, helper) {
        var action = component.get("c.getAllBatch");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValues = response.getReturnValue();
                component.set("v.allBatch",returnValues);
                component.set("v.selectedValue",returnValues[0].Name);
                //console.log('check : ' +selectedValue);
            }            
        });
        $A.enqueueAction(action);
        
        helper.refreshHelper(component);
        
    },
    
    runBatch : function(component, event, helper) {
        var action = component.get("c.getCurrentBatch");
        action.setParams({
            apexClass : component.get("v.selectedValue")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValues = response.getReturnValue();
                var checkReturn = JSON.stringify(returnValues);
                component.set("v.wReturn",returnValues);
                component.set("v.showTable",true);
                
                var test = component.get("v.wReturn");
                var checkTest = JSON.stringify(test);
                //alert("2 : "+checkTest);
            }            
        });
        $A.enqueueAction(action);
        
        
    }
})