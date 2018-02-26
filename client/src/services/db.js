import Dexie from 'dexie'
var db = new Dexie('followup');

// Define a schema
db.version(1).stores({
  projects: 'title'
});


// Open the database
db.open().catch(function(error) {
  alert('Uh oh : ' + error);
});

export default db
