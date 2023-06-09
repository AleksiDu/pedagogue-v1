import Avatar from "react-avatar";
import { useScreenWidth } from "../../context/ScreenWidthContext";
import { FC } from "react";

interface AvatarContainerProps extends AvatarTypes {
  handleAvatarBtn?: () => void;
  isLoggedIn: boolean;
}

interface AvatarTypes {
  key: string;
  src: string;
  classAvatar: string;
  size: string;
  style?: any;
  onClick?: () => void;
}

const AvatarContainer: FC<AvatarContainerProps> = ({
  isLoggedIn,
  key,
  src,
  classAvatar,
  size,
  style,
  onClick,
}) => {
  const screenWidth = useScreenWidth();

  if (screenWidth < 480 || !isLoggedIn) {
    return null;
  }

  return (
    <div className={classAvatar}>
      <Avatar key={key} src={src} size={size} style={style} onClick={onClick} />
    </div>
  );
};

export default AvatarContainer;
