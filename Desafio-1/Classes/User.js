export class User {
  constructor(name, lastName, books, pets) {
    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
    this.totalPets = 0;
    this.totalBooks = [];
  }

  getFullName() {
    return `${this.name} ${this.lastName}`;
  }

  addPet(newPet) {
    // Asign new pet to this.pets: Array, and return the totalPets: Number, for show in countPets later
    this.totalPets = [...this.pets, newPet].length;
    return [...this.pets, newPet];
  }

  countPets() {
    return this.totalPets;
  }

  newBook(bookName, author) {
    const newUserBook = { bookName, author };
    // Set new book in books: Array
    this.books.push(newUserBook);

    // Returns the names and set in totalBooks: Array
    this.books.map((book) => this.totalBooks.push(book.bookName));
    return newUserBook;
  }

  getBookName() {
    return this.totalBooks;
  }
}
