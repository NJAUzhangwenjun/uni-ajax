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

### baseURL

请求根地址，`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL（http 或 https 开头）

### header

这里的 `header` 可以为不同请求方式加对应的请求头，注意 `header` 里的请求方式要小写

> 例如这里在默认配置中只给 POST 加上 Content-Type

```JavaScript
header: {
    post: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
}
```

### method

当请求方法为`ajax()`时，若没传入指定的`method`，这里的请求方式为配置的 `method` 或 `GET`，并且大小写不受限
