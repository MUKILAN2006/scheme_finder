export const SCHEMES_DATA = [
  {
    id: "pm-kisan",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Agriculture",
    authority: "Central Government",
    state: "All India",
    objective: "Financial assistance of ₹6,000 per year in 3 equal installments to small and marginal farmer families across India.",
    benefits: "Direct bank transfer of ₹6,000 annually (₹2,000 every 4 months) directly into linked bank accounts.",
    eligibility: {
      minAge: 18,
      maxAge: 75,
      maxIncome: 250000,
      gender: "All",
      occupation: ["Farmer", "Agriculture Worker", "Self-Employed"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Must own cultivable land registered under applicant or family name."
    },
    requiredDocuments: [
      "Aadhaar Card",
      "Land Ownership Documents (Khasra/Khatauni)",
      "Bank Passbook linked with Aadhaar",
      "Mobile Number"
    ],
    officialUrl: "https://pmkisan.gov.in",
    deadline: "Open All Year",
    faqs: [
      { q: "Is land ownership mandatory?", a: "Yes, applicant must own cultivable land as per land records." },
      { q: "Can institutional landholders apply?", a: "No, institutional landholders are excluded." }
    ],
    applicationProcedure: [
      "Visit PM-KISAN Portal or nearest CSC center.",
      "Click on New Farmer Registration.",
      "Enter Aadhaar Number, Select State & District.",
      "Upload Land Records & Bank details.",
      "Submit application and note Registration Reference Number."
    ]
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat - PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    category: "Health & Medical",
    authority: "Central Government",
    state: "All India",
    objective: "Health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization to bottom 40% vulnerable population.",
    benefits: "Cashless and paperless access to healthcare services up to ₹5,000,000 in empanelled public and private hospitals.",
    eligibility: {
      minAge: 0,
      maxAge: 100,
      maxIncome: 300000,
      gender: "All",
      occupation: ["All", "Laborer", "Farmer", "Unemployed", "Street Vendor", "Domestic Worker"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Family identified under SECC 2011 data or BPL ration card holders."
    },
    requiredDocuments: [
      "Aadhaar Card",
      "Ration Card (BPL/Ayushman Card)",
      "Income Certificate",
      "Mobile Number"
    ],
    officialUrl: "https://pmjay.gov.in",
    deadline: "Ongoing Scheme",
    faqs: [
      { q: "Is there any pre-existing disease restriction?", a: "No, all pre-existing medical conditions are covered from day one." },
      { q: "How many family members are covered?", a: "There is no cap on family size or age of family members." }
    ],
    applicationProcedure: [
      "Check eligibility on mera.pmjay.gov.in using mobile or Aadhaar.",
      "Visit nearest Empanelled Hospital or CSC Kendra.",
      "Present Aadhaar and Ration card to Ayushman Mitra.",
      "Complete e-KYC photo verification and receive Golden Health Card."
    ]
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    category: "Women & Child",
    authority: "Central Government",
    state: "All India",
    objective: "Small deposit savings scheme targeted for parents of girl children to build a fund for higher education and marriage expenses.",
    benefits: "High guaranteed interest rate (8.2% p.a.), Section 80C tax deduction, tax-free maturity after 21 years.",
    eligibility: {
      minAge: 0,
      maxAge: 10,
      maxIncome: 1000000,
      gender: "Female",
      occupation: ["Student", "All"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "Single",
      otherConditions: "Account opened by biological parents or legal guardians for girl child below 10 years of age."
    },
    requiredDocuments: [
      "Birth Certificate of Girl Child",
      "Aadhaar Card of Parent/Guardian",
      "Address Proof",
      "Passport Size Photograph"
    ],
    officialUrl: "https://www.indiapost.gov.in",
    deadline: "Until child reaches 10 years",
    faqs: [
      { q: "What is the minimum annual deposit?", a: "Minimum deposit is ₹250 per financial year, up to ₹1.5 Lakh." },
      { q: "Can I open accounts for 3 daughters?", a: "Only 2 accounts allowed per family, except in case of triplets/twins." }
    ],
    applicationProcedure: [
      "Visit any Post Office branch or authorized public/private bank.",
      "Fill SSY Account Opening Form.",
      "Attach girl child birth certificate and parent's KYC documents.",
      "Make initial deposit (minimum ₹250) and collect passbook."
    ]
  },
  {
    id: "post-matric-scholarship",
    name: "Post-Matric Scholarship Scheme for SC/ST/OBC Students",
    category: "Education & Scholarship",
    authority: "Central Government",
    state: "All India",
    objective: "Provide financial assistance to SC, ST, and OBC students studying at post-matriculation or post-secondary stage to complete education.",
    benefits: "Full reimbursement of non-refundable tuition fees plus monthly maintenance allowance up to ₹1,200/month.",
    eligibility: {
      minAge: 15,
      maxAge: 35,
      maxIncome: 250000,
      gender: "All",
      occupation: ["Student"],
      category: ["SC", "ST", "OBC"],
      minEducation: "Class 10th Passed",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Student pursuing recognized post-matriculation courses in recognized institutions."
    },
    requiredDocuments: [
      "Cast Certificate (SC/ST/OBC)",
      "Income Certificate (issued by Tehsildar)",
      "Class 10th / 12th Marksheets",
      "College Admission Fee Receipt",
      "Aadhaar linked Bank Account"
    ],
    officialUrl: "https://scholarships.gov.in",
    deadline: "31st October 2026",
    faqs: [
      { q: "Can distance learning students apply?", a: "Yes, recognized distance education programs are eligible." },
      { q: "What if annual income is ₹2,60,000?", a: "Income must be within ₹2.5 Lakhs limit to qualify." }
    ],
    applicationProcedure: [
      "Register on National Scholarship Portal (NSP).",
      "Complete OTR (One-Time Registration) with Aadhaar e-KYC.",
      "Fill Scheme application and upload caste, income & marksheet certificates.",
      "Submit application to Institute verification desk."
    ]
  },
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi - Micro Credit Scheme for Street Vendors",
    category: "Business & Entrepreneurship",
    authority: "Central Government",
    state: "All India",
    objective: "Special micro-credit facility providing affordable working capital loans to street vendors to resume livelihoods.",
    benefits: "Collateral-free loan of ₹10,000 (1st tranche), ₹20,000 (2nd tranche), and ₹50,000 (3rd tranche) with 7% interest subsidy and cashback on digital transactions.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 350000,
      gender: "All",
      occupation: ["Street Vendor", "Small Business Owner", "Self-Employed"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Vendors engaged in vending in urban areas on or before March 24, 2020 with Vending Certificate or LoR."
    },
    requiredDocuments: [
      "Aadhaar Card / Voter ID",
      "Certificate of Vending / Urban Local Body Identity Card",
      "Bank Account details",
      "Mobile number linked with Aadhaar"
    ],
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    deadline: "31st December 2026",
    faqs: [
      { q: "Is collateral required for loan?", a: "No collateral required." },
      { q: "What is the interest subsidy rate?", a: "7% per annum interest subsidy credited directly to bank." }
    ],
    applicationProcedure: [
      "Visit PM SVANidhi portal or Banking Correspondent (BC).",
      "Check vendor survey status using mobile number.",
      "Fill online loan application form.",
      "Upload Vending Certificate and Aadhaar KYC.",
      "Loan disbursed by chosen bank within 7 days."
    ]
  },
  {
    id: "startup-india-seed-fund",
    name: "Startup India Seed Fund Scheme (SISFS)",
    category: "Business & Entrepreneurship",
    authority: "Central Government",
    state: "All India",
    objective: "Provide financial assistance to early-stage startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    benefits: "Grant up to ₹20 Lakhs for validation & prototype + debt funding up to ₹50 Lakhs through approved incubators.",
    eligibility: {
      minAge: 18,
      maxAge: 60,
      maxIncome: 1500000,
      gender: "All",
      occupation: ["Entrepreneur", "Self-Employed", "Student", "IT Professional"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "Class 12th Passed",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Startup recognized by DPIIT, incorporated not more than 2 years ago at the time of application."
    },
    requiredDocuments: [
      "DPIIT Recognition Certificate",
      "Certificate of Incorporation / Registration",
      "Pitch Deck / Business Plan",
      "Founder Aadhaar & PAN Cards"
    ],
    officialUrl: "https://seedfund.startupindia.gov.in",
    deadline: "Continuous Application Window",
    faqs: [
      { q: "Is equity taken by Government?", a: "No equity taken for grants; incubators manage debt/convertible notes." }
    ],
    applicationProcedure: [
      "Register startup on Startup India Portal and obtain DPIIT number.",
      "Log into SISFS portal.",
      "Select up to 3 preference Incubators across India.",
      "Submit pitch presentation and project cost estimates."
    ]
  },
  {
    id: "ladli-behna-yojana",
    name: "Ladli Behna Yojana (State Welfare Scheme)",
    category: "Women & Child",
    authority: "State Government",
    state: "Madhya Pradesh",
    objective: "Empower women financially, improve health and nutrition status, and encourage financial independence.",
    benefits: "Direct Monthly stipend of ₹1,250 transferred into women's Aadhaar-linked bank account (₹15,000 per year).",
    eligibility: {
      minAge: 21,
      maxAge: 60,
      maxIncome: 250000,
      gender: "Female",
      occupation: ["Housewife", "Unemployed", "Laborer", "Farmer", "Self-Employed"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "Married",
      otherConditions: "Applicant must be a permanent resident of Madhya Pradesh and not paying income tax."
    },
    requiredDocuments: [
      "Samagra ID",
      "Aadhaar Card",
      "Bank Account details with e-KYC & DBT active",
      "MP Domicile Certificate"
    ],
    officialUrl: "https://cmladlibehna.mp.gov.in",
    deadline: "Open Monthly Window",
    faqs: [
      { q: "Can unmarried women apply?", a: "Scheme is for married, widowed, divorced, and deserted women aged 21-60." },
      { q: "Is income tax payer eligible?", a: "No, family income tax payers are excluded." }
    ],
    applicationProcedure: [
      "Visit local Gram Panchayat or Ward Office camp.",
      "Provide Samagra ID and Aadhaar Card.",
      "Biometric e-KYC capture on spot.",
      "Application submitted and receipt provided with tracking ID."
    ]
  },
  {
    id: "pm-mudra-yojana",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    category: "Business & Entrepreneurship",
    authority: "Central Government",
    state: "All India",
    objective: "Funding the unfunded micro enterprise sector by providing non-corporate, non-farm small/micro business loans.",
    benefits: "Collateral-free loans up to ₹10 Lakhs under 3 categories: Shishu (up to ₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L).",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 1000000,
      gender: "All",
      occupation: ["Small Business Owner", "Self-Employed", "Artisan", "Shopkeeper", "Laborer"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Proposed business activity in manufacturing, trading, services, or agriculture-allied activities."
    },
    requiredDocuments: [
      "Aadhaar Card & PAN Card",
      "Business Identity/Address Proof (GST/Trade License)",
      "Project Profile / Quotation for machinery/stock",
      "2 Passport Photos"
    ],
    officialUrl: "https://www.mudra.org.in",
    deadline: "Open All Year",
    faqs: [
      { q: "Is collateral required?", a: "No collateral security required for Mudra loans." }
    ],
    applicationProcedure: [
      "Apply online via UdyamiMitra Portal or approach any public bank branch.",
      "Select category: Shishu, Kishore, or Tarun.",
      "Submit Mudra application form with business proposal and KYC.",
      "Bank evaluates project and disburses loan."
    ]
  },
  {
    id: "national-overseas-scholarship",
    name: "National Overseas Scholarship (NOS) for SC/ST Students",
    category: "Education & Scholarship",
    authority: "Central Government",
    state: "All India",
    objective: "Financial assistance to low-income students belonging to SC, De-notified Tribes, and Landless Agricultural Labourers to pursue Master’s / Ph.D. abroad.",
    benefits: "Full tuition fee payment, annual maintenance allowance ($15,400 USD / £9,900 GBP), contingency allowance, visa fees, and return airfare.",
    eligibility: {
      minAge: 20,
      maxAge: 35,
      maxIncome: 800000,
      gender: "All",
      occupation: ["Student"],
      category: ["SC", "ST"],
      minEducation: "Undergraduate Passed",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Must have secured minimum 60% marks in qualifying degree and unconditional admission offer from top 500 QS ranked foreign university."
    },
    requiredDocuments: [
      "Caste Certificate",
      "Income Certificate (Family income < ₹8 Lakhs)",
      "Unconditional Admission Letter from Foreign University",
      "Marksheets (10th to Bachelor's Degree)",
      "Valid Indian Passport"
    ],
    officialUrl: "https://nosmsje.gov.in",
    deadline: "31st March 2026",
    faqs: [
      { q: "What is the QS ranking criteria?", a: "University must be listed in Top 500 QS World University Rankings." }
    ],
    applicationProcedure: [
      "Register on NOS portal (nosmsje.gov.in).",
      "Fill online profile and upload academic documents + admission letter.",
      "Selection committee screens candidates and issues Award Letter.",
      "Embassy clearance and financial guarantee letter issued."
    ]
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme for Traditional Artisans",
    category: "Skill & Employment",
    authority: "Central Government",
    state: "All India",
    objective: "Holistic end-to-end support to traditional artisans and craftspeople engaged in 18 traditional trades (Carpenters, Blacksmiths, Potters, Tailors, Masons, etc.).",
    benefits: "PM Vishwakarma Certificate & ID, Basic training (₹500/day stipend), ₹15,000 Toolkit Grant, collateral-free loan up to ₹3 Lakh at concessional 5% interest rate.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 300000,
      gender: "All",
      occupation: ["Artisan", "Self-Employed", "Laborer"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Working in one of the 18 traditional family-based trades using hands and tools."
    },
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account details",
      "Ration Card",
      "Active Mobile number for OTP verification"
    ],
    officialUrl: "https://pmvishwakarma.gov.in",
    deadline: "Continuous Window",
    faqs: [
      { q: "How many family members can apply?", a: "Only one person per family can benefit." }
    ],
    applicationProcedure: [
      "Visit Common Services Centre (CSC) with Aadhaar card.",
      "Biometric verification and trade selection.",
      "Gram Panchayat / ULB verification of artisan status.",
      "Issuance of Vishwakarma Digital ID Card and Toolkit E-Voucher."
    ]
  },
  {
    id: "pm-awas-yojana-gramin",
    name: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
    category: "Housing",
    authority: "Central Government",
    state: "All India",
    objective: "Provide financial aid for construction of pucca house with basic amenities to homeless and living in kutcha/dilapidated houses in rural areas.",
    benefits: "Direct grant of ₹1,20,000 (plain areas) or ₹1,30,000 (hilly/Northeast states) + ₹12,000 for toilet under Swachh Bharat + 90 days MGNREGA labor wages.",
    eligibility: {
      minAge: 18,
      maxAge: 75,
      maxIncome: 200000,
      gender: "All",
      occupation: ["Unemployed", "Laborer", "Farmer", "Street Vendor"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Family must not own a pucca house anywhere in India."
    },
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account details linked with Aadhaar",
      "MGNREGA Job Card number",
      "Land Availability Proof / Certificate"
    ],
    officialUrl: "https://pmayg.nic.in",
    deadline: "Ongoing Scheme",
    faqs: [
      { q: "Who selects beneficiaries?", a: "Beneficiaries are prioritized based on SECC 2011 housing deprivation criteria verified by Gram Sabha." }
    ],
    applicationProcedure: [
      "Contact Gram Panchayat Secretary or Rural Housing Officer.",
      "Check inclusion in PMAY-G Permanent Wait List (PWL).",
      "Geo-tagging of current kutcha house plot.",
      "Sanction letter issued and installments transferred in 3 stages."
    ]
  },
  {
    id: "divyangjan-swavalamban",
    name: "Divyangjan Swavalamban Yojana (Loans for Persons with Disabilities)",
    category: "Disability Welfare",
    authority: "Central Government",
    state: "All India",
    objective: "Concessional credit to Person with Disability (PwD) for starting self-employment ventures and vocational pursuits.",
    benefits: "Concessional loans up to ₹50 Lakhs at low interest rates (5% to 8% p.a.) with rebate for prompt repayment.",
    eligibility: {
      minAge: 18,
      maxAge: 60,
      maxIncome: 500000,
      gender: "All",
      occupation: ["All", "Self-Employed", "Unemployed", "Artisan"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: true,
      maritalStatus: "All",
      otherConditions: "Applicant must possess 40% or more benchmark disability certified by competent medical authority (UDID)."
    },
    requiredDocuments: [
      "UDID Card / Disability Certificate (40%+ disability)",
      "Aadhaar Card & PAN Card",
      "Project Cost / Business Plan",
      "Income & Residence Certificate"
    ],
    officialUrl: "https://nhfdc.nic.in",
    deadline: "Open All Year",
    faqs: [
      { q: "Is UDID mandatory?", a: "Yes, UDID card or state Disability Certificate with min 40% disability is required." }
    ],
    applicationProcedure: [
      "Submit application through State Channelizing Agency (SCA) or NHFDC online portal.",
      "Attach UDID card, business plan, and KYC documents.",
      "Technical appraisal and loan approval.",
      "Disbursement with rebate incentives for timely repayment."
    ]
  },
  {
    id: "cm-yuva-swarozgar",
    name: "CM Yuva Swarozgar Yojana (UP / State Self Employment)",
    category: "Business & Entrepreneurship",
    authority: "State Government",
    state: "Uttar Pradesh",
    objective: "Encourage educated unemployed youth to set up industrial and service enterprises by providing financial assistance and margin money subsidy.",
    benefits: "Loan up to ₹25 Lakhs for industrial sector and ₹10 Lakhs for service sector with 25% margin money government subsidy.",
    eligibility: {
      minAge: 18,
      maxAge: 40,
      maxIncome: 400000,
      gender: "All",
      occupation: ["Unemployed", "Student", "Self-Employed"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "Class 10th Passed",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Must be a permanent resident of Uttar Pradesh and High School passed."
    },
    requiredDocuments: [
      "Class 10th Certificate",
      "Domicile Certificate of UP",
      "Detailed Project Report (DPR)",
      "Aadhaar & Bank Details"
    ],
    officialUrl: "https://diupmsme.upsdc.gov.in",
    deadline: "Annual Financial Year Quota",
    faqs: [
      { q: "What is the subsidy percentage?", a: "25% margin money subsidy (max ₹6.25 Lakh for industry)." }
    ],
    applicationProcedure: [
      "Register on DIUP MSME Portal.",
      "Select CM Yuva Swarozgar Yojana.",
      "Upload DPR, High School Certificate, and Domicile Proof.",
      "District Level Task Force Committee (DLTFC) interview and loan sanction."
    ]
  },
  {
    id: "tn-post-matric-differently-abled",
    name: "Tamil Nadu Scholarship for Differently Abled Students",
    category: "Education & Scholarship",
    authority: "State Government",
    state: "Tamil Nadu",
    objective: "Special financial scholarship and book allowance for students with disabilities pursuing higher studies in Tamil Nadu.",
    benefits: "Scholarship of ₹7,000 to ₹14,000 per year plus free laptop / assistive devices.",
    eligibility: {
      minAge: 15,
      maxAge: 35,
      maxIncome: 300000,
      gender: "All",
      occupation: ["Student"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "Class 10th Passed",
      disabilityRequired: true,
      maritalStatus: "All",
      otherConditions: "Must be a resident of Tamil Nadu studying in recognized college/polytechnic/university."
    },
    requiredDocuments: [
      "Disability Certificate (40%+)",
      "TN Domicile Certificate",
      "Mark Sheets",
      "Aadhaar & Bank Account"
    ],
    officialUrl: "https://www.tn.gov.in/scstdept",
    deadline: "30th November 2026",
    faqs: [
      { q: "Is there any stream restriction?", a: "Covered across Arts, Science, Engineering, Medical, and Law degrees." }
    ],
    applicationProcedure: [
      "Apply through District Differently Abled Welfare Officer (DDAWO) or college portal.",
      "Submit Disability identity card copy and study certificate.",
      "Direct bank transfer after institute verification."
    ]
  },
  {
    id: "stand-up-india",
    name: "Stand Up India Scheme for SC/ST and Women Entrepreneurs",
    category: "Business & Entrepreneurship",
    authority: "Central Government",
    state: "All India",
    objective: "Promote entrepreneurship among Women and Scheduled Castes (SC) & Scheduled Tribes (ST) by facilitating greenfield bank loans.",
    benefits: "Bank loans between ₹10 Lakhs and ₹1 Crore for setting up a greenfield enterprise in manufacturing, services, trading, or agriculture-allied activities.",
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 2000000,
      gender: "All",
      occupation: ["Entrepreneur", "Self-Employed", "Business Owner"],
      category: ["SC", "ST", "General", "OBC", "EWS"], // Condition: Women OR SC/ST
      minEducation: "Class 12th Passed",
      disabilityRequired: false,
      maritalStatus: "All",
      otherConditions: "Applicant must be either a Woman OR belong to SC/ST category. In non-individual entities, 51% shareholding must be held by SC/ST or Woman."
    },
    requiredDocuments: [
      "Aadhaar Card & PAN Card",
      "Category Certificate (if SC/ST)",
      "Project Report with financial projections",
      "Company Registration / Partnership Deed",
      "Pollution Control Clearance (if applicable)"
    ],
    officialUrl: "https://www.standupmitra.in",
    deadline: "Continuous Window",
    faqs: [
      { q: "Can male general category entrepreneurs apply?", a: "Male general category can apply only if 51%+ controlling stake is held by SC/ST or Woman partner." }
    ],
    applicationProcedure: [
      "Register on StandUp Mitra Portal (standupmitra.in).",
      "Select Lead District Manager (LDM) or preferred bank branch.",
      "Fill online application form and upload DPR.",
      "Bank conducts appraisal and sanctions loan."
    ]
  },
  {
    id: "national-social-assistance-widow-pension",
    name: "Indira Gandhi National Widow Pension Scheme (IGNWPS)",
    category: "Social Security",
    authority: "Central Government",
    state: "All India",
    objective: "Provide financial security and social assistance monthly pension to widows belonging to Below Poverty Line (BPL) households.",
    benefits: "Monthly pension of ₹500 to ₹1,000 directly deposited into widow's bank account (supplemented by state government contributions).",
    eligibility: {
      minAge: 40,
      maxAge: 79,
      maxIncome: 180000,
      gender: "Female",
      occupation: ["Unemployed", "Housewife", "Laborer"],
      category: ["All", "General", "OBC", "SC", "ST", "EWS"],
      minEducation: "None",
      disabilityRequired: false,
      maritalStatus: "Widowed",
      otherConditions: "Must belong to Below Poverty Line (BPL) household as per Gram Panchayat / Municipal list."
    },
    requiredDocuments: [
      "Death Certificate of Husband",
      "Aadhaar Card",
      "BPL Ration Card",
      "Bank Account details"
    ],
    officialUrl: "https://nsap.nic.in",
    deadline: "Ongoing Scheme",
    faqs: [
      { q: "What happens after age 80?", a: "Beneficiary automatically transitions to Indira Gandhi National Old Age Pension Scheme with higher amount." }
    ],
    applicationProcedure: [
      "Submit application to Social Welfare Officer or Tehsil office.",
      "Attach husband's death certificate, BPL proof, and Aadhaar.",
      "Verification by VDO / Revenue Inspector.",
      "Pension credited directly via Direct Benefit Transfer (DBT)."
    ]
  }
];
