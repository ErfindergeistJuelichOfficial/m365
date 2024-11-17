# install

require node.js

`npm install -g @pnp/cli-microsoft365`

create app reg if not done jet

`m365 setup`

## Login

`m365 login`

## scripts

- `node getMails.js`
get all emails from users in the mitglieder group

## some m365 cli commands

`m365 spo listitem list -u https://erfindergeist.sharepoint.com/sites/Mitglieder -t Plenen > plenen.json`
