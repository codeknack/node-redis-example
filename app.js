const redis = require('redis');
const client = redis.createClient();

client.on('connect', function() {
  console.log('Connected!'); // Connected!
});

// Strings

client.set('framework', 'AngularJS', function(err, reply) {
  console.log(reply); // OK
});

client.get('framework', function(err, reply) {
  console.log(reply); // AngularJS
});

// Hashes

client.hmset('frameworks_hash', 'javascript', 'AngularJS', 'css', 'Bootstrap', 'node', 'Express');

client.hgetall('frameworks_hash', function(err, object) {
  console.log(object); // { javascript: 'AngularJS', css: 'Bootstrap', node: 'Express' }
});

// Lists

client.rpush(['frameworks_list', 'AngularJS', 'BackboneJS'], function(err, reply) {
  console.log(reply); // 2
});

client.lrange('frameworks_list', 0, -1, function(err, reply) {
  console.log(reply); // [ 'AngularJS', 'BackboneJS' ]
});

// Sets

client.sadd(['frameworks_set', 'AngularJS', 'BackboneJS', 'EmberJS', 'VueJS', 'VueJS'], function(err, reply) {
  console.log(reply); // 4
});

client.smembers('frameworks_set', function(err, reply) {
  console.log(reply); // [ 'BackboneJS', 'AngularJS', 'VueJS', 'EmberJS' ]
});

// Check the existence of a key

client.exists('framework', function(err, reply) {
  if (reply === 1) {
    console.log('Exists!');
  } else {
    console.log('Doesn\'t exist!');
  }
});

// Delete a key

client.del('frameworks_list', function(err, reply) {
  console.log(reply); // 1
});

// Increment a key

client.set('working_days', 5, function() {
  client.incr('working_days', function(err, reply) {
    console.log(reply); // 6
  });
});



