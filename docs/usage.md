# 使用

## 方法

**请求方法**

```JavaScript
// 常规使用
ajax();

// 请求方式使用
ajax.get();
ajax.post();
ajax.put();
ajax.delete();
```

**其他属性**

```JavaScript
ajax.baseURL    // 获取配置的接口根地址 baseURL
ajax.origin     // 根据配置的接口根地址获取源地址 origin
```

**RequestTask 方法**

```JavaScript
const request = ajax();            // 常规使用或请求方式使用

request.abort();                   // 中断请求任务
request.onHeadersReceived(fn);     // 监听 HTTP Response Header 事件
request.offHeadersReceived(fn);    // 取消监听 HTTP Response Header 事件
```

## 参数

上面的请求方法中，传参方式有`config`或`url[, data[, config]]`，直接返回都是封装后的[Promise 对象][1]，并支持[RequestTask 方法](/usage.html#requesttask)

- [config](/usage.html#config)
  - `resolve` &nbsp;响应成功对象 / RequestTask 对象
  - `reject` &nbsp;&nbsp;&nbsp;请求或响应失败对象 / 无

* [url[, data[, config]]](usage.html#url-data-config)
  - `resolve` &nbsp;响应成功对象
  - `reject` &nbsp;&nbsp;&nbsp;请求或响应失败对象

::: tip

```JavaScript
const request = ajax();
```

这里`request`接收的是封装后的`Promise`，并支持`RequestTask`的一些方法。<br />
但实际并非真正的`RequestTask`对象。只是封装继承`Promise`并挂载`RequestTask`的同名方法。

如果希望返回一个`RequestTask`对象，则传参为`config`一个对象，且`config`至少传入`success / fail / complete`参数中的一个，然后接收`Promise.resolve`的返回值。

```JavaScript
const requestTask = await ajax({
  url: 'https://www.example.com',
  complete: () => {}
});
```

:::

### `config`

`config` \<object\>

| 参数            | 类型            | 说明                                                                       |
| :-------------- | :-------------- | :------------------------------------------------------------------------- |
| url             | string          | 请求地址，不填时默认配置的 baseURL，如果没有 baseURL 又没有 url 则请求失败 |
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
| ...             | any             | 传递给拦截器的值                                                           |

### `url[, data[, config]]`

`url` \<string\> 请求地址  
`data` \<object|string\> 请求参数  
`config` \<object\> 其他配置

| 参数            | 类型    | 说明                                                                            |
| :-------------- | :------ | :------------------------------------------------------------------------------ |
| header          | object  | 设置请求的 header，header 中不能设置 Referer                                    |
| method          | string  | 请求协议（如果是请求方式使用，method 设置是无效的，只有在 ajax() 使用时才生效） |
| timeout         | number  | 超时时间，单位 ms                                                               |
| dataType        | string  | 如果设为 json，会尝试对返回的数据做一次 JSON.parse                              |
| responseType    | string  | 设置响应的数据类型。合法值：text、arraybuffer                                   |
| sslVerify       | boolean | 验证 ssl 证书                                                                   |
| withCredentials | boolean | 跨域请求时是否携带凭证（cookies）                                               |
| ...             | any     | 传递给拦截器的值                                                                |

## RequestTask

| 参数               | 说                                                                              |
| :----------------- | :------------------------------------------------------------------------------ |
| abort              | 中断请求任务                                                                    |
| onHeadersReceived  | 监听 HTTP Response Header 事件。会比请求完成事件更早，仅[微信小程序平台][2]支持 |
| offHeadersReceived | 取消监听 HTTP Response Header 事件，仅[微信小程序平台][3]支持                   |

你可以直接在返回的`request`上使用`RequestTask`上的方法

```JavaScript
// request 为 Promise 对象的基础上挂载 RequestTask 的方法
const request = ajax('https://www.example.com');
// 中断请求任务
request.abort();
```

也可以获取`RequestTask`对象后再使用对应的方法

```JavaScript
// 获取 RequestTask 对象
const requestTask = await ajax({
  url: 'https://www.example.com',
  complete: () => {}
});
// 中断请求任务
requestTask.abort();
```

[1]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise
[2]: https://developers.weixin.qq.com/miniprogram/dev/api/RequestTask.onHeadersReceived.html
[3]: https://developers.weixin.qq.com/miniprogram/dev/api/RequestTask.offHeadersReceived.html
