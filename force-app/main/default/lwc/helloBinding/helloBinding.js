import { LightningElement, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/OpportunityController.getContactList';

import { contacts_sample } from './helpers/sampleContacts.js';

import User, {printName as printUserName, printAge, printDOB} from './user.js';
// import User, {printName as printUserName, printAge} from 'c/user';
// import User, {printName as printUserName, printAge} from './helpers/user.js';
// import User, {printName as printUserName, printAge} from '../js_utils/user.js';
// import User, {printName as printUserName, printAge} from '../scripts/js_utils/user.js';
import { compare, compareValues } from './helpers/sorting.js';

// import sortBy from './helpers/lodash/sortBy'

export default class HelloBinding extends LightningElement {

    @track greeting = 'World';
    @track userName = 'DEFAULT';

    connectedCallback() {
        let sample = [12, 14, 16, 11, 31, 2, 4, 6, 8, 9, 2];
        console.log(sample.sort(compare));
        let results = contacts_sample.records.sort(compareValues('Birthdate'));
        console.log(JSON.stringify(results));
    }    

    usr = new User('Bob', '30');

    handleChange(event) {
        console.log('hi');
        console.log('handleChange');
        console.log(JSON.stringify(this.usr));
        console.log('Saying Hi to ' + this.usr.sayHi());
        // console.log(this.usr.getName() + ' is ' + this.usr.getAge() + ' years old.');
        // this.greeting = event.target.value + ' - ' + this.usr.getName() + ' is ' + this.usr.getAge() + ' years old.';
        printUserName(this.usr);
    }

}