const fs = require('fs');
const { join: path } = require('path');

// #region Update docs/general/welcome.md to track README.md
const README = fs.readFileSync(path(__dirname, '../README.md'), { encoding: 'utf8' })
  .replace(/https:\/\/dbothook\.js\.org\/#([\w/]+)/, '#$1');
fs.writeFileSync(path(__dirname, '../docs/general/welcome.md'), README);
// #endregion

// TODO: add class properties to each endpoint
// TODO: transfer table in README to dedicated services page? maybe just trasnfer the properties, auto-generate the table and leave a link to the services page. Dunno.
// #region Update docs/general/services.md to reflect source changes
// var interfaceFolder = path(__dirname, '../src/Interface/Lists');
// const listClasses = fs.readdirSync(interfaceFolder);
// var services = `# Supported Services (${listClasses.length})`;
// for (const filename of listClasses) {
//   const { aliases, logoURL, name, websiteURL } = require(path(interfaceFolder, filename));
//   const className = filename.replace(/.js/, '');
//   var ref;
//   if (process.env.GITHUB_REF) {
//     const arr = process.env.GITHUB_REF.split('/');
//     ref = arr[arr.length - 1];
//   }
//   services += `

// <div align=center>
//   <p>
//     <img src="${logoURL}" alt="${aliases[0]} logo" width="100" align="left" />
//   </p>
//   ${aliases.map(key => `<i id="${key}"></i>`).join('\n  ')}
//   <a href="${websiteURL}"><h1>${name}</h1></a>

// Keys: ${aliases.map(key => `\`${key}\``).join(', ')}  
// Class: [dbots.${className}](${ref ? `/#/docs/main/${ref}/class/${className}` : ''})  
// Website: ${websiteURL}
// </div>`;
// }
// fs.writeFileSync(path(__dirname, '../docs/general/services.md'), services);
// #endregion
