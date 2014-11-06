'use strict';

var delegoat = require('./main');

// GETs \\

delegoat.get('/', function(serviceData) {
  console.log(['✓ serviceData', serviceData]);
});

delegoat.get('/orgs', function(serviceData) {
  console.log(['✓ serviceData', serviceData]);
});

delegoat.get('/orgs/{orgId}/group/{groupId}', function(serviceData) {
  console.log(['✓ serviceData', serviceData]);
});


// POSTs \\

delegoat.post('/orgs', function(serviceData) {
  console.log(['✓ serviceData', serviceData]);
});


// PUTs \\

delegoat.put('/', function(serviceData) {
  console.log(['✓ serviceData', serviceData]);
});


// DELETEs \\

delegoat.delete('/{id}', function(serviceData) {
  console.log(['✓ serviceData', serviceData]);
});


// TEST DATA \\


// EXPECTED EXCEPTION
try {
  delegoat.handleIt({
    url: '/UNHANDLED-URL',
    method: 'GET'
  });
} catch (exception) {
  console.log(['✓ EXPECTED EXCEPTION', exception]);
}

delegoat.handleIt({
  url: '/orgs/123/group/456?state=TX&city=Austin#auth=XYZ',
  method: 'GET'
});

delegoat.handleIt({
  url: '/',
  method: 'GET'
});

delegoat.handleIt({
  url: '/orgs?groups=456,789',
  method: 'POST',
  body: {
    id: 987654321,
    name: 'Bob Dobbs'
  }
});

delegoat.handleIt({
  url: '/',
  method: 'PUT',
  body: {
    id: 987654321,
    name: 'Mr. Bob Dobbs'
  }
});

delegoat.handleIt({
  url: '/987654321',
  method: 'DELETE'
});