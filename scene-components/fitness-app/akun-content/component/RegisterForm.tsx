import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectScrollView, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState } from "react";
import dayjs from 'dayjs';
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarAgamaQuery, useGetDaftarClubQuery, useGetDaftarDesaQuery, useGetDaftarGenderQuery, useGetDaftarKabupatenQuery, useGetDaftarKecamatanQuery, useGetDaftarPropinsiQuery } from "@/services/fitness-api-rtkquery-service";
import _ from "lodash";
import { Calendar } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonSchema } from "@/features/schema-resolver/zod-schema";
import { Agama, Desa, Gender, Kabupaten, Kecamatan, Person, Propinsi } from "@/features/schema-resolver/entity-zod-generate";
import { Divider } from "@/components/ui/divider";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import MobileTanggalLahirActionsheet from "../../MobileTanggalLahirActionsheet";  
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";

const RegisterForm = () => {
  const [tanggalLahir, setTanggalLahir] = useState(dayjs());
  const [showActionSheetTanggalLahir, setShowActionSheetTanggalLahir] = useState(false);
  const [selectedKeyPropinsi, setSelectedKeyPropinsi] = useState<string|null>(null); 
  const [selectedKeyKabupaten, setSelectedKeyKabupaten] = useState<string|null>(null); 
  const [selectedKeyKecamatan, setSelectedKeyKecamatan] = useState<string|null>(null); 
  const [selectedKeyDesa, setSelectedKeyDesa] = useState<string|null>(null);

  const {control, resetField, handleSubmit} = useForm<Person>({
    defaultValues: {},
    resolver: zodResolver(PersonSchema),
  });

  const [queryClubParams] = useState<IQueryParamFilters>({
    is_paging: false, 
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
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

  const { data: clubs } = useGetDaftarClubQuery(queryClubParams);
  const { data: propinsis } = useGetDaftarPropinsiQuery(queryPropinsiParams);
  const { data: kabupatens } = useGetDaftarKabupatenQuery(queryKabupatenParams, {skip: selectedKeyPropinsi ? false:true});
  const { data: kecamatans } = useGetDaftarKecamatanQuery(queryKecamatanParams, {skip: selectedKeyKabupaten == null ? true:false});
  const { data: desas } = useGetDaftarDesaQuery(queryDesaParams, {skip: selectedKeyKecamatan == null ? true:false});

  const handleChangeInputSelector = useCallback(
    (jenis: string, nilai: string) => {
      switch (jenis) {
        case "propinsi":
          setSelectedKeyPropinsi(nilai);           
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
    setShowActionSheetTanggalLahir(prev => !prev);
  };

  const onChangeTanggalLahir = (tanggal: any) => {
    // setShowActionSheetTanggalLahir(false);
    setTanggalLahir(tanggal);
  };

  const onSubmit: SubmitHandler<Person> = async (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<Person> = async (err) => {
    console.log('error', err);
  };

  return (
    <VStack className="gap-2 pb-8">
      <Card variant="outline" className="bg-white">
        <Heading size="sm">
          Data diri
        </Heading>
        <Divider className="my-2"/>
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
                  <FormControlLabelText>Nik</FormControlLabelText>
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
                <FormControlLabelText>Nama</FormControlLabelText>
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
            <FormControlLabelText>Club</FormControlLabelText>
          </FormControlLabel>
          <Select>
            <SelectTrigger variant="outline" size="md" className="flex justify-between">
              <SelectInput placeholder="Pilih club ..." className="py-1"/>
              <SelectIcon className="mr-3" as={ChevronDownIcon} />
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent  className="min-h-[300px]">  
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <Menu
                  placement="bottom left"
                  offset={-20}
                  trigger={({ ...triggerProps }) => {
                    return (
                      <Button {...triggerProps}>
                        <ButtonText>Pilih Area</ButtonText>
                      </Button>
                    )
                  }}
                >
                  <MenuItem key="Add account" textValue="Add account">
                    <MenuItemLabel size="sm">Add account</MenuItemLabel>
                  </MenuItem>
                  <MenuItem key="Community" textValue="Community">
                    <MenuItemLabel size="sm">Community</MenuItemLabel>
                  </MenuItem>
                  <MenuItem key="Plugins" textValue="Plugins">
                    <MenuItemLabel size="sm">Plugins</MenuItemLabel>
                  </MenuItem>
                </Menu>
                <SelectScrollView>
                {
                  clubs != undefined ? (
                    clubs.map((club) => (
                      <SelectItem 
                        key={club.id} 
                        label={club.nama} 
                        value={`${club.id}`} 
                      /> 
                    ))
                  ):null
                }
                </SelectScrollView>
              </SelectContent>
            </SelectPortal >
          </Select>
        </FormControl>
        <Controller
          control={control}
          name="agama"
          render={
            ({ 
              field: { value, onChange },
              fieldState: { error,  }
            }) => (
              <FormControl
                isInvalid={error ? true : false}
                size="md"
                isDisabled={false}
                isReadOnly={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Agama</FormControlLabelText>
                </FormControlLabel>
                <Select
                  selectedValue={value ? value.id : undefined}
                  onValueChange={(val) => {
                    let tmpAgama = _.find(agamas, function(agama) {
                      return agama.id == val;
                    }) as Agama;
                    onChange(tmpAgama);
                    // handleChangeInputSelector('agama', val);
                  }}
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
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    harus dipilih
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )
          }
        />  
        <HStack className="gap-2 mt-1">
          <FormControl
            isInvalid={false}
            size="md"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            className="w-1/2"
          >
            <FormControlLabel>
              <FormControlLabelText>Tanggal Lahir</FormControlLabelText>
            </FormControlLabel>
            <Input isDisabled={true}>
              <InputField placeholder="d-m-yyyy" className="py-1"/>          
              <InputSlot className="px-3" onPress={showDatepicker}>
                <InputIcon as={Calendar} color="black"/>
              </InputSlot>
            </Input>
            <MobileTanggalLahirActionsheet
              tanggal_lahir={tanggalLahir}
              onChangeTanggalLahir={onChangeTanggalLahir}
              actionsheetVisible={showActionSheetTanggalLahir}
              setActionsheetVisible={setShowActionSheetTanggalLahir}
            />
          </FormControl>
          <Controller
            control={control}
            name="gender"
            render={
              ({ 
                field: { value, onChange },
                fieldState: { error,  }
              }) => (
                <FormControl
                  isInvalid={error ? true : false}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="grow"
                >
                  <FormControlLabel>
                    <FormControlLabelText>Jenis Kelamin</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    selectedValue={value ? value.id : undefined}
                    onValueChange={(val) => {
                      let tmpGender = _.find(genders, function(gender) {
                        return gender.id == val;
                      }) as Gender;
                      onChange(tmpGender);
                    }}
                  >
                    <SelectTrigger variant="outline" size="md" className="flex justify-between">
                      <SelectInput placeholder="Jenis kelamin ..." className="py-1"/>
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
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      harus dipilih
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )
            }
          />
        </HStack>
        <HStack className="gap-2 mt-1">
          <Controller
            control={control}
            name="berat_badan"
            render={
              ({ 
                field: { value, onChange },
                fieldState: { error,  }
              }) => (
                <FormControl
                  isInvalid={error ? true : false}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="w-1/2"
                >
                  <FormControlLabel>
                    <FormControlLabelText>Berat Badan (kg)</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      placeholder="Berat badan ..."
                      inputMode="numeric"
                      size="md"
                      className="py-1"
                      value={value ? value.toString() : undefined}
                      onChangeText={(val) => onChange(Number(val))}
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
            name="tinggi_badan"
            render={
              ({ 
                field: { value, onChange },
                fieldState: { error,  }
              }) => (
                <FormControl
                  isInvalid={error ? true : false}
                  size="md"
                  isDisabled={false}
                  isReadOnly={false}
                  isRequired={true}
                  className="grow"
                >
                  <FormControlLabel>
                    <FormControlLabelText>Tinggi Badan (m)</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      placeholder="Tinggi badan ..."
                      size="md"
                      className="py-1"
                      value={value ? value.toString() : undefined}
                      onChangeText={(val) => onChange(Number(val))}
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
        </HStack>
      </Card>
      <Card variant="outline" className="bg-white">
        <Heading size="sm">
          Data alamat
        </Heading>
        <Divider className="my-2"/>
        <Controller
          control={control}
          name="alamat.propinsi"
          render={
            ({ 
              field: { onChange},
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
                  <FormControlLabelText>Provinsi</FormControlLabelText>
                </FormControlLabel>
                <Select
                  selectedValue={selectedKeyPropinsi}
                  onValueChange={(val) => {
                    let tmpPropinsi = _.find(propinsis, function(propinsi) {
                      return propinsi.id == val;
                    }) as Propinsi; 
                    onChange(tmpPropinsi);         
                    handleChangeInputSelector('propinsi', val)
                  }}
                >
                  <SelectTrigger variant="outline" size="md" className="flex justify-between">
                    <SelectInput placeholder="Provinsi ..." className="py-1"/>
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
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    harus dipilih
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )
          }
        />
        <Controller
          control={control}
          name="alamat.kabupaten"
          render={
            ({ 
              field: { onChange},
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
                  <FormControlLabelText>Kabupaten / Kota</FormControlLabelText>
                </FormControlLabel>
                <Select 
                  selectedValue={selectedKeyKabupaten}
                  onValueChange={(val) => {
                    let tmpKabupaten = _.find(kabupatens, function(kabupaten) {
                      return kabupaten.id == val;
                    }) as Kabupaten; 
                    onChange(tmpKabupaten);   
                    handleChangeInputSelector('kabupaten', val);
                  }}
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
                    harus dipilih
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
              field: { onChange},
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
                  <FormControlLabelText>Kecamatan</FormControlLabelText>
                </FormControlLabel>
                <Select 
                  selectedValue={selectedKeyKecamatan}
                  onValueChange={(val) => {
                    let tmpKecamatan = _.find(kecamatans, function(kecamatan) {
                      return kecamatan.id == val;
                    }) as Kecamatan; 
                    onChange(tmpKecamatan); 
                    handleChangeInputSelector('kecamatan', val);
                  }}
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
                    harus dipilih
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
              field: { onChange},
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
                  <FormControlLabelText>Desa</FormControlLabelText>
                </FormControlLabel>
                <Select 
                  selectedValue={selectedKeyDesa}
                  onValueChange={(val) => {
                    let tmpDesa = _.find(desas, function(desa) {
                      return desa.id == val;
                    }) as Desa; 
                    onChange(tmpDesa); 
                    handleChangeInputSelector('desa', val);
                  }}
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
                    harus dipilih
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )
          }
        />
        <Controller
          control={control}
          name="alamat.detail"
          render={
            ({ 
              fieldState: { error }
            }) => (
              <FormControl
                isInvalid={error ? true : false}
                size="md"
                isDisabled={ selectedKeyDesa ? false : true }
                isReadOnly={false}
                isRequired={true}
              >
                <FormControlLabel>
                  <FormControlLabelText>Detail alamat</FormControlLabelText>
                </FormControlLabel>
                <Textarea
                  size="md"
                  isReadOnly={false}
                  isInvalid={false}
                  isDisabled={false}
                >
                  <TextareaInput placeholder="jalan, komplek, nomer rumah, rt dan rw ..." className="align-top"/>
                </Textarea>
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
          name="alamat.kodepos"
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
                  <FormControlLabelText>Kodepos</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                  <InputField
                    placeholder="kodepos ..."
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
      </Card> 
      <Card variant="outline" className="bg-white">
        <Heading size="sm">
          Data kontak
        </Heading>
        <Divider className="my-2"/>
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
                  <FormControlLabelText>E-mail</FormControlLabelText>
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
                  <FormControlLabelText>Nomor Hp</FormControlLabelText>
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
      </Card> 
      <Button onPress={handleSubmit(onSubmit, onError)}>
        <ButtonText 
          size="md" 
          variant="solid"
        >
          Simpan
        </ButtonText>
      </Button>
    </VStack>
  )
}

export default  RegisterForm;