export default function convertSchemaToInit(schema) {
  function validationValue(key,s) {
    switch (s.fields[key]._type) {
      case "object":
        return {};
        break;
        case "array":
        return array(s.fields[key]);
        break;
      default:
        return validateKey(s.fields[key]._type);
    }
  }

  function array (array) {
    if(array._subType){
      const schema = array._subType._nodes
      let init = {};
      schema.forEach(key => {
          init = {
            ...init , [key] : array._subType.fields[key]._default ? array._subType.fields[key]._default : validationValue(key,array._subType)
          }
      });
      return [init];
    }else{
      return []
    }
  }

  function validateKey (key){
    switch (key) {
      case "string":
        return "";
      case "number":
        return 0;
      case "boolean":
        return false;
      default:
        return "";
    }
  }

  let init = {};
  schema._nodes.forEach(key => {
    const value = validationValue(key,schema);
    init = { ...init, [key]: value };
  });
  return init;
}


  



  