import ScarcityMessage from './ScarcityMessage';

/**
 * ScarcityMessage Component Examples
 * Feature: sharda-university-content-enhancement
 */

export default function ScarcityMessageExamples() {
  return (
    <div className="space-y-8 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        ScarcityMessage Component Examples
      </h1>

      {/* Example 1: Limited Seats - Urgent (Very Few Seats) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">1. Limited Seats - Urgent (5 seats remaining)</h2>
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={5}
          program="B.Tech Computer Science"
          variant="urgent"
        />
      </section>

      {/* Example 2: Limited Seats - Warning (Moderate) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">2. Limited Seats - Warning (25 seats remaining)</h2>
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={25}
          program="MBA"
          variant="warning"
        />
      </section>

      {/* Example 3: Limited Seats - Without Program Name */}
      <section>
        <h2 className="text-xl font-semibold mb-4">3. Limited Seats - General (No Program)</h2>
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={12}
          variant="urgent"
        />
      </section>

      {/* Example 4: Early Bird Benefits */}
      <section>
        <h2 className="text-xl font-semibold mb-4">4. Early Bird Benefits</h2>
        <ScarcityMessage
          type="early-bird"
          variant="info"
        />
      </section>

      {/* Example 5: Scholarship Priority */}
      <section>
        <h2 className="text-xl font-semibold mb-4">5. Scholarship Priority</h2>
        <ScarcityMessage
          type="scholarship-priority"
          variant="warning"
        />
      </section>

      {/* Example 6: Hostel Priority */}
      <section>
        <h2 className="text-xl font-semibold mb-4">6. Hostel Priority</h2>
        <ScarcityMessage
          type="hostel-priority"
          variant="info"
        />
      </section>

      {/* Example 7: Custom Message */}
      <section>
        <h2 className="text-xl font-semibold mb-4">7. Custom Message</h2>
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={8}
          message="🎓 Only 8 seats left for international students in this program! Don't miss this opportunity."
          variant="urgent"
        />
      </section>

      {/* Example 8: Without Icon */}
      <section>
        <h2 className="text-xl font-semibold mb-4">8. Without Icon</h2>
        <ScarcityMessage
          type="early-bird"
          variant="info"
          showIcon={false}
        />
      </section>

      {/* Example 9: Single Seat Remaining */}
      <section>
        <h2 className="text-xl font-semibold mb-4">9. Single Seat Remaining (Grammar Check)</h2>
        <ScarcityMessage
          type="limited-seats"
          seatsRemaining={1}
          program="MBBS"
          variant="urgent"
        />
      </section>

      {/* Example 10: Truthfulness Validation - Invalid Cases */}
      <section>
        <h2 className="text-xl font-semibold mb-4">10. Truthfulness Validation (These Won't Render)</h2>
        <div className="space-y-4 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            The following examples demonstrate truthfulness validation. They won't render because they lack required data:
          </p>
          
          {/* This won't render - no seatsRemaining */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded">
            <p className="text-xs text-gray-500 mb-2">❌ No seatsRemaining provided:</p>
            <ScarcityMessage
              type="limited-seats"
              program="B.Tech CSE"
              variant="urgent"
            />
            <p className="text-xs text-gray-500 mt-2 italic">
              (Nothing renders above - component validates data)
            </p>
          </div>

          {/* This won't render - zero seats */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded">
            <p className="text-xs text-gray-500 mb-2">❌ Zero seats (invalid):</p>
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={0}
              program="MBA"
              variant="urgent"
            />
            <p className="text-xs text-gray-500 mt-2 italic">
              (Nothing renders above - zero is not valid scarcity)
            </p>
          </div>

          {/* This won't render - negative seats */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded">
            <p className="text-xs text-gray-500 mb-2">❌ Negative seats (invalid):</p>
            <ScarcityMessage
              type="limited-seats"
              seatsRemaining={-5}
              program="BBA"
              variant="urgent"
            />
            <p className="text-xs text-gray-500 mt-2 italic">
              (Nothing renders above - negative is not valid)
            </p>
          </div>
        </div>
      </section>

      {/* Example 11: Multiple Messages Stacked */}
      <section>
        <h2 className="text-xl font-semibold mb-4">11. Multiple Messages (Stacked)</h2>
        <div className="space-y-4">
          <ScarcityMessage
            type="limited-seats"
            seatsRemaining={15}
            program="B.Tech CSE"
            variant="warning"
          />
          <ScarcityMessage
            type="early-bird"
            variant="info"
          />
          <ScarcityMessage
            type="scholarship-priority"
            variant="warning"
          />
        </div>
      </section>

      {/* Example 12: In Card Context */}
      <section>
        <h2 className="text-xl font-semibold mb-4">12. In Card Context</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            B.Tech Computer Science & Engineering
          </h3>
          <p className="text-gray-700 mb-4">
            4-year undergraduate program with specializations in AI, ML, and Data Science.
          </p>
          
          <ScarcityMessage
            type="limited-seats"
            seatsRemaining={18}
            variant="warning"
            className="mb-4"
          />
          
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
            Apply Now
          </button>
        </div>
      </section>

      {/* Example 13: Responsive Behavior */}
      <section>
        <h2 className="text-xl font-semibold mb-4">13. Responsive Behavior</h2>
        <p className="text-gray-700 mb-4">
          Resize your browser to see how the messages adapt to different screen sizes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScarcityMessage
            type="limited-seats"
            seatsRemaining={10}
            program="MBA"
            variant="urgent"
          />
          <ScarcityMessage
            type="early-bird"
            variant="info"
          />
        </div>
      </section>

      {/* Example 14: With Custom Styling */}
      <section>
        <h2 className="text-xl font-semibold mb-4">14. With Custom Styling</h2>
        <ScarcityMessage
          type="scholarship-priority"
          variant="warning"
          className="shadow-xl rounded-xl"
        />
      </section>

      {/* Example 15: Conditional Rendering Pattern */}
      <section>
        <h2 className="text-xl font-semibold mb-4">15. Conditional Rendering Pattern</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Admission Status
          </h3>
          
          {/* Simulate conditional rendering based on data */}
          {(() => {
            const programData = {
              name: 'B.Tech CSE',
              seatsRemaining: 7,
              isAdmissionOpen: true,
            };
            
            return (
              <div className="space-y-4">
                {programData.seatsRemaining && programData.seatsRemaining < 20 && (
                  <ScarcityMessage
                    type="limited-seats"
                    seatsRemaining={programData.seatsRemaining}
                    program={programData.name}
                    variant={programData.seatsRemaining <= 10 ? 'urgent' : 'warning'}
                  />
                )}
                
                {programData.isAdmissionOpen && (
                  <ScarcityMessage
                    type="early-bird"
                    variant="info"
                  />
                )}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}
