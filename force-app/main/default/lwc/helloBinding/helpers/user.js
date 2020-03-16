export default class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

export function printName(user) {
    console.log('HELPERS - User name is ' + user.name);
}

export function printAge(user) {
    console.log('HELPERS - User age is ' + user.age);
}


// If we did not add export prefixes to the class and functions
/*
export default User;    // Exports the user object as a default

// Note: can only default export 1 element

export { printName, printAge }    // 
*/