import React, { createContext, useState, useEffect } from "react";

// Criando o contexto
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Estado para armazenar a localização formatada

  useEffect(() => {
    // Função para obter a localização do usuário e realizar geocodificação reversa
    const fetchLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              // Realizando a geocodificação reversa para obter o endereço completo
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
              );
              const data = await response.json();

              // Formatar o endereço retornado pela geocodificação
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

              // Atualizando o estado com o endereço formatado
              setLocation(formattedAddress);
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
  }, []); // O array vazio faz com que isso seja executado apenas uma vez quando o componente for montado

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
