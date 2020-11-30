import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getAccountList from '@salesforce/apex/lwcController.getAccountList';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

export default class lwcShowAccount extends LightningElement {

	@api recordId;
	@track testText;
	@track accName;
	@track accFav;
	@wire(CurrentPageReference) pageRef;

	@wire (getAccountList, {accId: '$recordId'}) 
	accountList({ error , data}){
			
			console.log(error);
			if (data) {
				console.log('check : ',data);
				this.accName = data[0].Name;
				this.accFav = data[0].Favorite__c;
				this.error = 'Undefined'
			}
			else if (error) {
				this.error = error;
				this.record = 'Undefined';
			}

		}

	constructor() {
		super();
		//this.template.addEventListener('mycustomevent', this.handleCustomEvent.bind(this));
	}

	/*handleCustomEvent(event) {
		console.log('check customEvent: ',event);
		//const textVal = event.detail;
	}*/

	connectedCallback() {
        registerListener('contactSelected', this.handleContactSelected, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleContactSelected(data) {
    	console.log('check name show acc: ',data);
        this.accName = data[0];
        this.accFav = data[1];
    }

}