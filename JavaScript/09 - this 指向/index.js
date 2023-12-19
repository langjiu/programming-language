// 只要这个函数时以普通函数的形式被调用
// function fn1() {
//     console.log(this);
// }
// fn1();

//  如果是严格模式， 那么 this 的值为 undefined
// function fn2() {
//     'use strict'
//     console.log(this);
// }
// fn2();


// 上面介绍了以函数的形式调用， this 的指向
// 这种题目有一种变形

// var foo = {
//     bar:10,
//     func() {
//         console.log(this);
//         console.log(this.bar);
//     }
// }
// var fn2 = foo.func;
//
// // fn2(); // 全局对象
// foo.func(); //  { bar: 10, func: [Function: func] }  // 10


// 如果一个函数以对象的方法的形式被调用
//  那么 this 指向该对象
// var stu = {
//     name: 'zhangsan',
//     fn() {
//         return this;
//     }
// }
// console.log(stu.fn() === stu);  // true


// var stu = {
//     name: 'zhangsan',
//     son: {
//         name: 'zhangxiaosan',
//         fn() {
//             return this.name;
//         }
//     }
// }
// console.log(stu.son.fn()) // zhangxiaosan

var o1 = {
    text: 'o1',
    fn() {
        return this.text;
    }
}

var o2 = {
    text: 'o2',
    fn() {
        return o1.fn();
    }
}

var o3 = {
    text: 'o3',
    fn() {
        var fn2 = o1.fn;
        return fn2(); // 这里相当于是全局调用
    }
}

console.log(o1.fn())

console.log(o2.fn())

console.log(o3.fn())
