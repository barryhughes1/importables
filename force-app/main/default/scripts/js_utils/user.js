class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

function printName(user) {
    console.log('JS UTILS - User name is ' + user.name);
    return user;
}

function printAge(user) {
    console.log('JS UTILS - User age is ' + user.age);
}


export default User;    // Exports the user object as a default

// Note: can only default export 1 element

export { printName, printAge }