const express = require("express");
const router = express.Router();
const pg = require("../db");

router.get("/quanlixe", async (req, res) => {
  try {
    const sql = `
      SELECT 
          cars.id,
          cars.model,
          car_brands.name AS brand_name,
          car_addresses.address AS rental_location,
          seats.seats AS seat_number,
          cars.price_per_hour,
          cars.price_per_day
      FROM cars
      JOIN car_brands ON cars.car_brand_id = car_brands.id
      JOIN car_addresses ON cars.car_address_id = car_addresses.id
      JOIN seats ON cars.seats_id = seats.id;
    `;
    const result = await pg.query(sql);
    res.render("car_manager", { cars: result.rows });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách xe:", error);
    res.status(500).send("Lỗi khi truy vấn cơ sở dữ liệu");
  }
});

// Thêm xe mới
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

// Xóa xe
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

module.exports = router;
