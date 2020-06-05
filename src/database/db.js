const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  /*db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `)
  
  const query = ` 
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
    "https://images.unsplash.com/photo-1557344252-4d5c9909579c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1490&q=80",
    "Colectoria",
    "Guilherme Gemballa, Jardim América",
    "N°260",
    "Santa Catarina",
    "Rio do Sul",
    "Residuos Eletrônicos, Lâmpadas"
  ]

  function afterInsertData(err) {
    if(err) {
      return console.log(err);
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
  }*/

  //db.run(query, values, afterInsertData)

  
  
  db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    if(err) {
      return console.log(err);
    }
    
    console.log("Registros deletados com sucesso!")
    console.log(this)
  })
  
  db.all(`SELECT * FROM places`, function(err, rows) {
    if(err) {
      return console.log(err);
    }

    console.log("Aqui estão seus registros: ")
    console.log(rows)
  })

})

module.exports = db