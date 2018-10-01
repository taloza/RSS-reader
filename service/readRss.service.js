
const request = require('request');
const parseString = require('xml2js').parseString;
const Article = require('./../model/article.model');
var iconv = require('iconv-lite');

class ReadRss {
    constructor(settings){
        this.url = settings && settings.url || '';
        this.encoding = settings && settings.encoding || null;
    }
    async dataProcess(){

        try {
            // #1 get data
            const xml = await this._getDataFromExternalSource();

            // #2 parsing
            const json = await this._parseToJson(xml);

            // #3 split into separate articles
            const articles = this._separateToArticles(json);

            // save to DB
            if(articles && articles.length > 0){
                const max =  articles.length;
                for(let i=0; i < max; i++) {
                    await this._saveArticlesToMonoDB(articles[i]);
                }
            }
        } catch(err) {
            console.log(err);
        }

    }
    async _getDataFromExternalSource(){
        return new Promise((resolve, reject) => {
            const settings = {
                url:this.url, 
                encoding:null
            };
            const callback = (error, data,  body)=>{
                if(error){
                    reject(error);
                    console.log('this is GET DATA from RSS error');
                    console.log(error);
                } else {
                    //const xml = data.body;
                    const encoding = this.encoding;
                    var bodyWithCorrectEncoding = iconv.decode(body, encoding);
                    console.log(bodyWithCorrectEncoding);
                    //console.dir(xml);
                    resolve( bodyWithCorrectEncoding);
                }
            };

            request.get(settings, callback);
        });    
    }

    async _parseToJson(data){
        return new Promise( (resolve, reject) => {
            parseString(data, function (err, result) {
                //console.dir(result);
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }

            });
        });
    }

    _separateToArticles(data){

        if (data && data.rss && data.rss.channel && data.rss.channel.length > 0 && data.rss.channel[0] && data.rss.channel[0].item) {
            const articles = [];
            const bulkOfArticles = data.rss.channel[0].item;
            for (let i = 0; i < bulkOfArticles.length; i++ ){
                let item = bulkOfArticles[i];
                articles.push(item);
            }
            return articles;
        } else {
            throw new Error('structure of data was changed');
        }
    }

    async _saveArticlesToMonoDB(article){
        if (article) {

            const articlesInDb = await Article.find({title: article.title});

            if( articlesInDb && articlesInDb.length ) {
                //console.log(`article was written with title "${article.title}"`);
            } else {
                //console.log(`it's new article "${article.title}"`);
                const rss = new Article({
                    title: article.title,
                    description: article.description,
                    link: article.link && article.link.length && article.link[0] || ''
                });
                try {
                    await rss.save();
                    return;
                } catch(err){
                    console.error(err);
                }
            }
        }
        return;
    }
}

module.exports = ReadRss;
