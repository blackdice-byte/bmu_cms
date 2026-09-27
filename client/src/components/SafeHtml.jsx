import DOMPurify from 'dompurify'

// Renders admin-authored rich-text (Page/News content) safely. Content still
// comes from authenticated admin/editor users, but sanitizing before
// dangerouslySetInnerHTML is cheap defense-in-depth against a compromised
// account or a stored-XSS payload slipping into a field.
export default function SafeHtml({ html, className }) {
  const clean = DOMPurify.sanitize(html || '')
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />
}
