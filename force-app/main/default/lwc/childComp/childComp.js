import { LightningElement, track} from 'lwc';

export default class ChildComp extends LightningElement {

	@track name;

   handleChange(event) {
        
        this.name = event.target.value;
        
    }

    handleUpdate(event){
    	event.preventDefault();
    	const selectEvent = new CustomEvent('mycustomevent', {
            detail: this.name ,bubbles: true
        });
    	this.dispatchEvent(selectEvent);
    }
}