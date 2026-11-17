export const EMAIL = 'mailto:akhilnishtala14@gmail.com';

// Verdicts are listed from best to worst, each with the highest value that still earns it
export const pickVerdict = (verdicts, value) => verdicts.find((item) => value <= item.max).text;
