const mongoose = require('mongoose');

const options = {
    title: 'string',
    description: 'string',
    link: 'string',
    published: { type: Date, default: Date.now }
};
const schemaArticle = new mongoose.Schema(options);
var articleModel = mongoose.model('article', schemaArticle);

module.exports = articleModel;


