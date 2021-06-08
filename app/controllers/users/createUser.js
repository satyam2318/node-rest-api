const { matchedData } = require('express-validator');
const { handelError } = require('../../middleware/utils');
const {
    emailExist
} = require('../../middleware/emailer');
const createItemInDb = require('./helpers');

const createUser = async(req, res) => {
    try {
        const locale = req.locale();
        req = matchedData(req);
        const doesEmailExist = emailExist(req.email);
        if(!doesEmailExist)
        {
            const item = createItemInDb(req);
            res.status(201).json(item);
        }
    } catch (error) {
        handelError(req, error)
    }
}

module.exports = { createUser }