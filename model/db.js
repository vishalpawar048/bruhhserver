var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/fysin", { useNewUrlParser: true });

mongoose.connect("mongodb+srv://vishal:vishal123@fysin.0ft6w.mongodb.net/fysin?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
useNewUrlParser: true
},
);


var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("db connected successfully");
});
