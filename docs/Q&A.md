# Q&A

### **如何上传和下载**

`uni-ajax`暂时只支持发起网络请求，如果您想要上传或下载，您可以使用[uni.uploadFile][2]和[uni.downloadFile][3]。这里我们可以使用`ajax.baseURL`或`ajax.origin`来获取相关地址，对上传或下载的`url`进行所需的拼接处理。

### **H5 打包出现 `API request is not yet implemented`**

如果您是通过`npm`安装`uni-ajax`，又在项目中没用到`uni.request`，并且 H5 配置中开启了[摇树优化][1]，则会出现这问题。解决该问题有两种方法。

1、关闭摇树优化<br />
2、使用`uni.request`

第一种解决方法似乎不太合理，那我们使用第二种方法。摇树优化简单点说就是没有用到的组件或 API 会被去除，虽然`uni-ajax`是封装`uni.request`，但是`node_modules`是被摇树优化忽略的，所以当有用到`uni.request`时，才不会被去掉。

> 这里我们在[实例配置](/config.html)的文件中加入下面代码即可<br />
> 我这里做 export，即使不会用到 request，但必须要有 uni.request

```Javascript
// #ifdef H5
export const request = uni.request
// #endif
```

### **一些使用技巧**

可无需配置实例，直接使用，[使用方法](/usage.html#方法)都是一样的。

```Javascript
// 引入
import ajax from 'uni-ajax'

// 使用
ajax()
```

拦截器支持`async / await`操作

```Javascript
// 请求拦截器
_ajax.interceptors.request.use(async config => {
  // 请求参数加验签参数
  config.data = {
    ...config.data,
    ...(await validate())
  }

  return config
})
```

[1]: https://ask.dcloud.net.cn/article/36279
[2]: https://uniapp.dcloud.io/api/request/network-file?id=uploadfile
[3]: https://uniapp.dcloud.io/api/request/network-file?id=downloadfile
