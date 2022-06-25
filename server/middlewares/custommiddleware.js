
const customMiddleware = (req, res, next) => {
   console.log({
      url: req.url,
      ip: req.ip,
      method: req.method,
      data: JSON.parse(req.body)
   })
}
module.exports = { customMiddleware }