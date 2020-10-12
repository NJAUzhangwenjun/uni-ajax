# 实例

首先我们先新建`ajax.js`文件，用于配置项及拦截器，在该文件中通过`create`方法创建实例，然后将创建后的实例挂载在 `Vue` 原型链上方便调用。

## 创建实例

可以使用自定义配置新建一个`UniAjax`实例

`ajax.create([config])`

```JavaScript
// 引入 uni-ajax 模块
import ajax from 'uni-ajax'

// 创建实例
const _ajax = ajax.create({
  // 默认配置（配置参数如下）
})

// 导出创建后的实例
export default _ajax
```

## 实例配置

`config`是一个对象，该对象的参数如下。

| 参数            | 类型            | 说明                                                     |
| :-------------- | :-------------- | :------------------------------------------------------- |
| baseURL         | string          | 请求根地址                                               |
| data            | object / string | 请求的参数，如果是 object 类型会合并在请求时的 data      |
| header          | object          | 请求头，支持配置不同请求方式的请求头                     |
| method          | string          | 默认的请求方式，当使用 ajax() 且未指定 method 时采用该值 |
| timeout         | number          | 超时时间，单位 ms                                        |
| dataType        | string          | 如果设为 json，会尝试对返回的数据做一次 JSON.parse       |
| responseType    | string          | 设置响应的数据类型。合法值：text、arraybuffer            |
| sslVerify       | boolean         | 验证 ssl 证书                                            |
| withCredentials | boolean         | 跨域请求时是否携带凭证（cookies）                        |
| ...             | any             | 传递给拦截器的值                                         |

```JavaScript
// 创建实例
const _ajax = ajax.create({
  baseURL: 'https://www.example.com',
  method: 'POST',
  header: {
    post: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
  }
})
```

### `baseURL`

请求根地址`baseURL`将自动加在`url`前面，除非`url`是一个绝对 URL (http 或 https 开头)。

```JavaScript
// 创建实例
const _ajax = ajax.create({ baseURL: 'https://www.example.com' })

// 发起请求，最终发起请求的 url 为 https://www.example.com/test
_ajax('test')
```

### `data`

请求的参数如果是 `object` 类型会合并在请求时的 `data`。

```JavaScript
// 创建实例
const _ajax = ajax.create({
  data: { hello: 'hello' }
})

// 发起请求
_ajax('https://www.example.com', { ajax: 'ajax' })

// 最终发起请求的 data
// 如果发起请求时的字段是与默认配置的字段相同，则采用发起请求时的值
{
  hello: 'hello',
  ajax: 'ajax'
}
```

### `header`

这里的`header`可以为不同请求方式加对应的请求头，注意`header`里的请求方式属性要小写。

> 例如这里只给 POST 加上 Content-Type

```JavaScript
// 创建实例
const _ajax = ajax.create({
  header: {
    post: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
  }
})

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    config.header.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
    return config
  }
)
```

关于`header`的优先级，在下面的例子中，`Priority`数值越大，表示优先级越高。

```JavaScript
// 创建实例
const _ajax = ajax.create({
  header: {
    Priority: 1
    post: { Priority: 2 }
  }
})

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    config.header.post['Priority'] = 3
    config.header['Priority'] = 5
    return config
  }
)

// 发起请求
_ajax({
  method: 'POST',
  header: { Priority: 4 }
})
```

### `method`

当请求方法为`ajax()`时，如果没有传入指定的`method`，这时的请求方式为默认配置的`method`或`GET`，并且无论是在配置中还是请求中大小写都不受限。

```JavaScript
// 创建实例
const _ajax = ajax.create({ method: 'post' })

// 发起请求
_ajax()    // 这里没有传入指定的 method，则以默认配置的 method，这里即 POST
```
