import type {SectionType, SectionTypeId } from '../types/types';

export const sectionTypes: SectionType[] = [
  { id: 'experience', name: 'Опыт работы', fields: ['Должность', 'Компания', 'Период', 'Описание'] },
  { id: 'education', name: 'Образование', fields: ['Учебное заведение', 'Степень', 'Период'] },
  { id: 'skills', name: 'Навыки', fields: ['Навыки'] },
  { id: 'certificates', name: 'Сертификаты', fields: ['Название', 'Организация', 'Дата'] },
  { id: 'about', name: 'О себе', fields: ['Описание'] }
];

export const sampleData: Record<SectionTypeId, Record<string, string>> = {
  experience: { Должность: 'Разработчик', Компания: 'Тех Корп', Период: '2020-2023', Описание: 'Разработка веб-приложений' },
  education: { 'Учебное заведение': 'Университет', Степень: 'Информатика', Период: '2016-2020' },
  skills: { Навыки: 'JavaScript, React, Node.js' },
  certificates: { Название: 'React Professional', Организация: 'Онлайн Академия', Дата: '2022' },
  about: { Описание: 'Энтузиаст веб-разработки' }
};