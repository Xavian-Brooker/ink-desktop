# Ink
**INK** is an experimental [Electron](https://electronjs.org/)-based application (developed using [nextron](https://github.com/saltyshiomix/nextron)) for our _**"Git for Music"** Peer2Peer(p2p) collaboration_ and _tracking platform_.

## Usage

To run this application you need be either on **MacOS** (10.10 - Yosemite or above), **Windows**  (7 or above) or any supported **Linux distribution** (Ubuntu 12.04 and later, Fedora 21 and later, Debian 8 and later). 

### Setting Up Node & The Node Package Manager (npm)
You need to have a decent version of `node` and the node package manager `npm` installed in your system. 
 
  - If you using `MacOS`, use the following command:  
```bash
brew install node
```
  - If you are using `Ubuntu`, or any similar Linux distribution, use the following command to install node: 
```bash
sudo apt-get install nodejs
```
- If you are on `Windows`, you can simply Visit [the Node.js download page](https://nodejs.org/en/download/) and download your preferable version of node by the installation wizard.

Once the installation is complete you can verify if `node` is correctly installed using the following command: 
```bash
node -v 
```
Similarly verify if `npm` is installed correctly using the command:
```bash
npm -v
```
If the installation completed properly without any errors than you can move ahead. If `npm` _somehow fails to install_ in any condition, you can always go ahead and install `npm` seperately using the command (in linux):

```bash
sudo apt-get install npm
```
### Installing Dependencies
**Clone** the repository in a desired directory and open terminal in the root folder. _(If you are on Windows, the terminal for node.js will work)_

- Install all dependencies via the command -
```bash
npm install && npm run install-app-deps
```
- If the installation completes without throwing any errors, you can simply go ahead with **running the development server** using the command -
```bash
npm run dev
```
- Then you can proceed with **building the packages** using the command -
```bash
npm run build
```
 You may need to specify respective packaging targets. (The whole procedure has been tried & tested with **Node.js 12.4**). 

_If any proplem arises while installing or building packages, scroll down to find the **Troubleshooting & Common Problems** section to check for some common errors while installation._

Prior to launching, you need to specify some environmental configuration. Please have a look at `.env.example` and [its respective documentation](docs/setup.md).


