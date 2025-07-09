import React from "react";
import type { sectionProps } from "../types/types";

const SectionBlock: React.FC<sectionProps> = ({
  section,
  index,
  sectionTypes,
  updateSection,
  deleteSection,
  insertSample,
  onDragStart,
  onDrop,
}) => {
  const meta = sectionTypes.find((t) => t.id === section.type)!;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
      className="mb-4 p-4 bg-white rounded shadow"
    >
      <h2 className="text-lg font-semibold">{meta.name}</h2>
      {meta.fields.map((field) => (
        <div key={field} className="mb-2">
          <label className="block text-sm">{field}</label>
          <input
            type="text"
            value={section.data[field] || ""}
            onChange={(e) =>
              updateSection(section.id, {
                ...section.data,
                [field]: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>
      ))}
      <div className="flex gap-2">
        <button
          onClick={() => deleteSection(section.id)}
          className="p-2 bg-red-500 text-white rounded"
        >
          Удалить
        </button>
        <button
          onClick={() => insertSample(section.id, section.type)}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Автозаполнение
        </button>
      </div>
    </div>
  );
};

export default React.memo(SectionBlock);
