/**
 * Curriculum Structure Component
 * Displays syllabus, total credits, and semester-wise course structure
 */

export default function CurriculumStructure({ program }) {
  if (!program?.curriculum) {
    return null;
  }

  const { curriculum } = program;
  const { totalCredits, syllabusUrl, description, semesters } = curriculum;

  return (
    <section className="curriculum-structure py-4 sm:py-6 md:py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Curriculum Structure</h2>
        
        {/* Overview */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Credits</h3>
              <p className="text-2xl font-bold text-blue-600">{totalCredits}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">Duration</h3>
              <p className="text-2xl font-bold text-blue-600">{program.duration} Years</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-1">Semesters</h3>
              <p className="text-2xl font-bold text-blue-600">{semesters?.length || program.duration * 2}</p>
            </div>
          </div>
          
          {description && (
            <p className="text-gray-700 mb-4">{description}</p>
          )}
          
          {syllabusUrl && (
            <a
              href={syllabusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
            >
              Download Complete Syllabus PDF →
            </a>
          )}
        </div>

        {/* Semester-wise Course Structure */}
        {semesters && semesters.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Semester-wise Course Structure</h3>
            
            {semesters.map((semester) => (
              <div key={semester.semester} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white px-4 sm:px-6 py-3 sm:py-4">
                  <h4 className="text-lg sm:text-xl font-bold">
                    Semester {semester.semester} ({semester.credits} Credits)
                  </h4>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {semester.courses?.map((course, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {course.code}
                          </span>
                          <span className="text-xs font-semibold text-blue-600">
                            {course.credits} Credits
                          </span>
                        </div>
                        <h5 className="font-semibold text-gray-800 mb-2">{course.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${
                          course.type === 'Theory' ? 'bg-blue-100 text-blue-700' :
                          course.type === 'Practical' ? 'bg-green-100 text-green-700' :
                          course.type === 'Project' ? 'bg-purple-100 text-purple-700' :
                          course.type === 'Elective' ? 'bg-yellow-100 text-yellow-700' :
                          course.type === 'Internship' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {course.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

