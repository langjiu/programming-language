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
// valueOf 和 toString 方法是任何对象或者值都有的，因为这个两个方法是挂在 Object.prototype 上面的
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

**(2) 对象**

`String` 方法的参数如果是对象， 返回一个类型字符串; 如果是数组，返回该数组的字符串形式。

```js
String({a:1}) // "[object Onject]"
String([1,2,3]) // "1,2,3"
```

`String` 方法的转换规则， 与Number方法基本相同， 只是互换了 `valueOf` 方法和 `toString` 方法的执行顺序。

1、 先调用对象自身的 `toString` 方法. 如果返回原始类型的值，则对该值使用 `String` 函数, 不再进行以下步骤。

2、 如果 `toString` 方法返回的是对象， 再调用原对象的 valueOf 方法。 如果返回原始类型的值， 则对该值使用 String 函数，不再进行一下步骤。

3、 如果 valueOf 方法返回的是对象，就报错。

```js
Srting({a:1})
// "[object Onject]"

// 等同于
String({a:1}).toString()
// "[object Onject]"
```

上面代码先调用对象的 `toString` 方法,发现返回的是字符串 `[object Onject]`, 就不再调用 `valueOf` 方法了.

如果 `toString` 方法和 `valueOf` 方法， 返回的都是对象， 就会报错。

下面是通过自定义 toString 方法， 改变返回值的例子。

```js
String({
    toString: function () {
        return 3;
    }
}) 
// '3'

String({
    valueOf: function () {
        return 2;
    }
})
// "[object Onject]"

String({
    valueOf: function () {
        return 2;
    },
    toString: function () {
        return 3;
    }
})
// '3'
```
上面代码对三个对象使用 `String` 函数。第一个对象返回 `toString` 方法的值（数值3）， 第二个对象返回的还是 `toString` 方法的值（`[object Onject]`）, 第三个对象表示 `toString` 方法先于 `valueOf` 方法执行。


### `Boolean()`

`Boolean()` 函数可以将任意类型的值转为布尔值。

他的转换规则相对简单： 除了以下五个值的转换结果为 `false`, 其他的值全部为 `true` .
 
- undefined
- null
- 0 (包含 -0 和 +0)
- NaN
- `''`(空字符串) 
```js
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(NaN) // false
Boolean('') // false
Boolean("") // false
Boolean(``) // false
```

当然 true 和 false 这两个布尔值不会发生变化。

```js
Boolean(true) // true
Boolean(false) // false
```

所有的对象（包括空对象）的转换结果都是 `true`, 甚至连 `false` 对应的布尔值对象 `new Boolean(false)` 也是 `true` 