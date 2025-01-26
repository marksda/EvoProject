import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Credential, CredentialSchema } from "@/features/schema-resolver/Credential";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";

const LoginForm = () => {
  const {control, setValue, resetField, handleSubmit} = useForm<Credential>({
    defaultValues: {},
    resolver: zodResolver(CredentialSchema),
  });

  return (    
    <ScrollView>
      <VStack className="w-[65%] self-center mt-9">  
        <Controller
          control={control}
          name="email"
          render={
            ({ 
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <FormControl
                isInvalid={error ? true : false}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={false}          
              >
                <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                  <InputField
                    placeholder="email ..."
                    size="md"
                    className="py-1"
                    value={value ? value : undefined}
                    onChangeText={onChange}
                  />
                </Input>
                <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {error?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )
          } 
        />   
        <Controller
          control={control}
          name="password"
          render={
            ({ 
              field: { onChange, value },
              fieldState: { error }
            }) => (
              <FormControl
                isInvalid={error ? true : false}
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
                    placeholder="password ..."
                    size="md"
                    className="py-1"
                    value={value ? value : undefined}
                    onChangeText={onChange}
                  />
                </Input>
                <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {error?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )
          }
        />    
        <HStack className="flex mt-2 justify-start">
          <Text 
            size="sm" 
            className="w-[114px]"
          >
            Belum punya akun?
          </Text>    
          <Text
            size="sm"
          >
            Buat sekarang!
          </Text>   
        </HStack>
        <Button className="w-fit self-end mt-11" size="sm">
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
}

export default LoginForm;