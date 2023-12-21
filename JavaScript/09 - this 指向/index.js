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

// var o1 = {
//     text: 'o1',
//     fn() {
//         return this.text;
//     }
// }
//
// var o2 = {
//     text: 'o2',
//     fn() {
//         return o1.fn();
//     }
// }
//
// var o3 = {
//     text: 'o3',
//     fn() {
//         var fn2 = o1.fn;
//         return fn2(); // 这里相当于是全局调用
//     }
// }
//
// console.log(o1.fn())
//
// console.log(o2.fn())
//
// console.log(o3.fn())

// call
// A.call(B)
// A 通常是一个方法
// B 通常是一个对象
// 调用 A 方法， 但是 this 指向 B 这个对象

// var obj = {};
// function fn() {
//     return this;
// }

// console.log(fn() === global); // true
// console.log(fn.call(obj) === obj); // true

// 下面的情况 this 指向全局对象
// console.log(fn.call());
// console.log(fn.call(null));
// console.log(fn.call(undefined));

// 总之 this  就指向你传入的对象

// call 第一个参数是 this 指向的对象
// 之后的参数就是参数列表， 这些参数会传递给前面的方法

// call 第一个参数是 this 指向的对象
// 之后的参数就是参数列表， 这些参数会传递前面的方法
// function add(a, b) {
//     return a + b;
// }
//
// console.log(add.call(null, 1, 2)); // 3
//
// var f = function () {
//     return this;
// }
// console.log(f.call(5)) // [Number: 5]

// call 一个经常的应用， 就是调用原生的方法

// var obj = {};
//
// console.log(obj.hasOwnProperty('toString')); // false
// console.log(obj.toString()); // [object Object]
//
// // 通过上面的例子， 我们可以知道
// // obj 能够调用 toString, 但是 toString 这个方法并不是他自身所拥有的
// // 来自它的原型对象上面
//
// obj.hasOwnProperty = function () {
//     return 'aaa';
// }
// console.log(obj.hasOwnProperty('toString')); // aaa
//
// // 上面我们对 hasOwnProperty 这个方法进行了覆盖
// // 使用 call 可以调用原生的方法
// console.log(Object.prototype.hasOwnProperty.call(obj, 'toString')); // false

// var arr = [1,2,3,4,5];
//
// console.log(Math.max.apply(null, arr));
//
// var a = ['a',,'b'];
// console.log(Array.apply(null,a)) // [ 'a', undefined, 'b' ]

// function print(i) {
//     console.log(i);
// }
//
// a.forEach(print);

// console.log(Array.prototype.slice.apply({0:1,1:2,2:3})) // []
//
// console.log(Array.prototype.slice.apply({0:1,1:2,2:3, length:3})) // [ 1, 2, 3 ]
//
// console.log(Array.prototype.slice.apply({0:1,1:2,2:3, length:5})) // [ 1, 2, 3, <2 empty items> ]

// var d = new Date();
//
// console.log(d.getTime()); // 1703084676116
//
// // var print = d.getTime;
// // print() // TypeError: this is not a Date object. 类型错误：this 不是日期对象
//
// var print = d.getTime.bind(d);
// console.log(print()) // 1703084989690

// var counter = {
//     count: 0,
//     add() {
//         this.count++;
//     }
// }
// var obj = {
//     count: 100
// }
// var fn = counter.add.bind(obj);
// fn();
// console.log(counter.count); // 0
// console.log(obj.count); // 101

// var add = function (x,y) {
//     return x * this.m + y * this.n;
// }
//
// var obj = {
//     m: 2,
//     n: 2
// }
// var newAdd = add.bind(obj, 5);
// console.log(newAdd(5))

// function add(x, y) {
//     return x + y;
// }
//
// var plus5 = add.bind(null, 5);
// console.log(plus5(10)) // 15

// var counter = {
//     count: 0,
//     add() {
//         'use strict'
//         this.count++;
//     }
// }
//
// function callback(fn) {
//     fn();
// }
//
// callback(counter.add.bind(counter));
// console.log(counter.count) // 1

// var obj = {
//     name: '张三',
//     times:[1,2,3],
//     print: function () {
//         // this.times.forEach(function (n){
//         //     console.log(this.name); // undefined
//         //     console.log(this === global); // true
//         // });
//
//         this.times.forEach(function (n){
//             console.log(this.name); // 张三
//             console.log(this === global); // false
//         }.bind(this));
//     }
// };
//
// obj.print()

// var push = Function.prototype.call.bind(Array.prototype.push);
// var pop = Function.prototype.call.bind(Array.prototype.pop);
// var a = [0];
// push(a, 1, 2, 3)
// console.log(a);
//
// pop(a);
// console.log(a)


// function f() {
//     console.log(this.v);
// }
// var o = { v: 123};

// var bind = Function.prototype.call.bind(Function.prototype.bind);
//
// bind(f, o)()

// const obj = {
//     x: 10,
//     test: function () {
//         console.log(this);
//         console.log(this.x);
//     }
// }
// obj.test();
// { x: 10, test: [Function: test] }
// 10


// var x= 20;
// const obj = {
//     x : 10,
//     test: () => {
//         console.log(this);
//         console.log(this.x);
//     }
// }
// obj.test();
// // {}
// // undefined

const Test = (name,age) => {
    this.name = name;
    this.age = age;
};

const test = new Test('张三', 19);
// TypeError: Test is not a constructor // 类型错误：测试不是构造函