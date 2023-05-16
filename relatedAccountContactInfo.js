import { LightningElement, track, wire, api } from 'lwc';
import getContactsRelatedToAccount from '@salesforce/apex/RelatedAccountContactInfo.getContactsRelatedToAccount';
import getRelatedAccounts from '@salesforce/apex/RelatedAccountContactInfo.getRelatedAccounts';

export default class RelatedAccountContactInfo extends LightningElement {
    @api recordId;
    @track contacts;
    @track accounts;
    @track accountColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Status', fieldName: 'status__c', type: 'text' },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue'},
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' , typeAttributes: {  day: 'numeric',  
                   month: 'short',  
				   year: 'numeric',   
				   hour: '2-digit',  
                   minute: '2-digit',  
                   second: '2-digit',  
                   hour12: true}}
    ];
    @track contactColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Do Not Call', fieldName: 'DoNotCall', type: 'text' },
        { label: 'Email', fieldName: 'Email'},
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' , typeAttributes: {  day: 'numeric',  
                   month: 'short',  
				   year: 'numeric',   
				   hour: '2-digit',  
                   minute: '2-digit',  
                   second: '2-digit',  
                   hour12: true}}
    ];
    
    @wire(getContactsRelatedToAccount, {accId: '$recordId'}) 
    WireContactRecords({error, data}){
        if(data){
            this.contacts = data;
            this.error = undefined;
        }else{
            this.error = error;
            this.contacts = undefined;
        }
    }
    @wire(getRelatedAccounts, {accId: '$recordId'}) 
    WireAccountRecords({error, data}){
        if(data){
            this.accounts = data;
            this.error = undefined;
        }else{
            this.error = error;
            this.accounts = undefined;
        }
    }
}