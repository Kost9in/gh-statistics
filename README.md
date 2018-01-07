# GitHub statistics app

Application for viewing GitHub user commits statistics.

[Demo is here](https://gh-statistics.herokuapp.com/)

---

### For using app locally you should:
1) Clone repo `git clone https://github.com/Kost9in/gh-statistics.git`
2) Go to folder `cd gh-statistics`
3) Install dependencies `npm i`
4) Run app `npm run build`

App will be run here: `http://localhost:3000/`.

You can use custom port for running app: `PORT=3322 npm run build`.

You can run only server: `npm run dev-server` or only client build(webpack-dev-server): `npm run dev-client`.

Also, you can provide GitHub credentials in file `server/config.js` for increase API requests limit or access to private repositories.