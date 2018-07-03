/**
 * 函数功能简述
 *
 * @param    {Object}  {path, body, serviceName, formatter}
 * @returns  void
 *
 * @date     2018-06-07
 * @author   Breeze_微风<332522058@qq.com>
 */
const funseeRquest = ({
  method = 'post',
  path = '',
  body = {},
  serviceName = '',
  formatter = res => res
}) => async (ctx, next) => {
  const funseeAjax = serviceName ? ctx.ajax.use(serviceName) : ctx.ajax;
  const result = await funseeAjax[method](path, body );
  ctx.status = 200;
  ctx.body = formatter(result);
  return next();
};

const funseePost = options => funseeRquest({ ...options, method: 'post' });

const funseeGet = options => funseeRquest({ ...options, method: 'get' });


// 自定义实现 funsee-smart 服务端路由
const funseeSmartMidWare = funseeSmartConfig => async (ctx, next) => {
  const { request: { path } } = ctx;
  if (/^\/api\/smart\//.test(path)) {
    const [,,, moduleName, mode] = path.split('/');
    const routerConfig = funseeSmartConfig.serverRouter[moduleName];
    const { method = 'post' } = routerConfig;
    const smartRequest = method === 'post' ? funseePost : funseeGet;
    await smartRequest({
      path: routerConfig.path[mode],
      body: ctx.request.body,
      serviceName: routerConfig.serviceName,
      formatter: funseeSmartConfig.responseFormatter
    })(ctx, next);
  } else {
    return next();
  }
};

export default funseeSmartConfig => funseeSmartMidWare(funseeSmartConfig);

