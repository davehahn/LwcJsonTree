import { LightningElement, api } from 'lwc';
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
import JSONTREE from '@salesforce/resourceUrl/jsonTree';

export default class lwcJsonTree extends LightningElement {
    @api jsonData;
    @api collapsable = false;
    @api title="JSON String";

    _scriptsLoaded=false;
    _sectionExpanded=true;

    renderedCallback(){
        if(this._scriptsLoaded) return;
        Promise.all([
            loadScript(this, JSONTREE + '/jsonTree.js'),
            loadStyle(this, JSONTREE + '/jsonTree.css')
        ])
        .then( () => {
            this._scriptsLoaded=true;
            this._initJSONViewer();
        })
    }

    get sectionClass() {
		let klass = "slds-section component-container";
        if (( this.collapsable === false && this.collapsable === 'false') || this._sectionExpanded ) {
            klass += " slds-is-open";
        }
		if (this.collapsable === true || this.collapsable === 'true') {
			klass += " collapsable";
		}
		return klass;
	}

    get hasJsonData(){
        return this.jsonData !== null;
    }

    handleSectionToggle() {
		this._sectionExpanded = !this._sectionExpanded;
	}

    _initJSONViewer(){
        if(this.jsonData !== null ){
            const ele = this.template.querySelector('.json-viewer');
            const data = JSON.parse(this.jsonData);
            jsonTree.create(data,ele);
        }
    }
}