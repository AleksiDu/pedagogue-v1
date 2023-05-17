interface CardProps {
  className?: string;
  header?: string;
  paragraph?: string;
  author?: string;
}
const Card: React.FC<CardProps> = ({
  header,
  paragraph,
  author,
  className,
}) => {
  return (
    <div className={className || "1"}>
      <h2>{header}</h2>
      <p>{paragraph}</p>
      <span>{author}</span>
    </div>
  );
};

export default Card;
