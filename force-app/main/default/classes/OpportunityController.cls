public with sharing class OpportunityController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunityList() {
        return [
            SELECT ID, Name, Account.Name, Amount, Account.Owner.Name, CreatedDate, Closedate, stageName FROM Opportunity
            WITH SECURITY_ENFORCED
        ];
    }

    

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, FirstName, LastName, Title, Phone, Email, BirthDate
            FROM Contact
            WHERE Birthdate != null
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
}