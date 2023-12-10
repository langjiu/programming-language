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

var zhangxiaosan = Object.create(zhangsan, {
    name: {
        value: "张小三",
        enumerable: true
    },
    born: {
        value: '北京',
        enumerable: true,
    },
})

console.log(zhangxiaosan.name)
console.log(zhangxiaosan.arms)
console.log(zhangxiaosan.gender) //  undefined

// 总结， 当查找一个对象的属性的时候， 如果对象上面没有这个属性， 则会去该对象上面的原型对象上面进行查找