public class showTableController {
    
    @AuraEnabled
    public static List<ApexClass> getAllBatch(){
        list<ApexClass> lstApexClasses = [SELECT Id, Name, ApiVersion, Body FROM ApexClass where NamespacePrefix = null];
        List<ApexClass> classToShow = new List<ApexClass>();
        for(ApexClass iterator : lstApexClasses) {
            if(iterator.Body.contains('Database.Batchable') && !iterator.Body.contains('getAllBatch')) {
                classToShow.add(iterator);
            }
        }
        system.debug('1 : '+classToShow);
        return classToShow;
    }
    
    @AuraEnabled
    public static List<WrapperBatch> getCurrentBatch(String apexClass){
        Type typ = Type.forName(apexClass);
        Object instance = null;
        if (typ != null) {
            instance = typ.newInstance();
        }
        Id batchJobId = Database.executeBatch((Database.Batchable<sObject>)instance, 200);
        
        List<WrapperBatch> wrapperList = onLoad();
        return wrapperList;
    }
    
    @AuraEnabled
    public static List<WrapperBatch> onLoad(){
        List<String> apexId = new List<String>();
        Map<String,String> mapApexId = new Map<String,String>();
        List<WrapperBatch> wrapperList = new List<WrapperBatch>();
        
        
        List<AsyncApexJob> jobInfo = [SELECT Status,ApexClassId,CreatedDate FROM AsyncApexJob WHERE JobType = 'BatchApex' ORDER BY CreatedDate DESC];
        
        for(AsyncApexJob async : jobInfo){
            apexId.add(async.ApexClassId);
        }
        List<ApexClass> apexClassList = [select id, name from ApexClass where id IN: apexId];
        
        if(jobInfo != null & apexClassList != null){
            Integer i = 1;
            for(AsyncApexJob async : jobInfo){
                WrapperBatch wrapper = new WrapperBatch();
                for(ApexClass aClass : apexClassList){
                    if(async.ApexClassId != null && async.ApexClassId.equals(aClass.id)){
                        wrapper.nNumber = i;
                        wrapper.nDateTime = string.valueOfGmt(async.CreatedDate);
                        wrapper.className = aClass.Name;
                        wrapper.status = async.Status;
                        i++;
                    }
                }
                wrapperList.add(wrapper);
                
            }
        }
        return wrapperList;
    }
    
    
    public class WrapperBatch {
        @AuraEnabled public Integer nNumber {get;set;}
        @AuraEnabled public String nDateTime {get;set;}
        @AuraEnabled public String className {get;set;}
        @AuraEnabled public String status {get;set;}
    }
    
}