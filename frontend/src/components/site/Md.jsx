import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

const A = ({ href = "", children, ...rest }) =>
  href.startsWith("/") ? (
    <Link to={href} data-testid="md-internal-link">{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>{children}</a>
  );

export const Md = ({ children, className = "", streaming = false }) => (
  <div className={`md ${className} ${streaming ? "caret" : ""}`}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: A }}>
      {children || ""}
    </ReactMarkdown>
  </div>
);
