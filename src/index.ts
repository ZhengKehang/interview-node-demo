import isValidJsonFile from "./isValidJsonFile";
import path from "path";

const sayHello = (name: string) => {
  console.log(`Hello, ${name}!`);
};

sayHello("TypeScript");

isValidJsonFile(path.resolve(__dirname,'../public/json/testSuccess.json')).then(resp => {
  console.log('testSuccess', resp)
})
isValidJsonFile(path.resolve(__dirname,'../public/json/testFail.json'))
