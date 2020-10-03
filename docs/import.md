# 引入

新建`ajax.js`文件（文件名自定义）用于处理拦截器、接口根地址、默认参数等

```JavaScript
// ajax.js

// 引入 Vue 用于将请求实例挂载在 Vue 原型链上
import Vue from 'vue';
// 引入 uni-ajax 模块
import ajax from 'uni-ajax';

const _ajax = ajax.create({
  // 默认配置
});

_ajax.interceptors.request.use(
  request => {
    // 在发送请求之前做些什么
    return request;
  },
  error => {
    // 对请求错误做些什么
    return error;
  }
);

_ajax.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    return error;
  }
);

// 如果您是像我下面这样挂载在 Vue 原型链上，则通过 this.$ajax 调用
Vue.prototype.$ajax = _ajax;

// 导出 create 创建后的实例
export default _ajax;
```

然后在`main.js`引入该`ajax.js`

```JavaScript
// main.js

import './utils/ajax';    // 路径根据请项目实际情况
```
