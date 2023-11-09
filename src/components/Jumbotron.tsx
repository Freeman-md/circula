import React, { useState, useRef } from 'react';

type JumbotronOwnProps<E extends React.ElementType = React.ElementType> = {
  children: React.ReactNode;
  toggleButton?: React.ReactElement;
  as?: E;
  className?: string;
};

type JumbotronProps<E extends React.ElementType> = JumbotronOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof JumbotronOwnProps>;

const __DEFAULT_ELEMENT__ = 'div';

function Jumbotron<E extends React.ElementType = typeof __DEFAULT_ELEMENT__>({
  children,
  toggleButton,
  as,
  className,
  ...props
}: JumbotronProps<E>) {
  const Component = as || __DEFAULT_ELEMENT__;
  const combinedClassName = `bg-secondary/10 py-2 px-4 rounded-lg flex space-x-4 items-end justify-between transition duration-200 hover:bg-secondary/20 focus:bg-secondary/20 ${className || ''}`;

  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = () => {
    const paragraphs = divRef.current?.querySelectorAll('p');
    if (paragraphs) {
      const firstParagraph = Array.from(paragraphs);
      if (firstParagraph.length > 0) {
        const value = firstParagraph[firstParagraph.length - 1].textContent;
        navigator.clipboard.writeText(value!)
          .then(() => {
            setShowCopiedMessage(true);
            setTimeout(() => {
              setShowCopiedMessage(false);
            }, 3000);
          })
          .catch(error => {
            console.error('Error copying to clipboard:', error);
          });
      }
    }
  };

  const content = Component === 'div' ? (
    <div
      ref={divRef}
      onClick={handleCopy}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {children}
      {showCopiedMessage && (
        <span
          className="absolute -top-1 right-0 text-primary"
          style={{ marginRight: '2px' }}
        >
          Copied
        </span>
      )}
    </div>
  ) : (
    children
  );

  return (
    <div className={combinedClassName}>
      <Component {...props} role="jumbotron" className='flex-grow'>
        {content}
      </Component>
      {toggleButton && toggleButton}
    </div>
  );
}

export default Jumbotron;
