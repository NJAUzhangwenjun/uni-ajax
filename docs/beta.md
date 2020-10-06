# 2.0.3-beta

## 安装

```
npm i uni-ajax@2.0.3-beta
```

## 介绍

- 简化 10% 代码
- 参数 method 大小写不受限
- 修改 task 返回方式，操作 task 更方便
- 调整传值给响应拦截器方式
- 调整请求执行返回值

## 中断请求

过去我们[中断请求](/usage.html#中断请求)是这样的，需要指定传参为一个对象~~params~~`config`，然后接收返回的`Promise.resolve`。

现在我们传参不受限，`config`或`url[, data[, config]]`都可以，然后返回的`Promise`是封装过的，直接调用`abort`即可。

```JavaScript
// 请求
const request = ajax('https://example.com/');

// 中断
request.abort();
```

## 传值给拦截器

之前的版本中，需要通过`response`[传值](/interceptor.html#请求拦截器)给响应拦截器，现在改为`config`，`config`为请求时的参数，该参数在请求拦截器和响应拦截器通用。所以不再区分传值给哪个拦截器。

```JavaScript
// 请求
ajax('https://example.com/', {}, { hello: 'hello ajax' });

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    console.log(config.hello);    // 'hello ajax'
    return config;
  }
);

// 响应拦截器
_ajax.interceptors.response.use(
  response => {
    console.log(response.config.hello);    // 'hello ajax'
    return request;
  }
);
```

## 请求执行返回值

之前的[版本](/usage.html)中，传参方式有`config`或`url[, data[, config]]`，返回都是`Promise`对象，但是`resolve`和`reject`的返回不同。

现在，如果希望返回一个真正的 `requestTask` 对象（[上面](/beta.html#中断请求)返回的是封装过`Promise`，而非真正的 `requestTask` 对象），参数为`config`一个对象，且需要至少传入 `success / fail / complete` 参数中的一个，否则为响应数据

```JavaScript
// requestTask
const requestTask = await ajax({
  url: 'https://www.example.com/',
  complete: () => {}
});
```
