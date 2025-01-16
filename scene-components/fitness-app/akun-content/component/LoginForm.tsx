import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectScrollView, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from 'dayjs';
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarPropinsiQuery } from "@/services/fitness-api-rtkquery-service";
import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";

const LoginForm = () => {
  const [tanggalLahir, setTanggalLahir] = useState(dayjs());
  const [show, setShow] = useState(false);

  const [queryPropinsiParams, setQueryPropinsiParams] = useState<IQueryParamFilters>({
    is_pagging: 0,  
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const { data: propinsis } = useGetDaftarPropinsiQuery(queryPropinsiParams);
  console.log(propinsis);

  const showDatepicker = () => {
    setShow(true);
  };

  const onChangeTanggalLahir = (tanggal: any) => {
    setShow(false);
    setTanggalLahir(tanggal);
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
          <SelectPortal >
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectScrollView className="max-h-96">
              {
                propinsis != undefined ? (
                  propinsis.map((propinsi) => (
                    <SelectItem 
                      key={propinsi.id} 
                      label={propinsi.nama!} 
                      value={propinsi.nama!} 
                      className="text-sm"
                    /> 
                  ))
                ):null
              }
              </SelectScrollView>
            </SelectContent>
          </SelectPortal>
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
        <Button onPress={showDatepicker}>
          <ButtonText>Tanggal Lahir</ButtonText>
        </Button>
        {show && (
        <DateTimePicker        
          mode="single"
          date={tanggalLahir}
          onChange={(params) => onChangeTanggalLahir(params.date)}
        />
        )}
      </FormControl>
      <FormControl
        isInvalid={false}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Jenis Kelamin</FormControlLabelText>
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
          <FormControlLabelText>Berat Badan</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="Berat badan..."
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
          <FormControlLabelText>Tinggi Badan</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField
            placeholder="Kode pos..."
            size="md"
            className="py-1"
          />
        </Input>
      </FormControl>
    </VStack>
  )
}

export default  LoginForm;