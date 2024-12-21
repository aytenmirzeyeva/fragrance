import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-pink-200 text-gray-600 py-10">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Fragrance. All rights reserved.</p>
        <p>Follow us on:</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300"
          >
            <FontAwesomeIcon icon={faFacebook as IconProp} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300"
          >
            <FontAwesomeIcon icon={faXTwitter as IconProp} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-300"
          >
            <FontAwesomeIcon icon={faInstagram as IconProp} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
