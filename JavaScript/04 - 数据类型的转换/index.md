# <a id="top"> 数据类型的转换 <a/>

## 思考

> [`JavaScript` 中如何进行数据类型的转换](#answer)

## 数据类型转换介绍

`JavaScript` 是一种动态类型语言， 变量没有类型限制，可以随时赋予任意值

`var x = y ? 1 : 'a';`

## 强制转换（显示转换）

强制转换主要指使用 `Number()`、 ``String()`` 和 `Boolean()` 三个函数，手动将各种类型的值，分别转换成数字、字符串或者布尔值。

### `Number()`

使用Number函数， 可以将任意类型的值转换成数值。

下面分成两种情况讨论,一种是参数是原始类型的值，另一种是参数对象。

**（1）原始值类型值**

原始类型值的装换规则如下。

```js
// 数值： 转换后还是原来的值
Number(321) // 321

// 字符串
Number('321') // 321 字符串可以被解析 装换为相应的值
Number('321a') // NaN 字符串不可以被解析
Number('') // 0 空字符串

// 布尔值

Number(true) // 1
Number(false) // 0

// undefined: 转成 NaN
Number(undefined) // NaN

// null: 转成 0
Number(null) // 0

```

`Number`函数将字符串转为数值，要比 `parseInt`函数严格很多。 基本上，只要有一个字符无法转成数值，整个字符串就会被转为NaN.

```js
parseInt('32 cats') // 32
Number('32 cats') // NaN  

parseInt(undefined) // NaN

parseInt(null) // NaN
```
上面代码中， `pareInt` 逐个解析字符， 而 `Number` 函数整体转换字符串的类型

（2）对象
简单的规则是， `Number` 方法的参数是对象时，将返回 `NaN`, 除非是包含单个数值的数组。

```js
Number({a:1}) // NaN
Number([1,2,3]) // NaN
Number([5]) // 5
```
之所以会这样， 是应为 Number 背后的转换规则比较复杂。
第一步，调用对象自身的 valueOf 方法。 如果返回原始类型的值， 则直接对该值使用 Number 函数， 不再进行后续步骤。

第二步，如果 valueOf 方法返回的还是对象，则改为调用对象自身的 toString 方法。如果 toString 方法返回原始类型的值，则对该值使用 Number 函数，不再进行后续步骤。

第三部，如果 toString方法返回的是对象，就报错。

请看下面的例子。

```js
// valueOf 和 toString 方法是任何对象或者值都有的，因为这个两个方法是挂在 Object.protype 上面的
var obj = {x: 1};

// console.log(obj.valueOf()); // > {x: 1}
// console.log(obj.toString()); // > [object Object] > Number('[object Object]')
// console.log(Number(obj));

Number(obj) // 最终得到NaN 

// 等同于
if (typeof obj,valueOf() === 'Object') {
    Number(obj.toString());
} else {
    Number(obj.valueOf());
}

```

### `String()`

String 函数可以将任意类型的值装化成字符串，转换规则如下。

**(1) 原始类型值**

- **数值**：转为相应的字符串
- **字符串**：转换后还是原来的值
- **布尔值**： `true` 转换为字符串 "true", `false` 转换为字符串 "false".
- **undefined**: 转为字符串 "undefined"
- **null**: 转为字符串 "null"

```js
String(123) // ‘123’
String('abc') // 'abc'
String(true) // 'true'
String(false) // 'fasle'
String(undefined) // 'undefined'
String(null) // 'null' 
```