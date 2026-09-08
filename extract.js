const fs = require('fs');
const bundle = fs.readFileSync('bundle.js', 'utf8');

const projIdx = bundle.indexOf('Wr=[');
if (projIdx !== -1) {
  console.log(bundle.substring(projIdx, projIdx + 2000));
}

const expIdx = bundle.indexOf('P2=[');
if (expIdx !== -1) {
  console.log(bundle.substring(expIdx, expIdx + 2000));
}
