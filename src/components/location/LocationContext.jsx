import React, { createContext, useState, useEffect } from "react";

// Criando o contexto
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Função para obter a localização do usuário
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const newLocation = `${latitude.toFixed(5)}, ${longitude.toFixed(
                5
              )}`;
              setLocation(newLocation);
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
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
