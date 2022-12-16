const db = require('../../connectors/db');

module.exports = function(app) {
  // Register HTTP endpoint to render /index page
  app.get('/', function(req, res) {
    return res.render('startpage');
  });

  app.get('/logins', function(req, res) {
    return res.render('logins');
  });

  app.get('/logina', function(req, res) {
    return res.render('logina');
  });

  app.get('/register', async function(req, res) {
    const faculties = await db.select('*').from('se_project.faculties');
    return res.render('register', { faculties });
  });
};
