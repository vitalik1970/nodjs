let fs = require('fs');
 fs.readFile('de.json',(err, data) => {
	if (err) throw err;
	    let arr = data.toString();
	    arr = JSON.parse(arr);
	     for (let i in arr){
			//console.log(arr[i]);
		 }

fs.readFile('index__main-de.html',(err, dataHT) => {
	if (err) throw err;
	    let arrHT = dataHT.toString();
			
	for (let i in arr){
		arrHT = arrHT.replace(`{$`+ i + `}`, arr[i]);
		
	};
	fs.mkdir('de', () => {

	});
	fs.open('de/index-de.html', 'w', (err) => {
        if(err) throw err;
       // console.log('File created');
    });
    

	fs.writeFile('de/index-de.html',arrHT, (err) => {
	if (err) {
	  console.error(err)
	  return
	}
	
  })
})
console.log('Файл создан и записан, ура');

 });
 


