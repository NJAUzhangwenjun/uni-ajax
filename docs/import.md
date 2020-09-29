# 引入

创建`ajax.js`用于处理拦截器、接口根地址、默认参数等，然后导出`create`创建后的实例

```JavaScript
// ajax.js

import ajax from 'uni-ajax';

// Default configuration
const _ajax = ajax.create({
  // baseURL: 'https://example.com/'
});

_ajax.interceptors.request.use(
  request => {
    // Do something before request is sent
    return request;
  },
  error => {
    // Do something with request error
    return error;
  }
);

_ajax.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    return error;
  }
);

export default _ajax;
```

然后在`main.js`引入该`ajax.js`，将`ajax`方法挂载在`Vue`原型链上（如果您是像我下面这样挂载在`Vue`原型链上，则通过`this.$ajax`调用）

```JavaScript
// main.js

import ajax from './utils/ajax';
Vue.prototype.$ajax = ajax;
```
