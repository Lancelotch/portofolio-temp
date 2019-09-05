export default function convertSchemaToInit(schema) {
    function validationValue(key) {
      switch (schema.fields[key]._type) {
        case "string":
          return "";
        case "number":
          return 0;
        case "boolean":
          return false;
        case "object":
          return {};
          case "array":
          return [];
        default:
          return "";
      }
    }
    let init = {};
    schema._nodes.forEach(key => {
      const value = validationValue(key);
      init = { ...init, [key]: value };
    });
    return init;
  }