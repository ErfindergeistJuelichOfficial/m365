const { readFileSync } = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// prints out all main and alternate e-mails from each mitglied

// first "npm install -g @pnp/cli-microsoft365"
// than login with "m365 login"
// than run "node getMails.js"


async function hhh(execString) {
  const { stdout, stderr } = await exec(execString);
  return stdout

}

async function main() {
  // get mitglieder group
  const x = await hhh('m365 entra group member list -i 5d19405e-7efc-4a35-9d3a-168db046766c --output json')
  if(x) {
    const mitglieder = await JSON.parse(x)
    // console.log(mitglieder)
    const mails = []
    for(const element of mitglieder) {
      
      const y = await hhh(`m365 entra user get -i ${element.id} -p "otherMails, mail" --output json`)
      if(y) {
        const user = await JSON.parse(y)
        mails.push(user.mail)

        user.otherMails.forEach(mail => mails.push(mail))
      }
      
    }

    console.log(mails.join("; "))
  }
}

main()




