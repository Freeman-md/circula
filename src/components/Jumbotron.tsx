import React from 'react';

interface JumbotronOwnProps<E extends React.ElementType = React.ElementType> {
  children: React.ReactNode;
  as?: E;
  className?: string;
}

type JumbotronProps<E extends React.ElementType> = JumbotronOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof JumbotronOwnProps>;

const __DEFAULT_ELEMENT__ = 'div';

function Jumbotron<E extends React.ElementType = typeof __DEFAULT_ELEMENT__>({
  children,
  as,
  className,
  ...props
}: JumbotronProps<E>) {
  const Component = as || __DEFAULT_ELEMENT__;
  const combinedClassName = `bg-secondary/10 py-2 px-4 rounded-lg space-y-1.5 block transition duration-200 hover:bg-secondary/20 focus:bg-secondary/20 ${className || ''}`;

  return (
    <Component {...props} role="jumbotron" className={combinedClassName}>
      {children}
    </Component>
  );
}

export default Jumbotron;
