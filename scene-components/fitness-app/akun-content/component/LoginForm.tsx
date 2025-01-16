import { Button } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectIcon, SelectInput, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";

const LoginForm = () => {
  const [tanggalLahir, setTanggalLahir] = useState<Date>(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setTanggalLahir(currentDate);
  };

  return (
    <VStack className="gap-1 pb-8">
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Nama</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="nama lengkap"
            size="md"
            className="py-1"
          />
        </Input>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Club</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md" className="flex justify-between">
            <SelectInput placeholder="Select option" className="py-1"/>
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
        </Select>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>NIK</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="nik sesuai ktp"
            size="md"
            className="py-1"
          />
        </Input>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Nomor Hp</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="isi dengan nomer hp"
            size="md"
            className="py-1"
          />
        </Input>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Agama</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md" className="flex justify-between">
            <SelectInput placeholder="Select option" className="py-1"/>
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
        </Select>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Provinsi</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md" className="flex justify-between">
            <SelectInput placeholder="Select option" className="py-1"/>
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
        </Select>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Kabupaten</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md" className="flex justify-between">
            <SelectInput placeholder="Select option" className="py-1"/>
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
        </Select>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Kecamatan</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md" className="flex justify-between">
            <SelectInput placeholder="Select option" className="py-1"/>
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
        </Select>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Kelurahan</FormControlLabelText>
        </FormControlLabel>
        <Select>
          <SelectTrigger variant="outline" size="md" className="flex justify-between">
            <SelectInput placeholder="Select option" className="py-1"/>
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
        </Select>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Alamat lengkap</FormControlLabelText>
        </FormControlLabel>
        <Textarea
          size="md"
          isReadOnly={false}
          isInvalid={false}
          isDisabled={false}
        >
          <TextareaInput placeholder="detail alamat..." />
        </Textarea>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Kode Pos</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="Kode pos..."
            size="md"
            className="py-1"
          />
        </Input>
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Tanggal Lahir</FormControlLabelText>
        </FormControlLabel>
        <Button onPress={showDatepicker} />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={tanggalLahir}
          // @ts-ignore
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
        )}
      </FormControl>
    </VStack>
  )
}

export default  LoginForm;