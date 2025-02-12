import React, { useState, useEffect } from "react";
import { Send } from "lucide-react";
import "./parrainage.css";
import NavBar from "./navBar";

export default function Parrainage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    const referralLink = `https://ton-site.com/parrainage?ref=${formData.email}`;

    const requestData = {
      recipient: formData.email,
      senderName: `${formData.prenom} ${formData.nom}`,
      referralLink: referralLink,
    };

    try {
      const response = await fetch("/api/send-invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ nom: "", prenom: "", email: "" });

        // Supprime le message de succès après 3 secondes
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await response.json();
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      setError("Impossible d'envoyer le message.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
      document.body.classList.add("no-scroll");
    
      return () => {
        document.body.classList.remove("no-scroll"); // Nettoyage quand on quitte la page
      };
    }, []);

  return (
    <div className="parrainage-main">
      <div className="parrainage-navBar">
        <NavBar />
      </div>
      <div className="parrainage-container">
        <div className="parrainage-card shadow-lg p-6 bg-white rounded-lg">
          <h1 className="parrainage-title text-2xl font-bold mb-4">
            Programme de Parrainage 🎉
          </h1>

          <form onSubmit={handleSubmit} className="parrainage-form space-y-4">
            <div className="form-group">
              <label htmlFor="nom" className="block font-medium">
                Nom
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom" className="block font-medium">
                Prénom
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="Votre prénom"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block font-medium">
                Email du filleul
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="filleul@email.com"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer l'invitation"}
              <Send size={20} />
            </button>

            {success && (
              <p className="text-green-500 text-center mt-4 animate-fadeIn">
                🎉 Email envoyé avec succès !
              </p>
            )}
            {error && (
              <p className="text-red-500 text-center mt-4 animate-fadeIn">
                {error}
              </p>
            )}
          </form>

          <p className="parrainage-footer text-gray-600 text-sm mt-4">
            Partagez votre lien et gagnez des récompenses ! 🎁
          </p>
        </div>
      </div>
    </div>
  );
}
