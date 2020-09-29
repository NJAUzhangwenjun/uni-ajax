# 使用

```JavaScript
// 常规使用
ajax();

// 请求方式使用
ajax.get();
ajax.post();
ajax.put();
ajax.delete();

// 其他属性
ajax.baseURL    // 获取配置的接口根地址 baseURL
ajax.origin     // 根据配置的接口根地址获取源地址 origin
```

上面的方法中，传参方式有`params`或`url[, data[, options]]`，返回都是`Promise`对象，但是`resolve`和`reject`的返回不同

- `params`
  - resolve：requestTask 对象
  - reject：请求失败对象
- `url[, data[, options]]`
  - resolve：响应成功对象
  - reject：响应失败对象

## 参数

`params` \<object\>

| 参数            | 类型            | 说明                                                                       |
| :-------------- | :-------------- | :------------------------------------------------------------------------- |
| url             | string          | 请求地址，不填时默认配置的 baseUrl，如果没有 baseURL 又没有 url 则请求错误 |
| data            | object / string | 请求参数                                                                   |
| header          | object          | 设置请求的 header，header 中不能设置 Referer                               |
| method          | string          | 请求协议，不填时默认配置的 method 或 GET，必须大写                         |
| timeout         | number          | 超时时间，单位 ms                                                          |
| dataType        | string          | 如果设为 json，会尝试对返回的数据做一次 JSON.parse                         |
| responseType    | string          | 设置响应的数据类型。合法值：text、arraybuffer                              |
| sslVerify       | boolean         | 验证 ssl 证书                                                              |
| withCredentials | boolean         | 跨域请求时是否携带凭证（cookies）                                          |
| success         | function        | 收到开发者服务器成功返回的回调函数                                         |
| fail            | function        | 接口调用失败的回调函数                                                     |
| complete        | function        | 接口调用结束的回调函数（调用成功、失败都会执行）                           |
| response        | object          | 响应拦截器可以接收到的参数                                                 |
| ...             | any             | 传递给请求拦截器的参数                                                     |

`url` \<string\> 请求地址  
`data` \<object|string\> 请求参数  
`options` \<object\> 其他配置

| 参数            | 类型    | 说明                                                                            |
| :-------------- | :------ | :------------------------------------------------------------------------------ |
| header          | object  | 设置请求的 header，header 中不能设置 Referer                                    |
| method          | string  | 请求协议（如果是请求方式使用，method 设置是无效的，只有在 ajax() 使用时才生效） |
| timeout         | number  | 超时时间，单位 ms                                                               |
| dataType        | string  | 如果设为 json，会尝试对返回的数据做一次 JSON.parse                              |
| responseType    | string  | 设置响应的数据类型。合法值：text、arraybuffer                                   |
| sslVerify       | boolean | 验证 ssl 证书                                                                   |
| withCredentials | boolean | 跨域请求时是否携带凭证（cookies）                                               |
| response        | object  | 响应拦截器可以接收到的参数                                                      |
| ...             | any     | 传递给请求拦截器的参数                                                          |

## 中断请求

通过返回的`requestTask`对象，可中断请求任务。上面说的当需要返回`requestTask`对象时，传参是`params`一个对象，然后返回`Promise`的`resolve`。为什么是返回的`Promise`呢？因为[拦截器](/interceptor.html)是支持`async`。

| 参数               | 说明                                                                       |
| :----------------- | :------------------------------------------------------------------------- |
| abort              | 中断请求任务                                                               |
| offHeadersReceived | 取消监听 HTTP Response Header 事件，仅微信小程序平台支持                   |
| onHeadersReceived  | 监听 HTTP Response Header 事件。会比请求完成事件更早，仅微信小程序平台支持 |

```JavaScript
// 异步方式使用
ajax({ url: 'https://example.com/' }).then(task => {
  task.abort();    // 中断请求任务
});

// 同步方式使用
const task = await ajax({ url: 'https://example.com/' });    // await 需要放在 async 函数里
task.abort();    // 中断请求任务
```

> 通常我们的请求和中断是分开的，所以分开为两个方法

```JavaScript
// 异步方式使用
data() {
  return {
    taskPromise: null
  }
},
methods: {
  // 请求
  request() {
    this.taskPromise = ajax({ url: 'https://example.com/' });
  },
  // 终止
  abort() {
    this.taskPromise?.then(task => task.abort());    // ?. 是 es2020 的新语法
  }
}

// 同步方式使用
data() {
  return {
    requestTask: null
  }
},
methods: {
  // 请求
  async request() {
    this.requestTask = await ajax({ url: 'https://example.com/' });
  },
  // 终止
  abort() {
    this.requestTask?.abort();
  }
}
```
