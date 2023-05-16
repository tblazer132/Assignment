trigger AccountTrigger on Account (After Update) {
    if(Trigger.isafter && Trigger.isupdate){
        List<Account> listNewAccounts = new List<Account>();
        for(Account objAccount : Trigger.New){
            if(objAccount.Status__c == 'Cold' && Trigger.oldmap.get(objAccount.Id).Status__c != objAccount.Status__c ){
                Account objChildAcc = new Account(Name=objAccount.Name, Parentid=objAccount.Id, Status__c = 'Cold');
                listNewAccounts.add(objChildAcc);
            }
        }
        if(listNewAccounts != null && listNewAccounts.size() > 0)
            Insert listNewAccounts;
    }
}