public class RelatedAccountContactInfo {
    @AuraEnabled(cacheable=true)
    public static List<account> getRelatedAccounts(String accId) {
        
        return [SELECT Id, Name,Status__c, annualRevenue, createdDate from account where ParentId = :accId]; 
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsRelatedToAccount(String accId) {
        Set<Id> accIdSet = new set<Id>();
        for (account a:[Select id from account where parentId=:accId ]){
            accIdSet.add(a.Id);
        }
        accIdSet.add(accId);
        return [SELECT Id, Name, donotcall, Email, createdDate from Contact where AccountId = :accIdSet]; 
    }
}