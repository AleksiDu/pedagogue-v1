interface CardProps {
  className?: string;
  header?: string;
  paragraph?: string;
  author?: string;
  items?: { id: string; text: string }[];
}
const Card: React.FC<CardProps> = ({
  header,
  paragraph,
  author,
  items,
  className,
}) => {
  return (
    <div className={className || "1"}>
      <h2>{header}</h2>
      <p>{paragraph}</p>
      <span>{author}</span>
      <ul>
        {items && items.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
};

export default Card;
