import { useState, useEffect, useCallback } from "react";
import type { Theme } from "../data/theme";
import html2pdf from "html2pdf.js";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) || typeof parsed === "object") {
          setValue(parsed);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setInitialized(true);
  }, [key]);

  useEffect(() => {
    if (initialized) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    }
  }, [value, initialized, key]);

  return [value, setValue] as const;
};

export const useDragAndDrop = <T>(
  items: T[],
  setItems: (items: T[]) => void
) => {
  const handleDragStart = useCallback((e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      const dragIndex = Number(e.dataTransfer.getData("index"));
      const updated = [...items];
      const [moved] = updated.splice(dragIndex, 1);
      updated.splice(dropIndex, 0, moved);
      setItems(updated);
    },
    [items, setItems]
  );

  return { handleDragStart, handleDrop };
};

export const useExportToPDF = (
  elementId: string,
  theme: Theme,
  themeColors: Record<Theme, { border: string; title: string; heading: string }>
) => {
  const downloadPDF = useCallback(async () => {
    const element = document.getElementById(elementId);
    if (!element || typeof html2pdf !== "function") return;

    try {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.fontFamily = "Arial, sans-serif";
      clone.style.border = `2px solid ${themeColors[theme].border}`;
      clone.style.padding = "24px";
      clone.querySelector("h1")!.style.color = themeColors[theme].title;
      clone.querySelectorAll("h2").forEach((h2) => {
        (h2 as HTMLElement).style.color = themeColors[theme].heading;
      });
      clone.querySelectorAll("*").forEach((el) => el.removeAttribute("class"));

      await (
        html2pdf()
          .from(clone)
          .set({
            filename: "резюме.pdf",
            margin: 10,
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            html2canvas: { scale: 1.5, useCORS: true, logging: false },
          }) as any
      ).save();
    } catch (error) {
      console.log(error);
    }
  }, [elementId, theme, themeColors]);

  return downloadPDF;
};
