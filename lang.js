let fs = require('fs');
let arr = fs.readFileSync("de.json").toString();
arr = JSON.parse(arr);
for (let i in arr){}
 
let file = fs.readdirSync("html");      
	for (let c in file){
	   let k = file[c].split(".");
	   k = k[k.length-1];
   
	   if (k !== "html"){
	   continue
	   };	 

dataHT = fs.readFileSync('html/' + file[c]);
	
	    let arrHT = dataHT.toString();
			
	for (let i in arr){
		arrHT = arrHT.replace(`{$`+ i + `}`, arr[i]);
	};

	fs.writeFileSync('de/' + file[c], arrHT);
	
  };



 
 


