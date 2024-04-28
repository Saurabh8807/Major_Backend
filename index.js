// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const moment = require("moment");

// Create Express app
const app = express();
app.use(cors());

// Connect to MongoDB database
mongoose.connect(
  "mongodb+srv://kedarmalap06:kedarmalap06@aqualize-data.dnkqwsv.mongodb.net/?retryWrites=true&w=majority&appName=aqualize-data",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

// Define a schema for your MongoDB collection
const dataSchema = new mongoose.Schema({
  _id: String,
  entryId: Number,
  data: {
    ph: Number,
    tds: Number,
    turbidity: Number,
    mq135: Number,
    waterTemp: Number,
  },
  timestamp: Date,
});

// Create a model from the schema
const Data = mongoose.model("SenorData", dataSchema); // 'aqualize' is the collection name

// Define API endpoint to fetch data
// Define API endpoint to fetch data sorted by entryId
// app.get("/api/data", async (req, res) => {
//   try {
//     // Fetch data from MongoDB sorted by entryId
//     const data = await Data.find({}).sort({ entryId: 1 }); // Sort in ascending order of entryId
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/api/data/currentDay", async (req, res) => {
  try {
    // Fetch data from MongoDB sorted by entryId in descending order and limit to 48 entries
    const data = await Data.find({}).sort({ entryId: -1 }).limit(48);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/data/currentWeek", async (req, res) => {
  try {
    // Calculate the date 7 days ago from today
    const startDate = moment().subtract(7, "days").toDate();

    // Fetch data from MongoDB for the last week
    const data = await Data.find({ timestamp: { $gte: startDate } }).sort({
      entryId: 1,
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/data/currentMonth", async (req, res) => {
  try {
    // Calculate the date 7 days ago from today
    const startDate = moment().subtract(30, "days").toDate();

    // Fetch data from MongoDB for the last week
    const data = await Data.find({ timestamp: { $gte: startDate } }).sort({
      entryId: 1,
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/data/january", async (req, res) => {
  try {
    // Define the start and end dates for February 2024
    const startOfMonth = moment("2024-01-01").startOf("month").toDate();
    const endOfMonth = moment("2024-01-31").endOf("month").toDate();

    // Convert the start and end dates to strings in the format YYYY-MM-DD
    const startDateString = startOfMonth.toISOString().split("T")[0];
    const endDateString = endOfMonth.toISOString().split("T")[0];

    // Fetch data from MongoDB for February 2024
    const data = await Data.find({
      $expr: {
        $and: [
          {
            $gte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              startDateString,
            ],
          },
          {
            $lte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              endDateString,
            ],
          },
        ],
      },
    }).sort({ entryId: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch data for February 2024
// Fetch data for February 2024
// Fetch data for February 2024
app.get("/api/data/february", async (req, res) => {
  try {
    // Define the start and end dates for February 2024
    const startOfMonth = moment("2024-02-01").startOf("month").toDate();
    const endOfMonth = moment("2024-02-29").endOf("month").toDate();

    // Convert the start and end dates to strings in the format YYYY-MM-DD
    const startDateString = startOfMonth.toISOString().split("T")[0];
    const endDateString = endOfMonth.toISOString().split("T")[0];

    // Fetch data from MongoDB for February 2024
    const data = await Data.find({
      $expr: {
        $and: [
          {
            $gte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              startDateString,
            ],
          },
          {
            $lte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              endDateString,
            ],
          },
        ],
      },
    }).sort({ entryId: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/data/march", async (req, res) => {
  try {
    // Define the start and end dates for February 2024
    const startOfMonth = moment("2024-03-01").startOf("month").toDate();
    const endOfMonth = moment("2024-03-31").endOf("month").toDate();

    // Convert the start and end dates to strings in the format YYYY-MM-DD
    const startDateString = startOfMonth.toISOString().split("T")[0];
    const endDateString = endOfMonth.toISOString().split("T")[0];

    // Fetch data from MongoDB for February 2024
    const data = await Data.find({
      $expr: {
        $and: [
          {
            $gte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              startDateString,
            ],
          },
          {
            $lte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              endDateString,
            ],
          },
        ],
      },
    }).sort({ entryId: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/data/aprilData", async (req, res) => {
  try {
    // Define the start and end dates for February 2024
    const startOfMonth = moment("2024-04-01").startOf("month").toDate();
    const endOfMonth = moment("2024-04-28").endOf("month").toDate();

    // Convert the start and end dates to strings in the format YYYY-MM-DD
    const startDateString = startOfMonth.toISOString().split("T")[0];
    const endDateString = endOfMonth.toISOString().split("T")[0];

    // Fetch data from MongoDB for February 2024
    const data = await Data.find({
      $expr: {
        $and: [
          {
            $gte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              startDateString,
            ],
          },
          {
            $lte: [
              { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
              endDateString,
            ],
          },
        ],
      },
    }).sort({ entryId: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/data/custom", async (req, res) => {
  try {
    // Extract start date and end date from query parameters
    const { startDate, endDate } = req.query;

    // Parse start date and end date
    const parsedStartDate = startDate ? new Date(startDate) : null;
    const parsedEndDate = endDate ? new Date(endDate) : null;

    // Check if both start date and end date are provided
    if (!parsedStartDate || !parsedEndDate) {
      return res
        .status(400)
        .json({ error: "Please provide both start date and end date." });
    }

    // Fetch data from MongoDB based on the provided start date and end date
    const data = await Data.find({
      timestamp: { $gte: parsedStartDate, $lte: parsedEndDate },
    }).sort({ entryId: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/data/singleDate", async (req, res) => {
  try {
    // Extract date from query parameters
    const { date } = req.query;

    // Parse the date
    const parsedDate = date ? new Date(date) : null;

    // Check if date is provided
    if (!parsedDate) {
      return res.status(400).json({ error: "Please provide a valid date." });
    }

    // Convert the parsed date to a string in the format YYYY-MM-DD
    const dateString = parsedDate.toISOString().split("T")[0];

    // Fetch data from MongoDB for the specified date
    const data = await Data.find({
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          dateString,
        ],
      },
    }).sort({ entryId: 1 });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define API endpoint to get last data's date and retrieve data for that day
// Fetch the last 48 entries

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
