#JSON Pepper

A helper CLI tool that converts JSON into an equivalent pp::Var notation in C++.

##Install
```npm install -g json-pepper```

##Usage
Simply give it a JSON file and it will output the C++ notation.

```bash
json-pepper [filename]
```

It also accepts streams, e.g.

```bash
cat package.json | json-pepper
```

or on OSX use the clipboard to easily convert copied JSON into pepper notation:

```bash
pbpaste | json-pepper | pbcopy
```

##Example

**package.json**
```json
{
  "name": "json-pepper",
  "preferGlobal": true,
  "version": "0.0.0",
  "author": "Mohamed Eltuhamy <tuhamy@gmail.com>",
  "description": "convert json into pp::Var",
  "contributors": [
    {
      "name": "Mohamed Eltuhamy",
      "email": "tuhamy@gmail.com"
    }
  ],
  "bin": {
    "json-pepper": "./bin/json-pepper.js"
  },
  "main": "./lib/json-pepper",
  "keywords": [
    "cli",
    "json",
    "nacl",
    "native-client"
  ],
  "dependencies" : {
    "lodash"   :  "*",
    "minimist" : "*",
    "concat-stream" : "*"
  },
  "analyze": false,
  "license": "MIT",
  "engines": {
    "node": ">=0.6"
  }
}
```

When we pass package.json into json-pepper, we get the following output:

```bash
json-pepper package.json
```

```cpp
pp::VarDictionary obj;
obj.Set("name","json-pepper");
obj.Set("preferGlobal",true);
obj.Set("version","0.0.0");
obj.Set("author","Mohamed Eltuhamy <tuhamy@gmail.com>");
obj.Set("description","convert json into pp::Var");
pp::VarArray obj_contributors;
pp::VarDictionary obj_contributors_0;
obj_contributors_0.Set("name","Mohamed Eltuhamy");
obj_contributors_0.Set("email","tuhamy@gmail.com");
obj_contributors.Set(0, obj_contributors_0);
obj.Set("contributors",obj_contributors);
pp::VarDictionary obj_bin;
obj_bin.Set("json-pepper","./bin/json-pepper.js");
obj.Set("bin",obj_bin);
obj.Set("main","./lib/json-pepper");
pp::VarArray obj_keywords;
obj_keywords.Set(0, "cli");
obj_keywords.Set(1, "json");
obj_keywords.Set(2, "nacl");
obj_keywords.Set(3, "native-client");
obj.Set("keywords",obj_keywords);
pp::VarDictionary obj_dependencies;
obj_dependencies.Set("lodash","*");
obj_dependencies.Set("minimist","*");
obj_dependencies.Set("concat-stream","*");
obj.Set("dependencies",obj_dependencies);
obj.Set("analyze",false);
obj.Set("license","MIT");
pp::VarDictionary obj_engines;
obj_engines.Set("node",">=0.6");
obj.Set("engines",obj_engines);
```

We can copy this to the clipboard and paste it into our NaCl program.