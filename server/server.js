const express = require('express');
const path = require('path');
const session = require('express-session');
const Crawler = require('crawler');

const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: 'shouldwork',
    cookies: {},
    resave: false,
    saveUninitialized: true
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/site/:count/:title/:area/:range", (req, res) => {
    console.log('server hit');
    var list = [];
    var finalList = [];
    var c = new Crawler({
        maxConnections: 10,
        callback: function(error, res, done) {
            if(error){
                console.log(error);
            } else {
                let each = {};
                var $ = res.$;
                list = $.html().split("adBlob");
                list.shift();
                for(let i = 0; i < list.length; i++) {
                    //get company name
                    let cLoc = list[i].indexOf(`"company":`);
                    let cTempItem = list[i].slice(cLoc);
                    let cComaLoc = cTempItem.indexOf(",");
                    let companyName = cTempItem.slice(11, cComaLoc - 1);
                    each.compName = companyName;
                    //get job title
                    let tLoc = list[i].indexOf(`"displayTitle":`);
                    let tTempItem = list[i].slice(tLoc);
                    let tComaLoc = tTempItem.indexOf(",");
                    let jobTitle = tTempItem.slice(16, tComaLoc - 1);
                    each.title = jobTitle;
                    //get job pay
                    let pLoc = list[i].indexOf(`"extractedSalary":`);
                    let pTempItem = list[i].slice(pLoc);
                    let pEnd = pTempItem.indexOf("}");
                    let payInfo = pTempItem.slice(18, pEnd + 1);
                    //separate max job pay
                    let maxStart = payInfo.indexOf(":");
                    let maxEnd = payInfo.indexOf(",")
                    let max = parseInt(payInfo.slice(maxStart + 1, maxEnd));
                    each.maxPay = max;
                    //separate min job pay
                    let minStart = payInfo.indexOf(`"min":`);
                    let newPay = payInfo.slice(minStart + 6);
                    let minEnd = newPay.indexOf(',');
                    let min = parseInt(newPay.slice(0, minEnd));
                    each.minPay = min;
                    //get pay type
                    let typeStart = payInfo.indexOf(`"type":`);
                    let newType = payInfo.slice(typeStart + 8);
                    let typeEnd = newType.indexOf(`"`);
                    let type = newType.slice(0, typeEnd);
                    each.payType = type;
                    //create the average pay
                    switch(each.payType) {
                        case 'hourly':
                            let hourlyaverage = (max + min)/2;
                            each.averagePay = hourlyaverage;
                            break;
                        case 'weekly':
                            let weeklyaverage = (max + min)/80;
                            each.averagePay = weeklyaverage;
                            break;
                        case 'monthly':
                            let monthlyaverage = (max + min)/160;
                            each.averagePay = monthlyaverage;
                            break;
                        case 'yearly':
                            let yearlyaverage = (max + min)/4160;
                            each.averagePay = yearlyaverage;
                            break;
                    }
                    //console.log(each);
                    finalList.push(each)
                }
            }
            done();
        }
    });
    if(req.params.count > 10) {
        let pages = req.params.count/10;
        let current = 10;
        for(let i = 0; i < pages; i++) {
            console.log('going through 0')
            if(i === 0) {
                let link = `https://www.indeed.com/jobs?q=${req.params.title}&l=${req.params.area}&radius=${req.params.range}`;
                console.log(link);
                c.queue(link)
            } else {
                console.log(`going through ${i}`)
                let link = `https://www.indeed.com/jobs?q=${req.params.title}&l=${req.params.area}&radius=${req.params.range}&start=${current}`;
                console.log(link)
                c.queue(link)
                current = current + 10;
            }
            console.log(`final is ${finalList}`);
        }
        //console.log(`final list is ${finalList}`);
    } else {
        c.queue('https://www.indeed.com/jobs?q=forklift&l=Ogden&vjk=804b253e3c540a67');
    }
    console.log('finished');
    console.log(`final list is ${finalList}`);

})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));