## funsee-smart 更新日志

## 1.1.0

`2018-07-03`

- 🌟  正式加入CHANGELOG文件跟踪记录各版本发布内容,要求后续每次版本时同步更新此日志文件。
- 🐞  修复 `FunseeSmartMidWare` 中间的处理逻辑,对非`/api/smart/`开始的node请求的处理由直接 next() 调整为 return next()。