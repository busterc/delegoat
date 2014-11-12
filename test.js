'use strict';

var delegoat = require('./main');

// GETs \\

delegoat.get('/', function(request) {
  console.log(['✓ request', request]);
});

delegoat.get('/orgs', function(request) {
  console.log(['✓ request', request]);
});

delegoat.get('/orgs/{orgId}/group/{groupId}', function(request) {
  console.log(['✓ request', request]);
});


// POSTs \\

delegoat.post('/orgs', function(request) {
  console.log(['✓ request', request]);
});


// PUTs \\

delegoat.put('/', function(request) {
  console.log(['✓ request', request]);
});


// DELETEs \\

delegoat.delete('/{id}', function(request) {
  console.log(['✓ request', request]);
});


// TEST DATA \\


// EXPECTED EXCEPTION
try {
  delegoat.handleIt({
    uri: '/UNHANDLED-URL',
    method: 'GET'
  });
} catch (exception) {
  console.log(['✓ EXPECTED EXCEPTION', exception]);
}

delegoat.handleIt({
  uri: '/orgs/123/group/456?state=TX&city=Austin#auth=XYZ',
  method: 'GET'
});

delegoat.handleIt({
  uri: '/',
  method: 'GET'
});

delegoat.handleIt({
  uri: '/orgs?groups=456,789',
  method: 'POST',
  body: {
    id: 987654321,
    name: 'Bob Dobbs'
  }
});

delegoat.handleIt({
  uri: '/',
  method: 'PUT',
  body: {
    id: 987654321,
    name: 'Mr. Bob Dobbs'
  }
});

delegoat.handleIt({
  uri: '/987654321',
  method: 'DELETE'
});