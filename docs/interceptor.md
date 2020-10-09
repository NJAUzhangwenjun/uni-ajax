# 拦截器

拦截器简单点说就是拦截每一次你的请求和响应，然后进行相应的处理。被`then`或`catch`处理前拦截它们。
前面说到如何[创建实例](/instance.html#创建实例)，这里是在创建实例后的基础上加入拦截器，拦截器有请求拦截和响应拦截。

## 请求拦截器

```JavaScript
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
```

> 例如判断是否有 Token 有的话请求头加入 Token

```JavaScript
_ajax.interceptors.request.use(
  config => {
    const token = uni.getStorageSync('token');
    if (token) config.header.authorization = token;
    return config;
  }
);
```

### 请求拦截中断请求

如果你想在请求拦截器中中断请求，则只需要`return false`即可。中断请求后会触发请求错误事件，即会触发`请求错误拦截器`和`fail / catch`。

```JavaScript
// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    return false;    // 中断请求
  },
  error => {
    console.log(error.errMsg);    // request:fail interrupted
    return error;
  }
);

// 发起请求
ajax().catch(err => {
  console.log(err.errMsg);    // request:fail interrupted
});
```

## 响应拦截器

当服务器返回的 HTTP 状态码为 200 时会到响应成功方法里，否则到响应错误。

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

如果你在响应成功方法里返回`Promise.reject`，请求接口时则会执行`fail`或`catch`。

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
    // 请求错误 或 请求成功且code值为0
  });
```

### 传值给拦截器

你也可以[传值](/usage.html#参数)到拦截器，在拦截器中通过`config`接收，又或者请求拦截器传值到响应拦截器。

```JavaScript
// 发起请求
ajax({
  url: 'https://www.example.com',
  hello: 'hello ajax'    // 传递给拦截器的值
});

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    console.log(config.hello);       // 'hello ajax' 请求时传递给拦截器的值
    config.world = 'hello world';    // 请求拦截器传值到响应拦截器
    return config;
  }
);

// 响应拦截器
_ajax.interceptors.response.use(
  response => {
    console.log(response.config.hello);    // 'hello ajax'  请求时传递给拦截器的值
    console.log(response.config.world);    // 'hello world' 请求拦截器传到响应拦截器的值
    return request;
  }
);
```
