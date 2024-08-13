const WPAPI = require("wpapi");
var wp = new WPAPI({ endpoint: "https://lengbachhof.wikinger-festival.at" });

wp.pages()
  .slug("test")
  .then((page) => {
    console.log(page);
  });
