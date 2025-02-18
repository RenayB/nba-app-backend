import express from "express";
import cors from "cors";
import { BalldontlieAPI } from "@balldontlie/sdk";

// Initialize the API client
const api = new BalldontlieAPI({ apiKey: "TODO" });

const app = express();
const port = 5001;

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// Endpoint to search for a player
app.get("/player", async (req, res) => {
  try {
    const playerFirstName: string = String(req.query.firstName).trim();
    const playerLastName: string = String(req.query.lastName).trim();

    if (!playerFirstName || !playerLastName) {
      return res.status(400).json({ error: "First name and last name are required" });
    }

    const response = await api.nba.getPlayers({
      search: encodeURIComponent(playerFirstName),
    });

    const player = response.data.find(
        (player: { first_name: string; last_name: string }) =>
          player.first_name.toLowerCase() === playerFirstName.toLowerCase() &&
          player.last_name.toLowerCase() === playerLastName.toLowerCase()
    );

    if (player) {
      res.json({ player });
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching player data" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
















// import { BalldontlieAPI } from "@balldontlie/sdk";

// const api = new BalldontlieAPI({ apiKey: " f6638c15-39dd-48cc-9e9d-8f47ee93211d" });

// const playerFirstName: string = String("lebron").trim();
// const playerLastName: string = String("james").trim();

// api.nba
//   .getPlayers({ search: encodeURIComponent(playerFirstName) })
//   .then((response) => {
//     const player = response.data.find((player: { last_name: string }) => 
//       player.last_name.toLowerCase() === playerLastName.toLowerCase()
//     );

//     if (player) {
//       console.log("Player found:", player);
//       // Store the player data if needed
//       const foundPlayer = player;
//     } else {
//       console.log("Player not found");
//     }
//   })
//   .catch((error) => console.error(error));

