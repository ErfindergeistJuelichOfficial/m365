const { readFileSync } = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// prints out all main and alternate e-mails from each mitglied

// first "npm install -g @pnp/cli-microsoft365"
// "m365 setup"
// than login with "m365 login"
// than run "node getMails.js"

async function execWrapper(execString) {
  // exec should be used only once.
  const { stdout, stderr } = await exec(execString);
  return stdout;
}

async function main() {
  // get mitglieder group
  const resultMembers = await execWrapper(
    "m365 entra group member list -i 5d19405e-7efc-4a35-9d3a-168db046766c --output json"
  );
  if (resultMembers) {
    const members = await JSON.parse(resultMembers);
    const mails = [];
    for (const element of members) {
      const resultUser = await execWrapper(
        `m365 entra user get -i ${element.id} -p "otherMails, mail" --output json`
      );
      if (resultUser) {
        const user = await JSON.parse(resultUser);
        mails.push(user.mail);
        user.otherMails.forEac((mail) => mails.push(mail));
      }
    }

    console.log(mails.join("; "));
  }
}

main();
