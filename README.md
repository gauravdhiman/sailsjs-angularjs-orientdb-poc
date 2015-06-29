# SailsJS (NodeJS) + AngularJS + OrientDB (NoSQL) POC
## Class-Student Project

This POC (Proof of Concept) is to show case how we can build web apps using open-source technologies like SailsJS, AngularJS and OrientDB. In this we are using full stack JavaScript.

- [SailsJS](http://sailsjs.org) is an open-source MVC framework [NodeJS](http://nodejs.org/).
- [AngularJS](https://angularjs.org/) is an open-source MVC JS framework from Google for frontend.
- [OrientDB](http://orientdb.org/) is again an open-source multi-modal (Document + GraphDB) from Orient Technologies.

### How to run this app ?
- Download this app using git or download the zip file from github.
- Unzip, if you downloaded the zip file.
- cd `<<project folder>>`
- Run `npm install` to install required node packages.
- Start DB server:
  - cd `<<project folder>>/db/bin`
  - run OrientDB, `server.sh`, if you are on Linux. If you are on Windows, execute `server.bat`
- Start Node Server:
  - cd `<<project folder>>`
  - Run `sails lift` to start NodeJS server on 3000 port
- Hit url [http://localhost:3000](http://localhost:3000) in browser to see the application

Let me know if you face any issues. If you face any bugs, report it on this project's github.

---

Author: [Gaurav Dhiman](http://www.gaurav-dhiman.com/)

[Twitter](https://twitter.com/gaurav_dhiman), [LinkedIn](https://www.linkedin.com/in/gauravdhiman)
