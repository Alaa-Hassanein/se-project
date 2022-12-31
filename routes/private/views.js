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

  app.get('/courses', async function(req, res) {
    const user = await getUser(req);
    const courses = await db.select('*').from('se_project.enrollments').where('userId',user.userId)
    .innerJoin('se_project.courses','se_project.enrollments.courseid','se_project.courses.id');
    return res.render('courses', { courses });
  });

  // Register HTTP endpoint to render /courses page
  app.get('/manage/courses/', async function(req, res) {
    
      const facultyId =await db.select('*').from('se_project.faculties')
      return res.render('courses-a1', { facultyId });
    
  });

  app.get('/manage/grades/', async function(req, res) {
    
    const courses =await db.select('*').from('se_project.courses')
    return res.render('manage-grades', { courses });
  
});


 


  
  app.get('/transfer', async function(req, res) {
    const user = await getUser(req);
    const faculties = await db.select('*').from('se_project.faculties');
    const request = await db.select('*').from('se_project.Transfer_requests').where('userId',user.userId);
    const requestExists = await db.select('*').from('se_project.Transfer_requests').where('userId',user.userId).andWhere('status','pending');
    console.log('alaa');
    console.log(requestExists);
    console.log('alaa');
    if(requestExists.length !=0)
    {
    
    return res.render('transfer-b',{faculties , request});
    
    }
    else
    {
      
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
    
    const request = await db.select('*').from('se_project.Transfer_requests').where('status','pending');
    return res.render('manage-requests',{request});
  });

  app.get('/transcripts', async function(req, res) {
    const user=await getUser(req);
    const transcripts = await db.select('*').from('se_project.enrollments').where('userId',user.userId)
    .innerJoin('se_project.courses','se_project.enrollments.courseid','se_project.courses.id');
    return res.render('transcripts', { transcripts });
  
});


app.get('/manage/courses/:edit', async function(req, res) {
  const courseId=req.params.edit;
 const course= await db.select('*').from('se_project.courses').where('id',courseId);
 const facultyid=course[0];
 const faculty=await db.select('*').from('se_project.faculties').where('id',facultyid.facultyId);

 

  return res.render('course-update',{course, faculty});

});
  
};
