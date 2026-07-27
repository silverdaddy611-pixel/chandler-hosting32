const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Chand App API is running!",
  });
});

// Database test
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS time");

    res.json({
      success: true,
      message: "Database connection successful!",
      databaseTime: result.rows[0].time,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Create reports table
app.get("/setup", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        phone_number TEXT NOT NULL,
        reason TEXT NOT NULL,
        details TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    res.json({
      success: true,
      message: "Reports table is ready!",
    });
  } catch (error) {
    console.error("Setup error:", error);

    res.status(500).json({
      success: false,
      message: "Could not create reports table",
    });
  }
});

// Submit a report
app.post("/reports", async (req, res) => {
  try {
    const { phone_number, reason, details } = req.body;

    if (!phone_number || !reason) {
      return res.status(400).json({
        success: false,
        message: "Phone number and reason are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO reports (
        phone_number,
        reason,
        details
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [
        phone_number,
        reason,
        details || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report: result.rows[0],
    });
  } catch (error) {
    console.error("Report error:", error);

    res.status(500).json({
      success: false,
      message: "Could not submit report",
    });
  }
});

// Get all reports
app.get("/reports", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM reports
      ORDER BY created_at DESC
      `
    );

    res.json({
      success: true,
      reports: result.rows,
    });
  } catch (error) {
    console.error("Get reports error:", error);

    res.status(500).json({
      success: false,
      message: "Could not retrieve reports",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Chand App API running on port ${PORT}`);
});    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Create reports table
app.get("/setup", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        phone_number TEXT NOT NULL,
        reason TEXT NOT NULL,
        details TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    res.json({
      success: true,
      message: "Reports table is ready!",
    });
  } catch (error) {
    console.error("Setup error:", error);

    res.status(500).json({
      success: false,
      message: "Could not create reports table",
    });
  }
});

// Submit a report
app.post("/reports", async (req, res) => {
  try {
    const { phone_number, reason, details } = req.body;

    if (!phone_number || !reason) {
      return res.status(400).json({
        success: false,
        message: "Phone number and reason are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO reports (phone_number, reason, details)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [phone_number, reason, details || null]
    );

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report: result.rows[0],
    });
  } catch (error) {
    console.error("Report error:", error);

    res.status(500).json({
      success: false,
      message: "Could not submit report",
    });
  }
});

// Get all reports
app.get("/reports", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      reports: result.rows,
    });
  } catch (error) {
    console.error("Get reports error:", error);

    res.status(500).json({
      success: false,
      message: "Could not retrieve reports",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Chand App API running on port ${PORT}`);
});    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Create reports table
app.get("/setup", async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        phone_number TEXT NOT NULL,
        reason TEXT NOT NULL,
        details TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    res.json({
      success: true,
      message: "Reports table is ready!",
    });
  } catch (error) {
    console.error("Setup error:", error);

    res.status(500).json({
      success: false,
      message: "Could not create reports table",
    });
  }
});

// Submit a report
app.post("/reports", async (req, res) => {
  try {
    const { phone_number, reason, details } = req.body;

    if (!phone_number || !reason) {
      return res.status(400).json({
        success: false,
        message: "Phone number and reason are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO reports (phone_number, reason, details)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [phone_number, reason, details || null]
    );

    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report: result.rows[0],
    });
  } catch (error) {
    console.error("Report error:", error);

    res.status(500).json({
      success: false,
      message: "Could not submit report",
    });
  }
});

// Get reports
app.get("/reports", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reports ORDER BY created_at DESC"
    );

    res.json({
      success: true,
      reports: result.rows,
    });
  } catch (error) {
    console.error("Get reports error:", error);

    res.status(500).json({
      success: false,
      message: "Could not retrieve reports",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Chand App API running on port ${PORT}`);
});  }
});

app.listen(PORT, () => {
  console.log(`Chand App API running on port ${PORT}`);
});
