import "./footer.scss";

import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <strong>
          <Logo />
        </strong>
        &nbsp; made with ❤️ by&nbsp;
        <a href="http://anishanandan.com" target="_blank" rel="noopener noreferrer">
          <strong>Anish Anandan</strong>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
