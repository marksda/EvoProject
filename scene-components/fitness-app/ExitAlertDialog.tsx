import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { FC } from "react";

interface IExitAlertDialogProps {
  isOpen: boolean;
  handleClose: (isClose: boolean) => void;
}

const ExitAlertDialog: FC<IExitAlertDialogProps> = ({isOpen, handleClose}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={() => {handleClose(false);}} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            Keluar
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">
            Anda akan Logout dan menutup aplikasi ini.
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            variant="outline"
            action="secondary"
            onPress={() => {handleClose(false);}}
            size="sm"
          >
            <ButtonText>Tidak</ButtonText>
          </Button>
          <Button size="sm" onPress={() => {handleClose(true);}}>
            <ButtonText>Ya</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitAlertDialog;
