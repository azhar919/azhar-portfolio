/* Icons used ONLY inside the client design-system mock-ups in the case studies.
   Each client's mock-up shows that client's own icon set, not the portfolio's:

     · Life Healthcare — Tabler Icons
     · African Bank    — Google Material Symbols (Outlined, weight 400)

   The portfolio's own icons live in ./icons.tsx. */

import type { ComponentType, CSSProperties } from "react";
import {
  IconArrowRight, IconCheck, IconChevronDown, IconChevronLeft, IconChevronRight,
  IconInfoCircle, IconMail, IconMapPin, IconPhone, IconX,
} from "@tabler/icons-react";

export type ClientIconProps = { size?: number; color?: string; strokeWidth?: number; style?: CSSProperties };
export type ClientIcon = ComponentType<ClientIconProps>;

/* ── Life Healthcare: Tabler ── */
type TablerGlyph = ComponentType<{ size?: number; color?: string; stroke?: number; style?: CSSProperties; "aria-hidden"?: boolean }>;
const tabler = (Glyph: TablerGlyph): ClientIcon => {
  const Wrapped = ({ size = 24, color = "currentColor", strokeWidth = 2, style }: ClientIconProps) => (
    <Glyph size={size} color={color} stroke={strokeWidth} style={{ flexShrink: 0, ...style }} aria-hidden />
  );
  return Wrapped;
};

export const LhcArrowRight = tabler(IconArrowRight);
export const LhcTick = tabler(IconCheck);
export const LhcChevronDown = tabler(IconChevronDown);
export const LhcChevronLeft = tabler(IconChevronLeft);
export const LhcChevronRight = tabler(IconChevronRight);
export const LhcInfo = tabler(IconInfoCircle);
export const LhcMail = tabler(IconMail);
export const LhcMapPin = tabler(IconMapPin);
export const LhcPhone = tabler(IconPhone);
export const LhcX = tabler(IconX);

/* ── African Bank: Google Material Symbols (paths from the official set, Apache-2.0) ── */
const material = (d: string): ClientIcon => {
  const Wrapped = ({ size = 24, color = "currentColor", style }: ClientIconProps) => (
    <svg width={size} height={size} viewBox="0 -960 960 960" fill={color} style={{ flexShrink: 0, ...style }} aria-hidden="true">
      <path d={d} />
    </svg>
  );
  return Wrapped;
};

export const AbPerson = material("M372-523q-42-42-42-108t42-108q42-42 108-42t108 42q42 42 42 108t-42 108q-42 42-108 42t-108-42ZM160-160v-94q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v94H160Zm60-60h520v-34q0-16-9.5-30.5T707-306q-64-31-117-42.5T480-360q-57 0-111 11.5T252-306q-14 7-23 21.5t-9 30.5v34Zm324.5-346.5Q570-592 570-631t-25.5-64.5Q519-721 480-721t-64.5 25.5Q390-670 390-631t25.5 64.5Q441-541 480-541t64.5-25.5ZM480-631Zm0 411Z");
export const AbBank = material("M212-241v-339h60v339h-60Zm242 0v-339h60v339h-60ZM80-121v-60h800v60H80Zm608-120v-339h60v339h-60ZM80-640v-53l400-228 400 228v53H80Zm134-60h532-532Zm0 0h532L480-852 214-700Z");
export const AbVerified = material("m346-60-76-130-151-31 17-147-96-112 96-111-17-147 151-31 76-131 134 62 134-62 77 131 150 31-17 147 96 111-96 112 17 147-150 31-77 130-134-62-134 62Zm27-79 107-45 110 45 67-100 117-30-12-119 81-92-81-94 12-119-117-28-69-100-108 45-110-45-67 100-117 28 12 119-81 94 81 92-12 121 117 28 70 100Zm107-341Zm-43 133 227-225-45-41-182 180-95-99-46 45 141 140Z");
export const AbCreditCard = material("M880-740v520q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42ZM140-631h680v-109H140v109Zm0 129v282h680v-282H140Zm0 282v-520 520Z");
export const AbMenuBook = material("M560-574v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-610q-38 0-73 9.5T560-574Zm0 220v-49q33-13.5 67.5-20.25T700-430q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-390q-38 0-73 9t-67 27Zm0-110v-48q33-14 67.5-21t72.5-7q26 0 51 4t49 10v44q-24-9-48.5-13.5T700-500q-38 0-73 9.5T560-464ZM248-300q53.57 0 104.28 12.5Q403-275 452-250v-427q-45-30-97.62-46.5Q301.76-740 248-740q-38 0-74.5 9.5T100-707v434q31-14 70.5-20.5T248-300Zm264 50q50-25 98-37.5T712-300q38 0 78.5 6t69.5 16v-429q-34-17-71.82-25-37.82-8-76.18-8-54 0-104.5 16.5T512-677v427Zm-30 90q-51-38-111-58.5T248-239q-36.54 0-71.77 9T106-208q-23.1 11-44.55-3Q40-225 40-251v-463q0-15 7-27.5T68-761q42-20 87.39-29.5 45.4-9.5 92.61-9.5 63 0 122.5 17T482-731q51-35 109.5-52T712-800q46.87 0 91.93 9.5Q849-781 891-761q14 7 21.5 19.5T920-714v463q0 27.89-22.5 42.45Q875-194 853-208q-34-14-69.23-22.5Q748.54-239 712-239q-63 0-121 21t-109 58ZM276-489Z");
