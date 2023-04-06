import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { title } = config.site;
  const { footer_content } = config.params;
  const { email, name, address, bank, iban } = config.contact_info;
  return (
    <footer className="">
      <div className="container">
        <div className="row border-y border-border py-12">
          <div className="animate md:col-6 lg:col-3">
            <Logo />
            {markdownify(footer_content, "p", "mt-3")}
          </div>
          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Social Media</h3>
            <div className="mt-5">
              {email && <Link href={`mailto:${email}`}>{email}</Link>}
              <Social source={social} className="social-icons mt-5" />
            </div>
          </div>
          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Quick Links</h3>
            <ul className="mt-5 leading-10">
              {menu.footer.map((menu) => (
                <li key={menu.name}>
                  <Link
                    href={menu.url}
                    className=" hover:text-primary hover:underline"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="animate mt-8 md:col-6 lg:col-3 lg:mt-0">
            <h3 className="h5">Kontaktdaten</h3>
            <ul className="mt-5 leading-10">
              <li><strong>{markdownify(name)}</strong></li>
              <li>{markdownify(address)}</li>
              <li><strong>Spendenkonto:</strong></li>
              <li>{markdownify(bank)}</li>
              <li><strong>IBAN:</strong> {markdownify(iban)}</li>
            </ul>
          </div>
        </div>
        <div className=" py-6 text-center">
          <p className="footer-copy-write">
            © {new Date().getFullYear()} {markdownify(title)}.
            {" "} //  {" "}
            <Link href="/impressum" className=" hover:text-primary hover:underline">Impressum</Link>
            {" "} // {" "}
            <Link href="/gdpr" className=" hover:text-primary hover:underline">Datenschutzerklärung</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
