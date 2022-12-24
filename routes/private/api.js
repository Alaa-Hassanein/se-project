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
    console.log('here');
    const user = await getUser(req);
    const request = {
      userId: user.userId,
      newFacultyId: req.body.facultyId,
      currentFacultyId: user.facultyId,
      status:req.body.status,
    };

    try {
      const requ = await db('se_project.Transfer_requests').insert(request);
      return res.status(200).json(requ);
    } catch (e) {
      console.log(e.message);
      return res.status(400).send('Could not send  request');
    }
  });


  app.post('/api/v1/transfers/:transferId', async function(req, res) {
    console.log('ql')
  const {id}=req.params;
  
 if (req.body.transferstatus==1){
   
   try 
   {

  

     console.log(req.params.transferId);
     const updat = await db('se_project.Transfer_requests').where( {id}).update({status:'approved'},['id','status']);
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
  else
  {
 try 
    {
      console.log(req.params.transferId);
      //const updat =await knex("se_project.Transfer_requests").update('status','approved').where('id', req.params.id);
      const updat = await db('se_project.Transfer_requests').where({id}).update({status:'approved'});
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

};