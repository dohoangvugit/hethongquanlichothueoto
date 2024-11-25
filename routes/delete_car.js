router.get("/cars/delete/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const sql = `DELETE FROM cars WHERE id = $1`;
      await pg.query(sql, [id]);
      res.redirect("/quanlyxe");
    } catch (error) {
      console.error("Lỗi khi xóa xe:", error);
      res.status(500).send("Lỗi khi xóa xe");
    }
  });
  