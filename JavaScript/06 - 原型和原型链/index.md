# <a id="top"> 原型和原型链 <a/>
## 思考

> [说一说你对 JavaScript 中原型与原型链的理解？（美团 2019年）](#answer)
> 对一个构造函数实例化后， 它的原型链执行什么？

## 原型与原型链介绍

在 Brendan Eich 设计 JavaScript 时， 借鉴了 Self 和 Smalltalk 这两门基于原型的语言。

之所以选择基于原型的面向对象系统， 是因为 Brendan Eich 一开始就没有打算在 JavaScript 中加入类的概率， 因为 JavaScript 的设计初衷就是为非专业的开发人员 （例如网页设计者） 提供一个方便的工具。 由于大部门网页设计者都没有任何的编程背景， 所以在设计 JavaScript 是也是尽可能使其简单、易学。

这因为如此， JavaScript 中的原型以及原型链成为了这门语言最大的特点， 在面试的时候， 面试官也经常会围绕原型和原型链展开提问。

JavaScript 是一门基于原型的语言， 对象的产生是通过原型对象而来的。

ES5 中提供了 Object.create 方法， 可以用来克隆对象。

示例如下：

```js
const person = {
    arms: 2,
    legs: 2,
    walk() {
        console.log('walking');
    }
}
const zhangsan = Object.create(person);
console.log(zhangsan.arms); // 2
console.log(zhangsan.legs); // 2
zhangsan.walk(); // walking
console.log(zhangsan.__proto__ === parent); // true
```

在上面的示例中， 我们通过 `Object.create` 方法来对 `person` 对象进行克隆， 克隆出来一个名为 `zhangsan` 的对象， 所以 `person` 对象就是 `zhangsan` 这个对象的原型对象

person 对象上面的属性和方法， 张三这个对象上面都有。

通过 __proto__ 属性， 我们可以访问到一个对象的原型对象。



> <a id="answer">说一说你对 JavaScript 中原型与原型链的理解？（美团 2019年）</a>
> 对一个构造函数实例化后， 它的原型链执行什么？
[顶部](#top)
