import { useState, useCallback } from 'react';
import { useLocalStorage, useDragAndDrop, useExportToPDF } from './hooks/hooks';
import SectionBlock from './components/SectionBlock';

import type { Theme } from './data/theme';
import type { Section, SectionTypeId } from './types/types';

import { sectionTypes, sampleData } from './data/resumeData';
import { themeColors } from './data/theme';

const App: React.FC = () => {
  const [sections, setSections] = useLocalStorage<Section[]>('resume', []);
  const [theme, setTheme] = useState<Theme>('blue');
  const { handleDragStart, handleDrop } = useDragAndDrop(sections, setSections);
  const downloadPDF = useExportToPDF('preview', theme, themeColors);

  const addSection = useCallback((type: SectionTypeId) => {
    const meta = sectionTypes.find((t) => t.id === type);
    if (!meta) return;

    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      data: meta.fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
    };
    setSections((prev) => [...prev, newSection]);
  }, [setSections]);

  const updateSection = useCallback((id: string, data: Record<string, string>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, data } : s)));
  }, [setSections]);

  const deleteSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }, [setSections]);

  const insertSample = useCallback((id: string, type: SectionTypeId) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, data: sampleData[type] } : s))
    );
  }, [setSections]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/2 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Редактор резюме</h1>
        <div className="mb-4">
          <select
            onChange={(e) => addSection(e.target.value as SectionTypeId)}
            className="p-2 border rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Добавить секцию
            </option>
            {sectionTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="ml-2 p-2 border rounded"
            value={theme}
          >
            <option value="blue">Синий</option>
            <option value="green">Зеленый</option>
            <option value="purple">Фиолетовый</option>
          </select>
          <button
            onClick={downloadPDF}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Сохранить как PDF
          </button>
        </div>

        {sections.map((section, index) => (
          <SectionBlock
            key={section.id}
            section={section}
            index={index}
            sectionTypes={sectionTypes}
            updateSection={updateSection}
            deleteSection={deleteSection}
            insertSample={insertSample}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <div
        id="preview"
        className="w-1/2 p-6 bg-white overflow-y-auto"
        style={{
          fontFamily: 'Arial, sans-serif',
          border: `2px solid ${themeColors[theme].border}`,
        }}
      >
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: themeColors[theme].title }}
        >
          Резюме
        </h1>

        {sections.map((section) => (
          <div key={section.id} className="mb-4">
            <h2
              className="text-lg font-semibold"
              style={{ color: themeColors[theme].heading }}
            >
              {sectionTypes.find((t) => t.id === section.type)?.name}
            </h2>
            {Object.entries(section.data).map(([key, value]) =>
              value ? (
                <p key={key} className="text-sm">
                  {key}: {value}
                </p>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
