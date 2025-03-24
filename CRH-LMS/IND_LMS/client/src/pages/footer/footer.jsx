import backgroundImage from "../../assets/Footer.svg";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "Policy Info",
    links: ["Terms & Conditions", "Privacy policy", "Terms of Use", "Disclaimer"],
  },
  {
    title: "About Us",
    links: ["About Us", "Our Team", "Testimonials", "Upcoming Products"],
  },
  {
    title: "Business",
    links: ["Franchise", "Stores", "Decoration Service", "Gifts"],
  },
];

const socialIcons = [
  { icon: <FaFacebook />, link: "#" },
  { icon: <FaTwitter />, link: "#" },
  { icon: <FaInstagram />, link: "#" },
  { icon: <FaLinkedin />, link: "#" },
  { icon: <FaYoutube />, link: "#" },
];

const Footer = () => {
  return (
    <footer
      className="relative w-full h-auto py-12 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0"></div>

      {/* Footer Content */}
      <div className="relative container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i} className="text-lg hover:underline cursor-pointer">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between">
          <span className="text-4xl font-bold font-wendy">LMS</span>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialIcons.map((social, i) => (
              <a key={i} href={social.link} className="text-2xl hover:text-gray-300">
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
