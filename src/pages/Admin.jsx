import React, { useState } from "react";
import useCreateDestination from "../hooks/useCreateDestination"; 
import BackButton from "../components/BackButton";
import Navbar from "../components/Navbar";

const Admin = () => {
  const { createDestination, loading } = useCreateDestination(); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");

  const handleAddDestination = async (e) => {
    e.preventDefault();
    const success = await createDestination({
      name,
      description,
      imageUrl,
      tags,
    });

    if (success) {
      setName("");
      setDescription("");
      setImageUrl("");
      setTags("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <BackButton />

      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Panel - Add Destination
      </h1>

      <form
        className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg"
        onSubmit={handleAddDestination}
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 mb-3 rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full border p-2 mb-3 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {loading ? "Adding..." : "Add Destination"}
        </button>
      </form>
    </div>
  );
};

export default Admin;
