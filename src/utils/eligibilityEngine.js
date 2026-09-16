const EDUCATION_RANK = {
  "None": 0,
  "Class 5th Passed": 1,
  "Class 8th Passed": 2,
  "Class 10th Passed": 3,
  "Class 12th Passed": 4,
  "Undergraduate Passed": 5,
  "Postgraduate Passed": 6
};

export function evaluateEligibility(profile, scheme) {
  const criteria = scheme.eligibility;
  const reasons = [];
  const rejections = [];
  let score = 0;
  let totalWeights = 0;

  // 1. Age Evaluation
  totalWeights += 20;
  if (profile.age !== undefined && profile.age !== null) {
    if (profile.age >= criteria.minAge && profile.age <= criteria.maxAge) {
      reasons.push(`✓ Age (${profile.age} yrs) satisfies required age range (${criteria.minAge} - ${criteria.maxAge} yrs).`);
      score += 20;
    } else {
      rejections.push(`✕ Age (${profile.age} yrs) is outside the eligible age range of ${criteria.minAge} - ${criteria.maxAge} yrs.`);
    }
  } else {
    reasons.push(`? Age not provided.`);
  }

  // 2. Annual Income Evaluation
  totalWeights += 25;
  if (profile.income !== undefined && profile.income !== null) {
    if (profile.income <= criteria.maxIncome) {
      reasons.push(`✓ Annual income (₹${profile.income.toLocaleString('en-IN')}) is within the cap of ₹${criteria.maxIncome.toLocaleString('en-IN')}.`);
      score += 25;
    } else {
      rejections.push(`✕ Annual family income (₹${profile.income.toLocaleString('en-IN')}) exceeds maximum limit of ₹${criteria.maxIncome.toLocaleString('en-IN')}.`);
    }
  } else {
    reasons.push(`? Income not provided.`);
  }

  // 3. Gender Evaluation
  totalWeights += 10;
  if (criteria.gender === "All" || profile.gender === criteria.gender) {
    reasons.push(`✓ Gender (${profile.gender || 'Not specified'}) matches scheme requirement (${criteria.gender}).`);
    score += 10;
  } else {
    rejections.push(`✕ Scheme is restricted to ${criteria.gender} applicants only (Your profile: ${profile.gender}).`);
  }

  // 4. State Domicile Evaluation
  totalWeights += 15;
  if (scheme.state === "All India" || profile.state === scheme.state) {
    reasons.push(`✓ Domicile state (${profile.state || 'All India'}) is eligible for ${scheme.state} scheme.`);
    score += 15;
  } else {
    rejections.push(`✕ Scheme is specific to ${scheme.state} residents (Your profile state: ${profile.state}).`);
  }

  // 5. Occupation Evaluation
  totalWeights += 10;
  if (criteria.occupation.includes("All") || (profile.occupation && criteria.occupation.includes(profile.occupation))) {
    reasons.push(`✓ Occupation (${profile.occupation || 'Any'}) aligns with scheme target groups.`);
    score += 10;
  } else {
    rejections.push(`✕ Occupation '${profile.occupation}' is not listed in eligible occupations (${criteria.occupation.join(', ')}).`);
  }

  // 6. Social Category Evaluation
  totalWeights += 10;
  if (criteria.category.includes("All") || (profile.category && criteria.category.includes(profile.category))) {
    reasons.push(`✓ Category (${profile.category || 'General'}) satisfies eligibility list (${criteria.category.join(', ')}).`);
    score += 10;
  } else {
    rejections.push(`✕ Category '${profile.category}' does not qualify for this reserved category scheme.`);
  }

  // 7. Educational Qualification Evaluation
  totalWeights += 5;
  const userEduRank = EDUCATION_RANK[profile.education] || 0;
  const requiredEduRank = EDUCATION_RANK[criteria.minEducation] || 0;
  if (userEduRank >= requiredEduRank) {
    reasons.push(`✓ Education qualification (${profile.education || 'None'}) meets minimum benchmark (${criteria.minEducation}).`);
    score += 5;
  } else {
    rejections.push(`✕ Minimum education required is '${criteria.minEducation}', but your profile specifies '${profile.education || 'None'}'.`);
  }

  // 8. Disability Requirement Check
  totalWeights += 5;
  if (!criteria.disabilityRequired || profile.isDisabled) {
    reasons.push(criteria.disabilityRequired ? `✓ Disability status verified.` : `✓ No specific disability requirement.`);
    score += 5;
  } else {
    rejections.push(`✕ Scheme requires benchmark disability status (UDID card).`);
  }

  // 9. Marital Status Check
  if (criteria.maritalStatus !== "All" && profile.maritalStatus && profile.maritalStatus !== criteria.maritalStatus) {
    rejections.push(`✕ Marital status must be '${criteria.maritalStatus}' (Your profile: ${profile.maritalStatus}).`);
  }

  const isEligible = rejections.length === 0;
  const matchPercentage = Math.round((score / totalWeights) * 100);

  return {
    schemeId: scheme.id,
    scheme,
    isEligible,
    matchPercentage: isEligible ? Math.max(matchPercentage, 75) : Math.min(matchPercentage, 45),
    reasons,
    rejections
  };
}

export function evaluateAllSchemes(profile, schemes) {
  return schemes.map(scheme => evaluateEligibility(profile, scheme))
    .sort((a, b) => {
      if (a.isEligible && !b.isEligible) return -1;
      if (!a.isEligible && b.isEligible) return 1;
      return b.matchPercentage - a.matchPercentage;
    });
}
