public class GetAndUpdateAccountController {
    
    @AuraEnabled
    public static List<Account> getData(String AccountId){
        system.debug('AccountId : '+AccountId);
        String stringList = '';
        List<Account> accountList = [select id, name, Favorite__c from Account where id =: AccountId];
        system.debug('acc list : '+accountList);
        return accountList;
    }
    
    @AuraEnabled
    public static List<Account> updateData(String AccountId, String name, String fav){
        
        List<Account> accountList = [select id, name, Favorite__c from Account where id =: AccountId];
        for(Account acc : accountList){
            acc.Name = name+'1';
            acc.Favorite__c = fav;
        }
        update accountList;
        
        return accountList;
        
    }
    

}