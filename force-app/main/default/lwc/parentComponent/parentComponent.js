import { LightningElement , track } from 'lwc';

export default class ParentComponent extends LightningElement {
    @track msg;
  
    constructor() {
        super();
        /*this.template.querySelectorAll('.slds-setup-assistant').addEventListener('click',this.handleClick);*/
        this.template.addEventListener('mycustomevent', this.handleCustomEvent.bind(this));
    }

    handleCustomEvent(event) {
        console.log('event : ',event);
        const textVal = event.detail;
        this.msg = textVal;
    }
}