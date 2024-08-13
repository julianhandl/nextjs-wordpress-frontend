const WPAPI = require("wpapi");
var wp = new WPAPI({ endpoint: "https://julianhandl.at/wp-json" });

wp.pages()
  .slug("test")
  .then((page) => {
    console.log(page);
  });
