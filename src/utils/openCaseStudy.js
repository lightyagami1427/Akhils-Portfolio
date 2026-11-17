// Case studies live at #case-<slug>. Setting the hash directly avoids the smooth-scroll library swallowing the click.
export const openCaseStudy = (event, slug) => {
  event.preventDefault();
  window.location.hash = `case-${slug}`;
};
