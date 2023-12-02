# <a id="top"> `var、let、const` 的区别 <a/>

## 思考

> [var、let、const 的区别？ 什么是块级作用域？ 如何用？](#answer)

```js
const test = () => {
    let a = b = 1;
}

test();
console.log(b); // 思考输出什么
console.log(a); // 思考输出什么
```

## 声明变量关键字汇总

在 `JavaScript` 中， 一共存在3种声明变量的方式：

- var
- let
- const

原因：之所以有3种方式，这是由于历史原因造成的。最初声明变量的关键字就是 `var`, 但是为了解决作用域的问题，所以后面在`ES6`中增加了 `let` 和 `const` 的方式

## 作用域

`ES5`中的作用域有：**全局作用域、函数作用域**，`ES6`中新增了块级作用域。 **块作用域** 由 `{}` 包括， `if` 语句和 `for` 语句里面的 `{}` 也属于块级作用域.

关于作用域的更多内容， 可以参阅《作用域和作用域链》



## `var` 关键字 

1、没有块级作用域的概念

```js
// Global Scope
{
    // Block Scope
    var a = 10;
}
console.log(a); // 10
```
上述代码，在**全局作用域**中， 且在**块级作用域** `{}` 中， a 输出的结果为 10， 由此可以看出 `var` 声明的变量不存在 块级作用域的概率


2、有全局作用域、函数作用域的概念
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


## `let` 关键字

1、有块级作用域的概念

```js
{
    // Block Scope
    let a = 10;
}
console.log(a); // ReferenceError: a is not defined 引用错误：a 未定义
```
上述代码、打印 `a` 报错， 说明存在 **块级作用域** 的概念

2、 不存在变量提升
```js
{
    // Block Scope
    console.log(a); // ReferenceError: Cannot access 'a' before initialization 引用错误：在初始化之前无法访问“a”
    let a = 10;
}
```
上述代码、 打印 `a` 报错： 无法在初始化之前访问。 说明不存在变量提升

3、暂时性死区 ( `temporal dead zone`, 简称 `TDZ`)
```js
{
    // Block Scope
    console.log(a); // ReferenceError: Cannot access 'a' before initialization 引用错误：在初始化之前无法访问“a”
    let a = 10;
}
if (true) {
    // TDZ 开始
    console.log(a); // ReferenceError: Cannot access 'a' before initialization 引用错误：在初始化之前无法访问“a”
    
    let a; // TDZ 结束
    console.log(a); // undefined
    
    a = 123;
    console.log(a); // 123
}
```
上述代码，使用let 声明的变量 a, 导致绑定这个块级作用域， 所以在 let 声明变量前， 打印的变量 a 报错。
这是因为使用 let/const 所声明的变量会存在暂时性死区。 

什么是暂时性死区： 简单理解就是在声明变量之前该变量是不可使用的

4、同一块作用域中不允许重复声明
```js
    // Block Scope
    let A;
    var A;
    let A; // SyntaxError: Identifier 'A' has already been declared 语法错误：已声明标识符“A”
```

## `const` 关键字

1、必须立即初始化， 不能留到以后赋值

```js
// Block Scope
const a; // SyntaxError: Missing initializer in const declaration 语法错误：const 声明中缺少初始值设定项
```
上述代码、用 `const` 声明的变量 a 没有进行初始化，所以报错。

> <a id="answer">var、let、const 的区别？ 什么是块级作用域？ 如何用？</a>

2、常量的值不能改变

```js
// Block Scope
{
    const a = 10;
    a = 20; // TypeError: Assignment to constant variable. 类型错误：赋值为常量变量。
}
```
上述代码、用 `const` 声明了变量 `a` 且 初始化为 10， 然后试图修改 `a` 的值， 报错。
`const` 实际上保证的， 并不是变量的值不得改动， 而是变量指向的那个内存地址所保存的数据不得改动。

## 总结 

> `var` 关键字

1、没有块级作用域的概率

2、有全局作用域、函数作用域的概率

3、不初始化值默认为 `undefined`

4、存在变量提升

5、全局作用域 `var` 声明的变量会挂在道 `window` 对象下

6、 同一作用域中允许重复声明

> `let` 关键字

1、有块级作用域的概念

2、不存在变量提升

3、暂时性死区

4、用一作用域中不允许

> `const` 关键字

1、与 `let` 特性一样， 仅有2个差别

2、区别1: 必须初始化，不能留到以后赋值

3、区别2: 常量的原始值不能改变，引用值可以

> <a id="answer">var、let、const 的区别？ 什么是块级作用域？ 如何用？</a>

> 参考答案：
>
> 1、var 定义的变量，没有块的概念，可以跨块访问，不能跨函数访问，有变量提升，可以重复声明
> 
> 2、let 定义的变量，有块的概率，不能跨块或者函数访问，不能变量提升，不可以重复声明
> 
> 3、const 定义的常量，使用必须初始化(赋值), 有块的概率，不能跨块或者函数访问，且不能修改值、变量提升、重复声明
> 
> 块级作用域是在 ES6 中新增的，在 ES6 之前只有全局作用域和函数作用域
> 
> 块级作用域 由 {} 包括， if 语句和 for 语句里的 {} 也属于块作用域。 
> 
> 没有块级作用域时候， if或者for会泄露成全局变量，其次 解决了 {} 中的内层变量可能会覆盖外层的变量。 
>
```js
const test = () => {
    // 未定义的变量默认 val, 会变量提升
    let a = b = 1;
}

test();
console.log(b); // 1
console.log(a); // ReferenceError: a is not defined 引用错误：未定义 a
```
[顶部](#top)