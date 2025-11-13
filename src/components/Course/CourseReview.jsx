/**
 * Course Review Component
 * Provides detailed review and comprehensive information about a course
 */

export default function CourseReview({ program, university }) {
  // Generate comprehensive course information
  const courseInfo = {
    overview: `The ${program.name} program at ${university.name} is a comprehensive ${program.duration}-year ${program.degree} program designed to provide students with in-depth knowledge and practical skills in ${program.field || 'their chosen field'}. This program combines rigorous theoretical learning with hands-on experience, industry exposure, and research opportunities to prepare students for successful careers in their chosen domain.`,
    
    curriculum: `The curriculum is carefully structured and regularly updated to align with industry standards and emerging trends. Students will engage in a balanced mix of coursework, laboratory sessions, workshops, projects, internships, and research activities. The program emphasizes both foundational knowledge and specialized skills, ensuring graduates are well-prepared for the professional world. The teaching methodology includes lectures, case studies, group discussions, presentations, and practical assignments.`,
    
    learningOutcomes: [
      `Master core concepts and principles in ${program.field || 'the field'}`,
      `Develop practical skills through hands-on projects and laboratory work`,
      `Gain industry exposure through internships and industry collaborations`,
      `Build problem-solving and critical thinking abilities`,
      `Develop communication and teamwork skills`,
      `Understand ethical practices and professional responsibilities`
    ],
    
    careerProspects: [
      'Graduates can pursue careers in various industries',
      'Strong placement support and industry connections',
      'Opportunities for higher studies and research',
      'Entrepreneurship and startup opportunities',
      'International career prospects'
    ],
    
    whyChoose: [
      `Quality education from ${university.name}, ranked ${university.profile?.rankings?.nirf || 'highly'} in NIRF`,
      `Generous scholarships available for Bangladeshi students`,
      `Modern infrastructure and well-equipped laboratories`,
      `Experienced faculty with industry expertise`,
      `Strong industry partnerships and placement assistance`,
      `International exposure and exchange programs`
    ],
    
    admissionProcess: [
      'Submit application through Western Bangla Education (WBE)',
      'Provide academic transcripts and required documents',
      'Scholarship eligibility will be determined based on GPA',
      'Receive admission letter and visa support documents',
      'Complete visa application with WBE assistance',
      'Arrive in India and begin your academic journey'
    ]
  };

  return (
    <div className="course-review space-y-8">
      {/* Course Overview */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Course Overview & Curriculum</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="text-lg leading-relaxed mb-4">{courseInfo.overview}</p>
          <p className="leading-relaxed mb-4">{courseInfo.curriculum}</p>
          
          <h3 className="text-xl font-bold mt-6 mb-3">Learning Outcomes</h3>
          <p className="mb-3">Upon completion of this program, students will be able to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            {courseInfo.learningOutcomes.map((outcome, index) => (
              <li key={index}>{outcome}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Choose This Course */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Why Choose This Course?</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <ul className="space-y-3">
            {courseInfo.whyChoose.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-3 font-bold">✓</span>
                <span className="text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Career Prospects */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Career Prospects & Opportunities</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 mb-4 text-lg">
            Graduates of {program.name} from {university.name} have excellent career opportunities across various sectors. 
            The program prepares students for both technical and managerial roles, with strong placement support and industry connections.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold mb-2">Employment Sectors:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Private sector companies and MNCs</li>
                <li>• Government organizations and PSUs</li>
                <li>• Research and development institutions</li>
                <li>• Startups and entrepreneurship</li>
                <li>• Higher education and academia</li>
                <li>• International opportunities</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Career Growth:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                {courseInfo.careerProspects.map((prospect, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>{prospect}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {program.careerProspects && program.careerProspects.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold mb-3">Specific Job Roles:</h4>
              <div className="flex flex-wrap gap-2">
                {program.careerProspects.map((career, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t bg-gray-50 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong>Placement Support:</strong> {university.name} provides comprehensive placement assistance, 
              including resume building, interview preparation, and industry connections. The university has strong 
              relationships with leading companies and organizations, ensuring excellent placement opportunities for graduates.
            </p>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      {program.highlights && program.highlights.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Program Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {program.highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-start"
              >
                <span className="text-yellow-500 mr-3 text-xl">★</span>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Admission Process */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Admission Process & Requirements</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 mb-4 text-lg">
            Applying to {program.name} at {university.name} through Western Bangla Education is simple, free, and hassle-free. 
            We handle all the paperwork, documentation, and provide complete support throughout the entire admission process.
          </p>
          
          <h3 className="font-semibold text-lg mb-3">Step-by-Step Admission Process:</h3>
          <ol className="space-y-3 mb-6">
            {courseInfo.admissionProcess.map((step, index) => (
              <li key={index} className="flex items-start bg-white p-3 rounded-lg">
                <span className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700 pt-1">{step}</span>
              </li>
            ))}
          </ol>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-2">Required Documents:</h3>
            <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
              <li>Academic transcripts (SSC and HSC or equivalent)</li>
              <li>Passport (valid for at least 6 months)</li>
              <li>Passport-size photographs</li>
              <li>Birth certificate</li>
              <li>Medical fitness certificate</li>
              <li>Financial documents (as required)</li>
              <li>Any other documents as specified by the university</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3">
              <strong>Note:</strong> WBE will guide you through the complete document preparation and verification process. 
              All services are provided free of charge.
            </p>
          </div>
        </div>
      </section>

      {/* University Information */}
      <section>
        <h2 className="text-2xl font-bold mb-4">About {university.name}</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Location</div>
              <div className="font-semibold">{university.location}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Established</div>
              <div className="font-semibold">{university.established || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">NIRF Ranking</div>
              <div className="font-semibold">{university.profile?.rankings?.nirf || 'N/A'}</div>
            </div>
            {university.profile?.rankings?.naac && (
              <div>
                <div className="text-sm text-gray-600 mb-1">NAAC Accreditation</div>
                <div className="font-semibold">{university.profile.rankings.naac}</div>
              </div>
            )}
          </div>
          
          {university.profile?.highlights && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold mb-2">University Highlights:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {university.profile.highlights.slice(0, 5).map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Scholarship Information */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Scholarship Information</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <p className="text-gray-700 mb-4">
            {university.name} offers generous scholarships for Bangladeshi students. 
            {university.id === 'niu' 
              ? ' All Bangladeshi students are eligible for a flat 50% scholarship regardless of GPA.'
              : university.id === 'sharda'
              ? ' Scholarships are based on GPA, with up to 50% available for students with GPA 3.5 and above.'
              : ' Scholarship details vary by program. Check the fee breakdown above for specific scholarship information.'
            }
          </p>
          <div className="bg-white rounded-lg p-4 mt-4">
            <h4 className="font-semibold mb-2">Benefits of Scholarships:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Significant reduction in tuition fees</li>
              <li>• Makes quality education more affordable</li>
              <li>• No separate scholarship application required</li>
              <li>• Automatically applied based on eligibility</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

