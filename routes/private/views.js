const db = require('../../connectors/db');
const roles = require('../../constants/roles');
const { getSessionToken } = require('../../utils/session');

const getUser = async function(req) {
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    return res.status(301).redirect('/');
  }

  const user = await db.select('*')
    .from('se_project.sessions')
    .where('token', sessionToken)
    .innerJoin('se_project.users', 'se_project.sessions.userId', 'se_project.users.id')
    .innerJoin('se_project.roles', 'se_project.users.roleId', 'se_project.roles.id')
    .innerJoin('se_project.faculties', 'se_project.users.facultyId', 'se_project.faculties.id')

    .first();
  
  console.log('user =>', user)
  user.isStudent = user.roleId === roles.student;
  user.isAdmin = user.roleId === roles.admin;

  return user;  
}

module.exports = function(app) {
  // Register HTTP endpoint to render /users page
  app.get('/dashboard', async function(req, res) {
    const user = await getUser(req);
    if (user.roleId==1)
    {
      return res.render('homepage-s', user);
    }
    if(user.roleId==2)
    {
      return res.render('homepage-a', user);
    }
  });
  app.get('/homepage-s', async function(req, res) {
    const user = await getUser(req);
    return res.render('homepage-s', user);
  });

  app.get('/homepage-a', async function(req, res) {
    const user = await getUser(req);
    return res.render('homepage-a', user);
  });


  // Register HTTP endpoint to render /users page
  app.get('/users', async function(req, res) {
    const users = await db.select('*').from('se_project.users');
    return res.render('users', { users });
  });

  // Register HTTP endpoint to render /courses page
  app.get('/courses', async function(req, res) {
    const user = await getUser(req);
    const courses = await db.select('*').from('se_project.courses');
    return res.render('courses', { ...user, courses });
  });

  // Register HTTP endpoint to render /enrollment page
  app.get('/enrollment', async function(req, res) {
    const user = await getUser(req);
    const enrollment = await db.select('*')
    .from('se_project.enrollments')
    .where('userId', user.userId)
    .innerJoin('se_project.users', 'se_project.enrollments.userId', 'se_project.users.id')
    .innerJoin('se_project.courses', 'se_project.enrollments.courseId', 'se_project.courses.id');

    return res.render('enrollment', { enrollment });
  });

  app.get('/transfer', async function(req, res) {
    const user = await getUser(req);
    const faculties = await db.select('*').from('se_project.faculties');
    const request = await db.select('*').from('se_project.Transfer_requests').where('userId',user.userId);
    const requestExists = await db.select('*').from('se_project.Transfer_requests').where('userId',user.userId).andWhere('status','pending');
    console.log(requestExists);
    
    if(requestExists.length !=0)
    {
    console.log('alaa')
    return res.render('transfer-b',{faculties , request});
    
    }
    else
    {
      console.log('her')
      return res.render('transfer-a',{faculties , request});
    }
 
  });

  app.get('/addcourse', async function(req, res) {
    return res.render('addcourse');
  });

  // Register HTTP endpoint to render /users/add page
  app.get('/users/add', async function(req, res) {
    return res.render('add-user');
  });

  app.get('/manage-requests', async function(req, res) {
    const user = await getUser(req);

    const request = await db.select('*').from('se_project.Transfer_requests');
    return res.render('manage-requests',{request});
  });

};
