const express=require("express");
const app=express();
const port=3000;
app.use(express.json()); // Add this before routes


const { db, admin } = require("./firebase"); // Import both db and admin
 // Import Firestore instance

// Function to add a planet
const addPlanet = async (info) => {
    const {name,speed,size,orbitDistance}=info;
    const planetRef = db.collection("planets").doc(name); // You can use .doc() to assign a custom ID

  await planetRef.set({
    name: name,
    speed: speed, // km/s
    size: size, // Diameter in km
    orbitDistance: orbitDistance, // Million km from the Sun
    createdAt: admin.firestore.Timestamp.now(),
  });

  console.log("Planet added!");
};




app.post("/add-planet", async (req, res) => {  
    try {
        const info = req.body;
        console.log(info);
        await addPlanet(info);  
        res.status(201).json({ message: "Planet added successfully!" });
    } catch (error) {
        console.error("Error adding planet:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/planets", async (req, res) => {
    try {
        const snapshot = await db.collection("planets").get();
        const planets = snapshot.docs.map(doc => doc.data()); 
        
        res.status(200).json(planets);
    } catch (error) {
        console.error("Error fetching planets:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.get("/check-db", async (req, res) => {
    try {
        await db.collection("test-connection").doc("ping").set({ status: "connected", time: new Date() });
        res.status(200).json({ message: "✅ Firestore is connected!" });
    } catch (error) {
        console.error("❌ Firestore connection failed:", error);
        res.status(500).json({ error: "❌ Firestore connection failed!" });
    }
});

app.listen(port);