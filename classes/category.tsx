// ES Modules syntax
import Unsplash, { toJson } from 'unsplash-js';
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY });
const axios = require('axios');

function Category() {}

module.exports = Category;
