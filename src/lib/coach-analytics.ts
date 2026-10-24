/** Only public, stable slug + channel; never track private contact details. */
export function getCoachClickEvent(id: string | undefined, network: string | undefined) {
  if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) return null;
  if (network !== "instagram" && network !== "facebook" && network !== "line") return null;
  return { name: "coach_contact_clicked", props: { coach: id, channel: network } } as const;
}
