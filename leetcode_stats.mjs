import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let __dirname = path.dirname(fileURLToPath(import.meta.url));
const dirPath = path.resolve(__dirname, './solutions');

//basically struct
class solved_details{
    constructor(name, difficulty, bigO)
    {this.name = name; this.difficulty = difficulty; this.bigO = bigO;}

    print_details()
    {console.log(this.name + this.difficulty + this.bigO);}
}
//format: question hard O(N)
//function purpose: count all completed difficulties and display
const difficultyCounter = function(arrayOfDetails){
    let hard =0; let easy = 0; let medium = 0;
    arrayOfDetails.forEach(element => {
    if (element.difficulty == "easy") easy++;
    if (element.difficulty == "medium") medium++;
    if (element.difficulty == "hard") hard++;
});
console.log("easy : " + easy + "\nmedium : " + medium + "\nhard : " + hard);
console.log("total : " , easy + medium + hard);
}
const listAllFunctions = function(arrayOfDetails){
    console.log("Listing all solutions : ");
    arrayOfDetails.forEach(element => 
    console.log(element.name, " - ", element.bigO));

}
const bigOCounter = function(arrayOfDetails){
    console.log("Time Complexity Stats:")
    const complexities = new Map();
    arrayOfDetails.forEach(element => {
        let tc = element.bigO;
        if (complexities.get(tc)!= null) complexities.set(tc, complexities.get(tc) + 1);
        else complexities.set(tc, 1);
    })

complexities.forEach((value, key) => {
    console.log(key , " : ", value)
})
}

const directoryScan = function()
{
    const detailList = [];
const openDir = fs.opendirSync(dirPath);
let file = openDir.readSync();
let newPath;
while (file!=null)
{
    newPath= path.resolve(dirPath, file.name);
    let text = fs.readFileSync(newPath,{ encoding: 'utf8'});
    let splitted = text.split('\n');
    let filtered= splitted.filter(Boolean);
    let lastLine = filtered[filtered.length-1];

    let details = lastLine.split(" ");
    detailList.push(new solved_details(details[0].substring(2), details[1], details[2]));
    file = openDir.readSync();
}

return detailList;
}

if (process.argv[2]=="difficulty") difficultyCounter(directoryScan());
else if (process.argv[2]=="listAll") listAllFunctions(directoryScan());
else if (process.argv[2]=="bigOView") bigOCounter(directoryScan());

else console.log("options (pick one) : difficulty or bigOView or listAll for stats");