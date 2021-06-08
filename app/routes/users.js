const express = require('express');
const router  = express.Router();
require('../../config/passport');
const passport = require('passport');
const trimRequest = require('trim-request');
const requireAuth = passport.authenticate('jwt',{
    session: false
});