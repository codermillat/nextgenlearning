/**
 * Scholarship calculation utilities
 * Get maximum available scholarship for a program without GPA requirement
 */

/**
 * Get maximum scholarship percentage available for a program
 */
export function getMaxScholarship(program, university) {
  if (!program || !university) return 0;

  // NIU: Flat 50% for all Bangladeshi students
  if (university.id === 'niu') {
    return 50;
  }

  // Sharda: Get max from available tiers
  if (university.id === 'sharda') {
    const category = program.scholarshipCategory || 'category1';
    const categoryRules = university.scholarships?.bangladeshStudents?.categories?.[category];
    
    if (categoryRules && categoryRules.tiers && categoryRules.tiers.length > 0) {
      // Return the highest discount percentage
      return Math.max(...categoryRules.tiers.map(tier => tier.percentage || tier.discount || 0));
    }
    return 0;
  }

  // Chandigarh University: Get max from tiers
  if (university.id === 'chandigarh') {
    const scholarshipInfo = university.scholarships?.bangladeshStudents;
    if (scholarshipInfo && scholarshipInfo.tiers && scholarshipInfo.tiers.length > 0) {
      return Math.max(...scholarshipInfo.tiers.map(tier => tier.percentage || tier.discount || 0));
    }
    // Fallback: 50% for high performers, 35% standard
    return 50;
  }

  // Galgotias: 60% for B.Tech, 50% for others
  if (university.id === 'galgotias') {
    const scholarshipInfo = university.scholarships?.bangladeshStudents;
    const isBtech = program.degree?.toLowerCase().includes('b.tech') || 
                    program.name?.toLowerCase().includes('b.tech');
    
    if (scholarshipInfo) {
      if (isBtech && scholarshipInfo.btech) {
        return scholarshipInfo.btech.percentage || 60;
      } else if (scholarshipInfo.others) {
        return scholarshipInfo.others.percentage || 50;
      }
    }
    // Fallback
    return isBtech ? 60 : 50;
  }

  return 0;
}

/**
 * Get all scholarship tiers for a program (for display purposes)
 */
export function getAllScholarshipTiers(program, university) {
  if (!program || !university) return [];

  if (university.id === 'niu') {
    const scholarshipInfo = university.scholarships?.bangladeshStudents;
    return [{
      name: 'Bangladeshi Student Scholarship',
      discount: scholarshipInfo?.percentage || 50,
      percentage: scholarshipInfo?.percentage || 50,
      gpaMin: scholarshipInfo?.gpaMin || 0,
      gpaMax: scholarshipInfo?.gpaMax || 5,
      conditions: scholarshipInfo?.conditions || 'All Bangladeshi students are eligible. No minimum GPA requirement.',
      description: `NIU offers a flat ${scholarshipInfo?.percentage || 50}% scholarship to all Bangladeshi students regardless of their GPA.`,
      eligibility: 'Open to all Bangladeshi students'
    }];
  }

  if (university.id === 'sharda') {
    const category = program.scholarshipCategory || 'category1';
    const categoryRules = university.scholarships?.bangladeshStudents?.categories?.[category];
    
    if (categoryRules && categoryRules.tiers) {
      return categoryRules.tiers.map(tier => ({
        ...tier,
        discount: tier.percentage || tier.discount || 0,
        conditions: tier.conditions || `GPA ${tier.gpaMin} - ${tier.gpaMax}`,
        description: tier.description || `Students with GPA ${tier.gpaMin} to ${tier.gpaMax} are eligible for ${tier.percentage || tier.discount || 0}% scholarship.`,
        eligibility: `GPA ${tier.gpaMin} - ${tier.gpaMax}`
      }));
    }
    return [];
  }

  if (university.id === 'chandigarh') {
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
    // Fallback
    return [
      {
        name: 'High Performance Scholarship',
        discount: 50,
        percentage: 50,
        gpaMin: 3.5,
        gpaMax: 5,
        conditions: 'GPA 3.5 and above',
        description: '50% scholarship for high-performing students',
        eligibility: 'GPA 3.5 - 5'
      },
      {
        name: 'Standard Scholarship',
        discount: 35,
        percentage: 35,
        gpaMin: 0,
        gpaMax: 3.49,
        conditions: 'GPA below 3.5',
        description: '35% scholarship for all other students',
        eligibility: 'GPA 0 - 3.49'
      }
    ];
  }

  if (university.id === 'galgotias') {
    const scholarshipInfo = university.scholarships?.bangladeshStudents;
    const isBtech = program.degree?.toLowerCase().includes('b.tech') || 
                    program.name?.toLowerCase().includes('b.tech');
    
    if (scholarshipInfo) {
      if (isBtech && scholarshipInfo.btech) {
        return [{
          name: 'Galgotias B.Tech Scholarship',
          discount: scholarshipInfo.btech.percentage || 60,
          percentage: scholarshipInfo.btech.percentage || 60,
          gpaMin: scholarshipInfo.btech.gpaMin || 0,
          gpaMax: scholarshipInfo.btech.gpaMax || 5,
          conditions: scholarshipInfo.btech.conditions || 'No GPA requirement',
          description: `Galgotias offers ${scholarshipInfo.btech.percentage || 60}% scholarship for all B.Tech programs.`,
          eligibility: 'Open to all Bangladeshi students'
        }];
      } else if (scholarshipInfo.others) {
        return [{
          name: 'Galgotias Scholarship',
          discount: scholarshipInfo.others.percentage || 50,
          percentage: scholarshipInfo.others.percentage || 50,
          gpaMin: scholarshipInfo.others.gpaMin || 0,
          gpaMax: scholarshipInfo.others.gpaMax || 5,
          conditions: scholarshipInfo.others.conditions || 'No GPA requirement',
          description: `Galgotias offers ${scholarshipInfo.others.percentage || 50}% scholarship for non-B.Tech programs.`,
          eligibility: 'Open to all Bangladeshi students'
        }];
      }
    }
    // Fallback
    return [{
      name: 'Galgotias Scholarship',
      discount: isBtech ? 60 : 50,
      percentage: isBtech ? 60 : 50,
      gpaMin: 0,
      gpaMax: 5,
      conditions: 'No GPA requirement',
      description: `Galgotias offers ${isBtech ? 60 : 50}% scholarship to all Bangladeshi students.`,
      eligibility: 'Open to all Bangladeshi students'
    }];
  }

  return [];
}

