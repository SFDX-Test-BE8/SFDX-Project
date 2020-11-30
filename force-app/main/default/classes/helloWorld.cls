public with sharing class helloWorld {
    public helloWorld() {

        system.System.debug('this is for test');

    }
    @AuraEnabled
    public static Account showText(String accId){
        system.System.debug('check show text working.');
        try {
            Account acc = [select id, name from Account limit 1];
            return acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    // @AuraEnabled(cacheable=true)
    // public static String setText(){
    //     system.System.debug('debug here...');
    //     return 'this line from apex class.';
    // }
}