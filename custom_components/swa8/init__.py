import logging
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry

_LOGGER = logging.getLogger(__name__)
DOMAIN = "swa8"

async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """إعداد النظام عبر الـ YAML (يترك True للتوافق مع الـ UI)."""
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """يتم استدعاؤها عند تفعيل العميل لإنتجريشن SWA8 من الواجهة."""
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = entry.data
    _LOGGER.info("نظام SWA8 التجاري يعمل الآن ومستعد لإدارة الأجهزة السحابية والمحلية.")
    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """تنظيف الـ ذاكرة في حال حذف العميل للإنتجريشن."""
    hass.data[DOMAIN].pop(entry.entry_id)
    return True