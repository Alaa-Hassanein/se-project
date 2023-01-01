const db = require('../../connectors/db');

module.exports = function(app) {
  // Register HTTP endpoint to render /index page
  

  app.get('/', function(req, res) {
    return res.render('login');
  });

  

  app.get('/register-s', async function(req, res) {
    const faculties = await db.select('*').from('se_project.faculties');
    return res.render('register', { faculties });
  });
  app.get('/register-a', async function(req, res) {
    const faculties = await db.select('*').from('se_project.faculties');
    return res.render('register-a', { faculties });
  });
};
