import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlHelper, FormControlHelperText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectFlatList, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectScrollView, SelectTrigger } from "@/components/ui/select";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useState } from "react";
import dayjs from 'dayjs';
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarAgamaQuery, useGetDaftarClubQuery, useGetDaftarDesaQuery, useGetDaftarGenderQuery, useGetDaftarKabupatenQuery, useGetDaftarKecamatanQuery, useGetDaftarPropinsiQuery, useRegisterMemberMutation } from "@/services/fitness-api-rtkquery-service";
import _ from "lodash";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Divider } from "@/components/ui/divider";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import MobileTanggalLahirActionsheet from "../MobileTanggalLahirActionsheet";  
import { RegistrasiMember, RegistrasiMemberSchema } from "@/features/schema-resolver/Member";
import { Club } from "@/features/schema-resolver/Club";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { useAppDispatch } from "@/features/ssot/hook";
import { setToken } from "@/services/token-slice";
import { ScrollView } from "react-native";
import { setProfile } from "@/services/profile-slice";
import { setBottomTab } from "@/services/bottom-tab-slice";
import { useNavigation } from "@react-navigation/native";

const RegisterMemberForm = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [tanggalLahir, setTanggalLahir] = useState<Date|null>(null);
  const [showActionSheetTanggalLahir, setShowActionSheetTanggalLahir] = useState(false);
  const [selectedKeyProvinsi, setSelectedKeyProvinsi] = useState<string|null>(null); 
  const [selectedKeyKabupaten, setSelectedKeyKabupaten] = useState<string|null>(null); 
  const [selectedKeyKecamatan, setSelectedKeyKecamatan] = useState<string|null>(null); 
  const [selectedKeyDesa, setSelectedKeyDesa] = useState<string|null>(null);

  const {control, setValue, resetField, handleSubmit} = useForm<RegistrasiMember>({
    defaultValues: {},
    resolver: zodResolver(RegistrasiMemberSchema),
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

  const [queryProvinsiParams] = useState<IQueryParamFilters>({
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
        field_name: 'provinsi_id',
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
  const { data: provinsis } = useGetDaftarPropinsiQuery(queryProvinsiParams);
  const { data: kabupatens } = useGetDaftarKabupatenQuery(queryKabupatenParams, {skip: selectedKeyProvinsi ? false:true});
  const { data: kecamatans } = useGetDaftarKecamatanQuery(queryKecamatanParams, {skip: selectedKeyKabupaten == null ? true:false});
  const { data: desas } = useGetDaftarDesaQuery(queryDesaParams, {skip: selectedKeyKecamatan == null ? true:false});

  const  [registerMember, {isLoading: saveProgressMember}] = useRegisterMemberMutation();

  const handleChangeInputSelector = useCallback(
    (jenis: string, nilai: string) => {
      switch (jenis) {
        case "provinsi":
          setSelectedKeyProvinsi(nilai);           
          resetData("kabupaten");        
          setQueryKabupatenParams(
            prev => {
              let tmp = _.cloneDeep(prev);
              let fieldsFilter = _.cloneDeep(tmp.fields_filter);
              let found = fieldsFilter?.findIndex((obj) => {return obj.field_name == 'provinsi_id'}) as number;     
                                                  
              if(found == -1) {
                fieldsFilter?.push({
                    field_name: 'provinsi_id',
                    value: nilai
                  });
              }
              else {
                fieldsFilter?.splice(found, 1, {
                  field_name: 'provinsi_id',
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
          resetField("kabupaten_id");
          setSelectedKeyKabupaten(null);
          resetData("kecamatan");
          break;
        case "kecamatan":
          resetField("kecamatan_id");
          setSelectedKeyKecamatan(null);
          resetData("desa");
          break;
        case "desa":
          resetField("desa_id");
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

  const onChangeTanggalLahir = (tanggal: Date) => {
    setValue("tanggal_lahir", dayjs(tanggal).format('YYYY-MM-DD'));
    setTanggalLahir(tanggal);
  };

  const onSubmit: SubmitHandler<RegistrasiMember> = async (data) => {
    console.log(data);

    await registerMember(data).unwrap().then((payload) => {
      // setDisableForm(false);
      dispatch(setBottomTab("Akun"));
      dispatch(setProfile(_.cloneDeep(payload.profile)));
      dispatch(setToken({
        token: payload.token,
        refresh_token: payload.refresh_token
      }));      
      // @ts-ignore: Unreachable code error
      navigation.popToTop();
    }).catch((error) => {
      // setDisableForm(false);
    }); 
  };

  const onError: SubmitErrorHandler<RegistrasiMember> = async (err) => {
    console.log('error', err);
  };

  return (
    <ScrollView className="p-2">
      <VStack className="gap-2 pb-8">
        <Card variant="outline" className="bg-white">
          <Heading size="sm">
            Data diri
          </Heading>
          <Divider className="my-2"/>
          <Controller
            control={control}
            name="identifier"
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
          <Controller
            control={control}
            name="club_id"
            render={({ 
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
                  <FormControlLabelText>Club</FormControlLabelText>
                </FormControlLabel>
                <Select
                  selectedValue={value ? value.toString() : undefined}
                  onValueChange={(val) => {
                    onChange(Number(val));
                  }}
                >
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
                      <SelectFlatList                      
                        data={clubs}
                        renderItem={({item}) => (  
                          <SelectItem 
                            key={(item as Club).id} 
                            label={(item as Club).nama} 
                            value={(item as Club).id!.toString()} 
                          />   
                        )}
                        keyExtractor={item => `${(item as Club).id}`}
                      />
                    </SelectContent>
                  </SelectPortal >
                </Select>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    harus dipilih
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            )}
          />        
          <Controller
            control={control}
            name="agama_id"
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
                    selectedValue={value ? value.toString() : undefined}
                    onValueChange={(val) => {
                      onChange(val);
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
            <Controller 
              control={control}
              name="tanggal_lahir"
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
                    isRequired={false}
                    className="w-1/2"
                  >
                    <FormControlLabel>
                      <FormControlLabelText>Tanggal Lahir</FormControlLabelText>
                    </FormControlLabel>
                    <Pressable onPress={showDatepicker} className="flex justify-between px-3 py-[5px] h-10 border border-gray-300 rounded-[3px]">
                      <Text className={tanggalLahir == null ? "text-gray-400": "text-black"}>{tanggalLahir == null ? 'Tanggal lahir ...' : dayjs(tanggalLahir).format('DD-MM-YYYY')}</Text>
                    </Pressable>
                    <MobileTanggalLahirActionsheet
                      tanggal_lahir={value}
                      onChangeTanggalLahir={onChangeTanggalLahir}
                      actionsheetVisible={showActionSheetTanggalLahir}
                      setActionsheetVisible={setShowActionSheetTanggalLahir}
                    />
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
              name="jenis_kelamin_id"
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
                      selectedValue={value ? value : undefined}
                      onValueChange={(val) => {
                        onChange(val);
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
          </HStack>
        </Card>
        <Card variant="outline" className="bg-white">
          <Heading size="sm">
            Data alamat
          </Heading>
          <Divider className="my-2"/>
          <Controller
            control={control}
            name="provinsi_id"
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
                    selectedValue={selectedKeyProvinsi}
                    onValueChange={(val) => {
                      onChange(val);         
                      handleChangeInputSelector('provinsi', val)
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
                          provinsis != undefined ? (
                            provinsis.map((provinsi) => (
                              <SelectItem 
                                key={provinsi.id} 
                                label={provinsi.nama} 
                                value={provinsi.id} 
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
            name="kabupaten_id"
            render={
              ({ 
                field: { onChange},
                fieldState: { error }
              }) => (
                <FormControl
                  isInvalid={error ? true : false}
                  size="md"
                  isDisabled={ selectedKeyProvinsi ? false : true }
                  isReadOnly={false}
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Kabupaten / Kota</FormControlLabelText>
                  </FormControlLabel>
                  <Select 
                    selectedValue={selectedKeyKabupaten}
                    onValueChange={(val) => {
                      onChange(val);   
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
            name="kecamatan_id"
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
                      onChange(val); 
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
            name="desa_id"
            render={
              ({ 
                field: {onChange},
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
                      onChange(val); 
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
            name="alamat"
            render={
              ({ 
                field: { onChange, value },
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
                    <TextareaInput 
                      placeholder="jalan, komplek, nomer rumah, rt dan rw ..." 
                      className="align-top" 
                      value={value}
                      onChangeText={onChange}
                    />
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
            name="kode_pos"
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
            Data login & kontak
          </Heading>
          <Divider className="my-2"/>
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
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>E-mail</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      placeholder="Email ..."
                      inputMode="email"
                      size="md"
                      className="py-1"
                      value={value ? value : undefined}
                      onChangeText={onChange}
                    />
                  </Input>                
                  <FormControlHelper>
                    <FormControlHelperText>
                      email sebagai username saat login
                    </FormControlHelperText>
                  </FormControlHelper>
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
            name="no_hp"
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
                  isRequired={true}
                >
                  <FormControlLabel>
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1">
                    <InputField
                      placeholder="password ..."
                      secureTextEntry={true}
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
        <Button 
          onPress={handleSubmit(onSubmit, onError)}
          isDisabled={saveProgressMember ? true : false}
        >
          <ButtonText 
            size="md" 
            variant="solid"
          >
            Simpan
          </ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  )
}

export default  RegisterMemberForm;