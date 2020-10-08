# 实例

首先我们先新建`ajax.js`文件，用于配置项及拦截器，在该文件中通过`create`方法创建实例，然后将创建后的实例挂载在 `Vue` 原型链上方便调用

## 创建实例

可以使用自定义配置新建一个`UniAjax`实例

`ajax.create([config])`

```JavaScript
// 引入 uni-ajax 模块
import ajax from 'uni-ajax';

// 创建实例
const _ajax = ajax.create({
  // 默认配置
});

// 导出创建后的实例
export default _ajax;
```

## 实例配置

`config`是一个对象，对象的参数可以是[uni.request](https://uniapp.dcloud.io/api/request/request?id=request)一样，但有些不同，下面罗列不同处

### `baseURL`

请求根地址`baseURL`将自动加在`url`前面，除非`url`是一个绝对 URL（http 或 https 开头）

### `header`

这里的`header`可以为不同请求方式加对应的请求头，注意`header`里的请求方式属性要小写

> 例如这里只给 POST 加上 Content-Type

```JavaScript
// 默认配置
header: {
  post: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
}

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    config.header.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    return config;
  }
);
```

`header`的优先级，下面的例子中，`Priority`数值越大，表示优先级越高

```JavaScript
// 默认配置
header: {
  Priority: 1
  post: { Priority: 2 }
}

// 发起请求
ajax({
  method: 'POST',
  header: { Priority: 4 }
});

// 请求拦截器
_ajax.interceptors.request.use(
  config => {
    config.header.post['Priority'] = 3;
    config.header['Priority'] = 5;
    return config;
  }
);
```

### `method`

当请求方法为`ajax()`时，如果没有传入指定的`method`，这里的请求方式为配置的`method`或`GET`，并且无论是在配置中还是请求中大小写都不受限

```JavaScript
// 创建实例
const _ajax = ajax.create({ method: 'POST' });

// 发起请求
_ajax();    // 这里没有传入指定的 method，则以默认配置的 method，即 POST
```

### `success / fail / complete`

在默认配置中添加回调函数是无效的，回调函数只有在[发起请求](/usage.html#config)时，传入该参数才能触发
