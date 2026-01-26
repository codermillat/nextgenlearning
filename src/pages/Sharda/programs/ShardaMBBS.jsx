/**
 * Sharda University MBBS Program Page
 * Feature: sharda-university-content-enhancement
 * 
 * Detailed program page for Bachelor of Medicine, Bachelor of Surgery
 * Requirements: 4.1, 4.2, 4.3, 4.5
 */

import ProgramDetailPage from '../ProgramDetailPage';

const ShardaMBBS = () => {
  const overview = `
The Bachelor of Medicine, Bachelor of Surgery (MBBS) program at Sharda University is a prestigious 5.5-year medical degree that prepares students for successful careers as medical doctors. This comprehensive program combines rigorous academic training with extensive clinical exposure at Sharda Hospital, one of North India's largest multi-specialty hospitals with 1600+ beds. The MBBS program is approved by the National Medical Commission (NMC) and recognized globally, making it an excellent choice for aspiring doctors.

Sharda University's School of Medical Sciences offers an MBBS program that stands out for its unique integration of medical education with clinical practice. From the very first year, students get exposure to patient care through clinical postings at Sharda Hospital. This early clinical exposure helps students understand the practical application of theoretical concepts and develops their clinical reasoning skills. The hospital handles over 2000 outpatients daily and performs numerous surgeries, providing students with diverse clinical experiences.

The curriculum follows the NMC guidelines and covers all essential medical subjects including Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology, Forensic Medicine, Community Medicine, General Medicine, General Surgery, Pediatrics, and Obstetrics and Gynecology. The program is designed to develop not just medical knowledge, but also clinical skills, communication abilities, ethical values, and professional attitudes essential for medical practice.

One of the key strengths of the MBBS program at Sharda is the quality of clinical training. Sharda Hospital is equipped with state-of-the-art medical technology including advanced diagnostic equipment, modern operation theaters, intensive care units, and specialized departments for cardiology, neurology, orthopedics, oncology, and more. Students rotate through all major departments during their clinical postings, gaining hands-on experience in diagnosing and treating various medical conditions under the supervision of experienced doctors.

The faculty at Sharda's School of Medical Sciences comprises highly qualified doctors, many of whom are specialists and super-specialists in their fields. Most faculty members hold MD or MS degrees from premier medical institutions and have years of clinical experience. They serve dual roles as teachers and practicing doctors, bringing real-world medical expertise into the classroom. The student-to-faculty ratio is maintained at optimal levels to ensure personalized attention and effective mentoring.

Sharda University's medical education emphasizes evidence-based medicine and research. Students are encouraged to participate in research projects, present papers at medical conferences, and publish in medical journals. The university has dedicated research facilities and collaborates with national and international institutions on various medical research projects. This research exposure helps students develop critical thinking skills and stay updated with the latest medical advancements.

The infrastructure supporting the MBBS program is world-class. Modern lecture halls with audio-visual aids, well-equipped anatomy and pathology labs, simulation labs for practicing clinical procedures, a comprehensive medical library with extensive medical literature and online databases, and computer labs with medical software create an ideal learning environment. The anatomy museum houses an extensive collection of specimens and models for detailed study.

Clinical skills development is a major focus of the program. The Clinical Skills Lab provides a safe environment for students to practice various medical procedures on mannequins and simulators before performing them on actual patients. Students learn procedures like suturing, catheterization, intubation, and emergency management through hands-on practice. Regular clinical skill assessments ensure that students achieve competency in essential medical procedures.

Community medicine training is an integral part of the MBBS program. Students participate in rural health camps, community health surveys, and public health programs. These experiences expose students to the health challenges faced by rural and underserved populations and develop their understanding of preventive medicine and public health. The university has adopted several villages for community health initiatives, providing students with opportunities for community-based learning.

The examination system follows NMC guidelines with regular assessments throughout the program. Students undergo theory examinations, practical examinations, and clinical assessments. The continuous evaluation system ensures that students maintain consistent academic performance. Mock examinations and preparatory classes help students prepare for the final MBBS examinations and the NEET-PG entrance test for postgraduate medical education.

Career prospects for MBBS graduates from Sharda University are excellent. Graduates can pursue various career paths including clinical practice, postgraduate specialization, medical research, public health, medical education, or healthcare administration. Many graduates clear the NEET-PG examination and pursue MD/MS specializations in their chosen fields. Others join hospitals, clinics, or start their own medical practice. Some graduates also pursue opportunities abroad, with the degree being recognized in many countries.

For international students, particularly from Bangladesh, Sharda's MBBS program offers several advantages. The NMC-approved degree is recognized by the Bangladesh Medical and Dental Council (BMDC), allowing graduates to practice in Bangladesh after clearing the required licensing examinations. The medium of instruction is English, making it accessible for international students. The presence of a large Bangladeshi student community and cultural similarities make the transition smooth for students from Bangladesh.

The admission process for MBBS is highly competitive and merit-based. Candidates must have qualified NEET-UG (National Eligibility cum Entrance Test) with the required percentile. International students may have different admission criteria based on their country's regulations. The admissions team provides comprehensive support throughout the process, including assistance with document verification, counseling, and visa applications for international students.

Campus life for MBBS students at Sharda is demanding but rewarding. The rigorous academic schedule is balanced with opportunities for extracurricular activities. Medical students have their own associations and organize medical conferences, health awareness campaigns, and cultural events. Sports facilities, fitness centers, and recreational activities help students maintain physical and mental well-being. The university also provides counseling services to help students manage academic stress.

Sharda University's commitment to medical education excellence is reflected in its continuous efforts to upgrade facilities, update curriculum, and enhance teaching methodologies. The university regularly invites renowned medical experts for guest lectures and workshops. Continuing medical education programs keep faculty updated with the latest medical knowledge. The focus on holistic development ensures that graduates are not just competent doctors but also compassionate caregivers.

The MBBS program at Sharda University prepares students for lifelong learning and professional growth in medicine. The strong foundation in basic medical sciences, extensive clinical training, exposure to research, and development of professional values ensure that graduates can provide quality healthcare and adapt to the evolving medical landscape. Alumni of the program are successfully practicing medicine in India and abroad, serving communities and saving lives.

Sharda Hospital's status as a teaching hospital provides unique advantages for MBBS students. The hospital attracts patients with diverse medical conditions, providing students with exposure to a wide range of clinical cases. The hospital's emergency department, which operates 24/7, gives students experience in handling medical emergencies. The hospital also has specialized centers for cardiac care, neurosciences, orthopedics, and oncology, allowing students to learn from specialists in these fields.
  `.trim();

  const careerProspects = {
    roles: [
      'Medical Officer',
      'Resident Doctor',
      'General Practitioner',
      'Medical Specialist (after MD/MS)',
      'Surgeon (after MS)',
      'Medical Researcher',
      'Public Health Officer',
      'Medical Consultant',
      'Hospital Administrator',
      'Medical Educator',
    ],
    industries: [
      'Hospitals and Clinics',
      'Healthcare Services',
      'Medical Research',
      'Public Health',
      'Pharmaceutical Industry',
      'Medical Education',
      'Healthcare Administration',
      'Telemedicine',
      'Medical Tourism',
      'NGOs and Social Sector',
    ],
    skills: [
      'Clinical Diagnosis',
      'Patient Care',
      'Medical Procedures',
      'Emergency Management',
      'Communication Skills',
      'Ethical Decision Making',
      'Research Methodology',
      'Teamwork',
    ],
  };

  const highlights = [
    {
      icon: '🏥',
      title: 'NMC Approved',
      description: 'Program approved by National Medical Commission, recognized globally',
    },
    {
      icon: '🏨',
      title: '1600+ Bed Hospital',
      description: 'Clinical training at Sharda Hospital, one of North India\'s largest hospitals',
    },
    {
      icon: '👨‍⚕️',
      title: 'Expert Faculty',
      description: 'Learn from MD/MS qualified doctors with extensive clinical experience',
    },
    {
      icon: '🔬',
      title: 'Modern Facilities',
      description: 'State-of-the-art labs, simulation center, and advanced medical equipment',
    },
    {
      icon: '📚',
      title: 'Research Opportunities',
      description: 'Participate in medical research and publish in journals',
    },
    {
      icon: '🌍',
      title: 'International Recognition',
      description: 'Degree recognized by BMDC and medical councils in many countries',
    },
  ];

  const faqs = [
    {
      question: 'What is the duration of the MBBS program at Sharda University?',
      answer: 'The MBBS program is 5.5 years long, consisting of 4.5 years of academic study and clinical training, followed by 1 year of compulsory rotating internship.',
    },
    {
      question: 'Is the MBBS program at Sharda University recognized?',
      answer: 'Yes, the MBBS program is approved by the National Medical Commission (NMC) and recognized by the Medical Council of India. The degree is also recognized by the Bangladesh Medical and Dental Council (BMDC) and medical councils in many other countries.',
    },
    {
      question: 'What are the eligibility criteria for MBBS admission?',
      answer: 'Candidates must have passed 10+2 with minimum 50% marks in Physics, Chemistry, Biology, and English. They must have qualified NEET-UG with the required percentile. For international students, specific criteria may apply based on their country\'s regulations.',
    },
    {
      question: 'What is the fee structure for MBBS?',
      answer: 'The annual tuition fee is ₹6.5 lakhs. Total cost for 5.5 years including hostel, mess, and other fees is approximately ₹42.3 lakhs. The fee structure is competitive compared to other private medical colleges in India.',
    },
    {
      question: 'What clinical facilities are available for MBBS students?',
      answer: 'MBBS students receive clinical training at Sharda Hospital, a 1600+ bed multi-specialty hospital with advanced medical technology, modern operation theaters, ICUs, and specialized departments. Students get hands-on experience in all major medical specialties.',
    },
    {
      question: 'Can Bangladeshi students apply for MBBS at Sharda University?',
      answer: 'Yes, Bangladeshi students can apply for MBBS at Sharda University. The degree is recognized by BMDC. Bangladeshi students need to meet the eligibility criteria and may have different admission requirements. The university provides support for visa and admission processes.',
    },
    {
      question: 'What are the career options after MBBS?',
      answer: 'After MBBS, graduates can pursue MD/MS specialization through NEET-PG, start clinical practice, join hospitals as medical officers, work in public health, pursue medical research, or explore opportunities in healthcare administration and medical education.',
    },
    {
      question: 'Is there an internship included in the MBBS program?',
      answer: 'Yes, the MBBS program includes a mandatory 1-year rotating internship after completing 4.5 years of academic study. During internship, students work in various departments of Sharda Hospital under supervision, gaining practical experience in patient care.',
    },
  ];

  return (
    <ProgramDetailPage
      programId="mbbs"
      pageTitle="MBBS at Sharda University 2026 | Bachelor of Medicine, Bachelor of Surgery"
      metaDescription="MBBS at Sharda University: 5.5-year NMC approved program with clinical training at 1600+ bed hospital. ₹6.5L/year fees. Recognized by BMDC. Apply now for 2026 admission!"
      keywords={[
        'sharda university mbbs',
        'mbbs sharda university',
        'sharda mbbs admission',
        'mbbs fees sharda university',
        'sharda hospital mbbs',
        'nmc approved mbbs sharda',
        'mbbs for bangladeshi students india',
        'sharda university medical college',
      ]}
      canonicalPath="/sharda-university/programs/mbbs"
      overview={overview}
      careerProspects={careerProspects}
      highlights={highlights}
      faqs={faqs}
    />
  );
};

export default ShardaMBBS;
