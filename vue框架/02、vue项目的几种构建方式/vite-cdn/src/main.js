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
