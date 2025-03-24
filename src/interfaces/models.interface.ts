import { UserRole } from "@/enums/user.enum";
import { VacancyStatus } from "@/enums/vacancy.enum";

export interface UserInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  role: UserRole;
}

export interface LogistDetailsInterface {
  id: string;
  description: string;
  email: string;
  phoneNumber: string;
  user: UserInterface;
}

export interface VacancyInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: VacancyStatus;
  title: string;
  description: string | null;
  unitPrice: number;
  from: AddressInterface;
  to: AddressInterface;
  creator: UserInterface;
  offers?: OfferInterface[];
}

export interface OfferInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt: Date | null;
  comment: string | null;
  vacancy: VacancyInterface;
  creator: UserInterface;
}

export interface DriverDetailsInterface {
  id: string;
  description: string | null;
  email: string | null;
  phoneNumber: string | null;
  driversLicense: FileInterface | null;
  user: UserInterface;
}

export interface VehicleInterface {
  id: string;
  brand: string;
  model: string | null;
  kilometrage: number;
  driver: UserInterface;
  registration: FileInterface;
}

export interface TrailerInterface {
  id: string;
  height: number; // centimeters
  width: number; // centimeters
  length: number; // centimeters
  weight: number; // kilograms
  loadCapacity: number; // kilograms
  vehicle: VehicleInterface;
  registration: FileInterface | null;
}

export interface FileInterface {
  id: string;
  createdAt: Date;
  publicPath: string;
  fileName: string;
  mimeType: string;
  extension: string;
}

export interface AddressInterface {
  id: string;
  longitude: string;
  latitude: string;
  country: string;
  city: string;
  street: string;
}

export interface ChatParticipantInterface {
  id: string;
  chat: ChatInterface;
  user: UserInterface;
}

export interface ChatInterface {
  id: string;
  vacancy: VacancyInterface;
  participants: ChatParticipantInterface[];
}

export interface MessageInterface {
  id: string;
  createdAt: Date;
  content: string;
  chat: ChatInterface;
  creator: UserInterface;
}
