import { LightningElement, track, wire } from 'lwc';
import getContactList from '@salesforce/apex/OpportunityController.getContactList';

import { contacts_sample } from './helpers/sampleContacts.js';

// import User, {printName as printUserName, printAge} from 'c/user';
// import User, {printName as printUserName, printAge} from './user.js';
import User, {printName as printUserName, printAge} from './user.js';
// import User, {printName as printUserName, printAge} from './helpers/user.js';
// import User, {printName as printUserName, printAge} from '../js_utils/user.js';
// import User, {printName as printUserName, printAge} from '../scripts/js_utils/user.js';
import { compare, compareValues } from './helpers/sorting.js';

// import sortBy from './helpers/lodash/sortBy'

export default class HelloBinding extends LightningElement {

    @track greeting = 'World';
    @track userName = 'DEFAULT';

/*    
    @track contacts_sample = {
        records: [{
            "Id": "0031X00000OZLTaQAP",
            "Name": "Edna Frank",
            "FirstName": "Edna",
            "LastName": "Frank",
            "Birthdate": "1940-06-15"
        }, {
            "Id": "0031X00000OZLTbQAP",
            "Name": "Ashley James",
            "FirstName": "Ashley",
            "LastName": "James",
            "Birthdate": "1944-08-01"
        }, {
            "Id": "0031X00000OZLTcQAP",
            "Name": "Liz D'Cruz",
            "FirstName": "Liz",
            "LastName": "D'Cruz",
            "Birthdate": "1960-01-09"
        }, {
            "Id": "0031X00000OZLTdQAP",
            "Name": "Tom Ripley",
            "FirstName": "Tom",
            "LastName": "Ripley",
            "Birthdate": "1948-09-28"
        }, {
            "Id": "0031X00000OZLTeQAP",
            "Name": "Sean Forbes",
            "FirstName": "Sean",
            "LastName": "Forbes",
            "Birthdate": "1945-01-01"
        }, {
            "Id": "0031X00000OZLTfQAP",
            "Name": "Rose Gonzalez",
            "FirstName": "Rose",
            "LastName": "Gonzalez",
            "Birthdate": "1966-04-05"
        }, {
            "Id": "0031X00000OZLTjQAP",
            "Name": "John Bond",
            "FirstName": "John",
            "LastName": "Bond",
            "Birthdate": "1954-02-10"
        }, {
            "Id": "0031X00000OZLTkQAP",
            "Name": "Tim Barr",
            "FirstName": "Tim",
            "LastName": "Barr",
            "Birthdate": "1951-11-30"
        }, {
            "Id": "0031X00000OZLTlQAP",
            "Name": "Josh Davis",
            "FirstName": "Josh",
            "LastName": "Davis",
            "Birthdate": "1946-07-07"
        }, {
            "Id": "0031X00000OZLTmQAP",
            "Name": "Babara Levy",
            "FirstName": "Babara",
            "LastName": "Levy",
            "Birthdate": "1935-03-13"
        }]
    };
*/

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
        console.log(this.usr.getName() + ' is ' + this.usr.getAge() + ' years old.');
        this.greeting = event.target.value + ' - ' + this.usr.getName() + ' is ' + this.usr.getAge() + ' years old.';
        printUserName(this.usr);
    }

}