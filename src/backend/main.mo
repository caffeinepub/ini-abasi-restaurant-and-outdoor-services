import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type Contact = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Reservation = {
    name : Text;
    email : Text;
    date : Text;
    guests : Nat;
    specialRequests : ?Text;
    timestamp : Time.Time;
  };

  type CateringEvent = {
    eventName : Text;
    organizer : Text;
    email : Text;
    date : Text;
    guests : Nat;
    details : Text;
    timestamp : Time.Time;
  };

  type Location = {
    address : Text;
    phone : Text;
    email : Text;
    coordinates : Text; // "lat,long"
  };

  type OpeningHour = {
    day : Text;
    open : Text;
    close : Text;
  };

  type ButtonConfig = {
    enabled : Bool;
    buttonLabel : Text;
    link : Text;
  };

  type MetaData = {
    title : Text;
    description : Text;
    keywords : Text;
  };

  type Page = {
    title : Text;
    content : Text;
    slug : Text;
    meta : MetaData;
  };

  type Promotion = {
    title : Text;
    description : Text;
    imageUrl : Text;
    link : ?Text;
    start : ?Time.Time;
    end : ?Time.Time;
    active : Bool;
    order : Nat;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  // Persistent Authorization - STABLE for upgrade persistence
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let contacts = Map.empty<Principal, Contact>();
  let reservations = Map.empty<Principal, Reservation>();
  let events = Map.empty<Principal, CateringEvent>();
  let customPages = Map.empty<Text, Page>();
  let promotions = Map.empty<Principal, Promotion>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var location : Location = {
    address = "Lindenstr. 46, 12555 Berlin";
    phone = "+49-111-222";
    email = "info@farmi.com";
    coordinates = "52.45663608667333, 13.578559163027128";
  };

  let openingHours : List.List<OpeningHour> = List.empty<OpeningHour>();

  var whatsappConfig : ButtonConfig = { enabled = true; buttonLabel = "WhatsApp"; link = "https://wa.me/491764322943" };
  var callConfig : ButtonConfig = { enabled = true; buttonLabel = "Call"; link = "+49-176-4522943" };
  var orderConfig : ButtonConfig = { enabled = true; buttonLabel = "Order"; link = "https://orderlink.com" };

  let lastSubmission = Map.empty<Principal, Time.Time>();
  let submissionCooldownNs = 60_000_000_000; // 60 seconds

  func checkRateLimit(caller : Principal) {
    let currentTime = Time.now();
    switch (lastSubmission.get(caller)) {
      case (?lastTime) {
        if (currentTime - lastTime < submissionCooldownNs) {
          Runtime.trap("Please wait before submitting again.");
        };
      };
      case (null) {};
    };
    lastSubmission.add(caller, currentTime);
  };

  // User Profile Management (required by instructions)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Submissions (forms) - available to all users including guests
  public shared ({ caller }) func submitContact(name : Text, email : Text, message : Text) : async () {
    checkRateLimit(caller);
    let contact : Contact = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(caller, contact);
  };

  public shared ({ caller }) func submitReservation(name : Text, email : Text, date : Text, guests : Nat, specialRequests : ?Text) : async () {
    checkRateLimit(caller);
    let reservation : Reservation = {
      name;
      email;
      date;
      guests;
      specialRequests;
      timestamp = Time.now();
    };
    reservations.add(caller, reservation);
  };

  public shared ({ caller }) func submitCateringEvent(eventName : Text, organizer : Text, email : Text, date : Text, guests : Nat, details : Text) : async () {
    checkRateLimit(caller);
    let event : CateringEvent = {
      eventName;
      organizer;
      email;
      date;
      guests;
      details;
      timestamp = Time.now();
    };
    events.add(caller, event);
  };

  // Admin functions for viewing submissions (admin only)
  public query ({ caller }) func getAllContacts() : async [Contact] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all contacts");
    };
    contacts.values().toArray();
  };

  public query ({ caller }) func getAllReservations() : async [Reservation] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all reservations");
    };
    reservations.values().toArray();
  };

  public query ({ caller }) func getAllCateringEvents() : async [CateringEvent] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all catering events");
    };
    events.values().toArray();
  };

  // Admin functions for Settings (admin only)
  public shared ({ caller }) func updateLocation(newLocation : Location) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update location info");
    };
    location := newLocation;
  };

  public shared ({ caller }) func addOpeningHour(day : Text, open : Text, close : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add opening hours");
    };
    openingHours.add({ day; open; close });
  };

  public shared ({ caller }) func removeOpeningHour(day : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove opening hours");
    };
    let filteredHours = openingHours.toArray().filter(func(hour : OpeningHour) : Bool { hour.day != day });
    openingHours.clear();
    for (hour in filteredHours.vals()) {
      openingHours.add(hour);
    };
  };

  public shared ({ caller }) func updateWhatsappConfig(config : ButtonConfig) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update WhatsApp config");
    };
    whatsappConfig := config;
  };

  public shared ({ caller }) func updateCallConfig(config : ButtonConfig) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update call config");
    };
    callConfig := config;
  };

  public shared ({ caller }) func updateOrderConfig(config : ButtonConfig) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order config");
    };
    orderConfig := config;
  };

  // Admin functions for Pages (admin only)
  public shared ({ caller }) func createPage(title : Text, content : Text, slug : Text, meta : MetaData) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create pages");
    };
    let page : Page = { title; content; slug; meta };
    customPages.add(slug, page);
  };

  public shared ({ caller }) func updatePage(slug : Text, title : Text, content : Text, meta : MetaData) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update pages");
    };
    switch (customPages.get(slug)) {
      case (null) { Runtime.trap("Page not found") };
      case (?_) {
        let page : Page = {
          title;
          content;
          slug;
          meta;
        };
        customPages.add(slug, page);
      };
    };
  };

  public shared ({ caller }) func deletePage(slug : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete pages");
    };
    customPages.remove(slug);
  };

  // Admin functions for Promotions/Banners (admin only)
  public shared ({ caller }) func addPromotion(title : Text, description : Text, imageUrl : Text, link : ?Text, start : ?Time.Time, end : ?Time.Time, order : Nat) : async Principal {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add promotions");
    };
    let promotion : Promotion = {
      title;
      description;
      imageUrl;
      link;
      start;
      end;
      active = true;
      order;
    };
    // Generate a unique ID based on timestamp and title hash
    let combinedText : Text = title # Time.now().toText();
    let utf8Bytes = combinedText.encodeUtf8();
    let id = utf8Bytes.fromBlob();
    promotions.add(id, promotion);
    id;
  };

  public shared ({ caller }) func updatePromotion(id : Principal, title : Text, description : Text, imageUrl : Text, link : ?Text, start : ?Time.Time, end : ?Time.Time, active : Bool, order : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update promotions");
    };
    switch (promotions.get(id)) {
      case (null) { Runtime.trap("Promotion not found") };
      case (?_) {
        let promotion : Promotion = {
          title;
          description;
          imageUrl;
          link;
          start;
          end;
          active;
          order;
        };
        promotions.add(id, promotion);
      };
    };
  };

  public shared ({ caller }) func deletePromotion(id : Principal) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete promotions");
    };
    promotions.remove(id);
  };

  // Public query functions (for frontend) - no authorization needed
  public query func getLocation() : async Location {
    location;
  };

  public query func getOpeningHours() : async [OpeningHour] {
    openingHours.toArray();
  };

  public query func getWhatsappConfig() : async ButtonConfig {
    whatsappConfig;
  };

  public query func getCallConfig() : async ButtonConfig {
    callConfig;
  };

  public query func getOrderConfig() : async ButtonConfig {
    orderConfig;
  };

  public query func getPage(slug : Text) : async ?Page {
    customPages.get(slug);
  };

  public query func getAllPages() : async [Page] {
    customPages.values().toArray();
  };

  public query func getActivePromotions() : async [Promotion] {
    let currentTime = Time.now();
    let allPromotions = promotions.values().toArray();
    let filteredPromotions = allPromotions.filter(
      func(p) {
        if (not p.active) { return false };
        switch (p.start, p.end) {
          case (null, null) { true };
          case (?start, null) { currentTime >= start };
          case (null, ?end) { currentTime <= end };
          case (?start, ?end) {
            currentTime >= start and currentTime <= end
          };
        };
      }
    );
    filteredPromotions;
  };

  // Admin query for all promotions (admin only)
  public query ({ caller }) func getAllPromotions() : async [Promotion] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all promotions");
    };
    promotions.values().toArray();
  };

  // Export/Import (backup/restore) - admin only
  type ExportData = {
    location : Location;
    openingHours : [OpeningHour];
    pages : [Page];
    promotions : [Promotion];
    whatsappConfig : ButtonConfig;
    callConfig : ButtonConfig;
    orderConfig : ButtonConfig;
  };

  public query ({ caller }) func exportData() : async ExportData {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can export data");
    };
    {
      location;
      openingHours = openingHours.toArray();
      pages = customPages.values().toArray();
      promotions = promotions.values().toArray();
      whatsappConfig;
      callConfig;
      orderConfig;
    };
  };

  public shared ({ caller }) func importData(data : ExportData) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can import data");
    };
    location := data.location;
    openingHours.clear();
    for (hour in data.openingHours.vals()) {
      openingHours.add(hour);
    };
    customPages.clear();
    for (page in data.pages.vals()) {
      customPages.add(page.slug, page);
    };
    promotions.clear();
    for (promotion in data.promotions.vals()) {
      let combinedText : Text = promotion.title # Time.now().toText();
      let utf8Bytes = combinedText.encodeUtf8();
      let id = utf8Bytes.fromBlob();
      promotions.add(id, promotion);
    };
    whatsappConfig := data.whatsappConfig;
    callConfig := data.callConfig;
    orderConfig := data.orderConfig;
  };
};
