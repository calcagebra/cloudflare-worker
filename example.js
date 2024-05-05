let calcagebra = require('./dist/index')

calcagebra.then(code => console.log(code.execute("print(1);")))