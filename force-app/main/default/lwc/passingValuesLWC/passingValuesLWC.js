import { LightningElement, track} from "lwc";

export default class LightningInputFieldInLwc extends LightningElement {

	@track trackValues;

	handleChange(event){
		console.log('event 1 : ',event);
		this.tracValues = event.target.value;
	}


	handleClick(event) {
		console.log('event 2 : ',event);
		
	    const value = this.trackValues;
	    console.log('value : '+value);
	    const valueChangeEvent = new CustomEvent("valuechange", {
	      detail: { value }
	    });
	    // Fire the custom event
	    this.dispatchEvent(valueChangeEvent);
  	}
}