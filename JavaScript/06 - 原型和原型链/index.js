const person = {
    arms: 2,
    legs: 2,
    walk() {
        console.log('walking');
    }
}
// Object.create 方法第一个参数是原型对象
// Object.create 方法接受第二个参数：对象
// 该对象里面可以设置多个键值对
// 每个键就是新对象的属性， 所对应的值是一个属性描述符
const zhangsan = Object.create(person, {
    name: {
        value: "张三",
        enumerable: true
    },
    age:{
        value: 18,
        enumerable: true
    }
});
// person 对象上面的属性和方法， 张三这个对象上面都有。
// console.log(zhangsan); // 2
// console.log(zhangsan.arms); // 2
// console.log(zhangsan.legs); // 2
// zhangsan.walk(); // walking
// console.log(zhangsan.__proto__ === person); // true

const zhangxiaosan = Object.create(zhangsan, {
    name: {
        value: "张小三",
        enumerable: true
    },
    born: {
        value: '北京',
        enumerable: true,
    },
})

// console.log(zhangxiaosan.name)
// console.log(zhangxiaosan.arms)
// console.log(zhangxiaosan.gender) //  undefined

// 总结， 当查找一个对象的属性的时候， 如果对象上面没有这个属性， 则会去该对象上面的原型对象上面进行查找

// console.log(zhangxiaosan.__proto__ === zhangsan) // true
// console.log(zhangxiaosan.__proto__.__proto__ === person) // trueliu


// 之后， 随着 js 语音的发展， 我们还是希望 js 能够像标准的面向对象语音一样
// 通过类来批量的产生对象
// 早起 js 通过构造函数来模拟其他语音里面的类

function Computer(name, price) {
    this.name = name;
    this.price = price;
}
Computer.prototype.showPrice = function () {
    console.log(`${this.name}的电脑价格为${this.price}`);
}

const apple = new Computer('苹果', 15000);
console.log(apple);
apple.showPrice();

const huawei = new Computer('华为', 12000);
console.log(huawei);
huawei.showPrice();

// 虽然上面的方式模拟出了其他语言中面向对象的语音创建对象的方式
// 但是在 js 底层还是基于原型来创建的对象

// 比如我们的对象除了有属性, 一般还有方法
// 方法一般会选择挂在到原型对象上面

// console.log(apple.__proto__ === Computer.prototype); // true   实例对象上的原型对象 === 构造函数的原型
// console.log(apple.constructor === Computer); // true 实例对象上的原型对象通过constructor === 构造函数
// console.log(apple.__proto__.constructor === Computer); // true 实例对象上的原型对象通过constructor === 构造函数


// 内置的构造函数也有这样的三角关系
// const arr = [];
//
// // new Array();
// console.log(Array.prototype === arr.__proto__) // true
//
// console.log(Array.__proto__ === Computer.__proto__) // true
// console.log(Date.__proto__ === Computer.__proto__) // true
// console.log(Number.__proto__ === Computer.__proto__) // true
// console.log(Function.__proto__ === Computer.__proto__) // true
// console.log(Object.__proto__ === Computer.__proto__) // true
// console.log(Computer.__proto__) // {}


// console.log(apple.__proto__.__proto__); // [Object: null prototype] {}
// console.log(apple.__proto__.__proto__.__proto__); // null
// console.log(apple.__proto__.__proto__ === Object.prototype); // true

// Object.prototype 在往上一层 （__proto__） 就是 null
console.log(Object.prototype.constructor); // [Function: Object]

console.log(Computer.__proto__ === Object.prototype.constructor.__proto__); // true

console.log(Object.prototype.constructor.__proto__.constructor) // [Function: Function]
console.log(Object.prototype.constructor.__proto__.constructor.__proto__) // {}
console.log(Object.prototype.constructor.__proto__.constructor.prototype) // {}
console.log(Object.prototype.constructor.__proto__.constructor.__proto__ === Object.prototype.constructor.__proto__.constructor.prototype) // true

