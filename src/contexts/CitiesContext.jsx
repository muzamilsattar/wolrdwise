import { createContext, useContext, useEffect, useState } from "react";
// Import Supabase client
import { supabase } from "../supabase/supabase";
// console.log(supabase);

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  // Fetch all cities from Supabase
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("cities") // Supabase table name
          .select("*"); // Select all columns from the 'cities' table
        console.log(data);

        if (error) throw error;

        setCities(data);
      } catch (error) {
        alert("Something went wrong fetching cities: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Get a single city by ID
  async function getCity(id) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("cities") // Supabase table name
        .select("*")
        .eq("id", id) // Use `.eq` to filter by ID
        .single(); // Get only one result

      if (error) throw error;

      setCurrentCity(data);
    } catch (error) {
      alert("Something went wrong fetching the city: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Create a new city in Supabase
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("cities") // Supabase table name
        .insert([newCity])
        .select("*"); // Insert new city

      if (error) throw error;

      setCities((cities) => [...cities, ...data]);
      // setCities((cities) => {
      //   if (data && data[0]) {
      //     return [...cities, data[0]];
      //   }
      //   return cities; // Return the current cities array if data is invalid
      // });
      console.log(cities);
    } catch (error) {
      alert("Something went wrong creating the new city: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Delete a city by ID
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const { error } = await supabase
        .from("cities") // Supabase table name
        .delete()
        .eq("id", id); // Use `.eq` to filter by ID

      if (error) throw error;

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("Something went wrong deleting the city: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        setCurrentCity,
        createCity,
        deleteCity
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
