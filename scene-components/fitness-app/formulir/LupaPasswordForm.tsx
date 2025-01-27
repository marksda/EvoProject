import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Credential, CredentialSchema } from "@/features/schema-resolver/Credential";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";

const LupaPasswordForm = () => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm<Credential>({
    defaultValues: {},
    resolver: zodResolver(CredentialSchema),
  });

  // navigation.navigate("formulir", {id: "Login"});

  const handleRegisterForm = useCallback(
    () => {        
      // @ts-ignore: Unreachable code error
      navigation.navigate("formulir", {id: "Register Member"});          
    },
    []
  );

  const handleLupaPassword = useCallback(
    () => {        
      // @ts-ignore: Unreachable code error
      navigation.navigate("formulir", {id: "Lupa Password"});          
    },
    []
  );

  const onSubmit: SubmitHandler<Credential> = async (data) => {
    console.log(data);

    // await registerMember(data).unwrap().then((payload) => {
      // console.log(payload);
      // dispatch(setToken(payload));
    // }).catch((error) => {
      // setDisableForm(false);
    // }); 
  };

  const onError: SubmitErrorHandler<Credential> = async (err) => {
    console.log('error', err);
  };

  return (    
    <ScrollView>
      <VStack className="w-[75%] self-center mt-9">  
        <Image 
          size="md"
          source={require('../../../assets/fitness-logo.png')}
          alt="image"
          className="self-center mb-4"
        />        
        <Text bold={true} className="text-black mb-2">Pulihkan akun Anda</Text>
        <Text size="xs">
          Isikan alamat email login Anda dan ikuti petunjuk yang akan dikirim ke email tersebut.
        </Text>
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
                className="mt-4"
              >
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
                  <FormControlErrorText size="2xs">
                    {error?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )
          } 
        />
        <Button 
          className="w-fit self-end mt-11" 
          size="sm"
          onPress={handleSubmit(onSubmit, onError)}
        >
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
}

export default LupaPasswordForm;