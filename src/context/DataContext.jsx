import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { courseSlug, universitySlug, courseSlugWithUniversity } from '../utils/slugify';

/* eslint-disable react-refresh/only-export-components */
const DataContext = createContext();

/**
 * Data Provider - Loads university data with dynamic imports for bundle splitting
 * Data is loaded asynchronously to reduce initial bundle size
 */
export function DataProvider({ children }) {
  const [universities, setUniversities] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic imports for code splitting - reduces initial bundle by ~350KB
    const loadData = async () => {
      try {
        const [niuData, shardaData, chandigarhData, galgotiasData] = await Promise.all([
          import('../../data/universities/niu.json').then(m => m.default),
          import('../../data/universities/sharda.json').then(m => m.default),
          import('../../data/universities/chandigarh.json').then(m => m.default),
          import('../../data/universities/galgotias.json').then(m => m.default),
        ]);

        const processUniversities = () => {
          return [
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
              slug: courseSlug(program),
              fullSlug: courseSlugWithUniversity(program, uni)
            }))
          }));
        };

        const processedUniversities = processUniversities();
        setUniversities(processedUniversities);

        // Flatten all programs
        const programs = processedUniversities.flatMap(uni =>
          uni.programs.map(program => ({
            ...program,
            universitySlug: program.universitySlug || uni.slug,
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
      } catch (error) {
        console.error('Failed to load university data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoize getter functions to prevent unnecessary re-renders
  // Create lookup maps for O(1) access instead of O(n) searches
  const universitiesByIdMap = useMemo(() => {
    const map = new Map();
    universities.forEach(uni => {
      map.set(uni.id, uni);
      map.set(uni.slug, uni);
    });
    return map;
  }, [universities]);

  const programsBySlugMap = useMemo(() => {
    const map = new Map();
    allPrograms.forEach(program => {
      map.set(program.slug, program);
      const fullKey = `${program.universitySlug}:${program.slug}`;
      map.set(fullKey, program);
    });
    return map;
  }, [allPrograms]);

  const programsByUniversityMap = useMemo(() => {
    const map = new Map();
    allPrograms.forEach(program => {
      if (!map.has(program.universityId)) {
        map.set(program.universityId, []);
      }
      map.get(program.universityId).push(program);
    });
    return map;
  }, [allPrograms]);

  // Memoized getter functions using the lookup maps
  const getUniversityById = useMemo(() => {
    return (id) => {
      return universitiesByIdMap.get(id) || universities.find(u => u.id === id);
    };
  }, [universitiesByIdMap, universities]);

  const getUniversityBySlug = useMemo(() => {
    return (slug) => {
      return universitiesByIdMap.get(slug) || universities.find(u => u.slug === slug);
    };
  }, [universitiesByIdMap, universities]);

  const getProgramBySlug = useMemo(() => {
    return (slug) => {
      return programsBySlugMap.get(slug) || allPrograms.find(p => p.slug === slug);
    };
  }, [programsBySlugMap, allPrograms]);

  const getProgramByUniversityAndCourse = useMemo(() => {
    return (universitySlug, courseSlug) => {
      const key = `${universitySlug}:${courseSlug}`;
      return programsBySlugMap.get(key) || allPrograms.find(p => 
        p.universitySlug === universitySlug && p.slug === courseSlug
      );
    };
  }, [programsBySlugMap, allPrograms]);

  const getProgramsByUniversity = useMemo(() => {
    return (universityId) => {
      return programsByUniversityMap.get(universityId) || allPrograms.filter(p => p.universityId === universityId);
    };
  }, [programsByUniversityMap, allPrograms]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    universities,
    allPrograms,
    loading,
    getUniversityById,
    getUniversityBySlug,
    getProgramBySlug,
    getProgramByUniversityAndCourse,
    getProgramsByUniversity
  }), [
    universities,
    allPrograms,
    loading,
    getUniversityById,
    getUniversityBySlug,
    getProgramBySlug,
    getProgramByUniversityAndCourse,
    getProgramsByUniversity
  ]);

  return (
    <DataContext.Provider value={contextValue}>
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

