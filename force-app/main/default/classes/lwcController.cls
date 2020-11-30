public with sharing class lwcController {

    public lwcController() {
        
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList(String accId) {
    		List<Account> accList = [SELECT Id, Name, Favorite__c FROM Account WHERE id =: accId];
        return accList;
    }

    @AuraEnabled
    public static Account updateRecord(String accId, String nameCMP, String favHobCMP) {
    	if (accId != null){
    		Account accQuery = [SELECT Id, Name, Favorite__c FROM Account WHERE id =: accId];
            
            accQuery.Name = nameCMP;
            accQuery.Favorite__c = favHobCMP;

            update accQuery;

            return accQuery;
    	}

        return null;
    }

    @AuraEnabled
    public static String showAtext(){
        return 'this is a text from lwc.';
    }
}