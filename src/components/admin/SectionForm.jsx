"use client";

import { useState } from "react";

export default function SectionForm({ fields, endpoint, initialData = {} }) {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    alert("Saved successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-6">
      <div className="grid gap-4">
        {fields.map((field) =>
          field.type === "textarea" ? (
            <textarea
              key={field.name}
              name={field.name}
              placeholder={field.label}
              className="input min-h-32"
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          ) : (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.label}
              className="input"
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          )
        )}
      </div>
      <button className="btn-primary mt-6">Save</button>
    </form>
  );
}