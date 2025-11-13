import { createContext, useContext, useState, useEffect } from 'react';
import niuData from '../../data/universities/niu.json';
import shardaData from '../../data/universities/sharda.json';
import chandigarhData from '../../data/universities/chandigarh.json';
import galgotiasData from '../../data/universities/galgotias.json';
import { courseSlug, universitySlug, courseSlugWithUniversity } from '../utils/slugify';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [universities, setUniversities] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load and process university data
    const processedUniversities = [
      { ...niuData, id: 'niu' },
      { ...shardaData, id: 'sharda' },
      { ...chandigarhData, id: 'chandigarh' },
      { ...galgotiasData, id: 'galgotias' }
    ].map(uni => ({
      ...uni,
      slug: universitySlug(uni),
      programs: (uni.programs || []).map(program => ({
        ...program,
        universityId: uni.id,
        universityName: uni.name,
        universitySlug: universitySlug(uni),
        slug: courseSlug(program), // Course-only slug for backward compatibility
        fullSlug: courseSlugWithUniversity(program, uni) // Full slug with university
      }))
    }));

    setUniversities(processedUniversities);

    // Flatten all programs
    const programs = processedUniversities.flatMap(uni =>
      uni.programs.map(program => ({
        ...program,
        universitySlug: program.universitySlug || uni.slug, // Ensure universitySlug is present
        university: {
          id: uni.id,
          name: uni.name,
          shortName: uni.shortName,
          slug: uni.slug,
          location: uni.location,
          profile: uni.profile
        }
      }))
    );

    setAllPrograms(programs);
    setLoading(false);
  }, []);

  const getUniversityById = (id) => {
    return universities.find(u => u.id === id);
  };

  const getUniversityBySlug = (slug) => {
    return universities.find(u => u.slug === slug);
  };

  const getProgramBySlug = (slug) => {
    return allPrograms.find(p => p.slug === slug);
  };

  const getProgramByUniversityAndCourse = (universitySlug, courseSlug) => {
    return allPrograms.find(p => 
      p.universitySlug === universitySlug && p.slug === courseSlug
    );
  };

  const getProgramsByUniversity = (universityId) => {
    return allPrograms.filter(p => p.universityId === universityId);
  };

  return (
    <DataContext.Provider
      value={{
        universities,
        allPrograms,
        loading,
        getUniversityById,
        getUniversityBySlug,
        getProgramBySlug,
        getProgramByUniversityAndCourse,
        getProgramsByUniversity
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}

