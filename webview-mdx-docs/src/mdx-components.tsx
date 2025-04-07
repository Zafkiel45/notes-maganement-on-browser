import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({children}) => (
      <h1 className='text-4xl text-purple-400' >{children}</h1>
    ),
    ...components,
  }
}