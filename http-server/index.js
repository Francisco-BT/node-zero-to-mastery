const http = require("http");

const PORT = 3000;

const server = http.createServer();
const friends = [
  {
    id: 0,
    name: "Nicola Tesla",
  },
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
  {
    id: 2,
    name: "Albert Einsten",
  },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");

  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString("utf-8");
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const friend = friends.find((friend) => friend.id === Number(items[2]));
      res.end(JSON.stringify(friend));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && items[1] === "messages") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isaac!</li>");
    res.write("<li>What are your thoughts on astronomy?</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${3000}...`);
});
