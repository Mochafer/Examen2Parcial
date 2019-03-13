var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', ( req, res, next ) => {
      empModel.getEmployees(
        (err, docs) => {
          if(err) {
            console.log(err);
            return res.status(500).json({error:"Instruccion Fallida"});
          }
          return res.status(200).json(docs);
        }
        );
  });// all

  router.get('/byid/:id', (req, res, next)=>{
    empModel.getEmployeesById(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el documento"});
      }
      return res.status(200).json(Doc);
    } );
  }); 
 
  router.get('/bycompany/:company', (req, res, next)=>{
    empModel.getEmployeesById(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el documento"});
      }
      return res.status(200).json(Doc);
    } );
  }); 
  
  router.get('/byagerange/:min/:max', (req, res, next)=>{
    empModel.getEmployeesByAgeRange(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el documento"});
      }
      return res.status(200).json(Doc);
    } );
  }); 

  router.get('/bytag/:tag', (req, res, next)=>{
    empModel.getEmployeesByTag(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el documento"});
      }
      return res.status(200).json(Doc);
    } );
  }); 
  
  router.put('/addtag/:id', (req, res, next)=>{
    empModel.addEmployeeATag(req.params.id, (err, Doc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el documento"});
      }
      return res.status(200).json(Doc);
    } );
  }); 
  return router;
}

module.exports = initEmployee;
