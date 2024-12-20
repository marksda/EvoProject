import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

const LogoutAlertDialog = ({ openLogoutAlertDialog, setOpenLogoutAlertDialog }: any) => {
    const handleClose = () => {
        setOpenLogoutAlertDialog(false);
    };

    return (
        <AlertDialog isOpen={openLogoutAlertDialog} onClose={handleClose}>
            <AlertDialogBackdrop />
            <AlertDialogContent className="p-4">
                <AlertDialogHeader>
                    <Heading>Logout</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody className="" contentContainerClassName="">
                    <Text className="mb-6">Are you sure, you want to logout?</Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant="outline" action="secondary" onPress={handleClose}>
                        <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button action="negative" onPress={handleClose}>
                        <ButtonText className="text-white">Logout</ButtonText>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default LogoutAlertDialog;