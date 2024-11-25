router.get("/cars/add", (req, res) => {
    res.render("add_car");
  });
  
  router.post("/cars/add", async (req, res) => {
    try {
      const { model, car_brand_id, car_address_id, seats_id, price_per_hour, price_per_day } = req.body;
      const sql = `
        INSERT INTO cars (model, car_brand_id, car_address_id, seats_id, price_per_hour, price_per_day)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      await pg.query(sql, [model, car_brand_id, car_address_id, seats_id, price_per_hour, price_per_day]);
      res.redirect("/quanlyxe");
    } catch (error) {
      console.error("Lỗi khi thêm xe:", error);
      res.status(500).send("Lỗi khi thêm xe");
    }
  });
  