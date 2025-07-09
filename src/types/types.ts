
export type SectionTypeId =
  | 'experience'
  | 'education'
  | 'skills'
  | 'certificates'
  | 'about';

export interface SectionType {
  id: SectionTypeId;
  name: string;
  fields: string[];
}

export interface Section {
  id: string;
  type: SectionTypeId;
  data: Record<string, string>;
}

export interface sectionProps {
  section: Section;
  index: number;
  sectionTypes: SectionType[];
  updateSection: (id: string, data: Record<string, string>) => void;
  deleteSection: (id: string) => void;
  insertSample: (id: string, type: Section["type"]) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
}