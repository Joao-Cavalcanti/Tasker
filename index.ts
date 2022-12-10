import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { rawListeners, title } from 'process';

const rootDir = require('./utils/path') ;

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/addtask', (req:any, res:any, next) => {
   
 
    if((req.body.tasker).length != 0){
    fs.writeFile('public/taks.txt', `${req.body.tasker}\n`, {flag: 'a+'}, err =>{
        if(err){
            console.log("erro write");
        }
    })
}
    res.redirect(`/`);

})

app.post('/remove', (req:any, res:any, next) => {
    const key = req.body.tasker;
    fs.readFile('public/taks.txt', {encoding: 'utf-8'}, function(err, data) {
        if (err) {console.log("Error Read"); return; };
    
        let dataArray = data.split('\n'); 
        const searchKeyword = key;
        let lastIndex = -1; 
    
        for (let index=0; index<dataArray.length; index++) {
            if (dataArray[index].includes(searchKeyword)) { 
                lastIndex = index;
                break; 
            }
        }
    
        dataArray.splice(lastIndex, 1); 
        const updatedData = dataArray.join('\n');
        fs.writeFile('public/taks.txt', updatedData, (err) => {
            if (err) throw err;
            console.log ('Successfully updated the file data');
        });
    
    });
    res.redirect(`/`);
})

app.use((req:any, res:any) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    console.log('here');
    console.log(req.body.title);
})
app.listen(3000);