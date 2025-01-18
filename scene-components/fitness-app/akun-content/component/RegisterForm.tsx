import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectScrollView, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useEffect, useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from 'dayjs';
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarAgamaQuery, useGetDaftarDesaQuery, useGetDaftarGenderQuery, useGetDaftarKabupatenQuery, useGetDaftarKecamatanQuery, useGetDaftarPropinsiQuery } from "@/services/fitness-api-rtkquery-service";
import _ from "lodash";
import { Calendar } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonSchema } from "@/features/schema-resolver/zod-schema";
import { z } from "zod";
import { Agama, Desa, Kabupaten, Kecamatan, Person, Propinsi } from "@/features/schema-resolver/entity-zod-generate";

const RegisterForm = () => {
  const [tanggalLahir, setTanggalLahir] = useState(dayjs());
  const [show, setShow] = useState(false);
  const [selectedKeyGender, setSelectedKeyGender] = useState<string|null>(null); 
  const [selectedKeyPropinsi, setSelectedKeyPropinsi] = useState<string|null>(null); 
  const [selectedKeyKabupaten, setSelectedKeyKabupaten] = useState<string|null>(null); 
  const [selectedKeyKecamatan, setSelectedKeyKecamatan] = useState<string|null>(null); 
  const [selectedKeyDesa, setSelectedKeyDesa] = useState<string|null>(null);

  const {control, setValue, getValues, resetField, handleSubmit} = useForm<Person>({
    defaultValues: {id: null,},
    resolver: zodResolver(PersonSchema),
  });

  const [queryPropinsiParams] = useState<IQueryParamFilters>({
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

  const { data: agamas } = useGetDaftarAgamaQuery({
    is_paging: false, 
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const { data: genders } = useGetDaftarGenderQuery({
    is_paging: false, 
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });

  const { data: propinsis } = useGetDaftarPropinsiQuery(queryPropinsiParams);
  const { data: kabupatens } = useGetDaftarKabupatenQuery(queryKabupatenParams, {skip: selectedKeyPropinsi ? false:true});
  const { data: kecamatans } = useGetDaftarKecamatanQuery(queryKecamatanParams, {skip: selectedKeyKabupaten == null ? true:false});
  const { data: desas } = useGetDaftarDesaQuery(queryDesaParams, {skip: selectedKeyKecamatan == null ? true:false});

  const handleChangeInputSelector = useCallback(
    (jenis: string, nilai: string) => {
      switch (jenis) {
        case "agama":
          let tmpAgama = _.find(agamas, function(agama) {
            return agama.id == nilai;
          }) as Agama;

          setValue("agama", tmpAgama);
          break;   
        case "gender":
          setSelectedKeyGender(nilai);
          break;  
        case "propinsi":
          let tmpPropinsi = _.find(propinsis, function(propinsi) {
            return propinsi.id == nilai;
          }) as Propinsi;
          
          setSelectedKeyPropinsi(nilai);
          setValue("alamat.propinsi", tmpPropinsi);            
          resetData("kabupaten");        
          setQueryKabupatenParams(
            prev => {
              let tmp = _.cloneDeep(prev);
              let fieldsFilter = _.cloneDeep(tmp.fields_filter);
              let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'propinsi_id'}) as number;     
                                                  
              if(found == -1) {
                fieldsFilter?.push({
                    field_name: 'propinsi_id',
                    value: nilai
                  });
              }
              else {
                fieldsFilter?.splice(found, 1, {
                  field_name: 'propinsi_id',
                  value: nilai
                })
              }
              
              tmp.fields_filter = fieldsFilter;             
              return tmp;
            }
          );          
          break;
        case "kabupaten":
          let tmpKabupaten = _.find(kabupatens, function(kabupaten) {
            return kabupaten.id == nilai;
          }) as Kabupaten;

          setValue("alamat.kabupaten", tmpKabupaten);
          setSelectedKeyKabupaten(nilai);
          resetData("kecamatan");
          setQueryKecamatanParams(
            prev => {
              let tmp = _.cloneDeep(prev);
              let fieldsFilter = _.cloneDeep(tmp.fields_filter);
              let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'kabupaten_id'}) as number;     
                                                  
              if(found == -1) {
                fieldsFilter?.push({
                    field_name: 'kabupaten_id',
                    value: nilai
                  });
              }
              else {
                fieldsFilter?.splice(found, 1, {
                  field_name: 'kabupaten_id',
                  value: nilai
                })
              }
              
              tmp.fields_filter = fieldsFilter;             
              return tmp;
            }
          );
          break;
        case "kecamatan":
          let tmpKecamatan = _.find(kecamatans, function(kecamatan) {
            return kecamatan.id == nilai;
          }) as Kecamatan;

          setValue("alamat.kecamatan", tmpKecamatan);
          setSelectedKeyKecamatan(nilai);
          resetData("desa");
          setQueryDesaParams(
            prev => {
              let tmp = _.cloneDeep(prev);
              let fieldsFilter = _.cloneDeep(tmp.fields_filter);
              let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'kecamatan_id'}) as number;     
                                                  
              if(found == -1) {
                fieldsFilter?.push({
                    field_name: 'kecamatan_id',
                    value: nilai
                  });
              }
              else {
                fieldsFilter?.splice(found, 1, {
                  field_name: 'kecamatan_id',
                  value: nilai
                })
              }
              
              tmp.fields_filter = fieldsFilter;             
              return tmp;
            }
          );
          break;           
        case "desa":
          let tmpDesa = _.find(desas, function(desa) {
            return desa.id == nilai;
          }) as Desa;

          setValue("alamat.desa", tmpDesa);
          setSelectedKeyDesa(nilai);
          break; 
        default:
          break;
      }
    },
    []
  );

  const resetData = useCallback(
    (jenis: string) => {
      switch (jenis) {
        case "kabupaten":
          resetField("alamat.kabupaten");
          setSelectedKeyKabupaten(null);
          resetData("kecamatan");
          break;
        case "kecamatan":
          resetField("alamat.kecamatan");
          setSelectedKeyKecamatan(null);
          resetData("desa");
          break;
        case "desa":
          resetField("alamat.desa");
          setSelectedKeyDesa(null);
          break;
        default:
          break;
      }      
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

  const onSubmit: SubmitHandler<Person> = async (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Person> = async (err) => {
    console.log('error', err);
  };

  return (
    <VStack className="gap-1 pb-8">
      <Controller
        control={control}
        name="nik"
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
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Nik</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  placeholder="nik sesuai ktp ..."
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
        name="nama"
        render={(
          { 
            field: { onChange, value },
            fieldState: { error }
          }) => (
          <FormControl
            isInvalid={error ? true : false}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel>
              <FormControlLabelText className="font-bold">Nama</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                placeholder="nama sesuai ktp ..."
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
        )}
      />
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
      <Controller
        control={control}
        name="kontak.email"
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
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">E-mail</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  placeholder="Email ..."
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
        name="kontak.no_hp"
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
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Nomor Hp</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1">
                <InputField
                  placeholder="Nomor hp ..."
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
        name="agama"
        render={
          ({ 
            field: { value },
            fieldState: { error }
          }) => (
            <FormControl
              isInvalid={error ? true : false}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Agama</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={value ? value.id : undefined}
                onValueChange={(val) => handleChangeInputSelector('agama', val)}
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
                      agamas != undefined ? (
                        agamas.map((agama) => (
                          <SelectItem 
                            key={agama.id} 
                            label={agama.nama} 
                            value={agama.id} 
                          /> 
                        ))
                      ):null
                    }
                    </SelectScrollView>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>
          )
        }
      />  
      <Controller
        control={control}
        name="alamat.propinsi"
        render={
          ({ 
            fieldState: { error }
          }) => (
            <FormControl
              isInvalid={error ? true : false}
              size="md"
              isDisabled={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Provinsi</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={selectedKeyPropinsi}
                onValueChange={(val) => handleChangeInputSelector('propinsi', val)}
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
          )
        }
      />   
      <Controller
        control={control}
        name="alamat.kabupaten"
        render={
          ({ 
            fieldState: { error }
          }) => (
            <FormControl
              isInvalid={error ? true : false}
              size="md"
              isDisabled={ selectedKeyPropinsi ? false : true }
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Kabupaten / Kota</FormControlLabelText>
              </FormControlLabel>
              <Select 
                selectedValue={selectedKeyKabupaten}
                onValueChange={(val) => handleChangeInputSelector('kabupaten', val)}
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
        name="alamat.kecamatan"
        render={
          ({ 
            fieldState: { error }
          }) => (
            <FormControl
              isInvalid={error ? true : false}
              size="md"
              isDisabled={ selectedKeyKabupaten ? false : true }
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Kecamatan</FormControlLabelText>
              </FormControlLabel>
              <Select 
                selectedValue={selectedKeyKecamatan}
                onValueChange={(val) => handleChangeInputSelector('kecamatan', val)}
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
        name="alamat.desa"
        render={
          ({ 
            fieldState: { error }
          }) => (
            <FormControl
              isInvalid={error ? true : false}
              size="md"
              isDisabled={ selectedKeyKecamatan ? false : true }
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel>
                <FormControlLabelText className="font-bold">Desa</FormControlLabelText>
              </FormControlLabel>
              <Select 
                selectedValue={selectedKeyDesa}
                onValueChange={(val) => handleChangeInputSelector('desa', val)}
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
      <Button onPress={handleSubmit(onSubmit, onError)}>
        <ButtonText 
          size="md" 
          variant="solid"
        >
          Simpan
        </ButtonText>
      </Button>
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
          <TextareaInput placeholder="detail alamat ..." />
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
            placeholder="Kode pos ..."
            size="md"
            className="py-1"
          />
        </Input>
      </FormControl>
      <HStack className="gap-2">
        <FormControl
          isInvalid={false}
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
          className="grow"
        >
          <FormControlLabel>
            <FormControlLabelText className="font-bold">Tanggal Lahir</FormControlLabelText>
          </FormControlLabel>
          <Input isDisabled={true}>
            <InputField placeholder="d-m-yyyy" className="py-1"/>          
            <InputSlot className="px-3">
              <InputIcon as={Calendar} color="black"/>
            </InputSlot>
          </Input>
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
          className="w-1/2"
        >
          <FormControlLabel>
            <FormControlLabelText className="font-bold">Jenis Kelamin</FormControlLabelText>
          </FormControlLabel>
          <Select
            selectedValue={selectedKeyGender}
            onValueChange={(val) => handleChangeInputSelector('gender', val)}
          >
            <SelectTrigger variant="outline" size="md" className="flex justify-between">
              <SelectInput placeholder="Kelamin ..." className="py-1"/>
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
                  genders != undefined ? (
                    genders.map((gender) => (
                      <SelectItem 
                        key={gender.id} 
                        label={gender.nama} 
                        value={gender.id} 
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
      </HStack>    
      <HStack className="gap-2">
        <FormControl
          isInvalid={false}
          size="md"
          isDisabled={false}
          isReadOnly={false}
          isRequired={false}
          className="grow"
        >
          <FormControlLabel>
            <FormControlLabelText className="font-bold">Berat Badan (kg)</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              placeholder="Berat badan ..."
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
          className="w-1/2"
        >
          <FormControlLabel>
            <FormControlLabelText className="font-bold">Tinggi Badan (m)</FormControlLabelText>
          </FormControlLabel>
          <Input className="my-1">
            <InputField
              placeholder="Tinggi badan ..."
              size="md"
              className="py-1"
            />
          </Input>
        </FormControl>
      </HStack>
    </VStack>
  )
}

export default  RegisterForm;