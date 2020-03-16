import { LightningElement, track } from 'lwc';
import fetchDataHelper from './fetchDataHelper.js';
import { compare, compareValues, sortData } from './helpers/sorting.js';

const columns = [
    { label: 'Label', fieldName: 'name', sortable: true },
    { label: 'Website', fieldName: 'website', type: 'url', sortable: true, },
    { label: 'Phone', fieldName: 'phone', type: 'phone', sortable: true, },
    { label: 'Balance', fieldName: 'amount', type: 'currency', sortable: true },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date', sortable: true }
];

export default class BasicDatatable extends LightningElement {
    @track data = [];
    @track columns = columns;

    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        console.log(JSON.stringify(data));

        for(var i=0; i<data.length; i=i+1) {
            data[i].amount = parseFloat(data[i].amount);
        }

        this.data = data;
    }

    @track sortedBy;
    @track sortedDirection = 'asc';

    updateColumnSorting(event){
        this.sortedBy = event.detail.fieldName;
        this.sortedDirection = event.detail.sortDirection;

        var data = JSON.parse(JSON.stringify(this.data));
        this.data = sortData(data, this.sortedBy, this.sortedDirection);
    }

}