"use client";

export default function ItemTable({ items = [], columns = [], endpoint }) {
  const handleDelete = async (id) => {
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    location.reload();
  };

  return (
    <div className="overflow-x-auto rounded-3xl border border-white/10">
      <table className="w-full">
        <thead className="bg-white/5">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-sm">{col.label}</th>
            ))}
            <th className="px-4 py-3 text-left text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t border-white/10">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-white/70">
                  {Array.isArray(item[col.key]) ? item[col.key].join(", ") : item[col.key]}
                </td>
              ))}
              <td className="px-4 py-3">
                <button onClick={() => handleDelete(item._id)} className="text-red-400">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}