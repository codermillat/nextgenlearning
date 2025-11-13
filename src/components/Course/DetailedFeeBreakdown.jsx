import { calculateTotalFees } from '../../utils/rankings';

/**
 * Detailed Fee Breakdown Component
 * Shows complete fee structure with all scholarship tiers and eligibility
 */
export default function DetailedFeeBreakdown({ program, university }) {

  // Get all scholarship tiers for this university
  const getScholarshipTiers = () => {
    if (university.id === 'niu') {
      const scholarshipInfo = university.scholarships?.bangladeshStudents;
      if (scholarshipInfo) {
        return [
          {
            name: 'Bangladeshi Student Scholarship',
            discount: scholarshipInfo.percentage || 50,
            percentage: scholarshipInfo.percentage || 50,
            gpaMin: scholarshipInfo.gpaMin || 0,
            gpaMax: scholarshipInfo.gpaMax || 5,
            conditions: scholarshipInfo.conditions || 'All Bangladeshi students are eligible. No minimum GPA requirement.',
            description: `NIU offers a flat ${scholarshipInfo.percentage || 50}% scholarship to all Bangladeshi students regardless of their GPA. This scholarship is automatically applied to all eligible students.`,
            eligibility: 'Open to all Bangladeshi students'
          }
        ];
      }
      return [
        {
          name: 'Bangladeshi Student Scholarship',
          discount: 50,
          percentage: 50,
          gpaMin: 0,
          gpaMax: 5,
          conditions: 'All Bangladeshi students are eligible. No minimum GPA requirement.',
          description: 'NIU offers a flat 50% scholarship to all Bangladeshi students regardless of their GPA. This scholarship is automatically applied to all eligible students.',
          eligibility: 'Open to all Bangladeshi students'
        }
      ];
    } else if (university.id === 'sharda') {
      const category = program.scholarshipCategory || 'category1';
      const categoryRules = university.scholarships?.bangladeshStudents?.categories?.[category];
      
      if (categoryRules && categoryRules.tiers) {
        return categoryRules.tiers.map(tier => ({
          ...tier,
          discount: tier.percentage || tier.discount || 0,
          conditions: tier.conditions || `GPA between ${tier.gpaMin} and ${tier.gpaMax}`,
          description: tier.description || `Students with GPA ${tier.gpaMin} to ${tier.gpaMax} are eligible for ${tier.percentage || tier.discount || 0}% scholarship on tuition fees.`,
          eligibility: `GPA ${tier.gpaMin} - ${tier.gpaMax}`
        }));
      }
      
      // Fallback if no category found
      return [
        {
          name: 'Scholarship Available',
          discount: 0,
          percentage: 0,
          gpaMin: 0,
          gpaMax: 5,
          conditions: 'Contact university for specific scholarship details',
          description: 'Scholarship information varies by program. Please contact the university or WBE for specific scholarship eligibility.',
          eligibility: 'Varies by program'
        }
      ];
    } else if (university.id === 'chandigarh') {
      const scholarshipInfo = university.scholarships?.bangladeshStudents;
      if (scholarshipInfo && scholarshipInfo.tiers) {
        return scholarshipInfo.tiers.map(tier => ({
          ...tier,
          discount: tier.percentage || tier.discount || 0,
          conditions: tier.conditions || `GPA ${tier.gpaMin} - ${tier.gpaMax}`,
          description: `Chandigarh University offers ${tier.percentage || tier.discount || 0}% scholarship for students with GPA ${tier.gpaMin} to ${tier.gpaMax}.`,
          eligibility: `GPA ${tier.gpaMin} - ${tier.gpaMax}`
        }));
      }
      // Fallback for CU
      return [
        {
          name: 'Chandigarh University Scholarship',
          discount: 50,
          percentage: 50,
          gpaMin: 3.5,
          gpaMax: 5,
          conditions: 'GPA 3.5 and above for 50% scholarship, GPA below 3.5 for 35% scholarship',
          description: 'Chandigarh University offers GPA-based scholarships for Bangladeshi students. High performers (GPA 3.5+) get 50% scholarship, others get 35% scholarship.',
          eligibility: 'GPA 3.5+ for 50%, GPA below 3.5 for 35%'
        },
        {
          name: 'Standard Scholarship',
          discount: 35,
          percentage: 35,
          gpaMin: 0,
          gpaMax: 3.49,
          conditions: 'GPA below 3.5',
          description: 'Students with GPA below 3.5 are eligible for 35% scholarship on tuition fees.',
          eligibility: 'GPA 0 - 3.49'
        }
      ];
    } else if (university.id === 'galgotias') {
      const scholarshipInfo = university.scholarships?.bangladeshStudents;
      const isBtech = program.degree?.toLowerCase().includes('b.tech') || program.name?.toLowerCase().includes('b.tech');
      
      if (scholarshipInfo) {
        if (isBtech && scholarshipInfo.btech) {
          return [
            {
              name: 'Galgotias B.Tech Scholarship',
              discount: scholarshipInfo.btech.percentage || 60,
              percentage: scholarshipInfo.btech.percentage || 60,
              gpaMin: scholarshipInfo.btech.gpaMin || 0,
              gpaMax: scholarshipInfo.btech.gpaMax || 5,
              conditions: scholarshipInfo.btech.conditions || 'No GPA requirement - All Bangladeshi students get 60% scholarship',
              description: `Galgotias University offers a flat ${scholarshipInfo.btech.percentage || 60}% scholarship to all Bangladeshi students for B.Tech programs. No minimum GPA requirement.`,
              eligibility: 'Open to all Bangladeshi students (B.Tech programs)'
            }
          ];
        } else if (scholarshipInfo.others) {
          return [
            {
              name: 'Galgotias Scholarship',
              discount: scholarshipInfo.others.percentage || 50,
              percentage: scholarshipInfo.others.percentage || 50,
              gpaMin: scholarshipInfo.others.gpaMin || 0,
              gpaMax: scholarshipInfo.others.gpaMax || 5,
              conditions: scholarshipInfo.others.conditions || 'No GPA requirement - All Bangladeshi students get 50% scholarship',
              description: `Galgotias University offers a flat ${scholarshipInfo.others.percentage || 50}% scholarship to all Bangladeshi students for non-B.Tech programs. No minimum GPA requirement.`,
              eligibility: 'Open to all Bangladeshi students (non-B.Tech programs)'
            }
          ];
        }
      }
      // Fallback for Galgotias
      return [
        {
          name: 'Galgotias Scholarship',
          discount: isBtech ? 60 : 50,
          percentage: isBtech ? 60 : 50,
          gpaMin: 0,
          gpaMax: 5,
          conditions: `No GPA requirement - All Bangladeshi students get ${isBtech ? 60 : 50}% scholarship`,
          description: `Galgotias University offers a flat ${isBtech ? 60 : 50}% scholarship to all Bangladeshi students. No minimum GPA requirement.`,
          eligibility: 'Open to all Bangladeshi students'
        }
      ];
    }
    
    return [];
  };

  const scholarshipTiers = getScholarshipTiers();

  // Calculate fees for each scholarship tier
  const calculateFeesForTier = (tier) => {
    const annualFees = program.annualFees || [];
    if (annualFees.length === 0) return null;

    const discountPercent = tier.discount || tier.percentage || 0;
    const totalBaseFees = annualFees.reduce((sum, fee) => sum + fee, 0);
    const totalAfterScholarship = totalBaseFees * (1 - discountPercent / 100);
    const oneTimeFees = university.additionalFees?.oneTime?.amount || 0;
    const grandTotal = totalAfterScholarship + oneTimeFees;

    return {
      baseTotal: totalBaseFees,
      scholarshipPercent: discountPercent,
      totalAfterScholarship,
      oneTimeFees,
      grandTotal,
      savings: totalBaseFees - totalAfterScholarship
    };
  };

  return (
    <div className="detailed-fee-breakdown bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-2xl font-bold mb-6">Detailed Fee Structure & Scholarships</h3>

      {/* All Available Scholarships */}
      <div className="mb-8">
        <h4 className="text-xl font-bold mb-4">Available Scholarship Options</h4>
        <p className="text-gray-600 mb-6">
          Below are all scholarship options available for {program.name} at {university.name}. 
          Each scholarship tier shows the discount percentage, eligibility criteria, and total cost calculation.
        </p>
        <div className="space-y-4">
          {scholarshipTiers.map((tier, index) => {
            const tierFees = calculateFeesForTier(tier);
            
            return (
              <div
                key={index}
                className="border-2 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-white border-blue-200 hover:border-blue-400 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h5 className="font-bold text-xl mb-2">{tier.name}</h5>
                    <p className="text-gray-700 mb-3">{tier.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-3xl font-bold text-green-600">{tier.discount}%</div>
                    <div className="text-sm text-gray-600">Scholarship</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 mb-2">Eligibility Criteria:</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>GPA Range:</strong> {tier.gpaMin} - {tier.gpaMax}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>Eligibility:</strong> {tier.eligibility || tier.conditions}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span><strong>Conditions:</strong> {tier.conditions}</span>
                        </div>
                      </div>
                    </div>
                    
                    {tierFees && (
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-2">Fee Calculation:</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Base Tuition ({program.duration} years):</span>
                            <span className="font-semibold">₹{tierFees.baseTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Scholarship ({tier.discount}%):</span>
                            <span className="font-semibold">-₹{tierFees.savings.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Tuition After Scholarship:</span>
                            <span className="font-semibold">₹{tierFees.totalAfterScholarship.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">One-time Fees:</span>
                            <span className="font-semibold">₹{tierFees.oneTimeFees.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t-2 pt-2 font-bold text-lg">
                            <span>Total Cost:</span>
                            <span className="text-blue-600">₹{tierFees.grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Year-wise Breakdown for Each Scholarship Tier */}
      {scholarshipTiers.length > 0 && (
        <div className="mb-8">
          <h4 className="text-2xl font-bold mb-4">Detailed Year-wise Fee Breakdown</h4>
          <p className="text-gray-600 mb-6">
            Complete year-by-year breakdown for each scholarship tier, including tuition fees, scholarship discounts, one-time fees, and recurring fees.
          </p>
          
          <div className="space-y-8">
            {scholarshipTiers.map((tier, tierIndex) => {
              const tierFees = calculateFeesForTier(tier);
              const annualFees = program.annualFees || [];
              const oneTimeFees = university.additionalFees?.oneTime?.amount || 0;
              const recurringFees = university.additionalFees?.recurring || {};
              
              // Calculate total recurring fees per year (from 2nd year onwards)
              const totalRecurringFees = Object.values(recurringFees).reduce((sum, fee) => {
                if (fee.frequency && (fee.frequency.includes('Annually') || fee.frequency.includes('Annual'))) {
                  return sum + (fee.amount || 0);
                }
                return sum;
              }, 0);
              
              return (
                <div key={tierIndex} className="border-2 border-blue-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white">
                  <div className="mb-4">
                    <h5 className="text-xl font-bold mb-2">{tier.name} - Year-wise Breakdown</h5>
                    <p className="text-sm text-gray-600">
                      Scholarship: {tier.discount}% | Eligibility: GPA {tier.gpaMin} - {tier.gpaMax}
                    </p>
                  </div>
                  
                  <div className="w-full overflow-hidden">
                    <div className="w-full align-middle sm:rounded-lg">
                      <table className="w-full bg-white sm:rounded-lg border border-gray-200 table-auto">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Year</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">Base Tuition</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">Scholarship ({tier.discount}%)</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">Tuition After Scholarship</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">One-time Fees</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold">Recurring Fees</th>
                          <th className="px-4 py-3 text-right text-sm font-semibold font-bold">Year Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {annualFees.map((annualFee, yearIndex) => {
                          const scholarshipAmount = annualFee * (tier.discount / 100);
                          const afterScholarship = annualFee - scholarshipAmount;
                          const isFirstYear = yearIndex === 0;
                          const recurringFeesThisYear = isFirstYear ? 0 : totalRecurringFees;
                          const oneTimeFeesThisYear = isFirstYear ? oneTimeFees : 0;
                          const yearTotal = afterScholarship + oneTimeFeesThisYear + recurringFeesThisYear;
                          
                          return (
                            <tr key={yearIndex} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium">
                                Year {yearIndex + 1}
                                {isFirstYear && <span className="text-xs text-gray-500 block">(First Year)</span>}
                                {!isFirstYear && <span className="text-xs text-gray-500 block">(From 2nd Year)</span>}
                              </td>
                              <td className="px-4 py-3 text-right">₹{annualFee.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right text-green-600 font-semibold">
                                -₹{scholarshipAmount.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-right">₹{afterScholarship.toLocaleString()}</td>
                              <td className="px-4 py-3 text-right">
                                {oneTimeFeesThisYear > 0 ? (
                                  <span className="text-gray-700">₹{oneTimeFeesThisYear.toLocaleString()}</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                {recurringFeesThisYear > 0 ? (
                                  <span className="text-gray-700">₹{recurringFeesThisYear.toLocaleString()}</span>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right font-bold text-blue-600">
                                ₹{yearTotal.toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-gray-50 font-bold">
                        <tr>
                          <td className="px-4 py-3">Total ({program.duration} years)</td>
                          <td className="px-4 py-3 text-right">₹{tierFees.baseTotal.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-green-600">-₹{tierFees.savings.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">₹{tierFees.totalAfterScholarship.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">₹{oneTimeFees.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">
                            ₹{(totalRecurringFees * (annualFees.length - 1)).toLocaleString()}
                            <span className="text-xs font-normal text-gray-600 block">
                              ({annualFees.length - 1} years × ₹{totalRecurringFees.toLocaleString()})
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-blue-600 text-lg">
                            ₹{(tierFees.totalAfterScholarship + oneTimeFees + (totalRecurringFees * (annualFees.length - 1))).toLocaleString()}
                          </td>
                        </tr>
                      </tfoot>
                      </table>
                    </div>
                  </div>
                  
                  {/* Detailed Fee Breakdown Notes */}
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="text-sm space-y-2">
                      <div className="font-semibold mb-2">Fee Breakdown Details:</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium">One-time Fees (Year 1 only):</span> ₹{oneTimeFees.toLocaleString()}
                          {university.additionalFees?.oneTime?.services && (
                            <div className="text-gray-600 mt-1">
                              Includes: {university.additionalFees.oneTime.services.slice(0, 3).join(', ')}
                              {university.additionalFees.oneTime.services.length > 3 && '...'}
                            </div>
                          )}
                        </div>
                        {totalRecurringFees > 0 && (
                          <div>
                            <span className="font-medium">Recurring Fees (Year 2+):</span> ₹{totalRecurringFees.toLocaleString()}/year
                            <div className="text-gray-600 mt-1">
                              {Object.entries(recurringFees).map(([key, fee]) => (
                                <div key={key}>
                                  • {fee.description}: ₹{(fee.amount || 0).toLocaleString()} ({fee.frequency || 'Annually'})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Additional Fees Breakdown */}
      {university.additionalFees && (
        <div className="mb-8">
          <h4 className="text-xl font-bold mb-4">Additional Fees Breakdown</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            {university.additionalFees.oneTime && (
              <div className="mb-4">
                <h5 className="font-semibold mb-3">One-Time Fees (First Year Only):</h5>
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">{university.additionalFees.oneTime.name}:</span>
                    <span className="font-semibold text-lg">₹{university.additionalFees.oneTime.amount.toLocaleString()}</span>
                  </div>
                  {university.additionalFees.oneTime.services && (
                    <div className="text-sm text-gray-600 mt-3 pt-3 border-t">
                      <div className="font-semibold mb-2">This fee includes:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {university.additionalFees.oneTime.services.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
            {university.additionalFees.recurring && (
              <div>
                <h5 className="font-semibold mb-3">Recurring Fees (From 2nd Year Onwards):</h5>
                <div className="bg-white rounded-lg p-4 space-y-2">
                  {Object.entries(university.additionalFees.recurring).map(([key, fee]) => (
                    <div key={key} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <span className="text-gray-700">{fee.description}:</span>
                      <span className="font-semibold">₹{fee.amount.toLocaleString()} / {fee.frequency}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                    <strong>Note:</strong> These fees are charged annually from the second year onwards. 
                    First year students only pay the one-time fees in addition to tuition.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary for All Scholarship Tiers */}
      <div className="mb-6">
        <h4 className="text-xl font-bold mb-4">Fee Comparison Across All Scholarship Tiers</h4>
        <div className="w-full overflow-hidden">
          <div className="w-full align-middle sm:rounded-lg">
            <table className="w-full bg-white border border-gray-200 sm:rounded-lg table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Scholarship Tier</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Eligibility</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Discount</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Tuition Fees</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Total Cost</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">Savings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scholarshipTiers.map((tier, index) => {
                const tierFees = calculateFeesForTier(tier);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{tier.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      GPA {tier.gpaMin} - {tier.gpaMax}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-green-600 font-semibold">{tier.discount}%</span>
                    </td>
                    <td className="px-4 py-3 text-right">₹{tierFees.totalAfterScholarship.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right font-semibold">₹{tierFees.grandTotal.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-green-600">₹{tierFees.savings.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scholarship Eligibility Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h5 className="font-semibold mb-2">📋 Important Notes:</h5>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Scholarships are applied to tuition fees only, not to additional fees</li>
          <li>One-time fees are charged only in the first year</li>
          <li>Recurring fees (examination, registration, etc.) apply from the second year onwards</li>
          <li>All fees are in Indian Rupees (INR)</li>
          <li>Scholarship eligibility is subject to university policies and may require document verification</li>
        </ul>
      </div>
    </div>
  );
}

