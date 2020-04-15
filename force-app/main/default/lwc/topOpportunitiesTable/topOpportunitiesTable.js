import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import getOpportunityList from '@salesforce/apex/OpportunityController.getOpportunityList';
import { loadScript } from 'lightning/platformResourceLoader';
import LODASH_JS from '@salesforce/resourceUrl/lodash';
import MOMENT_JS from '@salesforce/resourceUrl/moment';

// Datatable Columns
const columns = [
  {
      label: 'Opportunity Name',
      fieldName: 'Name',
      type: 'text',
  }, {
      label: 'Account Name',
      fieldName: 'AccountName',
      type: 'text'
  }, {
      label: 'Account Owner',
      fieldName: 'AccountOwner',
      type: 'text'
  }, {
      label: 'Stage',
      fieldName: 'Stage',
      type: 'text'
    }, {
      label: 'Amount',
      fieldName: 'Amount',
      type: 'currency', 
      typeAttributes: { currencyCode: 'EUR'}
  }, {
      label: 'Close Date',
      fieldName: 'CloseDate',
      type: 'date'
    }, {
      label: 'From Now',
      fieldName: 'FromNowDate',
      type: 'text'
  }
];



export default class TopOpportunitiesTable extends LightningElement {

    @track error;

    @track opportunities = [];
    @track opportunitiesClosedWon = [];
    @track columns = columns;


    @track nowVal;
    connectedCallback() {
      this.momentJSinit();
      // this.lodashJSinit();
    }    

    momentJSinit() {
      if (this.momentjsInitialized) {
          return;
      }
      this.momentjsInitialized = true;

      loadScript(this, MOMENT_JS)
          .then(() => {
            this.lodashJSinit();
          })
          .catch(error => {
              this.dispatchEvent(
                  new ShowToastEvent({
                      title: 'Error loading MomentJS',
                      message: error.message,
                      variant: 'error',
                  }),
              );
          });
    }

    lodashJSinit() {
        if (this.lodashjsInitialized) {
            return;
        }
        this.lodashjsInitialized = true;

        loadScript(this, LODASH_JS)
            .then(() => {
              console.log('loaded');


              getOpportunityList()
              .then(result => {

                var orderedData = _.orderBy(result, ['Amount', 'CloseDate'], ['desc', 'asc']);

                let currentData = [];

                orderedData.forEach((row) => {

                  console.log(JSON.stringify(result));
                  _.forEach(result, function(opp) {
                    console.log(opp.Amount);
                    console.log(opp.Account.Name);
                  });
                    

                    /* 
                    * Creating the an empty object
                    * To reslove "TypeError: 'set' on proxy: trap returned falsish for property"
                    */
    
                    let rowData = {};
    
                    rowData.Name = row.Name;
                    rowData.CloseDate = row.CloseDate;
                    // .replaceSubstring(0,9);
                    console.log(rowData.CloseDate);

                    rowData.FromNowDate = moment(row.CloseDate, "YYYY-MM-DD").fromNow();
                    console.log(moment(row.CloseDate, "YYYY-MM-DD").fromNow());


                    // this.nowVal = moment("20111031", "YYYYMMDD").fromNow();

                    rowData.Amount = row.Amount;
                    rowData.Stage = row.StageName;
                    if (row.Account) {
                        rowData.AccountName = row.Account.Name;
                        rowData.AccountOwner = row.Account.Owner.Name;
                    }
                    currentData.push(rowData);
                });
    


                this.opportunities = currentData;

                var closedWonOpps = _.filter(this.opportunities, function(o) { return o.Stage == 'Closed Won'; });
                this.opportunitiesClosedWon = _.orderBy(closedWonOpps, ['CloseDate', 'Amount'], ['desc', 'asc']);

              })
              .catch(error => {
                console.log(error);
                this.error = error;
              });

              var users = [
                { 'user': 'fred',   'age': 48, 'active': true },
                { 'user': 'barney', 'age': 34, 'active': false },
                { 'user': 'fred',   'age': 40, 'active': true },
                { 'user': 'barney', 'age': 36, 'active': true }
              ];

              _.forEach(users, function(user) {
                console.log(user.age);
              });
                             
              var activeUsers = _.filter(users, function(o) { return o.active; });
              _.forEach(activeUsers, function(user) {
                console.log(user.user);
              });

              // => objects for ['fred']

              // Sort by `user` in ascending order and by `age` in descending order.

              var orderedUsers = _.orderBy(users, [(data) => data.age], ['desc']);              
//              var orderedUsers = _.orderBy(users, ['user', 'age'], ['asc', 'desc']);

              _.forEach(orderedUsers, function(user) {
                console.log(user.age);
              });



              let top_Opps = this.opportunities;
              this.mapData = _.orderBy(top_Opps, ['val', 'name'], ['desc', 'asc']);

              for(var i=0; i<this.mapData.length; i=i+1) {
                console.log(this.mapData[i].name + ' : ' + this.mapData[i].val);
              }

//              top_Opps = _.orderBy(top_Opps, ['name'],['asc']); // Use Lodash to sort array by 'name'
//              this.mapData = top_Opps;
/*


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

*/
            })
            .catch(error => {
              console.log('error');
              console.log(error);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error loading LodashJS',
                        message: error.message,
                        variant: 'error',
                    }),
                );
            });
    }

// https://newstechnologystuff.com/2019/04/07/iterate-map-in-lightning-web-components-lwc/
// https://codepen.io/anon/pen/Nqpwgq?editors=001
// https://lodash.com/docs/4.17.15#map

    opportunities = [
        {'name': 'Xerox', 'val':1000000},
        {'name': 'IBM', 'val':20000000},
        {'name': 'Microsoft', 'val':30000000},
        {'name': 'Facebook', 'val':40000000},
        {'name': 'Google', 'val':50000000},
        {'name': 'Twitter', 'val':10000000},
        {'name': 'Salesforce', 'val':20000000},
        {'name': 'Oracle', 'val':10000000}
      ];

      @track mapData= [];
      
/*      
      function groupOthers (obj, n) {
        let keepIndices = _.chain(obj)
          .map(function (item, index) { //zip each item with its index
            return {item: item, index: index}
          })
          .sortBy(function (zipped) { //sort by the val (highest to lowest)
            return -zipped.item.val
          })
          .take(n) //take the top 5
          .map('index') // we only care about the indices
          .value();
        
        let partitioned = _.partition(obj, function (item, index) {
            return _.includes(keepIndices, index)
          })
        
        let finalObjJoined = partitioned[0].concat({
          name: 'others',
          val: _.sum(partitioned[1], 'val')
        })
        
        return [_.map(finalObjJoined, 'name'), _.map(finalObjJoined, 'val')]
      }
      
      var groups = groupOthers(this.opportunities, 5);
      _.forEach(groups, function(groups[i]) {
        console.log(value);
      });
      for(var key in conts){
        this.mapData.push({value:conts[key], key:key}); //Here we are creating the array to show on UI.
    }


//      document.write(JSON.stringify(groups[0]))
//      document.write('<br />')
//      document.write(JSON.stringify(groups[1]))

*/

}