export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl p-8 border border-[#DD7E1F] ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
