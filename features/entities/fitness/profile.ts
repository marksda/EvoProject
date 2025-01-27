import { Club } from "@/features/schema-resolver/Club";
import { Person } from "@/features/schema-resolver/Person";
import { Status } from "@/features/schema-resolver/Status";

export type Profile = {
  person: Person;
  club: Club;
  tanggal_gabung: Date;
  role: string[];
  status: Status
};