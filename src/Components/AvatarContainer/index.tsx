import Avatar from "react-avatar";
import { useScreenWidth } from "../../context/ScreenWidthContext";
import { FC } from "react";

interface AvatarContainerProps extends AvatarTypes {
  handleAvatarBtn?: () => void;
  isLoggedIn: boolean;
}

interface AvatarTypes {
  id: string;
  src: string;
  classAvatar: string;
  size: string;
  style?: any;
  onClick?: () => void;
}

const AvatarContainer: FC<AvatarContainerProps> = ({
  isLoggedIn,
  id,
  src,
  classAvatar,
  size,
  style,
  onClick,
}) => {
  const screenWidth = useScreenWidth();

  if (screenWidth < 480) {
    return null;
  }

  console.log({ isLoggedIn, id, src, classAvatar, size, style });

  return (
    <div className={classAvatar}>
      <Avatar key={id} src={src} size={size} style={style} onClick={onClick} />
    </div>
  );
};

export default AvatarContainer;
