import type { Locale } from "../i18n/config";
import { getDirection as _getDirection, isRtl as _isRtl } from "../i18n/config";

export { isRtl as isRtlLocale, getDirection as getLocaleDirection } from "../i18n/config";

export function mirrorIcon(locale: Locale): boolean {
  return _isRtl(locale);
}

export function logicalProps(locale: Locale) {
  const rtl = _isRtl(locale);
  return {
    marginInlineStart: rtl ? "margin-right" : "margin-left",
    marginInlineEnd: rtl ? "margin-left" : "margin-right",
    paddingInlineStart: rtl ? "padding-right" : "padding-left",
    paddingInlineEnd: rtl ? "padding-left" : "padding-right",
    insetInlineStart: rtl ? "right" : "left",
    insetInlineEnd: rtl ? "left" : "right",
  };
}

export function getScrollDirection(locale: Locale): "ltr" | "rtl" {
  return _getDirection(locale);
}
