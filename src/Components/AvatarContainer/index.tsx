import { CSSProperties, FC } from "react";
import Avatar from "react-avatar";

interface AvatarContainerProps extends AvatarTypes {
  handleAvatarBtn?: () => void;
  isLoggedIn?: boolean;
}

interface AvatarTypes {
  id: string;
  src: string;
  className: string;
  size: string;
  style?: CSSProperties;
  onClick?: () => void;
  alt?: string;
}

const AvatarContainer: FC<AvatarContainerProps> = ({
  isLoggedIn,
  id,
  src,
  className,
  size,
  style,
  alt,
  onClick,
}) => {
  return (
    <div className={className}>
      <Avatar
        key={id}
        src={isLoggedIn ? src : require("../../assets/icons/login_logo.png")}
        size={size}
        style={style}
        onClick={onClick}
        alt={alt}
      />
    </div>
  );
};

export default AvatarContainer;
