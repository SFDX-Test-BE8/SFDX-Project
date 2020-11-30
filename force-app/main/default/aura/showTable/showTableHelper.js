({
    refreshHelper : function(component) {
        var that = this;
        var action = component.get("c.onLoad");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var returnValues = response.getReturnValue();
                component.set("v.wReturn",returnValues);
                component.set("v.showTable",true);
            }            
        });
        $A.enqueueAction(action);
        
        var i = 1;
        var sInterval = window.setInterval(
            $A.getCallback(function() {
                var action = component.get("c.onLoad");
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        var returnValues = response.getReturnValue();
                        component.set("v.wReturn",returnValues);
                        component.set("v.showTable",true);
                    }            
                });
                i++;
                console.log('i : '+i);
                $A.enqueueAction(action);
                if(i > 100){
                    console.log('time out');
                    window.clearInterval(sInterval, 3000);
                }
                //that.refreshHelper(component);
            }), 15000
        );
    }
})