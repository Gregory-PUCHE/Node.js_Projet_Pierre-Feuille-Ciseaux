const http = require("http");
const fs = require("fs");

// On envoie client.html au client
var monServeur = http.createServer(function (req, res) {
  fs.readFile("./src/hello.html", "utf-8", function (error, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

var io = require("socket.io")(monServeur);
// On charge socket.io et on le branche au serveur http en cours
var sockPrincipale = io.listen(monServeur);
var score = 0;
var score2 = 0;
var checkj1 = true;
var checkj2 = false;
// Quand un client se connecte, on lui crée une socket dediee

if (checkj1 == true && checkj2 == false) {
  checkj1 = false;
  sockPrincipale.on("connection", function (j2) {
    console.log("J2 est connecté !"); // on affiche un message console

    // on met un focntion callback qui forgera et renvera la réponse
    j2.on("reponseDuClient", function (message) {
      console.log("Une réponse a été recue !");

      var random = Math.floor(Math.random() * (3 - 0) + 0);
      if (message === "pierre") {
        if (random == "0") j2.emit("texteFinal", "Egalité");
        if (random == "1") j2.emit("texteFinal", "Perdu");
        if (random == "2") {
          j2.emit("texteFinal", "Victoire!"),
            score++,
            j2.emit("textescore", "Score: " + score);
        }
      }
      if (message === "feuille") {
        if (random == "0") {
          j2.emit("texteFinal", "Victoire!"),
            score++,
            j2.emit("textescore", "Score: " + score);
        }
        if (random == "1") j2.emit("texteFinal", "Egalité");
        if (random == "2") j2.emit("texteFinal", "Perdu");
      }
      if (message === "ciseaux") {
        if (random == "0") j2.emit("texteFinal", "Perdu");
        if (random == "1") {
          j2.emit("texteFinal", "Victoire!"),
            score++,
            j2.emit("textescore", "Score: " + score);
        }
        if (random == "2") j2.emit("texteFinal", "Egalité");
      }
    });
    j2.on("disconnect", () => {
      checkj2 = false;
      console.log("J2 s'est déconnecté");
    });
  });
}
/*
if (checkj1 == false && checkj2 == false) {
  checkj1 = true;
  sockPrincipale.on("connection", function (j1) {
    console.log("J1 est connecté !"); // on affiche un message console

    // on met un focntion callback qui forgera et renvera la réponse
    j1.on("reponseDuClient", function (message) {
      console.log("Une réponse a été recue !");

      var random = Math.floor(Math.random() * (3 - 0) + 0);
      if (message === "pierre") {
        if (random == "0") j1.emit("texteFinal", "Egalité");
        if (random == "1") j1.emit("texteFinal", "Perdu");
        if (random == "2") {
          j1.emit("texteFinal", "Victoire!"),
            score++,
            j1.emit("textescore", "Score: " + score);
        }
      }
      if (message === "feuille") {
        if (random == "0") {
          j1.emit("texteFinal", "Victoire!"),
            score++,
            j1.emit("textescore", "Score: " + score);
        }
        if (random == "1") j1.emit("texteFinal", "Egalité");
        if (random == "2") j1.emit("texteFinal", "Perdu");
      }
      if (message === "ciseaux") {
        if (random == "0") j1.emit("texteFinal", "Perdu");
        if (random == "1") {
          j1.emit("texteFinal", "Victoire!"),
            score++,
            j1.emit("textescore", "Score: " + score);
        }
        if (random == "2") j1.emit("texteFinal", "Egalité");
      }
    });
    j1.on("disconnect", () => {
      checkj2 = false;
      console.log("J1 s'est déconnecté");
    });
  });
}
*/
monServeur.listen(8080);
// Quand un client se connecte, on lui crée une socket dediee
