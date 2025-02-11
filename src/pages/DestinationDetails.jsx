import React from "react";
import { useParams } from "react-router-dom";
import useFetchDestinations from "../hooks/useFetchDestinations";
import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar";

const DestinationDetails = () => {
  const { id } = useParams();

  const { data: destination, loading, error } = useFetchDestinations({ id });

  if (loading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!destination)
    return <p className="text-center text-gray-500">Destination not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <BackButton />

      <h1 className="text-3xl font-bold">{destination.name}</h1>
      <img
        src={destination.image_url}
        alt={destination.name}
        className="w-full max-h-96 object-cover rounded-lg mt-4"
      />
      <p className="mt-4 text-lg">{destination.description}</p>
    </div>
  );
};

export default DestinationDetails;
