# LwcJsonTree

An LWC component for JSON formatting/viewing based on jsonTreeViewer. This basically a wrapper for the javascript library [summerstyle/JsonTreeViewer](https://github.com/summerstyle/jsonTreeViewer). The main use case for this is to display JSON data that is stored on an Object field as an easily readable and navigatable JSON object.

## Usage

1. Copy the metadata found in the /src directory into the correct directories of your project source and deploy to your org.
2. Create a new LWC for a Lightning Record Page where "SomeObject" is Object you have a LongTextArea field with JSON data and "SomeJsonField" is that LongTextArea field

   ###### jsonDemo.html

   ```html
   <template>
     <template lwc:if="{ready}">
       <c-lwc-json-tree
         json-data="{postData}"
         collapsable="true"
         title="Request Body"
       ></c-lwc-json-tree>
     </template>
   </template>
   ```

   ###### jsonDemo.js

   ```javascript
   import { LightningElement, api, wire, track } from "lwc";
   import { getRecord, getFieldValue } from "lightning/uiRecordApi";
   import REQUEST_BODY_FIELD from "@salesforce/schema/SomeObject.SomeJsonField__c";

   const FIELDS = [REQUEST_BODY_FIELD];

   export default class JsonDemo extends LightningElement {
     @api recordId;
     @track scriptsLoaded = false;

     @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
     wiredJson;

     get ready() {
       return this.wiredJson.data;
     }

     get postData() {
       return getFieldValue(this.wiredJson.data, REQUEST_BODY_FIELD);
     }
   }
   ```

   ###### jsonDemo.js-meta.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
       <LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
           <apiVersion>56.0</apiVersion>
           <isExposed>true</isExposed>
           <targets>
               <target>lightning__RecordPage</target>
           </targets>
           <targetConfigs>
               <targetConfig targets="lightning__RecordPage">
                   <objects>
                       <object>SomeObject</object>
                   </objects>
               </targetConfig>
           </targetConfigs>
       </LightningComponentBundle>
   ```

   3. Add your new component to the Lightning Record Page for "SomeObject" and enjoy.

## Component Attributes

|   Option    |  Type   | Description                                                                                                                       |   Default   |
| :---------: | :-----: | --------------------------------------------------------------------------------------------------------------------------------- | :---------: |
|  json-data  | String  | Properly formated JSON string you wish to display                                                                                 |    null     |
|    title    | String  | Title displayed in the Collapsable Section Header                                                                                 | JSON String |
| collapsable | Boolean | Display the component as a collapsable section, simialier to a field <br />section on a leghtning record page. See Examples below |    false    |

## Examples

###### collapsable=false;

![collapsable = false](/screenshots/collapsable-false.png)

###### collapsable=true;

![collapsable = false](/screenshots/collapsable-true.png)
