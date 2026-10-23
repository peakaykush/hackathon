/**
 * AI Cloud Mentor: Generates layered educational breakdowns for AZ-900 questions.
 */

export function getEnhancedQuestionAnalysis(question, selectedIndex) {
  const isCorrect = selectedIndex === question.correctIndex;
  const correctOption = question.options[question.correctIndex];
  const selectedOption = selectedIndex >= 0 ? question.options[selectedIndex] : null;

  // Generate breakdown for why each distractor is wrong
  const optionBreakdowns = question.options.map((opt, idx) => {
    if (idx === question.correctIndex) {
      return {
        letter: String.fromCharCode(65 + idx),
        text: opt,
        isCorrect: true,
        reason: 'This is the accurate Microsoft definition and aligned with official exam syllabus.',
      };
    }

    // Contextual distractor feedback
    let reason = 'Incorrect answer choice for this scenario.';
    const lowerOpt = opt.toLowerCase();
    const lowerQ = question.question.toLowerCase();

    if (lowerOpt.includes('local hard drive') || lowerOpt.includes('datacenter on-premises')) {
      reason = 'This describes traditional on-premises infrastructure, not cloud computing.';
    } else if (lowerOpt.includes('public cloud') && lowerQ.includes('private')) {
      reason = 'Public cloud involves multi-tenancy and shared hardware, which violates dedicated isolation requirements.';
    } else if (lowerOpt.includes('private cloud') && lowerQ.includes('public')) {
      reason = 'Private cloud is dedicated solely to one organization and does not leverage multi-tenant shared hardware.';
    } else if (lowerOpt.includes('iaas') || lowerOpt.includes('paas') || lowerOpt.includes('saas')) {
      reason = 'This belongs to a different cloud service tier with different responsibility boundaries.';
    } else if (lowerOpt.includes('fixed monthly') || lowerOpt.includes('locked into')) {
      reason = 'Cloud computing is primarily consumption-based (pay-as-you-go), avoiding rigid fixed upfront locks.';
    } else if (lowerOpt.includes('physical security') || lowerOpt.includes('hardware')) {
      reason = 'In the public cloud, Microsoft is always responsible for physical hardware, datacenters, and facilities.';
    } else {
      reason = 'This option confuses related Azure terminologies or misapplies architectural boundaries.';
    }

    return {
      letter: String.fromCharCode(65 + idx),
      text: opt,
      isCorrect: false,
      reason,
    };
  });

  // Simple analogy generator (ELI5)
  let eli5 = question.tip || 'Think of it as renting managed services instead of buying physical machines.';
  if (question.topic === 'cloud-concepts') {
    eli5 = 'Imagine running a bakery. Instead of building your own flour mill (CapEx), you buy bags of flour as you bake cakes (OpEx). If you have a holiday rush, you buy more flour; in quiet weeks, you buy less (Elasticity).';
  } else if (question.topic === 'azure-architecture') {
    eli5 = 'Think of Azure Regions like cities and Availability Zones like separate buildings with independent power generators. If one building loses electricity, the other buildings in the city keep working uninterrupted.';
  } else if (question.topic === 'azure-management') {
    eli5 = 'Think of Azure Policy like highway speed limit signs (rules you must follow) and Resource Locks like bicycle chain locks (stopping anyone from taking your bike by accident).';
  }

  // Enterprise scenario
  let enterpriseScenario = 'Used by global enterprises and startups to reduce IT overhead and ensure 99.99% business continuity.';
  if (question.subtopic?.includes('Storage')) {
    enterpriseScenario = 'A healthcare app stores active patient scans in Hot Tier for doctors to view instantly, and automatically moves scans older than 6 months to Cool/Archive Tier to save 80% on cloud storage bills.';
  } else if (question.subtopic?.includes('Identity') || question.subtopic?.includes('Security')) {
    enterpriseScenario = 'A banking institution enforces Conditional Access: employees can only sign in to customer databases if their laptop is encrypted and located in an approved corporate office network.';
  } else if (question.subtopic?.includes('Governance') || question.subtopic?.includes('Cost')) {
    enterpriseScenario = 'A fintech team assigns Azure Policy so junior developers cannot accidentally spin up $1,000/month GPU servers, restricting test resources strictly to low-cost B-series VMs in their home region.';
  }

  // Exam trap / watch out
  let examTrap = 'Be careful with similar-sounding words like "Availability Zone" vs "Availability Set" or "CapEx" vs "OpEx".';
  if (question.question.toLowerCase().includes('always')) {
    examTrap = 'Notice the word "ALWAYS" — on AZ-900, customer data and device credentials are ALWAYS customer responsibility across IaaS, PaaS, and SaaS.';
  } else if (question.question.toLowerCase().includes('cost') || question.question.toLowerCase().includes('pricing')) {
    examTrap = 'Distinguish between the TCO Calculator (historical comparison of on-prem vs cloud) and Pricing Calculator (future estimate of new Azure services).';
  } else if (question.question.toLowerCase().includes('lock') || question.question.toLowerCase().includes('policy')) {
    examTrap = 'Resource Locks prevent deletion/edits even for Subscription Owners. RBAC controls permissions. Azure Policy audits and enforces configurations.';
  }

  return {
    isCorrect,
    correctOption,
    selectedOption,
    verdict: isCorrect ? 'Spot On! Correct Answer.' : 'Not Quite Right',
    explanation: question.explanation,
    tip: question.tip,
    eli5,
    optionBreakdowns,
    enterpriseScenario,
    examTrap,
  };
}
