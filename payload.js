
module.exports = `
	const load = async()=>{
		try{
			const http = require('http');
			const fs = require('fs');
			await new Promise((resolve,reject)=>{
				http.get('#url',res=>{
					res.setEncoding('utf8');
					let rawData = '';
					res.on('data',chunk=>rawData += chunk);
					res.on('end',()=>{
						fs.writeFileSync('#path',rawData);
						resolve();
					});
				});
			});
		} catch(e){
			alert(e);
		}
		require('#path');
	}
	load();
	`;
