# delegoat

Delegate handlers for JSON payloads, where the payload data model closely resembles an HTTP Request message but is decoupled from HTTP.

Made for Node.

>DELEGOAT, n.: The person to whom a task is purposely assigned because that person was not present at the meeting.
>
>"During the meeting we all agreed that someone needed to go through all of last year's records, find the error and fix it. Stan was the only one not present, so we made him our delegoat."
>
>Andrew St. "Delegoat." Urban Dictionary. N.p., 2 Jan. 2008. Web. 6 Nov. 2014. <http://www.urbandictionary.com/define.php?term=delegoat>.

## _Includes RPC for Help.com ESB Samples_

## Version 1.0.2

- **delegoat** expects JSON payloads that conform to the following data schema:

  ```javascript
  {
    method: '', // GET | POST | PUT | DELETE
    url: '', // /resource/identifiers?key=value&other=stuff
    body: {}
  }
  ```

## Installation
```sh
$ npm install --save delegoat
```

## Sample Usage

- **Sample Usage for GET**

  - Payload

    ```javascript
    {
      method: 'GET'
      url: '/organizations/123?role=manager'
    }
    ```

  - Node Microservice

    ```javascript
    var HelpEsb = require('help-esb');
    var helpEsbClient = new HelpEsb.Client(process.env.ESB);
    var delegoat = require('delegoat');

    // add handlers to the delegoat,
    // much like you would with Express routes:
    delegoat.get('/organizations/{organizationId}', function(serviceData) {
      console.log(serviceData);
      /* outputs:
      {
        parameters: {
          organizationId: '123'
        },
        query: {
          role: 'manager'
        },
        body: {}
      }
      */

      // here, you can do some real work with serviceData

      // YOU MUST RETURN AN OBJECT OR EXCEPTION
      return {};
    });

    // login with an arbitrary (for now) identifier
    helpEsbClient.login('me');

    // define a "group" to listen to
    var group = 'crud-organizations';

    // start listening for payloads
    helpEsbClient.subscribe(group)
      .then(function() {
        console.log('listening to: ' + group)

        // listen for RPC and let the handlers do work!
        helpEsbClient.rpcReceive(group, function(request) {
          return delegoat.handleIt(request);
        });
      });
    ```

- **Sample Usage for POST**

  - Payload

    ```javascript
    {
      method: 'POST'
      url: '/organizations',
      body: {
        id: 'cfabb3a7-6de0-4b40-8903-99aaac104124',
        name: 'Startups Anonymous, LLC'
      }
    }
    ```

  - Node Microservice

    ```javascript
    var HelpEsb = require('help-esb');
    var helpEsbClient = new HelpEsb.Client(process.env.ESB);
    var delegoat = require('delegoat');

    // add handlers to the delegoat,
    // much like you would with Express routes:
    delegoat.post('/organizations', function(serviceData) {
      console.log(serviceData);
      /** outputs:
      {
        parameters: {},
        query: {},
        body: {
          id: 'cfabb3a7-6de0-4b40-8903-99aaac104124',
          name: 'Startups Anonymous, LLC'
        }
      }
      */

      // here, you can do some real work with serviceData

      // YOU MUST RETURN AN OBJECT OR EXCEPTION
      return {};
    });

    // login with an arbitrary (for now) identifier
    helpEsbClient.login('me');

    // define a "group" to listen to
    var group = 'crud-organizations';

    helpEsbClient.subscribe(group)
      .then(function() {
        console.log('listening to: ' + group)

        // listen for RPC and let the handlers do work!
        helpEsbClient.rpcReceive(group, function(request) {
          return delegoat.handleIt(request);
        });
      });
    ```

- **PUT and DELETE are supported too**
