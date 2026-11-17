import planck from './planck';
import brightcode from './brightcode';
import specter from './specter';
import podtoposts from './podtoposts';
import joynt from './joynt';

// Reading order for "Next case study". Each is opened by its slug (#case-planck).
export const caseStudyOrder = [planck, brightcode, specter, podtoposts, joynt];

export const caseStudies = Object.fromEntries(caseStudyOrder.map((study) => [study.slug, study]));
