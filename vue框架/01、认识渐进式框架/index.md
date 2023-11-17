## 渐进式框架 - vue对自己框架和其他框架对比后，生产的一个特定的名词

## progresive framework

1、 Augular 
> 综合性框架 开发平台
> 
> 项目应用 / X 视图渲染 / 状态的管理 - 大型应用

2、 React 
> 用户界面 view 视图层 - 怎么把数据渲染到视图中
> 
> 一个点 视图 - 库
> 
> 状态中央管理 （redux) X
> 
> 路由（react-router) X

3、 Vue
> 用户界面 View 视图层 - 怎么把数据渲染到视图中
> 
> 一个点 视图 - 核心库
> 
> vuex o (选择集成)
> 
> vue-router o (选择集成)
> 
> micro libs 微型库

## 数据绑定和数据流

### 1.数据绑定 
> 数据与视图渲染直接的关系
> 
> React: 单项数据绑定 > event > state更改 > 视图变更
> 
> Vue：双向数据绑定 > event > state/data更改 > 视图变更   v-model > 视图变化 > state/date变更
>

### 2.数据流 
> 数据流淌的方向 > 父子组件中 数据按照什么方向流动
> 
> 单向数据流
> 
> React/vue > 父组件 > state > 子组件 > props
> 
> 子组件 > props变更 > 父组件 > state变更 x
> 
> 父组件 > state变更 > 子组件 > props 变更 0
