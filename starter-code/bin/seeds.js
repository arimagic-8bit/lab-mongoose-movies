const mongoose = require("mongoose");
const Celebrity = require("./../models/celebrity");
const DB_NAME = "famous";

const celebrities = [
  {
    name: "Chris Pratt",
    occupation: "actor",
    catchPhrase:
      "There is nothing funnier than a giant, grown man rollerblading",
  },
  {
    name: "Cara Delevingne",
    occupation: "actress",
    catchPhrase: "Normal, you see, is whatever you want it to be.",
  },
];

mongoose
  .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to DB: ${x.connections[0].name}`);

    const createCelebritiesPr = Celebrity.create(celebrities);
    return createCelebritiesPr;
  })
  .then((createdCelebrities) => {
    console.log(`Inserted celebrities: ${createdCelebrities.length}`);

    const closePr = mongoose.connection.close();
    return closePr;
  })
  .then(() => {
    console.log("Closed the DB connection");
  })
  .catch((err) => {
    console.log(err);
  });
