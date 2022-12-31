const { v4 } = require('uuid');
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
  // Register HTTP endpoint to get all users
  app.get('/api/v1/users', async function(req, res) {
    const results = await db.select('*').from('users');
    return res.json(results)
  });


  app.post('/api/v1/faculties/transfer', async function(req, res) {
   
    const user = await getUser(req);
    const request = {
      userId: user.userId,
      newFacultyId: req.body.facultyId,
      currentFacultyId: user.facultyId,
      status:req.body.status,
    };
     const e =req.body.facultyId;
     if (e==0) 
     {
      return res.status(400).send('you must chose faculty');
     }
      
     
else
{


    try {
      const requ = await db('se_project.Transfer_requests').insert(request);
      return res.status(200).json(requ);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not send  request');
    }
  
  }
  });


  app.post('/api/v1/transfers/:transferId', async function(req, res) {
    
    const id=req.params.transferId;
    const response =req.body.response;
   if (response=="reject"){
     
     try 
     {
  
    
  
       console.log(req.params.transferId);
       const updat = await db('se_project.Transfer_requests').where("id",id).update({status:response});
       //const updat =await knex("se_project.Transfer_requests").update('status','rejected').where('id', req.params.id);
       return res.status(200).json(updat);
     } 
     catch (e)
    {
     console.log(req.params.transferId);
       console.log(e.message);
       return res.status(400).send('Could not assend  request');
     }
    }
    if(response=="approve")
    {
   try 
      {
        console.log(req.params.transferId);
        //const updat =await knex("se_project.Transfer_requests").update('status','approved').where('id', req.params.id);
        const updat = await db('se_project.Transfer_requests').where({id}).update({status:response});
        return res.status(200).json(updat);
      } 
      catch (e)
     {
      console.log(req.params.transferId);
        console.log(e.message);
        return res.status(400).send('Could not assend  request');
      }
    }
   
   });

   
   app.post('/api/v1/transfers/:transferId', async function(req, res) {
    
    const id=req.params.transferId;
    const response =req.body.response;
   if (response=="reject"){
     
     try 
     {
  
    
  
       console.log(req.params.transferId);
       const updat = await db('se_project.Transfer_requests').where("id",id).update({status:response});
       //const updat =await knex("se_project.Transfer_requests").update('status','rejected').where('id', req.params.id);
       return res.status(200).json(updat);
     } 
     catch (e)
    {
     console.log(req.params.transferId);
       console.log(e.message);
       return res.status(400).send('Could not assend  request');
     }
    }
    if(response=="approve")
    {
   try 
      {
        console.log(req.params.transferId);
        //const updat =await knex("se_project.Transfer_requests").update('status','approved').where('id', req.params.id);
        const updat = await db('se_project.Transfer_requests').where({id}).update({status:response});
        return res.status(200).json(updat);
      } 
      catch (e)
     {
      console.log(req.params.transferId);
        console.log(e.message);
        return res.status(400).send('Could not assend  request');
      }
    }
   
   });
  
  
   app.post('/api/v1/faculties/:facultyId', async function(req, res) {
    
    
      const faculty=req.params.facultyId;
     
      
        const courses = await db.select('*').from('se_project.courses').where('facultyId',faculty);
       
        
      return res.send(courses);
   
  });
  app.delete('/api/v1/courses/:courseId', async function(req, res) {
    
    
    const courseid=req.params.courseId;
    
    console.log(courseid);
      const courses = await db('se_project.courses').where('id',courseid).del();
     
      
    return res.status(200).json(courses);
 
});

app.post('/api/v1/addcourse', async function(req, res) {
    
    
  const newcourse= {
    
    course: req.body.course,
    code: req.body.code,
    facultyId: req.body.facultyId,
    credithours:req.body.credithours,
  };
  console.log(newcourse);
  try {
    const course = await db('se_project.courses').insert(newcourse).returning('*');
    return res.status(200).json(course);
  }
    
   catch (e)
    {
      return res.status(400).send('Could not add course');
  }

});

app.get('/api/v1/enrollment/:courseId', async function(req, res) { 
  const courseid=req.params.courseId;
    const courses = await db.select('*').from('se_project.enrollments').where('courseid',courseid).andWhere('grade','0')
    .innerJoin('se_project.users', 'se_project.enrollments.userId', 'se_project.users.id');
  return res.send(courses);

});


app.put('/api/v1/enrollment/:courseId', async function(req, res) { 
  const userid=req.body.userid;
  const grade =req.body.grade;
  const courseId=req.params.courseId
  console.log('id'+userid);
  console.log('grade'+grade);
  const update = await db('se_project.enrollments').where('userId',userid).andWhere('courseid',courseId).update({grade:grade});
  return res.status(200).json(update);

});
app.delete('/api/v1/courses/:courseId/drop', async function(req, res) { 
  const courseId=req.params.courseId;
  const user =await getUser(req);
  const delet =await db('se_project.enrollments').where('userId',user.userId).andWhere('courseid',courseId).del();
  return res.status(200).json(delet);

});

app.put('/api/v1/course/:courseId', async function(req, res) { 
const newc={
  course:req.body.course,
  code:req.body.code,
  credithours:req.body.credithours

};
  const courseId=req.params.courseId
  
  const update = await db('se_project.courses').where('id',courseId).update(newc);
  return res.status(200).json(update);
  });

  app.get('/api/v1/GPA', async function(req, res) {
    const user=await getUser(req); 
    const gpa=await db.select('*').from('se_project.enrollments').where('userId',user.userId)
    .innerJoin('se_project.courses' ,'se_project.enrollments.courseid' ,'se_project.courses.id');
      return res.send(gpa);
      });

}