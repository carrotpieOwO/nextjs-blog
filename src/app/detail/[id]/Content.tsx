
// import parse from 'html-react-parser';
import { ReactNode } from 'react';
import { Highlight, themes } from "prism-react-renderer"
import { JSDOM } from 'jsdom';

interface Props {
    html: string
}

type TagComponent = React.FC<{ children: ReactNode }>;

interface Tags {
  [key: string]: TagComponent;
}

const CodeBlock = ({ language, code }) => (
    <Highlight theme={themes.shadesOfPurple} code={code} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style}>
                {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                    <span>{i + 1}</span>
                    {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                    ))}
                </div>
                ))}
            </pre>
            )}
    </Highlight>
  );

const tags:Tags = {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-8">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
    strong: ({ children }) => <p className="font-bold">{children}</p>,
    //code: ({ children }) => <code className="bg-pink-200">{children}</code>,
    blockquote: ({ children }) => <blockquote className="px-10 py-10 bg-pink-100 my-2">{children}</blockquote>,
    //pre: ({ children }) =>  <CodeBlock language='tsx' code={children[0]}></CodeBlock>
};


const parseHTMLToJSX = (html: string): ReactNode[] => {
    const dom = new JSDOM(html);
    const { document } = dom.window;
    const renderedElements: ReactNode[] = [];
  
    const traverseNode = (node: Node): ReactNode => {
        if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
            const tagName = (node as Element).nodeName.toLowerCase();
            const TagComponent = tags[tagName];
            
         if (TagComponent) {
               
              const props: { [key: string]: string } = {};
              for (let i = 0; i < (node as Element).attributes.length; i++) {
                const attribute = (node as Element).attributes[i];
                props[attribute.name] = attribute.value;
              }
              const children = Array.from(node.childNodes).map(traverseNode);
              console.log('child', children[0])
              return <TagComponent {...props}>{children}</TagComponent>;
            } else {
              const children = Array.from(node.childNodes).map(traverseNode);
              return children;
            }
          } else if (node.nodeType === dom.window.Node.TEXT_NODE) {
            return node.textContent || '';
          }
          return null;
    };
  
    Array.from(document.body.childNodes).forEach((node) => {
      const element = traverseNode(node);
      if (element) {
        renderedElements.push(element);
      }
    });
  
    return renderedElements;
  };

export default function Content({ html }: Props) {
    const jsxElements = parseHTMLToJSX(html);
    // const renderedHTML = renderToString(<>{jsxElements}</>);
    // return <div dangerouslySetInnerHTML={{ __html: jsxElements }} />;
    return <>{jsxElements}</>;
};