import { Box } from "@/components/ui/box";
import ProfileContentHeader from "./ProfileContentHeader";
import ProfileContentMain from "./ProfileContentMain";

const ProfileContentBase = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <ProfileContentHeader />
      <ProfileContentMain />
    </Box>
  );
}

export default ProfileContentBase;