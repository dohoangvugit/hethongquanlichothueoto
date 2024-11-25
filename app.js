const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const carRoutes = require("./routes/carRoutes");
const car_managerRoutes = require("./routes/car_managerRoutes");


// Cấu hình đường dẫn cho static files (CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Cấu hình view engine (ejs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Trang chủ (dashboard)
app.get("/", (req, res) => {
  // Dữ liệu giả lập
  const data = {
    totalCars: 50,
    rentalLocations: 10,
    ongoingRentals: 15,
    monthlyRevenue: "500 triệu VNĐ",
  };
  res.render("index", { data });
});

app.use("/", carRoutes);
app.use("/", car_managerRoutes);

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
