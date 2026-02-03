
// Add to src/components/Course/RelatedCourses.jsx

import { Link } from 'react-router-dom';
import { memo } from 'react';

const RelatedCourses = memo(function RelatedCourses({ 
  currentCourse, 
  university, 
  category 
}) {
  // Get related courses from the same university
  const sameUniversityCourses = [
    // TODO: Fetch from data
  ];

  // Get same course from other universities
  const otherUniversities = [
    // TODO: Fetch from data
  ];

  return (
    <section className="mt-12 bg-gray-50 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Same University */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            More courses at {university}
          </h3>
          <ul className="space-y-2">
            {sameUniversityCourses.map(course => (
              <li key={course.slug}>
                <Link 
                  to={`/universities/${university}/courses/${course.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {course.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Universities */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {currentCourse} at other universities
          </h3>
          <ul className="space-y-2">
            {otherUniversities.map(uni => (
              <li key={uni.slug}>
                <Link 
                  to={`/universities/${uni.slug}/courses/${currentCourse}`}
                  className="text-blue-600 hover:underline"
                >
                  {uni.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Comparison Link */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <Link 
          to={`/courses/compare/${category}`}
          className="inline-flex items-center text-blue-600 font-semibold hover:underline"
        >
          Compare all {category} programs →
        </Link>
      </div>
    </section>
  );
});

export default RelatedCourses;
