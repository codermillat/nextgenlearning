import React from 'react';
import LastUpdated from './LastUpdated';

/**
 * LastUpdated Component Examples
 * 
 * Demonstrates various usage patterns for the LastUpdated component
 */

export default function LastUpdatedExamples() {
  return (
    <div className="space-y-8 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">LastUpdated Component Examples</h1>

      {/* Example 1: Default Variant */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">1. Default Variant</h2>
        <p className="text-gray-600 mb-4">
          Full-width component with background and border. Best for standalone placement.
        </p>
        <LastUpdated 
          date="2026-01-15"
          admissionCycle="2026-27"
        />
      </section>

      {/* Example 2: Compact Variant */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">2. Compact Variant</h2>
        <p className="text-gray-600 mb-4">
          Smaller component with left border accent. Good for sidebars.
        </p>
        <LastUpdated 
          date="2026-01-15"
          variant="compact"
        />
      </section>

      {/* Example 3: Inline Variant */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">3. Inline Variant</h2>
        <p className="text-gray-600 mb-4">
          Minimal inline component for embedding within text.
        </p>
        <p className="text-gray-700">
          This program information is current.{' '}
          <LastUpdated 
            date="2026-01-15"
            variant="inline"
            showAdmissionCycle={false}
          />
        </p>
      </section>

      {/* Example 4: Without Admission Cycle */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">4. Without Admission Cycle</h2>
        <p className="text-gray-600 mb-4">
          Shows only the last updated date, useful for non-admission content.
        </p>
        <LastUpdated 
          date="2025-12-20"
          showAdmissionCycle={false}
        />
      </section>

      {/* Example 5: Auto-calculated Admission Cycle */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">5. Auto-calculated Admission Cycle</h2>
        <p className="text-gray-600 mb-4">
          Admission cycle is automatically calculated based on current date.
        </p>
        <LastUpdated 
          date={new Date()}
        />
      </section>

      {/* Example 6: Fees Page Usage */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">6. Fees Page Usage</h2>
        <div className="border-l-4 border-blue-500 pl-4">
          <h3 className="text-2xl font-bold mb-2">
            Sharda University B.Tech CSE Fees 2026-27
          </h3>
          <LastUpdated 
            date="2026-01-15"
            admissionCycle="2026-27"
            className="mb-4"
          />
          <p className="text-gray-700">
            Complete fee structure including tuition, hostel, and other charges...
          </p>
        </div>
      </section>

      {/* Example 7: Rankings Page Usage */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">7. Rankings Page Usage</h2>
        <div className="border-l-4 border-green-500 pl-4">
          <h3 className="text-2xl font-bold mb-2">
            Sharda University NIRF Ranking 2025
          </h3>
          <LastUpdated 
            date="2025-12-20"
            showAdmissionCycle={false}
            variant="compact"
            className="mb-4"
          />
          <p className="text-gray-700">
            Latest NIRF ranking data and analysis...
          </p>
        </div>
      </section>

      {/* Example 8: Program Page Usage */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">8. Program Page Usage</h2>
        <div>
          <h3 className="text-2xl font-bold mb-2">
            B.Tech Computer Science Engineering
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              4 Years
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Engineering
            </span>
          </div>
          <LastUpdated 
            date="2026-01-10"
            variant="compact"
            className="mb-4"
          />
          <p className="text-gray-700">
            Program overview, curriculum, and career prospects...
          </p>
        </div>
      </section>

      {/* Example 9: Multiple Dates */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">9. Multiple Update Indicators</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Fee Structure</h4>
            <LastUpdated 
              date="2026-01-15"
              variant="compact"
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Placement Statistics</h4>
            <LastUpdated 
              date="2025-12-01"
              variant="compact"
              showAdmissionCycle={false}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Admission Process</h4>
            <LastUpdated 
              date="2026-01-20"
              variant="compact"
            />
          </div>
        </div>
      </section>

      {/* Example 10: With Custom Styling */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">10. With Custom Styling</h2>
        <p className="text-gray-600 mb-4">
          Component accepts custom className for additional styling.
        </p>
        <LastUpdated 
          date="2026-01-15"
          className="shadow-md"
        />
      </section>

      {/* Example 11: Date Object */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">11. Using Date Object</h2>
        <p className="text-gray-600 mb-4">
          Component accepts JavaScript Date objects.
        </p>
        <LastUpdated 
          date={new Date('2026-01-15T10:30:00Z')}
          variant="compact"
        />
      </section>

      {/* Example 12: Footer Placement */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">12. Footer Placement</h2>
        <div className="min-h-[200px] flex flex-col">
          <div className="flex-1">
            <p className="text-gray-700 mb-4">
              Page content goes here...
            </p>
          </div>
          <footer className="border-t pt-4 mt-4">
            <LastUpdated 
              date="2026-01-15"
              variant="inline"
            />
          </footer>
        </div>
      </section>
    </div>
  );
}
