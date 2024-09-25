// insert a book to db: Post Method
app.post("/upload-book", async (req, res) => {
    const data = req.body;
    // console.log(data);
    const result = await bookCollections.insertOne(data);
    res.send(result);
})

// // get all books from db
// app.get("/all-books", async (req, res) => {
//     const books = bookCollections.find();
//     const result = await books.toArray();
//     res.send(result)
// })

// get all books & find by a category from db
app.get("/all-books", async (req, res) => {
    let query = {};
    if (req.query?.category) {
        query = { category: req.query.category }
    }
    const result = await bookCollections.find(query).toArray();
    res.send(result)
})

// update a books method
app.patch("/book/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const updateBookData = req.body;
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
        $set: {
            ...updateBookData
        }
    }
    const options = { upsert: true };

    // update now
    const result = await bookCollections.updateOne(filter, updatedDoc, options);
    res.send(result);
})


// delete a item from db
app.delete("/book/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollections.deleteOne(filter);
    res.send(result);
})


// get a single book data
app.get("/book/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await bookCollections.findOne(filter);
    res.send(result)
})
