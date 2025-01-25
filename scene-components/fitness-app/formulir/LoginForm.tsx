import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";

const LoginForm = () => {
  return (    
    <ScrollView>
      <VStack className="w-[65%] self-center mt-9">      
          <FormControl
            isInvalid={false}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}          
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="password"
                placeholder="password"
              />
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Minimal 3 karakter.
              </FormControlHelperText>
            </FormControlHelper>
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>
                Atleast 6 characters are required.
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <Button className="w-fit self-end mt-4" size="sm">
            <ButtonText>Submit</ButtonText>
          </Button>
      </VStack>
    </ScrollView>
  );
}

export default LoginForm;