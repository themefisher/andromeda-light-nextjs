import { TfiQuoteLeft } from "react-icons/tfi";

const Blockquote = ({ name, children }) => {
  return (
    <blockquote className="rounded-xl border border-border-secondary bg-body px-8 py-3  not-italic">
      <span className="text-5xl text-gray-400">
        <TfiQuoteLeft />
      </span>
      {children}
      <span className="m-0 block border-t border-border-secondary pt-3 text-base font-normal text-text after:hidden">
        {name}
      </span>
    </blockquote>
  );
};

export default Blockquote;
