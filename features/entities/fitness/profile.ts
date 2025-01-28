import { Club } from "@/features/schema-resolver/Club";
import { Person } from "@/features/schema-resolver/Person";
import { Status } from "@/features/schema-resolver/Status";

export type Profile = {
  person: Person|null;
  club: Club|null;
  tanggal_gabung: Date|null;
  role: string[]|null;
  status: Status|null
};