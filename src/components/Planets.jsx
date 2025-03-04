import { useEffect, useState } from "react";

export default function Planets() {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        fetchPlanets();
    }, []);

    const fetchPlanets = async () => {
        try {
            const response = await fetch("http://localhost:3000/planets");
            const data = await response.json();
            setPlanets(data);
        } catch (error) {
            console.error("Error fetching planets:", error);
        }
    };

    return (
        <div>
            <h1>Planets in the Solar System</h1>
            {planets.length === 0 ? (
                <p>Loading planets...</p>
            ) : (
                <ul>
                    {planets.map((planet, index) => (
                        <li key={index}>
                            <h2>{planet.name}</h2>
                            <p><strong>Speed:</strong> {planet.speed} km/s</p>
                            <p><strong>Size:</strong> {planet.size} km (diameter)</p>
                            <p><strong>Orbit Distance:</strong> {planet.orbitDistance} million km from the Sun</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
