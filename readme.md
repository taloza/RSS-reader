# Unit 6
* Real life coding (4-5 days)
* Experiance of reading big external projects or libraray.( Mongoose, request )

self study
* JSON
* XML
* NodeJS, ExpressJS (req, res)
* ( next lesson )MongoDB JavaScript JSON

## links
http://expressjs.com/en/4x/api.html#req
http://learn.javascript.ru/screencast/nodejs
1 часть
1-19
2 часть
1 ExpressJS
https://github.com/Leonidas-from-XIV/node-xml2js
https://github.com/request/request#readme

#Homework
create 2-3 webserver (nodeJS + Express)

split into modules
error handling
class wrapping

September 25, Homework:
1) изучить документацию и примеры  MongoDB
http://learn.javascript.ru/screencast/nodejs 4,5
2) напишите несколько своих примеров для записи в БД и затем чтение данных
3) создайте несколько своих моделей, запищите данны е затем прочитайте
4) возвращайтесь к нашему примеры и добавьте логику: проверять перед записью в БД нет ли там уже существующей записи с таким же title

October 1, Homework:
1) add some new RSS sources
2) make MongoDB and get connection string from mlab (https://mlab.com)
3) create Heroku (https://devcenter.heroku.com/articles/getting-started-with-nodejs) 
4) run your app on Heroku NodeJS (AWS)
# RSS reader

RSS data sources:
* https://www.rbc.ua/static/rss/all.rus.rss.xml
* https://fakty.ua/rss_feed/all
* http://k.img.com.ua/rss/ru/all_news2.0.xml

create NODE.js app:
1. reading RSS (every 60 seconds)
2. convert XML to JSON
2. put data to DB (MongoDB)
3. static: Single Page Application (WEB page) Angular 6 

create SPA AngularJS:

1) main page: all RSS 
2) RBC page
3) Facti Page
4) Korrespondent

all SPA pages display last 100 feeds


RUS:
Clacc ReadRss должен реализовывать такое поведение:
1) получили данные (async)
2) превратить из XML в JSON (async)
3) нужно вытащить все статьи и сделать из них массив (sync)
4) нужно каждую статью обработать и перевести во внутренний единый для всех источников формат (sync)

callBack
promise
async/await

Домашнее задание:
сделайте свои ветки от unit6-nodejs-rss
напишите сначал на callBack
на async/await
