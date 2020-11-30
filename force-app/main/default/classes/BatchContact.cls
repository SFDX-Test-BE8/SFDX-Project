global class BatchContact implements Database.Batchable<sObject>{
    
    global Database.QueryLocator start(Database.BatchableContext BC) {
        // collect the batches of records or objects to be passed to execute
        String query = 'SELECT Id, FirstName FROM Contact';
        return Database.getQueryLocator(query);
    }
    
    global void execute(Database.BatchableContext BC, List<Contact> conList) {
        
        // process each batch of records default size is 200
        for(Contact con : conList) {        
            // Update the Account Name 
            con.FirstName = con.FirstName + '.';
        }
        try {
            // Update the Account Record
            update conList;
            
        } catch(Exception e) {
            System.debug(e);
        }
        
    }   
    
    global void finish(Database.BatchableContext BC) {
        // execute any post-processing operations like sending email
    }
    
}