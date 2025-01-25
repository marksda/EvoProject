import { Box } from "@/components/ui/box"
import AkunContentHeader from "./AkunContentHeader";
import AkunContentMain from "./AkunContentMain";
import { useAppSelector } from "@/features/ssot/hook";
import LoginForm from "../formulir/LoginForm";

const AkunContentBase = ({ modalVisible, setModalVisible, setActiveTab, activeTab }: any) => {
  const token = useAppSelector(state => state.persisted.token);

  return token.token == null ? 
  <LoginForm />
  : (
      <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
          <AkunContentHeader
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
          />
          <AkunContentMain />
      </Box>
  );
}

export default AkunContentBase;