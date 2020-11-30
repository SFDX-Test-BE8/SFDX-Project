trigger AccountTestTrigger on Account (before insert) {
    
    AccountTestTriggerHandler.forDebugLog();

}