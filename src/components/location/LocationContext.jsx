import React, { createContext, useState, useEffect } from "react";
import "../filtro/filtro.css"; // Importação correta do CSS

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(""); // Agora o estado começa como string vazia
  const [isLocationSet, setIsLocationSet] = useState(false); // Estado booleano para alterar a classe CSS

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
              );
              const data = await response.json();

              const {
                road,
                house_number,
                suburb,
                city,
                state,
                postcode,
                country,
              } = data.address;

              const formattedAddress = [
                road,
                house_number,
                suburb,
                city,
                state,
                postcode,
                country,
              ]
                .filter(Boolean)
                .join(", ");

              setLocation(formattedAddress);
              setIsLocationSet(true);
            },
            (error) => {
              console.error("Erro ao obter localização:", error);
            }
          );
        } else {
          console.error("Geolocalização não suportada pelo navegador");
        }
      } catch (error) {
        console.error("Erro ao buscar localização:", error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation, isLocationSet }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
