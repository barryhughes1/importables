export function compare(a, b) {
    if (a > b) return 1;
    if (b > a) return -1;
  
    return 0;
}


export function sortData(data, fieldName, sortDirection){
  var key =(a) => a[fieldName]; 
  var reverse = sortDirection === 'asc' ? 1: -1;
  data.sort((a,b) => {
      let valueA = (typeof key(a) === 'string') ? key(a).toUpperCase() : key(a);
      let valueB = (typeof key(b) === 'string') ? key(b).toUpperCase() : key(b);
      return reverse * ((valueA > valueB) - (valueB > valueA));
  });
  return data;
}


export function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }