import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import getAccountList from '@salesforce/apex/lwcController.getAccountList';
import updateRecord from '@salesforce/apex/lwcController.updateRecord';
import showAtext from '@salesforce/apex/lwcController.showAtext';


import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

export default class lwcAccount extends LightningElement {

	@api recordId = '0012y000007dpaEAAQ';
	@track name;
	@track favHob;
	@track record;
	@track error;
	@wire(showAtext)showText;
	@wire(CurrentPageReference) pageRef;
	@wire (getAccountList, {accId: '$recordId'}) 
	accountList({ error , data}){
			
			console.log(error);
			if (data) {
				console.log('check : ',data);
				this.name = data[0].Name;
				this.favHob = data[0].Favorite__c;
				this.error = 'Undefined'
			}
			else if (error) {
				this.error = error;
				this.record = 'Undefined';
			}

		}

	handleUpdate(event){
		//console.log('check name update : '+this.name);
		updateRecord({accId: this.recordId, nameCMP: this.name, favHobCMP: this.favHob}).then(result => {
				const data = [];
				const nValue = result.Name;

				console.log('check result: ',result);

				data.push(result.Name);
				data.push(result.Favorite__c);

				console.log('value : ',data);

				/*const valueChangeEvent = new CustomEvent('submitrecord', {
			      detail: { nValue }
			    });
			    // Fire the custom event
			    this.dispatchEvent(valueChangeEvent);*/

			    fireEvent(this.pageRef, 'contactSelected', data);
				/*event.preventDefault();
				const name = event.target.value;
				const selectEvent = new CustomEvent('mycustomevent', {
					detail: name, bubbles: true
					});
				this.dispatchEvent(selectEvent);*/

				const evt = new ShowToastEvent({
		        	title: 'Update Success !',
			        message: 'Record has been updated',
			        variant: 'success',
			        mode: 'dismissable'
		    	});
		    	this.dispatchEvent(evt);

		    	const closeAction = new CustomEvent('close');
        		this.dispatchEvent(closeAction);
			});
	}


	/*handleChange(event) {
		event.preventDefault();
		const name = event.target.value;
		const selectEvent = new CustomEvent(‘mycustomevent’, {
			detail: name, bubbles: true
			});
		this.dispatchEvent(selectEvent);
	}*/

	closeQuickAction() {
        const closeAction = new CustomEvent('close');
        // Dispatches the event.
        this.dispatchEvent(closeAction);
    }

	handleChangeName(event){
		this.name = event.target.value;
	}

	handleChangeFavHob(event){
		this.favHob = event.target.value;
	}
	// get name() {
	// 	console.log(accountList)
 //        return this.accountList.data.fields.Name.value;
 //    }
 	
	/*connectedCallback(){
		console.log(this.recordId);
		getAccountList({ accId: this.recordId }).then(result => {
				console.log('before : ', result);
				this.name = result[0].Name;
				this.favHob = result[0].favorite__c;
				console.log('check name : ',result[0].Name);
				//this.favHob = result.favorite__c;
			})
			.catch(error => {
				console.log('error : ',error);
	            this.error = error;
	        });

	        //console.log('check name : '+ this.accountList +'...');
	}*/

}