import React, { useState, useRef } from 'react';

type JumbotronOwnProps<E extends React.ElementType = React.ElementType> = {
  children: React.ReactNode;
  toggleButton?: React.ReactElement
  as?: E;
  className?: string;
}

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

  const contentRef = useRef(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleCopy = () => {
    if (contentRef.current && Component === 'div') {
      const range = document.createRange();
      range.selectNode(contentRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      setShowCopiedMessage(true);

      setTimeout(() => {
        setShowCopiedMessage(false);
      }, 3000);
    }
  };

  const content = Component === 'div' ? (
    <div
      ref={contentRef}
      onClick={handleCopy}
      className='items-stretch w-full'
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
      <Component {...props} role="jumbotron">
        {content}
      </Component>
      {toggleButton && toggleButton}
    </div>
  );
}

export default Jumbotron;
