const express = require('express')
const PORT = process.env.PORT || 30030

const app = express()

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Welcome to my page! :)')
})

app.get('/greetings/:name', (req,res) => {
    console.log(`${req.params.name}`)
    res.send(`It is so nice to meet you!!! How are you ${req.params.name}?`)
})

app.get('/roll/:number', (req, res) => {
    const number = req.params.number
    if (isNaN(number)) {
        return res.send("You must specify a number.")
    }
    const maxNumber = parseInt(number, 10)

    if (maxNumber <= 0) {
        return res.send("You must specify a positive number.")
    }
     
    const rolledNumber = Math.floor(Math.random() * (maxNumber + 1))
    res.send(`You rolled a ${rolledNumber}.`)
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        return res.send("This item is not yet in stock. Check back soon!");
    }

    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandals" },
    { name: "Air Jordans", price: 500, type: "sneakers" },
    { name: "Air Mahomeses", price: 501, type: "sneakers" },
    { name: "Utility Boots", price: 20, type: "boots" },
    { name: "Velcro Sandals", price: 15, type: "sandals" },
    { name: "Jet Boots", price: 1000, type: "boots" },
    { name: "Fifty-Inch Heels", price: 175, type: "heels" }
];

app.get('/shoes', (req, res) => {
    const { minPrice, maxPrice, type } = req.query;
    
      
      let filteredShoes = shoes;
      
      if (minPrice) {
        const min = parseFloat(minPrice);
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= min);
    }

    if (maxPrice) {
        const max = parseFloat(maxPrice);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= max);
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.send(filteredShoes);
});

