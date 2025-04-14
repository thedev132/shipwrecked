import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 style={{ color: 'darkblue', fontSize: '2.5rem', marginTop: '1.5rem', fontWeight: "bolder"}} {...props} />,
    h2: (props) => <h2 style={{ color: 'darkblue', fontSize: '2rem', marginTop: '1.25rem' }} {...props} />,
    h3: (props) => <h3 style={{ color: 'darkblue', fontSize: '1.5rem', marginTop: '1rem' }} {...props} />,
    h4: (props) => <h4 style={{ color: 'darkblue', fontSize: '1.25rem', marginTop: '0.75rem' }} {...props} />,
    br: (props) => <br style={{ margin: '1rem 0' }} {...props} />,
    p: (props) => <p style={{ lineHeight: '1.6', fontSize: '1rem', marginTop: '1rem' }} {...props} />,
    a: (props) => <a style={{ color: 'teal', textDecoration: 'underline' }} {...props} />,
    li: (props) => <li style={{ margin: '0.5rem 0' }} {...props} />,
    ul: (props) => <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', listStyleType: 'disc' }} {...props} />,
    ol: (props) => <ol style={{ paddingLeft: '1.5rem', marginTop: '1rem', listStyleType: 'decimal' }} {...props} />, // Ensure ordered lists use numbers
    ...components,
  }
}