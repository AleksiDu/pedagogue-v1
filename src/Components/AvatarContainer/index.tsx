import { CSSProperties, FC } from "react";
import Avatar from "react-avatar";
import { useScreenWidth } from "../../context/ScreenWidthContext";

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
}

const AvatarContainer: FC<AvatarContainerProps> = ({
  isLoggedIn,
  id,
  src,
  className,
  size,
  style,
  onClick,
}) => {
  const screenWidth = useScreenWidth();

  if (screenWidth < 480) {
    return null;
  }

  return (
    <div className={className}>
      <Avatar
        key={id}
        src={isLoggedIn ? src : require("../../assets/icons/login_logo.png")}
        size={size}
        style={style}
        onClick={onClick}
      />
    </div>
  );
};

export default AvatarContainer;
