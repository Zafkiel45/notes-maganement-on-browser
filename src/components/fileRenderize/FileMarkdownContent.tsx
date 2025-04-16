import React from 'react';
import Markdoc from '@markdoc/markdoc';

export function FileContent({children}:{children: string}) {
    return (
        <>
            {children}
        </>
    )
};

export function ParseFileContent({markdown}:{markdown: string}) {
    const parsedContent = Markdoc.parse(markdown);
    const transformedContent = Markdoc.transform(parsedContent);
    
    return Markdoc.renderers.react(transformedContent, React, {
        components: {
          FileContent: FileContent
        }
      });
};
