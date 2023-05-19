interface CardProps {
  className?: string;
  header?: string;
  paragraph?: string;
  author?: string;
  cardClass?: string;
  items?: { id: string; text: string }[];
  onClick?: (id: string) => void;
}
const Card: React.FC<CardProps> = ({
  header,
  paragraph,
  author,
  items,
  cardClass,
  className,
  onClick,
}) => {
  const handleItemClick = (id: string) => {
    if (onClick) {
      onClick(id); // Pass the id to the onClick prop
    }
  };

  return (
    <div className={className || "1"}>
      <h2>{header}</h2>
      <p>{paragraph}</p>
      <span>{author}</span>
      <ul>
        {items &&
          items.map((item) => (
            <li
              key={item.id}
              className={cardClass}
              onClick={() => handleItemClick(item.id)}
            >
              {item.text}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Card;
