# <a id="top"> 作用域和作用域链 <a/>
## 思考

> [谈谈你对作用域和作用域链的理解](#answer)

## 作用域 （Scope）

### 什么事作用域

作用域是在运行时代码中的某些特定部分中变量， 函数和对象的可访问性。

换句话说， 作用域决定了代码区块中变量和其他资源的可见性。

可能这两句话并不好理解， 我们先来看个例子：

```js
function ounFun2() {
    var inVariable = "内层变量2";
}
ounFun2();
console.log(inVariable); // ReferenceError: inVariable is not defined // 引用错误：未定义 inVariable
```

从上面的例子可以体会到作用域的概率， 变量 `inVariable` 在全局作用域没有声明， 所以在全局作用域下取值会报错。

我们可以这样理解： **作用域就是一个独立的地盘， 让变量不会外泄、暴露出去。 也就是说作用域最大的用处就是隔离变量， 不同作用域同名变量下不会有冲突。**

ES6 之前 JavaScript 没有块级作用域， 只有全局作用域和函数作用域。

ES6 的到来， 为我们提供了 **块级作用域**， 可以通过新增命令 let 和 const 来体现。

### 全局作用域和函数作用域

（1）全局作用域

在代码中任何地方都能访问到的对象拥有全局作用域， 一般来说以下几种情形拥有全局作用域：
- 最外层函数和在最外层函数外面定义的变量拥有全局作用域

```js
var outVariable = '我是最外层变量'; // 最外层变量
function outFun() { // 最外层函数
    var inVariable = '内层变量';
    function innerFun() { // 内层函数
        console.log(inVariable);
        
    }
    innerFun();
}

console.log(outVariable); // 我是最外层变量
outFun(); // 内层变量
console.log(inVariable); // inVariable is not defined
innerFun(); // innerFun is not defined
```

- 所有未定义直接复制的变量自动声明为拥有全局作用域

```js
function outFun2() {
    variable = '未定义直接赋值的变量';
    var inVariable2 = '内层变量2';
}
outFun2(); // 要先执行这个函数， 否则根本不知道里面是啥
console.log(variable); // 未定义直接赋值的变量
console.log(inVariable2) // inVariable2 is not defined
```

- 所有 window 对象的属性拥有全局作用域

一般情况下， window 对象的内置属性都拥有全局作用域， 例如 `window.name、window.location、window.top` 等等。

全局作用域有个弊端： 如果我们写了很多行 js 代码， 变量定义都没有用函数包括， 那么它们就全部都在全局作用域中。 这样就会污染全局命名空间， 容易引起命名冲突。

```js
// 张三写的代码中
var data = {a: 100}

// 李四写的代码中
var data = {x: true}
```
这就是为何 `jQuery、zepto` 等库的源码， 所有的代码都会放在 `(function(){...})()` 中。

因为放在里面的所有变量， 都不会被外泄和暴露， 不会污染到外面， 不会对其他的库或者 JS 脚本造成影响。 这是函数作用域的一个体现。

（2）函数作用域

函数作用域， 是指声明在函数内部的变量， 和全局作用域相反， 局部作用域一般只在固定的代码片段内可以访问到，最常见的例如函数内部。

```js
function doSomething() {
    var stuName = 'zhangsan';
    function innerSay() {
        console.log(stuName);
    }
    innerSay();
}

console.log(stuName); // ReferenceError: stuName is not defined // 引用错误： 未定义 stuName
innerSay(); // ReferenceError: innerSay is not defined // 引用错误： 未定义 innerSay
```

作用域是分层的， 内层作用域可以访问外层作用域的变量， 反之则不行。

### 块级作用域

块级作用域可通过新增命令 `let` 和 `const` 声明，所声明的变量在指定的作用域外无法被访问。

块级作用域在如下情况被创建：

1、在一个函数内部
2、在一个代码块（由一对花括号包裹）内部

`let` 声明的语法与 `var` 的语法一致。 你基本上可以用 `let` 来代替 `var` 进行变量声明。 但会将变量的作用域限制在当前代码块中。 块级作用域有以下几个特点：

```js
function getValue(condition) {
    if (condition) {
        let value = 'blue';
        return value;
    } else {
        // value 在此处不可用
        return null;
    }
    // value 在此处不可用
}
```

- 禁止重复声明
- 循环中的绑定块级作用域的妙用


## 作用域链

### 什么时自由变量

首先认识以下什么叫做自由变量

如下代码中， `console.log(a)` 要得到的 a 变量， 但是在当前的作用域中没有定义 a (可对比以下 b). 当前作用域没有定义的变量， 这成为自由变量。

自由变量的值如何得到？

需要向父级作用域寻找

```js
var a = 100;

function fn () {
    var b = 200;
    console.log(a); // 这里的 a 在这就是一个自由变量
    console.log(b); 
}
fn();
```
什么时作用域链

如果父级也没呢？

再一层一层向上寻找，直到找到全局作用域还是没找到， 就宣布放弃。 这种一层一层的关系， 就是作用域。
```js
var a = 100;
function f1() {
    var b = 200;
    function f2() {
        var c = 300;
        console.log(a) // 100 自由变量， 顺作用域链向父级作用域找
        console.log(b) // 200 自由变量， 顺作用域链向父级作用域找
        console.log(c) // 300 本作用域的变量
    }
    f2()
} 
f1()
```

### 关于自由变量的取值

关于自由变量的值， 上文提到要到父作用域中取， 其实有时候这种解释会产生歧义。

```js
var x = 10;
function fn() {
    console.log(x);
}
function show(f) {
    var x = 20;
    (function (){
       f(); // 10, 而不是 20 
    })()
}
show(fn)
```

在 fn 函数中， 取自由变量 x 的值时， 要到哪个作用域中取？

要到创建 fn 函数的那个作用域中取， 无论 fn 函数将在哪里调用。

所以，不要在用以上说法了。 相比而言， 用这句话描述会更加贴切： 要到创建这个函数的那个域。作用域中取值， 这里强调的是 创建， 而不是 调用， 切记切记， 其实就是所谓的 静态作用域。

```js
const food = 'rice';

const eat = function () {
    console.log(`eat ${food}`);
};
(function (){
   const food = 'noodle'; 
   eat(); // eat rice
})()
```

在本示例中， 最终打印的结果为 eat rice . 因为对于 eat() 函数来说， 创建该函数时它的父级别上下文为全局上下文， 所以 food 的值为 rice.

如果我们将代码稍作修改，改成如下：


```js
const food = 'rice';
 
(function (){
   const food = 'noodle'; 
   const eat = function () { 
       console.log(`eat ${food}`);
   }; // eat noodle
})()
```
这个时候，打印出来的额值就为 eat noodle. 因为对于 eat() 函数来讲， 创建它的时候父级上下文为IIFE, 所以 food 的值为 noodle.

## 作用域与执行上下文

许多开发人员经常混淆作用域和执行上下文的概念， 误认为它们是相同的概念， 但事实并非如此。

我们知道 JavaScript 属于解释型语言，JavaScript 的执行分为： 解释和执行两个阶段，这两个阶段所做的事并不一样。

**解释阶段**

- 词法分析
- 语法分析
- 作用域规则确定

**执行阶段**

- 创建执行上下文
- 执行函数代码
- 垃圾回收

JavaScript 解释阶段便会确定作用域规则， 因此作用域在函数定义时就已经确定了， 而不是在函数定义时就已经确定了， 而不是在函数调用时确定， 但是执行上下文是函数执行之前创建的。

执行上下文最明显的就是 this 的指向时执行时确定的。 而作用域访问的变量是编写代码的结果确定的。

作用域和执行上下文之间最大的区别时：
**执行上下文在运行时确定， 随时可能改变， 作用域在定义时就确定， 并且不会改变。**

> <a id="answer">谈谈你对作用域和作用域链的理解？</a>
>
> 参考答案
>
> **什么是作用域？**
> 
> ES5 中只存在两种作用域： 全局作用域和函数作用域。
> 
> 在 JAVAScript 中， 我们将作用域定义为一套规则， 这套规则用来管理引擎如何在当前作用域以及嵌套子作用域中根据标识符名称进行变量 （变量名或者函数名） 查找。 ES6 新增了块级作用域。
>
> **什么是作用域链？** 
> 
> 当访问一个变量时， 编译器在执行这段代码时， 会首先从当前的作用域中查找是否有这个标识符， 如果没有找到， 就会去父作用域查找， 如果父作用域查找， 如果父作用域还没找到继续向上查找， 直到全局作用域为止。
> 
> 而作用域链， 就是有当前作用域与上层作用域的一系列变量对象组成， 它保证了当前执行的作用域对符合访问权限的变量和函数的有序访问。
> 
> 作用域有一个非常重要的特性， **那就是作用域中的值在函数创建的时候， 就已经被存储了， 是静态的。**
> 
> 所谓静态， 就是说作用域中的值一旦被确定了， 永远不会变。 **函数可以永远不被调用， 但是作用域中的值在创建的时候就已经被写入了， 并且存储在函数作用域链对象里面。**

[顶部](#top)





















