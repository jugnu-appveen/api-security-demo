const express = require('express');
let router = express.Router();
const helper = require('./../utility/helper');

const validKeys = {
    "FHDKJSDHKJAIEEUOIR9872394243KJHWEQKJ":2,
    "FHDKDHJSKDKDHFUOIR9872394243KJHWEQKJ":10,
}

const authenticate = (req, res, next) => {
    if(validKeys[req.headers.api_key]) {
        validKeys[req.headers.api_key] = validKeys[req.headers.api_key] - 1;
        next();
    }else if(validKeys[req.headers.api_key] == 0) res.status(403).json({ message: "Limit Exceeded" });
    else res.status(401).json({ message: "Un-authenticated" });
}

router.get('/',authenticate, function (req, res, next) {
    res.json(helper.readData());
});

router.post('/',authenticate, function (req, res, next) {
    let body = req.body
    res.json(helper.writeData(body));
});

module.exports = router;