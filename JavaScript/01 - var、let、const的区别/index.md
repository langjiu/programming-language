# <a id="top"> `var、let、const` 的区别 <a/>

## 思考

> [var、let、const 的区别？ 什么是块级作用域？ 如何用？](#answer)

## 声明变量关键字汇总

在 `javaScript` 中， 一共存在3种声明变量的方式：

- var
- let
- const

原因：之所以有3种方式，这是由于历史原因造成的。最初声明变量的关键字就是 `var`, 但是为了解决作用域的问题，所以后面在`ES6`中增加了 `let` 和 `const` 的方式

## 作用域

`ES5`中的作用域有：**全局作用域、函数作用域**，`ES6`中新增了块级作用域。 **块作用域** 由 `{}` 包括， `if` 语句和 `for` 语句里面的 `{}` 也属于块级作用域.

关于作用域的更多内容， 可以参阅《作用域和作用域链》



## `var` 关键字 

1、没有块级作用域的概率

```js
// Global Scope
{
    // Block Scope
    var a = 10;
}
console.log(a); // 10
```
上述代码，在**全局作用域**中， 且在**块级作用域** `{}` 中， a 输出的结果为 10， 由此可以看出 `var` 声明的变量不存在 块级作用域的概率


2、有全局作用域、函数作用域的概率
```js
// Global Scope
var a = 10;
function checkScope() {
    // Local Scope
    var b = 20;
    console.log(a); // 10;
    console.log(b); // 20;
}
checkScope();
console.log(b); // ReferenceError: b is not defined 引用类型错误 未定义 b
```
上述代码、在**全局作用域**中用 `var` 声明了 `a`, 在 `checkScope` 函数中的 **函数作用域**中打印出了 10， 但是在全局作用域中打印的变量 `b` 报错了。

3、不初始化值默认为 `undefined`
```js
// Global scope
var a;
console.log(a); // undefined
// 这里存在一个变量提升的现象
// 所谓变量提升， 就是将变量的声明部分提升到当前作用域的最顶端
// 上面的代码就等价于：
// var a;
// console.log(a);
// a = 10;
```
上述代码，在 全局作用域中用`var`声明了`a`, 但是没有初始化值， 它的默认值为 `undefined`, 这里是 `undefined` 是 `undefined`类型，而不是字符串

4、存在变量提升

```js
// Global scope
console.log(a); // undefined
var a= 10;

checkScope();
function checkScope() {
    // Local Scope 
    console.log(a); // undefined; 
    var a;
}
```
上述代码、先打印了 `a`, 然后用 `var` 声明变量 `a`。 变量提升是因为 `js` 需要经历编译和执行阶段。 而 `js` 在编译阶段的时候，会搜集所有的变量声明并且提前声明变量。

可以将这个过程形象地想像成所有的声明（变量）都会被移动到各自作用域的最顶端，这个过程被称为提升。至于 `checkScope` 函数中的变量 `a` 为什么输出 `undefined`，可以参阅《作用域和作用域链》 

5、全局作用域用 `var` 声明的变量会挂在到 `window` 对象下
```js
// Global scope
var a = 10;
console.log(a); // 10
console.log(window.a); // 10
console.log(this.a); // 10
```
上述代码、打印了3个10， 访问 `a` 和 `window.a` 或是 `this.a` 都是等价的。
举个例子： 比如我要访问 `location` 对象， 使用 `location` 可以访问，使用 `window.location` 也可以访问， 只不过 `window` 对象可以省略， 就像 `new Array()` 和 `new window.Array()` 是等价的

6、同一作用域中允许重复声明
```js
// Global scope
var a = 10;
var a = 20;
console.log(a); // 20

checkScope();
function checkScope() {
    // Local Scope 
    var b = 10;
    var b = 20;
    console.log(b); // 20; 
}
```
上述代码、在 **全局作用域**中声明了2次 `a`, 以最后一次声明有效， 打印为 20。 同理， 在 **函数作用域**中 也是一样的。










> <a id="answer">var、let、const 的区别？ 什么是块级作用域？ 如何用？</a>


[顶部](#top)