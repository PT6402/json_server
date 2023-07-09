const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Custom middleware
const secret_key = "12345";
const keySecretMiddleware = (req, res, next) => {
  const { keySecret } = req.params;
  if (keySecret === "12345") {
    // Nếu keySecret khớp với secret key của bạn
    next(); // Cho phép tiếp tục xử lý yêu cầu
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

server.use(middlewares);
server.use(`/url/${secret_key}`, keySecretMiddleware); // Áp dụng middleware cho đường dẫn "/url/key-secret"
server.use(router);

server.listen(port);
