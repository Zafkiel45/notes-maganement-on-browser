import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-semibold mb-5">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold mb-5">{children}</h2>,
    p: ({ children }) => <p className="text-lg my-5">{children}</p>,
    hr: (props) => (
      <hr
        {...props}
        className="my-6 h-[2px] border-none bg-neutral-700 rounded-md"
      />
    ),
    ...components,
  }
}