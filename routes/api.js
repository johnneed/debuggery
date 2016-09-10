var express = require('express');
var router = express.Router();
var cat = {name: "", coffeePreference: "", filename: "", eliminated: false};
var cats = [
    {
        id: 1,
        name: "Persian",
        coffeePreference: "Turkish Coffee with lemon",
        filename: "persian.jpg"
    },
    {
        id: 2,
        name: "Calico",
        coffeePreference: "Light roast, cream & sugar",
        filename: "calico.jpg"
    },
    {
        id: 3,
        name: "Siamese",
        coffeePreference: "Medium Roast, black",
        filename: "siamese.jpg"

    },
    {
        id: 4,
        name: "American Shorthair",
        coffeePreference: "Soy Cappuccino",
        filename: "american-shorthair.jpg"
    }, {
        id: 5,
        name: "Pixie-bob",
        coffeePreference: "Espresso Shot",
        filename: "pixie-bob.jpg"
    }, {
        id: 6,
        name: "Maine Coon",
        coffeePreference: "Extra-Large Americano",
        filename: "maine-coon.jpg"
    }
];

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('YAY API!!!');
});
/*  GET ALL CATS. */
router.get('/cats', function (req, res, next) {

    res.status(200).json({cats: cats});

});

/*  GET CAT. */
router.get('/cats/:id', function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var myCat = cats.filter(function (cat) {
        return (cat.id === id)
    })[0];
    if (!myCat) {
        handleError(res, "Invalid Cat Id", 400);
    }
    else {
        res.status(200).json(myCat);
    }

});


/*  POST CAT. */
router.post('/cats', function (req, res, next) {
    var newCat = req.body;
    if (!(req.body.name && req.body.coffeePreference)) {
        handleError(res, "Invalid user input", "Must provide a name and coffee preference.", 400);
    } else {
        newCat.id = cats.reduce(function (c1, c2) {
                return c1.id > c2.id ? c1.id : c2.id
            }, 0) + 1;
        cats.push(newCat);

        res.status(201).json(newCat);
    }

});

router.put('/cats/:id', function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var updatedCat = req.body;
    var newCat;
    var catIndex;

    if (isNaN(id)) {
        handleError(res, "Invalid Cat Id", 400);
        return void 0;
    }

    catIndex = cats.reduce(function (catId, cat, currentIndex) {
        return cat.id === id ? currentIndex : catId;
    }, null);

    if (catIndex === null) {
        handleError(res, "Invalid Cat Id", 400);
        return void 0;
    }


     newCat = Object.keys(cat).reduce(function (newCat, key) {
        newCat[key] = updatedCat[key];
        return newCat;
    }, {});

    newCat.id = id;
    newCat.votes = isNaN(parseInt(newCat.votes)) ? 0 : parseInt(newCat.votes);
    cats[catIndex] = newCat;
    res.status(202).json();


});

router.delete('/cats/:id', function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    var myCat;
    if (isNaN(id)) {
        handleError(res, "Invalid Cat Id", 400);
    }
    myCat = cats.filter(function (cat) {
        return (cat.id === id)
    })[0];

    if (!myCat) {
        handleError(res, "Invalid Cat Id", 400);
    } else {
        cats = cats.filter(function (c) {
            return c.id !== myCat.id;
        });
        res.status(201).json();
    }

});

module.exports = router;
