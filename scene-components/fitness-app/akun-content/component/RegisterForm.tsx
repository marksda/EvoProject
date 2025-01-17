import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectScrollView, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from 'dayjs';
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarDesaQuery, useGetDaftarKabupatenQuery, useGetDaftarKecamatanQuery, useGetDaftarPropinsiQuery } from "@/services/fitness-api-rtkquery-service";
import _ from "lodash";

const RegisterForm = () => {
  const [tanggalLahir, setTanggalLahir] = useState(dayjs());
  const [show, setShow] = useState(false);
  const [selectedKeyPropinsi, setSelectedKeyPropinsi] = useState<string|null>(null); 
  const [selectedKeyKabupaten, setSelectedKeyKabupaten] = useState<string|null>(null); 
  const [selectedKeyKecamatan, setSelectedKeyKecamatan] = useState<string|null>(null); 
  const [selectedKeyDesa, setSelectedKeyDesa] = useState<string|null>(null);

  const [queryPropinsiParams, setQueryPropinsiParams] = useState<IQueryParamFilters>({
    is_paging: false, 
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const [queryKabupatenParams, setQueryKabupatenParams] = useState<IQueryParamFilters>({
    is_paging: false,  
    paging: {
      pageNumber: 1,
      pageSize: 25
    },
    fields_filter: [
      {
        field_name: 'propinsi_id',
        value: '35'
      },
    ],
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const [queryKecamatanParams, setQueryKecamatanParams] = useState<IQueryParamFilters>({
    is_paging: false,  
    paging: {
      pageNumber: 1,
      pageSize: 25
    },
    fields_filter: [
      {
        field_name: 'kabupaten_id',
        value: '35'
      },
    ],
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const [queryDesaParams, setQueryDesaParams] = useState<IQueryParamFilters>({
    is_paging: false,  
    paging: {
      pageNumber: 1,
      pageSize: 25
    },
    fields_filter: [
      {
        field_name: 'kecamatan_id',
        value: '35'
      },
    ],
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const { data: propinsis } = useGetDaftarPropinsiQuery(queryPropinsiParams);
  const { data: kabupatens } = useGetDaftarKabupatenQuery(queryKabupatenParams, {skip: selectedKeyPropinsi == null ? true:false});
  const { data: kecamatans } = useGetDaftarKecamatanQuery(queryKecamatanParams, {skip: selectedKeyKabupaten == null ? true:false});
  const { data: desas } = useGetDaftarDesaQuery(queryDesaParams, {skip: selectedKeyKecamatan == null ? true:false});

  const handlePropinsiChange = useCallback(
    (val: string) => {
      setSelectedKeyPropinsi(val);
      resetKabupaten();
      setQueryKabupatenParams(
        prev => {
          let tmp = _.cloneDeep(prev);
          let fieldsFilter = _.cloneDeep(tmp.fields_filter);
          let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'propinsi_id'}) as number;     
                                              
          if(found == -1) {
            fieldsFilter?.push({
                field_name: 'propinsi_id',
                value: val
              });
          }
          else {
            fieldsFilter?.splice(found, 1, {
              field_name: 'propinsi_id',
              value: val
            })
          }
          
          tmp.fields_filter = fieldsFilter;             
          return tmp;
        }
      );
    },
    []
  );

  const handleKabupatenChange = useCallback(
    (val: string) => {
      setSelectedKeyKabupaten(val);
      resetKecamatan();
      setQueryKecamatanParams(
        prev => {
          let tmp = _.cloneDeep(prev);
          let fieldsFilter = _.cloneDeep(tmp.fields_filter);
          let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'kabupaten_id'}) as number;     
                                              
          if(found == -1) {
            fieldsFilter?.push({
                field_name: 'kabupaten_id',
                value: val
              });
          }
          else {
            fieldsFilter?.splice(found, 1, {
              field_name: 'kabupaten_id',
              value: val
            })
          }
          
          tmp.fields_filter = fieldsFilter;             
          return tmp;
        }
      );
    },
    []
  );

  const handleKecamatanChange = useCallback(
    (val: string) => {
      setSelectedKeyKecamatan(val);
      resetDesa();
      setQueryDesaParams(
        prev => {
          let tmp = _.cloneDeep(prev);
          let fieldsFilter = _.cloneDeep(tmp.fields_filter);
          let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'kecamatan_id'}) as number;     
                                              
          if(found == -1) {
            fieldsFilter?.push({
                field_name: 'kecamatan_id',
                value: val
              });
          }
          else {
            fieldsFilter?.splice(found, 1, {
              field_name: 'kecamatan_id',
              value: val
            })
          }
          
          tmp.fields_filter = fieldsFilter;             
          return tmp;
        }
      );
    },
    []
  );

  const handleDesaChange = useCallback(
    (val: string) => {
      setSelectedKeyDesa(val);
    },
    []
  );

  const resetKabupaten = useCallback(
    () => {
      // resetField("alamat.kabupaten");
      setSelectedKeyKabupaten(null);
      resetKecamatan();
    },
    []
  );

  const resetKecamatan = useCallback(
    () => {
      // resetField("alamat.kabupaten");
      setSelectedKeyKecamatan(null);
      resetDesa();
    },
    []
  );

  const resetDesa = useCallback(
    () => {
      // resetField("alamat.kabupaten");
      setSelectedKeyDesa(null);
    },
    []
  );
  

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
          <FormControlLabelText className="font-bold">Nama</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Club</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">NIK</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Nomor Hp</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Agama</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Provinsi</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={selectedKeyPropinsi}
          onValueChange={handlePropinsiChange}
        >
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
                      label={propinsi.nama} 
                      value={propinsi.id} 
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
          <FormControlLabelText className="font-bold">Kabupaten / Kota</FormControlLabelText>
        </FormControlLabel>
        <Select 
          selectedValue={selectedKeyKabupaten}
          isDisabled={selectedKeyPropinsi ? false : true}
          onValueChange={handleKabupatenChange}
        >
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
                kabupatens != undefined ? (
                  kabupatens.map((kabupaten) => (
                    <SelectItem 
                      key={kabupaten.id} 
                      label={kabupaten.nama} 
                      value={kabupaten.id} 
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
          <FormControlLabelText className="font-bold">Kecamatan</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={selectedKeyKecamatan}
          isDisabled={selectedKeyKabupaten ? false : true}
          onValueChange={handleKecamatanChange}
        >
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
                kecamatans != undefined ? (
                  kecamatans.map((kecamatan) => (
                    <SelectItem 
                      key={kecamatan.id} 
                      label={kecamatan.nama} 
                      value={kecamatan.id} 
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
          <FormControlLabelText className="font-bold">Kelurahan</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={selectedKeyDesa}
          isDisabled={selectedKeyKecamatan ? false : true}
          onValueChange={handleDesaChange}
        >
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
                desas != undefined ? (
                  desas.map((desa) => (
                    <SelectItem 
                      key={desa.id} 
                      label={desa.nama} 
                      value={desa.id} 
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
          <FormControlLabelText className="font-bold">Alamat lengkap</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Kode Pos</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Tanggal Lahir</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Jenis Kelamin</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Berat Badan</FormControlLabelText>
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
          <FormControlLabelText className="font-bold">Tinggi Badan</FormControlLabelText>
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

export default  RegisterForm;