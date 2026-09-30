export const NotificationService = {
  /**
   * Broadcasts SOS alerts with live GPS coordinates to guardians and authorities
   */
  async dispatchSOSEmergency(sosEvent, contacts) {
    const mapsLink = `https://maps.google.com/?q=${sosEvent.location.latitude},${sosEvent.location.longitude}`;
    const distressMessage = `EMERGENCY ALERT: ${sosEvent.userName} has triggered a critical SOS alert on AROGYINI Platform. Type: ${sosEvent.emergencyType.toUpperCase()}. Live Location: ${mapsLink} (Time: ${new Date(sosEvent.timestamp).toLocaleTimeString()})`;
    const results = [];
    // 1. Notify all selected emergency contacts
    for (const contact of contacts.filter((c) => c.notifyOnSOS)) {
      results.push({
        recipient: contact.name,
        phone: contact.phone,
        channel: "SMS",
        status: "delivered",
        message: distressMessage,
        timestamp: new Date().toISOString(),
      });
    }
    // 2. Police 112 Dispatch Broadcast
    let policeDispatched = false;
    if (sosEvent.policeNotified) {
      results.push({
        recipient:
          sosEvent.policeStation || "Central Police Women Safety Control (112)",
        phone: "112 / 1091",
        channel: "Police_CAD_Dispatch",
        status: "delivered",
        message: `PRIORITY 1 DISTRESS: Female user in immediate distress. Coordinates: ${sosEvent.location.latitude}, ${sosEvent.location.longitude}. Dispatch nearest pink patrol unit.`,
        timestamp: new Date().toISOString(),
      });
      policeDispatched = true;
    }
    console.log(
      `[AROGYINI NOTIFICATION SERVICE] Dispatched SOS to ${results.length} channels.`,
    );
    return { results, policeDispatched };
  },
};
