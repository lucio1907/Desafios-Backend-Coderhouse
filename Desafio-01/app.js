import { User } from "./Classes/User.js";
import { userDescription } from "./data.js";

const main = () => {
  const { name, lastName, books, pets } = userDescription;

  const user = new User(name, lastName, books, pets);

  const objData = {
    fullName: user.getFullName(),
    books: user.getBookName(),
    newBook: user.newBook("The rings of power", "Simon Tolkien"),
    pets: user.addPet("Dog"),
    totalPets: user.countPets(),
  };
  console.log(objData);
};

main();
