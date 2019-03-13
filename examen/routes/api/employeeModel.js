var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('emps');
  lib.getEmployees = (handler)=>{
    // implementar
    // obtener todos los documentos
    empColl.find({}).toArray(
      (err,docs) => {
        if(err){
          handler(err,null);
        }else 
          handler(null,docs);
      }
    )
  }

  lib.getEmployeesById = (id, handler) => {
    // implementar
    // Obtener un Documento solo mostrar
    // email, phone, name y age
    empColl
    .find({"_id":new ObjectID(id)})
    .project({"email":1,"phone":1,"name":1,"age":1})
    .toArray(
        (err, doc)=>{
          if(err){
            handler(err, null);
          }else{
            handler(null, doc);
          }
      }
    );
  }

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    empColl
    .find({"company": {"$in": Array.isArray(company)? company: [company]}})
    .project({"email":1,"company":1,"name":1,"age":1})
    .toArray(
        (err, doc)=>{
          if(err){
            handler(err, null);
          }else{
            handler(null, doc);
          }
      }
    );
  }

  /*lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    empColl
    .find({"age":{$gte:ageLowLimit}},{"age":{$lte:ageHighLimit}})
    .project({"email":1,"name":1,"age":1})
    .toArray(
        (err, doc)=>{
          if(err){
            handler(err, null);
          }else{
            handler(null, doc);
          }
      }
    );
  }*/

  lib.getEmployeesByTag = (tags, handler) => {
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    var queryObject= {"tags": {"$in": Array.isArray(tags)? tags: [tags]}};
    empColl.find(queryObject).toArray((err, docs) => {
      if(err){
        handler(err, null);
      }else{
        handler(null, docs);
      }
    });
  }

  lib.addEmployeeATag = ( tags, id, handler) => {
    //Implementar
    //Se requiere agregar a un documento un nuevo tag
    // $push
    var addtag = Array.isArray(tags)? tags: [tags];
    var updateObject = { "$set": { "tags": addtag}};
    empColl.updateOne({"_id":new ObjectID(id)}, updateObject, (err, rsult)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, rsult.result);
        }
    } );
  }

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
