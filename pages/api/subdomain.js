export default (req, res) => {
  const subdomain = process.env.NEXT_PUBLIC_COMPANY_SUBDOMAIN;

  if (subdomain) {
    res.status(200).json({ subdomain });
  } else {
    res.status(200).json({ subdomain: null });
  }
};
