
const dialog = document.querySelector('dialog')
const basePath = window.location.origin; // Gets the base URL of the current page


const myLibrary = []
const bookCoverImages = [
    `${basePath}/assets/random1.jpg`,
    `${basePath}/assets/random2.jpg`,
    `${basePath}/assets/random3.jpg`,
    `${basePath}/assets/random4.jpg`,
    `${basePath}/assets/random5.png`
]

// this is the constructor
class Book {
    constructor(title, author, pages, read, image) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
        this.image = image
    }

    toogleReadStatus() {
        return this.read = !this.read
    }
}

// add sample objects
const book1 = new Book("happy", "alex lemon", 456, true, `${basePath}/assets/book1.jpg`)
const book2 = new Book("how to stop working and start living", "dale carnegie", 321, true, `${basePath}/assets/book2.jpg`)
const book3 = new Book("your soul is a river", "nikita gill", 1054, false, `${basePath}/assets/book3.jpg`)
const book4 = new Book("milk and honey", "rupi kaur", 114, false, `${basePath}/assets/book4.jpg`)
myLibrary.push(book1, book2, book3, book4)


// handlers 
const handlers = {
    loadLibrary: e => {
        e.target.style.display = "none"
        displayBooks()
    },
    openDialog: () => { dialog.showModal() },
    closeDialog: () => { dialog.close() },
    addbook: e => {
        e.preventDefault()
        const title = document.querySelector('[name="title"]')
        const author = document.querySelector('[name="author"]')
        const pages = document.querySelector('[name="pages"]')
        const read = document.querySelector('[name="read"]')


        addBookToLibrary(title.value.trim(), author.value.trim(), pages.value, read.value)
        title.value = ""
        author.value = ""
        dialog.close()
        displayBooks()
    }
}


// this function takes user inputs and store the new book object into an array
function addBookToLibrary(title, author, pages, read) {
    const randomPicture = pickRandomPictures(bookCoverImages)
    const newBook = new Book(title || "no title", author || "no author", pages || "NAN", read, randomPicture)
    myLibrary.push(newBook)
}

//this update the ui whenever a new book is added
function displayBooks() {


    const bookContainer = document.querySelector(".books")
    bookContainer.innerHTML = ""

    if (myLibrary.length === 0) {
        bookContainer.innerHTML = "<p>No books available</p>"
    } else {
        myLibrary.map((book, index) => {
            const bookDiv = document.createElement("div")
            bookDiv.classList.add('book')
            const title = document.createElement("h3")
            const author = document.createElement("p")
            const pages = document.createElement("p")
            const read = document.createElement("p")
            const bookImageCover = document.createElement("img")
            const bookInfoDiv = document.createElement("div")
            const bookStatusDiv = document.createElement("div")
            const deleteBook = document.createElement("button")
            const changeStatusButton = document.createElement("button")


            title.textContent = book.title
            author.textContent = book.author
            pages.textContent = book.pages + " pages"
            pages.classList.add("pages")
            read.textContent = book.read
            read.style.background = read.textContent === "true" ? "lightgreen" : "orange"
            read.style.borderColor = read.textContent === "true" ? "green" : "red"
            read.style.borderWidth = "1px"
            read.style.borderStyle = "solid"
            read.style.borderRadius = "2px"
            read.style.padding = "0 4px"

            deleteBook.classList.add('deleteBtn')
            deleteBook.innerHTML = "<span class='fa fa-trash'></span>"
            deleteBook.addEventListener("click", () => {
                myLibrary.splice(index, 1)
                displayBooks()
            })

            changeStatusButton.innerHTML = '<i class="fa fa-refresh"></i>'
            changeStatusButton.addEventListener("click", () => {
                book.toogleReadStatus()
                displayBooks()
            })
            bookStatusDiv.classList.add("status-div")
            bookInfoDiv.classList.add("info-div")
            bookImageCover.src = book.image


            bookInfoDiv.append(title, author, pages, bookStatusDiv)
            bookStatusDiv.append(changeStatusButton, read)
            bookDiv.append(bookImageCover, bookInfoDiv, deleteBook)
            bookContainer.appendChild(bookDiv)
        })

    }
}

function pickRandomPictures(array) {
    if (array.length === 0) {
        return null; // Return null if the array is empty
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

document.querySelector('body').addEventListener('click', e => {
    const child = e.target
    const openlibrary = child.className.includes('open-library')
    const addbook = child.className.includes('add-book')
    const cancel = child.className.includes('close')
    const submit = child.className.includes('submit')

    if(openlibrary)
        handlers.loadLibrary(e)
    if(addbook)
        handlers.openDialog()
    if(cancel)
        handlers.closeDialog()
    if(submit)
        handlers.addbook(e)
    
})