// interface 类似type， 用于约束结构
interface Person {
    firstName: string;
    lastName: string;
}
interface Superman extends Person{
    middleName: string
}

function gretting(o: Person) {
    console.log('gretting' + o.firstName + o.lastName);
}

gretting({lastName: 'huang', firstName: 'wenming'});
