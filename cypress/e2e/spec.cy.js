describe("template spec", () => {
  it("SELECT", () => {
    const selectQuery = "SELECT * FROM testdb.names";
    cy.query(selectQuery).then((res) => {
      expect(res[0].first).to.equal("stuart");
      expect(res[1].first).to.equal("bruce");
      expect(res.length).to.equal(2);
    });
  });

  it("INSERT", () => {
    const insertQuery = "INSERT INTO testdb.names (first, last) VALUES ?";
    const values = [[["jackie", "chan"]]]; // yes, it's three square brackets, don't ask
    cy.query(insertQuery, values).then((res) => {
      expect(res.affectedRows).to.equal(1);
    });

    const selectQuery = "SELECT * FROM testdb.names";
    cy.query(selectQuery).then((res) => {
      expect(res[0].first).to.equal("stuart");
      expect(res[1].first).to.equal("bruce");
      expect(res[2].first).to.equal("jackie");
      expect(res.length).to.equal(3);
    });
  });

  it("DELETE", () => {
    const deleteQuery = "DELETE FROM testdb.names WHERE first='jackie'";
    cy.query(deleteQuery).then((res) => {
      expect(res.affectedRows).to.equal(1);
    });

    const selectQuery = "SELECT * from testdb.names";
    cy.query(selectQuery).then((res) => {
      expect(res[0].first).to.equal("stuart");
      expect(res[1].first).to.equal("bruce");
      expect(res.length).to.equal(2);
    });
  });
});
