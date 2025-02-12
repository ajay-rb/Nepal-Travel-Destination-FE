import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCreateDestination = () => {
  const [loading, setLoading] = useState(false);

  const createDestination = async ({ name, description, imageUrl, tags }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/destinations`,
        { name, description, image_url: imageUrl, tags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Destination added successfully!");
      return true; 
    } catch (error) {
      toast.error("Error adding destination.");
      return false; 
    } finally {
      setLoading(false);
    }
  };

  return { createDestination, loading };
};

export default useCreateDestination;
