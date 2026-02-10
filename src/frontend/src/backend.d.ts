import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Location {
    email: string;
    address: string;
    phone: string;
    coordinates: string;
}
export interface Promotion {
    end?: Time;
    title: string;
    active: boolean;
    order: bigint;
    link?: string;
    description: string;
    start?: Time;
    imageUrl: string;
}
export interface ExportData {
    promotions: Array<Promotion>;
    openingHours: Array<OpeningHour>;
    whatsappConfig: ButtonConfig;
    pages: Array<Page>;
    location: Location;
    callConfig: ButtonConfig;
    orderConfig: ButtonConfig;
}
export type Time = bigint;
export interface Page {
    title: string;
    content: string;
    meta: MetaData;
    slug: string;
}
export interface Contact {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface ButtonConfig {
    link: string;
    enabled: boolean;
    buttonLabel: string;
}
export interface Reservation {
    date: string;
    name: string;
    specialRequests?: string;
    email: string;
    timestamp: Time;
    guests: bigint;
}
export interface CateringEvent {
    organizer: string;
    date: string;
    email: string;
    timestamp: Time;
    details: string;
    guests: bigint;
    eventName: string;
}
export interface MetaData {
    title: string;
    description: string;
    keywords: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export interface OpeningHour {
    day: string;
    close: string;
    open: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addOpeningHour(day: string, open: string, close: string): Promise<void>;
    addPromotion(title: string, description: string, imageUrl: string, link: string | null, start: Time | null, end: Time | null, order: bigint): Promise<Principal>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPage(title: string, content: string, slug: string, meta: MetaData): Promise<void>;
    deletePage(slug: string): Promise<void>;
    deletePromotion(id: Principal): Promise<void>;
    exportData(): Promise<ExportData>;
    getActivePromotions(): Promise<Array<Promotion>>;
    getAllCateringEvents(): Promise<Array<CateringEvent>>;
    getAllContacts(): Promise<Array<Contact>>;
    getAllPages(): Promise<Array<Page>>;
    getAllPromotions(): Promise<Array<Promotion>>;
    getAllReservations(): Promise<Array<Reservation>>;
    getCallConfig(): Promise<ButtonConfig>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLocation(): Promise<Location>;
    getOpeningHours(): Promise<Array<OpeningHour>>;
    getOrderConfig(): Promise<ButtonConfig>;
    getPage(slug: string): Promise<Page | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWhatsappConfig(): Promise<ButtonConfig>;
    importData(data: ExportData): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    removeOpeningHour(day: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitCateringEvent(eventName: string, organizer: string, email: string, date: string, guests: bigint, details: string): Promise<void>;
    submitContact(name: string, email: string, message: string): Promise<void>;
    submitReservation(name: string, email: string, date: string, guests: bigint, specialRequests: string | null): Promise<void>;
    updateCallConfig(config: ButtonConfig): Promise<void>;
    updateLocation(newLocation: Location): Promise<void>;
    updateOrderConfig(config: ButtonConfig): Promise<void>;
    updatePage(slug: string, title: string, content: string, meta: MetaData): Promise<void>;
    updatePromotion(id: Principal, title: string, description: string, imageUrl: string, link: string | null, start: Time | null, end: Time | null, active: boolean, order: bigint): Promise<void>;
    updateWhatsappConfig(config: ButtonConfig): Promise<void>;
}
