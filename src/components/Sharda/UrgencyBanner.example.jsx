import UrgencyBanner from './UrgencyBanner';

/**
 * UrgencyBanner Component Examples
 * Feature: sharda-university-content-enhancement
 */

export default function UrgencyBannerExamples() {
  // Example deadline dates
  const applicationDeadline = new Date('2026-06-30');
  const scholarshipDeadline = new Date('2026-05-15');
  const _earlyBirdDeadline = new Date('2026-03-31');

  return (
    <div className="space-y-8 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        UrgencyBanner Component Examples
      </h1>

      {/* Example 1: Admission Open Banner */}
      <section>
        <h2 className="text-xl font-semibold mb-4">1. Admission Open Banner (Success Variant)</h2>
        <UrgencyBanner
          type="admission-open"
          variant="success"
        />
      </section>

      {/* Example 2: Admission Open Banner (Info Variant) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">2. Admission Open Banner (Info Variant)</h2>
        <UrgencyBanner
          type="admission-open"
          variant="info"
        />
      </section>

      {/* Example 3: Application Deadline with Countdown */}
      <section>
        <h2 className="text-xl font-semibold mb-4">3. Application Deadline with Countdown (Warning)</h2>
        <UrgencyBanner
          type="deadline"
          deadline={applicationDeadline}
          variant="warning"
          showCountdown={true}
          message="Application Deadline: June 30, 2026"
        />
      </section>

      {/* Example 4: Scholarship Deadline (Urgent) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">4. Scholarship Deadline (Urgent Variant)</h2>
        <UrgencyBanner
          type="scholarship-deadline"
          deadline={scholarshipDeadline}
          variant="urgent"
          showCountdown={true}
        />
      </section>

      {/* Example 5: Early Bird with Custom Message */}
      <section>
        <h2 className="text-xl font-semibold mb-4">5. Early Bird with Custom Message</h2>
        <UrgencyBanner
          type="early-bird"
          variant="info"
          message="Apply by March 31st for Priority Hostel Allocation & Scholarship Consideration"
          dismissible={true}
        />
      </section>

      {/* Example 6: Dismissible Deadline Banner */}
      <section>
        <h2 className="text-xl font-semibold mb-4">6. Dismissible Deadline Banner</h2>
        <UrgencyBanner
          type="deadline"
          deadline={applicationDeadline}
          variant="warning"
          showCountdown={true}
          dismissible={true}
          onClose={() => console.log('Banner dismissed')}
        />
      </section>

      {/* Example 7: Without Countdown */}
      <section>
        <h2 className="text-xl font-semibold mb-4">7. Deadline Without Countdown</h2>
        <UrgencyBanner
          type="deadline"
          deadline={applicationDeadline}
          variant="warning"
          showCountdown={false}
          message="Last Week to Apply! Deadline: June 30, 2026"
        />
      </section>

      {/* Example 8: Sticky Banner */}
      <section>
        <h2 className="text-xl font-semibold mb-4">8. Sticky Banner (Fixed Position)</h2>
        <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
          <UrgencyBanner
            type="admission-open"
            variant="success"
            className="sticky top-0 z-10"
          />
          <div className="p-8">
            <p className="text-gray-700">
              Scroll content here... The banner stays at the top.
            </p>
            <p className="mt-4 text-gray-700">
              This demonstrates how the banner can be used as a sticky header element.
            </p>
          </div>
        </div>
      </section>

      {/* Example 9: Multiple Banners */}
      <section>
        <h2 className="text-xl font-semibold mb-4">9. Multiple Banners (Stacked)</h2>
        <div className="space-y-2">
          <UrgencyBanner
            type="admission-open"
            variant="success"
          />
          <UrgencyBanner
            type="scholarship-deadline"
            deadline={scholarshipDeadline}
            variant="urgent"
            showCountdown={true}
            dismissible={true}
          />
        </div>
      </section>

      {/* Example 10: Custom Styled Banner */}
      <section>
        <h2 className="text-xl font-semibold mb-4">10. Custom Styled Banner</h2>
        <UrgencyBanner
          type="early-bird"
          variant="info"
          message="🎓 Special Offer: 10% Additional Scholarship for Applications Before March 31st"
          className="rounded-xl shadow-2xl"
          dismissible={true}
        />
      </section>

      {/* Usage in Context */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Usage in Landing Page Context</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <UrgencyBanner
            type="admission-open"
            variant="success"
          />
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Sharda University
            </h3>
            <p className="text-gray-700 mb-4">
              Discover world-class education with students from 95+ countries.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Responsive Demo */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Responsive Behavior</h2>
        <p className="text-gray-700 mb-4">
          Resize your browser to see how the banner adapts to different screen sizes.
          On mobile, the countdown timer and message stack vertically for better readability.
        </p>
        <UrgencyBanner
          type="deadline"
          deadline={applicationDeadline}
          variant="warning"
          showCountdown={true}
          message="Application Deadline Approaching"
        />
      </section>
    </div>
  );
}
