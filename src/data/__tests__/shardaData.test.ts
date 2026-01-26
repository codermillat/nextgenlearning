/**
 * Unit tests for Sharda University data models
 * Feature: sharda-university-content-enhancement
 */

import { describe, it, expect } from 'vitest';
import {
  shardaUniversityData,
  shardaProfile,
  shardaRankings,
  shardaPrograms,
  shardaPlacements,
  bangladeshContent,
  scholarshipRules,
} from '../shardaData';

describe('Sharda University Data Models', () => {
  describe('University Profile', () => {
    it('should have all required profile fields', () => {
      expect(shardaProfile).toBeDefined();
      expect(shardaProfile.name).toBe('Sharda University');
      expect(shardaProfile.established).toBe(2009);
      expect(shardaProfile.location).toContain('Greater Noida');
      expect(shardaProfile.keyHighlights).toBeInstanceOf(Array);
      expect(shardaProfile.keyHighlights.length).toBeGreaterThan(0);
    });

    it('should include key statistics in highlights', () => {
      const highlights = shardaProfile.keyHighlights.join(' ');
      expect(highlights).toContain('95+');
      expect(highlights).toContain('1600+');
      expect(highlights).toContain('600+');
    });
  });

  describe('Rankings', () => {
    it('should have multiple ranking entries', () => {
      expect(shardaRankings).toBeInstanceOf(Array);
      expect(shardaRankings.length).toBeGreaterThan(0);
    });

    it('should include NIRF ranking', () => {
      const nirfRanking = shardaRankings.find((r) => r.organization === 'NIRF');
      expect(nirfRanking).toBeDefined();
      expect(nirfRanking?.scope).toBe('national');
    });

    it('should have valid ranking structure', () => {
      shardaRankings.forEach((ranking) => {
        expect(ranking.organization).toBeDefined();
        expect(ranking.year).toBeGreaterThan(2000);
        expect(ranking.rank).toBeDefined();
        expect(['national', 'international']).toContain(ranking.scope);
      });
    });
  });

  describe('Programs', () => {
    it('should have multiple programs', () => {
      expect(shardaPrograms).toBeInstanceOf(Array);
      expect(shardaPrograms.length).toBeGreaterThan(0);
    });

    it('should include B.Tech CSE program', () => {
      const btechCSE = shardaPrograms.find((p) => p.id === 'btech-cse');
      expect(btechCSE).toBeDefined();
      expect(btechCSE?.name).toContain('Computer Science');
      expect(btechCSE?.level).toBe('undergraduate');
      expect(btechCSE?.duration).toBe('4 years');
    });

    it('should have complete fee structure for each program', () => {
      shardaPrograms.forEach((program) => {
        expect(program.fees).toBeDefined();
        expect(program.fees.tuitionPerYear).toBeGreaterThan(0);
        expect(program.fees.totalTuition).toBeGreaterThan(0);
        expect(program.fees.total).toBeGreaterThan(0);
      });
    });

    it('should have eligibility requirements', () => {
      shardaPrograms.forEach((program) => {
        expect(program.eligibility).toBeInstanceOf(Array);
        expect(program.eligibility.length).toBeGreaterThan(0);
      });
    });

    it('should have curriculum information', () => {
      shardaPrograms.forEach((program) => {
        expect(program.curriculum).toBeInstanceOf(Array);
        expect(program.curriculum.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Placement Data', () => {
    it('should have valid placement statistics', () => {
      expect(shardaPlacements).toBeDefined();
      expect(shardaPlacements.year).toBeGreaterThan(2020);
      expect(shardaPlacements.companiesVisited).toBeGreaterThan(0);
      expect(shardaPlacements.studentsPlaced).toBeGreaterThan(0);
      expect(shardaPlacements.placementPercentage).toBeGreaterThan(0);
      expect(shardaPlacements.placementPercentage).toBeLessThanOrEqual(100);
    });

    it('should have package information', () => {
      expect(shardaPlacements.highestPackage).toBeGreaterThan(0);
      expect(shardaPlacements.averagePackage).toBeGreaterThan(0);
      expect(shardaPlacements.highestPackage).toBeGreaterThan(
        shardaPlacements.averagePackage
      );
    });

    it('should have top recruiters list', () => {
      expect(shardaPlacements.topRecruiters).toBeInstanceOf(Array);
      expect(shardaPlacements.topRecruiters.length).toBeGreaterThan(0);
    });
  });

  describe('Bangladesh-Specific Content', () => {
    it('should have Bangladesh scholarship information', () => {
      expect(bangladeshContent.scholarships).toBeInstanceOf(Array);
      expect(bangladeshContent.scholarships.length).toBeGreaterThan(0);
    });

    it('should have correct scholarship tiers', () => {
      const highScholarship = bangladeshContent.scholarships.find(
        (s) => s.percentage === 50
      );
      const lowScholarship = bangladeshContent.scholarships.find(
        (s) => s.percentage === 20
      );

      expect(highScholarship).toBeDefined();
      expect(highScholarship?.gpaMin).toBe(3.5);
      expect(highScholarship?.gpaMax).toBe(5.0);

      expect(lowScholarship).toBeDefined();
      expect(lowScholarship?.gpaMin).toBe(3.0);
      expect(lowScholarship?.gpaMax).toBe(3.49);
    });

    it('should have admission process steps', () => {
      expect(bangladeshContent.admissionProcess).toBeInstanceOf(Array);
      expect(bangladeshContent.admissionProcess.length).toBeGreaterThan(0);
      
      // Steps should be in order
      bangladeshContent.admissionProcess.forEach((step, index) => {
        expect(step.stepNumber).toBe(index + 1);
        expect(step.title).toBeDefined();
        expect(step.description).toBeDefined();
      });
    });

    it('should have Bangladeshi student testimonials', () => {
      expect(bangladeshContent.testimonials).toBeInstanceOf(Array);
      expect(bangladeshContent.testimonials.length).toBeGreaterThanOrEqual(5);
      
      bangladeshContent.testimonials.forEach((testimonial) => {
        expect(testimonial.country).toBe('Bangladesh');
        expect(testimonial.studentName).toBeDefined();
        expect(testimonial.program).toBeDefined();
        expect(testimonial.achievement).toBeDefined();
      });
    });

    it('should have cultural compatibility information', () => {
      expect(bangladeshContent.culturalInfo).toBeDefined();
      expect(bangladeshContent.culturalInfo.proximity).toBeDefined();
      expect(bangladeshContent.culturalInfo.food).toBeInstanceOf(Array);
      expect(bangladeshContent.culturalInfo.religiousFacilities).toBeInstanceOf(Array);
    });

    it('should have visa guidance', () => {
      expect(bangladeshContent.visaGuidance).toBeDefined();
      expect(bangladeshContent.visaGuidance.type).toBeDefined();
      expect(bangladeshContent.visaGuidance.requirements).toBeInstanceOf(Array);
      expect(bangladeshContent.visaGuidance.process).toBeInstanceOf(Array);
    });

    it('should have financial guidance', () => {
      expect(bangladeshContent.financialGuidance).toBeDefined();
      expect(bangladeshContent.financialGuidance.currencyTransfer).toBeInstanceOf(Array);
      expect(bangladeshContent.financialGuidance.scholarships).toBeInstanceOf(Array);
    });
  });

  describe('Scholarship Rules', () => {
    it('should have scholarship rules for Bangladesh', () => {
      const bdRules = scholarshipRules.filter((r) => r.country === 'Bangladesh');
      expect(bdRules.length).toBeGreaterThan(0);
    });

    it('should have valid GPA ranges', () => {
      scholarshipRules.forEach((rule) => {
        expect(rule.gpaMin).toBeLessThanOrEqual(rule.gpaMax);
        expect(rule.percentage).toBeGreaterThan(0);
        expect(rule.percentage).toBeLessThanOrEqual(100);
      });
    });

    it('should have rules for multiple countries', () => {
      const countries = [...new Set(scholarshipRules.map((r) => r.country))];
      expect(countries.length).toBeGreaterThan(1);
      expect(countries).toContain('Bangladesh');
    });
  });

  describe('Complete University Data', () => {
    it('should have all required sections', () => {
      expect(shardaUniversityData.profile).toBeDefined();
      expect(shardaUniversityData.rankings).toBeDefined();
      expect(shardaUniversityData.accreditations).toBeDefined();
      expect(shardaUniversityData.programs).toBeDefined();
      expect(shardaUniversityData.placements).toBeDefined();
      expect(shardaUniversityData.campus).toBeDefined();
      expect(shardaUniversityData.international).toBeDefined();
      expect(shardaUniversityData.admissions).toBeDefined();
      expect(shardaUniversityData.bangladeshContent).toBeDefined();
    });

    it('should have campus information', () => {
      expect(shardaUniversityData.campus.area).toBeDefined();
      expect(shardaUniversityData.campus.facilities).toBeInstanceOf(Array);
      expect(shardaUniversityData.campus.hospital).toBeDefined();
      expect(shardaUniversityData.campus.hospital.beds).toBe(1600);
    });

    it('should have international information', () => {
      expect(shardaUniversityData.international.countriesRepresented).toBeGreaterThan(90);
      expect(shardaUniversityData.international.collaborations).toBeInstanceOf(Array);
    });

    it('should have admission information', () => {
      expect(shardaUniversityData.admissions.cycle).toContain('2026-27');
      expect(shardaUniversityData.admissions.process).toBeInstanceOf(Array);
      expect(shardaUniversityData.admissions.documents).toBeInstanceOf(Array);
    });
  });
});
