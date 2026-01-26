/**
 * TypeScript interfaces for Sharda University data models
 * Feature: sharda-university-content-enhancement
 */

// Core University Profile
export interface UniversityProfile {
  name: string;
  established: number;
  location: string;
  type: string;
  chancellor: string;
  vicechancellor: string;
  tagline: string;
  keyHighlights: string[];
}

// Rankings
export interface Ranking {
  organization: string;
  year: number;
  rank: string | number;
  category?: string;
  scope: 'national' | 'international';
}

// Accreditations
export interface Accreditation {
  name: string;
  body: string;
  year: number;
  validity?: string;
}

// Fee Structure
export interface FeeStructure {
  tuitionPerYear: number;
  totalTuition: number;
  hostel: number;
  mess: number;
  registration: number;
  other: number;
  total: number;
}

// Eligibility Requirements
export interface EligibilityRequirement {
  type: string;
  description: string;
  minimumScore?: string;
}

// Program/Course
export interface Program {
  id: string;
  name: string;
  code: string;
  discipline: string;
  level: 'undergraduate' | 'postgraduate' | 'doctoral';
  duration: string;
  fees: FeeStructure;
  eligibility: EligibilityRequirement[];
  curriculum: string[];
  specializations?: string[];
  accreditation?: string;
}

// Placement Data
export interface PlacementData {
  year: number;
  companiesVisited: number;
  studentsPlaced: number;
  placementPercentage: number;
  highestPackage: number;
  averagePackage: number;
  topRecruiters: string[];
}

// Campus Facilities
export interface Facility {
  name: string;
  description: string;
  capacity?: string;
}

// Hospital Information
export interface HospitalInfo {
  name: string;
  beds: number;
  specialties: string[];
  facilities: string[];
}

// Campus Information
export interface CampusInfo {
  area: string;
  buildings: number;
  hostelCapacity: number;
  facilities: Facility[];
  hospital: HospitalInfo;
}

// International Collaboration
export interface Collaboration {
  institution: string;
  country: string;
  type: string;
}

// International Information
export interface InternationalInfo {
  countriesRepresented: number;
  internationalStudents: number;
  collaborations: Collaboration[];
  exchangePrograms: string[];
}

// Admission Information
export interface AdmissionInfo {
  cycle: string;
  applicationDeadline: string;
  entranceExam?: string;
  process: string[];
  documents: string[];
}

// Testimonial
export interface Testimonial {
  id: string;
  studentName: string;
  country: string;
  program: string;
  graduationYear: number;
  currentPosition: string;
  testimonialText: string;
  photo?: string;
  videoUrl?: string;
  achievement: string;
}

// Bangladesh-Specific Scholarship
export interface BangladeshScholarship {
  gpaMin: number;
  gpaMax: number;
  percentage: number;
  eligibility: string[];
  applicationProcess: string[];
}

// Admission Step
export interface AdmissionStep {
  stepNumber: number;
  title: string;
  description: string;
  documents: string[];
  timeline: string;
  tips: string[];
}

// Cultural Compatibility
export interface CulturalCompatibility {
  proximity: string;
  climate: string;
  food: string[];
  religiousFacilities: string[];
  language: string;
  community: string;
}

// Visa Information
export interface VisaInfo {
  type: string;
  duration: string;
  requirements: string[];
  process: string[];
  timeline: string;
}

// Financial Information
export interface FinancialInfo {
  currencyTransfer: string[];
  bankAccounts: string[];
  scholarships: string[];
  costOfLiving: string;
}

// Bangladesh-Specific Content
export interface BangladeshContent {
  scholarships: BangladeshScholarship[];
  admissionProcess: AdmissionStep[];
  testimonials: Testimonial[];
  culturalInfo: CulturalCompatibility;
  visaGuidance: VisaInfo;
  financialGuidance: FinancialInfo;
}

// Complete Sharda University Data
export interface ShardaUniversityData {
  profile: UniversityProfile;
  rankings: Ranking[];
  accreditations: Accreditation[];
  programs: Program[];
  placements: PlacementData;
  campus: CampusInfo;
  international: InternationalInfo;
  admissions: AdmissionInfo;
  bangladeshContent?: BangladeshContent;
}

// SEO-related types
export interface SEOPageConfig {
  path: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  targetKeyword: string;
  canonicalUrl: string;
  structuredData: object[];
  internalLinks: InternalLink[];
}

export interface InternalLink {
  targetPath: string;
  anchorText: string;
  context: string;
}

export interface KeywordTarget {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  intent: 'informational' | 'navigational' | 'transactional';
  targetPage: string;
  currentRanking?: number;
}

// Conversion Tracking Types
export interface UTMParameters {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term?: string;
}

export interface ConversionEvent {
  eventType: 'cta_click' | 'whatsapp_click' | 'calculator_use' | 'program_view';
  timestamp: Date;
  userId?: string;
  sessionId: string;
  page: string;
  context: Record<string, any>;
  utmParameters?: UTMParameters;
}

export interface ApplicationLink {
  url: string;
  utmParameters: UTMParameters;
  createdAt: Date;
  context: string;
}

// Component Props Types
export interface ShardaLandingPageProps {
  userCountry?: string;
  utmSource?: string;
}

export interface BangladeshSectionProps {
  scholarships: BangladeshScholarship[];
  testimonials: Testimonial[];
  admissionSteps: AdmissionStep[];
}

export interface FeeCalculatorProps {
  programs: Program[];
  scholarshipRules: ScholarshipRule[];
  userCountry?: string;
}

export interface FeeCalculation {
  baseFee: number;
  scholarshipPercentage: number;
  scholarshipAmount: number;
  additionalCosts: CostBreakdown;
  totalPayable: number;
  fourYearTotal: number;
}

export interface CostBreakdown {
  hostel: number;
  mess: number;
  registration: number;
  other: number;
}

export interface ScholarshipRule {
  country: string;
  gpaMin: number;
  gpaMax: number;
  percentage: number;
}

export interface ProgramFinderProps {
  programs: Program[];
  filters: FilterConfig;
}

export interface FilterConfig {
  disciplines: string[];
  levels: string[];
  feeRanges: FeeRange[];
}

export interface FeeRange {
  label: string;
  min: number;
  max: number;
}

export interface SEOMetaTagsProps {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
  structuredData?: object;
}

export interface ApplicationCTAProps {
  variant: 'primary' | 'secondary' | 'floating';
  program?: string;
  source: string;
  context: string;
}

export interface WhatsAppCTAProps {
  context: string;
  variant: 'button' | 'floating' | 'inline';
  position?: 'top' | 'bottom' | 'sticky';
}

export interface WhatsAppContact {
  phoneNumber: string;
  displayNumber: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  filterByCountry?: string;
  filterByProgram?: string;
}

export interface ComparisonTableProps {
  universities: University[];
  metrics: ComparisonMetric[];
  highlightUniversity?: string;
}

export interface ComparisonMetric {
  key: string;
  label: string;
  type: 'text' | 'number' | 'badge' | 'list';
  format?: (value: any) => string;
}

export interface University {
  id: string;
  name: string;
  logo: string;
  metrics: Record<string, any>;
}
