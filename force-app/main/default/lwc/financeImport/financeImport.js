import { LightningElement, track } from 'lwc';
import { getTermOptions, calculateMonthlyPayment } from 'c/mortgage';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';
import MOMENT_JS from '@salesforce/resourceUrl/moment';
import LODASH_JS from '@salesforce/resourceUrl/lodash';

export default class FinanceImport extends LightningElement {

    @track error;
    @track selectedDateTime = new Date().toISOString();
    @track weekOfYear;
    @track dayOfYear;
    @track calculatedDateTime;

    @track amt = calculateMonthlyPayment(1200, 5, 3.4);

    @track nowVal;
    connectedCallback() {
        this.momentJSinit();
        // this.lodashJSinit();
    }

    @track youngestPerson = {};
    
    lodashJSinit() {
        if (this.lodashjsInitialized) {
            return;
        }
        this.lodashjsInitialized = true;

        loadScript(this, LODASH_JS)
            .then(() => {
                console.log(_);

                var obj = {
                    22: {name:"John", id:22, friends:[5,31,55], works:{books:[], films:[]}},
                    12: {name:"Ivan", id:12, friends:[2,44,12], works:{books:[], films:[]}}
                  };
                var arr = _.values(obj);
                console.log(arr);
                console.log(_.toArray(obj));


                // Get the Opportunities 
                var users = [
                    { 'user': 'barney',  'age': 36 },
                    { 'user': 'fred',    'age': 40 },
                    { 'user': 'pebbles', 'age': 1 }
                  ];
                   
                  var youngest = _
                    .chain(users)
                    .sortBy('age')
                    .map(function(o) {
                      return o.user + ' is ' + o.age;
                    })
                    .head()
                    .value();

                    console.log(youngest);

                // .chunk(['a', 'b', 'c', 'd'], 2));

                  this.loadOpportunities();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading LodashJS',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
    }

    momentJSinit() {
        if (this.momentjsInitialized) {
            return;
        }
        this.momentjsInitialized = true;

        loadScript(this, MOMENT_JS)
            .then(() => {
                this.nowVal = moment("20111031", "YYYYMMDD").fromNow();
            })
            .catch(error => {
              console.log('error');
              console.log(error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading MomentJS',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
    }

    @track opportunities = [];

    loadOpportunities() {
      let opportunities = [
        {name: "Xerox", val:1000000},
        {name: "IBM", val:20000000},
        {name: "Microsoft", val:30000000},
        {name: "Facebook", val:40000000},
        {name: "Google", val:50000000},
        {name: "Twitter", val:10000000},
        {name: "Salesforce", val:20000000},
        {name: "Oracle", val:10000000}
      ];

      this.opportunities = this.groupOthers(opportunities, 5);
    }
      
    groupOthers (obj, n) {
      let keepIndices = _.chain(obj)
          .map(function (item, index) { //zip each item with its index
            return {item: item, index: index}
          })
          .sortBy(function (zipped) { //sort by the val (highest to lowest)
            return -zipped.item.val
          })
          .take(n) //take the top 5
          .map('index') // we only care about the indices
          .value()
        
        let partitioned = _.partition(obj, function (item, index) {
            return _.includes(keepIndices, index)
          })
        
        let finalObjJoined = partitioned[0].concat({
          name: 'others',
          val: _.sum(partitioned[1], 'val')
        })
        
        return [_.map(finalObjJoined, 'name'), _.map(finalObjJoined, 'val')]
      }
      


}