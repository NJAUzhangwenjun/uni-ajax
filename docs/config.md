# 配置

在项目开发中，我们的接口地址是通常是同个地址，我们需要配置接口根地址方便代码的维护。而且我们对于请求和响应的都会做同样的判断，这里就可以用到拦截器，避免冗余的代码。

`ajax.create([config])`

```JavaScript
import ajax from 'uni-ajax';

// 创建 UniAjax 实例
const _ajax = ajax.create({
  // 默认配置
});

// 添加请求拦截器
_ajax.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return error;
  }
);

// 添加响应拦截器
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

export default _ajax;
```
