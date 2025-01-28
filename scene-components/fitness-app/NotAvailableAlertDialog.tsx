import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { TriangleAlertIcon } from "lucide-react-native";
import { FC } from "react";

interface INotAvailableAlertDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NotAvailableAlertDialog: FC<INotAvailableAlertDialogProps> = ({isOpen, handleClose}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={handleClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
          <AlertDialogBody className="mt-3 mb-4">
            <VStack space="md">
              <Icon 
                as={TriangleAlertIcon} 
                // @ts-ignore
                size={48} 
                className="color-yellow-400 self-center"
              />
              <Text size="sm" bold={true} className="text-center">
                Fitur belum tersedia, tunggu kehadirannya sebentar lagi.
              </Text>
            </VStack>
          </AlertDialogBody>
        </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotAvailableAlertDialog;
