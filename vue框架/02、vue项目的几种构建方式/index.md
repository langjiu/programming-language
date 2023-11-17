## vite + cdn 
> cdn 地址
> 
> `vue3.1.2` https://unpkg.com/browse/vue@3.1.2/dist/vue.global.js
>
> `2.6.14` https://unpkg.com/browse/vue@2.6.14/dist/vue.js

1、 初始化 创建 package.json

```shell
npm init -y
```

2、 安装 vite

```shell
yarn add vite -D  
```
```shell 
npm install vite -D
```

3、修改`package.json`运行命令

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

4、 添加 `index.html` 文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div id="app"></div>
<!--  vue 3.0  -->
<script src="https://unpkg.com/vue@3.1.2/dist/vue.global.js"></script>
<!--  vue 2.0  -->
<!--<script src="https://unpkg.com//vue@2.6.14/dist/vue.js"></script>-->

<script type="module" src="./src/main.js"></script>
</body>
</html>
```

5、添加 `./src/main.js` 文件

```js
// vue 3.0
const { createApp, ref} = Vue;

const App = {
    // vue 2.0 写法
    // data () {
    //     return {
    //         text: 'hello Vue!!!'
    //     }
    // },
    // methods: {
    //     change() {
    //         this.text = 'Hello vite!!!';
    //     }
    // },
    // template: `
    //     <h1>{{text}}</h1>
    //     <button @click="change">Change</button>
    // `,

    // vue 3.0 写法
    template: `
        <h1>{{text}}</h1>
        <button @click="change">Change</button>
    `,
    setup () {
        const text = ref('hello Vue!!!');
        const change = () => {
            text.value = 'Hello vite!!!'
        }

        return {
            text,
            change,
        }
    }
}

// vue 3.0
createApp(App).mount('#app');

// vue 2.0
// new Vue({
//     render: h => h(App)
// }).$mount('#app')

```

## vite 创建vue项目

1、通过命令创建工程

> vite-vue 

```shell
npm init vite <项目名>
```

### @vue/cli 创建vue项目

> vue-vue-cli

```shell
npm create <项目名>
```
