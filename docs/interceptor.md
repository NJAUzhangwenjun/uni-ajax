# 拦截器

拦截器简单点说就是拦截每一次你的请求和响应，然后进行相应的处理。被`then`或`catch`处理前拦截它们。
前面说到如何[创建实例](/instance.html#创建实例)，这里是在创建实例后的基础上加入拦截器，拦截器有请求拦截和响应拦截。

## 请求拦截器

```JavaScript
// 添加请求拦截器
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
```

> 例如判断是否有 Token 有的话请求头加入 Token

```JavaScript
_ajax.interceptors.request.use(
  request => {
    const token = uni.getStorageSync('token');
    if (token) request.header.authorization = token;
    return request;
  }
);
```

### 请求拦截中断请求

如果你想在请求拦截器中中断请求，则只需要`return false`即可。中断请求后会在请求错误拦截里返回错误信息

```JavaScript
_ajax.interceptors.request.use(
  request => {
    return false;    // 中断请求
  },
  error => {
    console.log(error.errMsg);
    return error;
  }
);
```

### 传值给响应拦截器

你也可以传参到响应拦截器，赋值`request`中的`response`，则在响应拦截器中会收到`response`

```JavaScript
// 请求拦截器
_ajax.interceptors.request.use(
  request => {
    request.response.hello = 'hello ajax;
    return request;
  }
);

// 响应拦截器
_ajax.interceptors.response.use(
  response => {
    console.log(response.response.hello);    // 'hello ajax'
    return request;
  }
);
```

## 响应拦截器

当服务器返回的 HTTP 状态码为 200 时会到响应成功方法里，否则到响应错误

```JavaScript
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
```

> 例如当接口返回的 code 值为 0 时 toast 提示返回的 msg 信息

```JavaScript
_ajax.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      uni.showToast({
        title: response.data.msg,
        icon: 'none'
      });
    }
    return response;
  }
);
```

### 响应成功方法 rejected

如果你在响应成功方法里返回`Promise.reject`，请求接口时则会执行`fail`或`catch`

> 例如在上面例子的基础上，我想 code 值为 0 时执行 fail 或 catch

```JavaScript
// 拦截器
_ajax.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      // ...
      return Promise.reject(response);
    }
    return response;
  }
);

// 请求
ajax()
  .then(res => {
    // 请求成功且code值不为0
  })
  .catch(err => {
    // 请求错误或请求成功且code值为0
  });
```
