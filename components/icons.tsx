/* The site's icon set. Interface icons (arrows, menu, close, copy…) are Iconoir
   at one stroke weight; feature icons are Phosphor Duotone.
   Import icons from here, never from the libraries directly, so the weight and
   sizing stay consistent and a library can be swapped in one place.

   Each icon takes `size` (px), and optionally `color`, `strokeWidth`,
   `className`, `style`. Only pass `strokeWidth` for tiny marks (ticks inside
   13px badges); it has no effect on the two-tone icons.

   The client design-system mock-ups in the case studies do NOT use this file —
   they show each client's own icon set. */

import type { ComponentType, CSSProperties, SVGProps } from "react";
import * as I from "iconoir-react";
import * as P from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhIcon } from "@phosphor-icons/react";

export const ICON_STROKE = 1.5;

export type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
};
export type Icon = ComponentType<IconProps>;

const make = (Glyph: ComponentType<SVGProps<SVGSVGElement>>): Icon => {
  const Wrapped = ({ size = 24, color = "currentColor", strokeWidth = ICON_STROKE, className, style }: IconProps) => (
    <Glyph width={size} height={size} color={color} strokeWidth={strokeWidth} className={className} style={{ flexShrink: 0, ...style }} aria-hidden="true" />
  );
  return Wrapped;
};

const duo = (Glyph: PhIcon): Icon => {
  const Wrapped = ({ size = 24, color = "currentColor", className, style }: IconProps) => (
    <Glyph size={size} color={color} weight="duotone" className={className} style={{ flexShrink: 0, ...style }} aria-hidden="true" />
  );
  return Wrapped;
};

/* ── Interface icons (Iconoir, line) ── */

/* Arrows + chevrons */
export const ArrowUpRight = make(I.ArrowUpRight);
export const ArrowRight = make(I.ArrowRight);
export const ChevronDown = make(I.NavArrowDown);
export const ChevronLeft = make(I.NavArrowLeft);
export const ChevronRight = make(I.NavArrowRight);
export const ChevronsLeftRight = make(I.ArrowSeparate);

/* Controls */
export const Menu = make(I.Menu);
export const X = make(I.Xmark);
export const Plus = make(I.Plus);
export const Check = make(I.Check);
export const Copy = make(I.Copy);
export const Download = make(I.Download);
export const Info = make(I.InfoCircle);
export const Sun = make(I.SunLight);
export const Moon = make(I.HalfMoon);

/* Contact (sit inside buttons) */
export const Mail = make(I.Mail);
export const FileText = make(I.Page);

/* ── Feature icons (Phosphor Duotone, two-tone) ──
   These name a subject rather than an action: section markers, the About
   tiles, CV sidebar headings. They take the surrounding accent colour and the
   fill is a tint of it. */
export const MapPin = duo(P.MapPin);
export const AtSign = duo(P.At);
export const Users = duo(P.Users);
export const Camera = duo(P.Camera);
export const Video = duo(P.VideoCamera);
export const BookOpen = duo(P.BookOpen);
export const Briefcase = duo(P.Briefcase);
export const Building2 = duo(P.Buildings);
export const GraduationCap = duo(P.GraduationCap);
export const Award = duo(P.Medal);
export const PenTool = duo(P.PenNib);
export const Layers = duo(P.Stack);
export const Sparkles = duo(P.Sparkle);
export const Lightbulb = duo(P.Lightbulb);
export const Compass = duo(P.Compass);
export const Target = duo(P.Target);
export const Hammer = duo(P.Hammer);
export const Zap = duo(P.Lightning);
export const TrendingUp = duo(P.TrendUp);
export const BarChart2 = duo(P.ChartBar);
export const Search = duo(P.MagnifyingGlass);
export const RefreshCw = duo(P.ArrowsClockwise);
export const AlertCircle = duo(P.WarningCircle);
export const CheckCircle = duo(P.CheckCircle);
