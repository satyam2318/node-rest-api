const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const mongoosePaginate = require('mongoose-paginate-v2');


const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            validate:{
                validator: validator.isEmail,
                message: 'EMAIL_IS_NOT_VALID'
            },
            lowercase: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
          },
          role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
          },
          verification: {
            type: String
          },
          verified: {
            type: Boolean,
            default: false
          },
          phone: {
            type: String
          },
          city: {
            type: String
          },
          country: {
            type: String
          },
          urlTwitter: {
            type: String,
            validate: {
              validator(v) {
                return v === '' ? true : validator.isURL(v)
              },
              message: 'NOT_A_VALID_URL'
            },
            lowercase: true
          },
          urlGitHub: {
            type: String,
            validate: {
              validator(v) {
                return v === '' ? true : validator.isURL(v)
              },
              message: 'NOT_A_VALID_URL'
            },
            lowercase: true
          },
          loginAttempts: {
            type: Number,
            default: 0,
            select: false
          },
          blockExpires: {
            type: Date,
            default: Date.now,
            select: false
          }
    },
    {
        versionKey: false,
        timestamps: true
      }
    )
const hash = (user, salt, next) =>{
    bcrypt.hash(user.password,salt, (err, newHash) => {
        if(err)
        {
            return next(err)
        }
        user.password = newHash
        return next()
    });
}