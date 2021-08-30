const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/goods/list', async (ctx, next) => {
  ctx.response.body = ['123']
})

app.use(router.routes())
app.listen(3000, () => console.log('mockserver is starting at 3000 port!'))
