# delegoat

Delegate handlers for JSON payloads, where the payload data model closely resembles an HTTP Request message but is decoupled from HTTP.

Made for Node.

>DELEGOAT, n.: The person to whom a task is purposely assigned because that person was not present at the meeting.
>
>"During the meeting we all agreed that someone needed to go through all of last year's records, find the error and fix it. Stan was the only one not present, so we made him our delegoat."
>
>Andrew St. "Delegoat." Urban Dictionary. N.p., 2 Jan. 2008. Web. 6 Nov. 2014. <http://www.urbandictionary.com/define.php?term=delegoat>.

## Version 1.0.1

- Payloads typically originate from an [AMQP broker](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol#AMQP_1.0_broker_implementations)
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
    var delegoat = require('delegoat');

    /**
    *   PayloadClient is not a real thing,
    *   it is used only for demonstration purposes.
    *   However, payloads are typically captured by some AMQP client
    */
    var payloadClient = new PayloadClient();

    // add handlers to the delegoat, much like you would with Express routes
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

      // now, do some real work with serviceData
    });

    // let the appropriate handler do the work!
    payloadClient.on('payload', delegoat.handleIt);
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
    var delegoat = require('delegoat');

    /**
    *   PayloadClient is not a real thing,
    *   it is used only for demonstration purposes.
    *   However, payloads are typically captured by some AMQP client
    */
    var payloadClient = new PayloadClient();

    // add handlers to the delegoat, much like you would with Express routes
    delegoat.post('/organizations', function(serviceData) {
      console.log(serviceData);
      /* outputs:
      {
        parameters: {},
        query: {},
        body: {
          id: 'cfabb3a7-6de0-4b40-8903-99aaac104124',
          name: 'Startups Anonymous, LLC'
        }
      }
      */

      // now, do some real work with serviceData
    });

    // let the appropriate handler do the work!
    payloadClient.on('payload', delegoat.handleIt);
    ```

- **PUT and DELETE are supported too**
